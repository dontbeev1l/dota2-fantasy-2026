import './style.css';
import {
  Degree,
  Trait,
  Characteristic,
} from './get-score';
import {
  CHARACTERISTICS_BY_COLOR,
  DEGREES,
  TRAITS,
} from './fantasy-constants';
import {
  EmblemState,
  SlotState,
  WorkerResponse,
  REPLACEMENT_TOKENS,
} from './calculator.worker';
import {
  Language,
  getStoredLanguage,
  setStoredLanguage,
  TRANSLATIONS,
  formatTokenText,
  getShortTokenName,
} from './i18n';

export function getTokenColorClass(tokenId: string): 'red' | 'blue' | 'green' | 'neutral' {
  if (tokenId.includes('_red_')) return 'red';
  if (tokenId.includes('_blue_')) return 'blue';
  if (tokenId.includes('_green_')) return 'green';
  return 'neutral';
}

const COLOR_ORDER: Record<string, number> = {
  red: 1,
  blue: 2,
  green: 3,
  neutral: 4,
};

export function sortTokensByColor<T extends { id?: string; tokenId?: string }>(tokens: T[]): T[] {
  return [...tokens].sort((a, b) => {
    const idA = a.id || a.tokenId || '';
    const idB = b.id || b.tokenId || '';
    const colorA = getTokenColorClass(idA);
    const colorB = getTokenColorClass(idB);
    return (COLOR_ORDER[colorA] || 99) - (COLOR_ORDER[colorB] || 99);
  });
}

export interface TokenCategory {
  id: 'degree' | 'characteristic' | 'trait';
  icon: string;
  tokenIds: string[];
}

export const TOKEN_CATEGORIES: TokenCategory[] = [
  {
    id: 'degree',
    icon: '',
    tokenIds: [
      'reroll_first_red_degree',
      'reroll_first_blue_degree',
      'reroll_first_green_degree',
      'reroll_last_red_degree',
      'reroll_last_blue_degree',
      'reroll_last_green_degree',
      'reroll_random_red_degree',
      'reroll_random_blue_degree',
      'reroll_random_green_degree',
      'reroll_all_red_degrees',
      'reroll_all_blue_degrees',
      'reroll_all_green_degrees',
      'reroll_random_degree',
      'reroll_all_degrees',
      'upgrade_1_random_degree',
      'upgrade_lowest_degree',
      'upgrade_2_downgrade_1_degree',
    ],
  },
  {
    id: 'characteristic',
    icon: '',
    tokenIds: [
      'reroll_first_red_char',
      'reroll_first_blue_char',
      'reroll_first_green_char',
      'reroll_last_red_char',
      'reroll_last_blue_char',
      'reroll_last_green_char',
      'reroll_random_red_char',
      'reroll_random_blue_char',
      'reroll_random_green_char',
      'reroll_all_red_chars',
      'reroll_all_blue_chars',
      'reroll_all_green_chars',
      'reroll_random_emblem_char',
      'reroll_all_chars',
    ],
  },
  {
    id: 'trait',
    icon: '',
    tokenIds: [
      'reroll_first_red_trait',
      'reroll_first_blue_trait',
      'reroll_first_green_trait',
      'reroll_last_red_trait',
      'reroll_last_blue_trait',
      'reroll_last_green_trait',
      'reroll_random_red_trait',
      'reroll_random_blue_trait',
      'reroll_random_green_trait',
      'reroll_all_red_traits',
      'reroll_all_blue_traits',
      'reroll_all_green_traits',
      'reroll_random_emblem_trait',
      'reroll_all_traits',
    ],
  },
];

const STORAGE_KEY = 'dota_fantasy_2026_state_v2';

export class FantasyApp extends HTMLElement {
  private currentLang: Language = getStoredLanguage();
  private selectedCoachIdx: number = 0; // 0 for #1, 1 for #2, 2 for #3
  private selectedTeamIdx: [number, number, number] = [0, 0, 0]; // per slot: 0 for #1, 1 for #2, 2 for #3
  private enabledTokenIds: Set<string> = new Set([
    'reroll_random_red_degree',
    'upgrade_2_downgrade_1_degree',
    'reroll_all_red_degrees',
  ]);
  private worker: Worker | null = null;

  private slotStates: SlotState[] = [
    {
      id: 'core',
      position: 'core',
      titleUk: 'Основа',
      icon: '',
      emblems: [
        { color: 'red', characteristic: 'kills', degree: 'V', trait: 'vampiric' },
        { color: 'green', characteristic: 'teamfight_participation', degree: 'IV', trait: 'charitable' },
        { color: 'red', characteristic: 'gpm', degree: 'III', trait: 'fractal' },
      ],
    },
    {
      id: 'mid',
      position: 'mid',
      titleUk: 'Центр',
      icon: '',
      emblems: [
        { color: 'red', characteristic: 'kills', degree: 'V', trait: 'fractal' },
        { color: 'blue', characteristic: 'runes_grabbed', degree: 'IV', trait: 'charitable' },
        { color: 'green', characteristic: 'teamfight_participation', degree: 'III', trait: 'vampiric' },
      ],
    },
    {
      id: 'support',
      position: 'support',
      titleUk: 'Підтримка',
      icon: '',
      emblems: [
        { color: 'blue', characteristic: 'observer_wards_placed', degree: 'V', trait: 'friendly' },
        { color: 'green', characteristic: 'stun_seconds', degree: 'V', trait: 'friendly' },
        { color: 'blue', characteristic: 'camps_stacked', degree: 'V', trait: 'friendly' },
      ],
    },
  ];

  connectedCallback() {
    this.updateDocumentMetadata();
    this.loadStateFromStorage();
    this.initWebWorker();
    this.render();
    this.attachEventListeners();
    this.recalculateAll();
  }

  disconnectedCallback() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  private updateDocumentMetadata() {
    document.documentElement.lang = this.currentLang;
    const t = TRANSLATIONS[this.currentLang];
    document.title = `${t.appTitle} — TI 2026 Analytics`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.metaDescription);
    }
  }

  private initWebWorker() {
    try {
      this.worker = new Worker(new URL('./calculator.worker.ts', import.meta.url), {
        type: 'module',
      });
      this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
        this.handleWorkerResults(e.data);
      };
    } catch (e) {
      console.error('Не вдалося створити Web Worker / Failed to initialize Web Worker:', e);
    }
  }

  private loadStateFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.slotStates) && parsed.slotStates.length === 3) {
          for (let i = 0; i < 3; i++) {
            const pSlot = parsed.slotStates[i];
            if (pSlot && Array.isArray(pSlot.emblems) && pSlot.emblems.length === 3) {
              for (let j = 0; j < 3; j++) {
                if (pSlot.emblems[j]) {
                  this.slotStates[i].emblems[j].characteristic = pSlot.emblems[j].characteristic;
                  this.slotStates[i].emblems[j].degree = pSlot.emblems[j].degree;
                  this.slotStates[i].emblems[j].trait = pSlot.emblems[j].trait;
                }
              }
            }
          }
        }
        if (Array.isArray(parsed.enabledTokenIds)) {
          this.enabledTokenIds = new Set(parsed.enabledTokenIds);
        }
        if (typeof parsed.selectedCoachIdx === 'number') {
          this.selectedCoachIdx = parsed.selectedCoachIdx;
        }
        if (Array.isArray(parsed.selectedTeamIdx) && parsed.selectedTeamIdx.length === 3) {
          this.selectedTeamIdx = parsed.selectedTeamIdx;
        }
      }
    } catch (e) {
      console.warn('Не вдалося завантажити стан з localStorage:', e);
    }
  }

  private saveStateToStorage() {
    try {
      const stateToSave = {
        slotStates: this.slotStates,
        enabledTokenIds: Array.from(this.enabledTokenIds),
        selectedCoachIdx: this.selectedCoachIdx,
        selectedTeamIdx: this.selectedTeamIdx,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Не вдалося зберегти стан у localStorage:', e);
    }
  }

  private render() {
    const t = TRANSLATIONS[this.currentLang];

    this.innerHTML = `
      <div class="app-container">
        <!-- COMPACT UNIFIED HEADER -->
        <header class="app-header">
          <div class="header-compact-bar">
            <div class="header-left-group">
              <div class="title-and-lang-group">
                <h1 class="app-title">${t.appTitle}</h1>
                <!-- LANGUAGE SWITCHER UNDER TITLE -->
                <div class="lang-switcher">
                  <button type="button" class="lang-btn ${this.currentLang === 'uk' ? 'active' : ''}" data-lang="uk">🇺🇦 UA</button>
                  <button type="button" class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">🇬🇧 EN</button>
                </div>
              </div>
              <div class="header-total-score-badge">
                <span class="total-score-label">${t.totalLabel}</span>
                <span class="total-score-val" id="total-roster-score">0.00</span>
              </div>
            </div>

            <div class="header-right-group">
              <!-- GLOBAL COACH TOP-3 CARD -->
              <div class="global-coach-optimization-card" id="coach-optimization-box">
                <div class="coach-opt-header">
                  <span class="opt-title">${t.topCoachTitles}</span>
                </div>
                <div class="coach-options-list"></div>
              </div>
            </div>
          </div>
        </header>

        <!-- 3 COMPACT POSITION CARDS -->
        <main class="slots-grid">
          ${this.slotStates.map((slot, sIdx) => this.renderSlotCard(slot, sIdx)).join('')}
        </main>

        <!-- SEPARATE GLOBAL BLOCK: GROUPED REPLACEMENT TOKENS -->
        <section class="tokens-selector-card">
          <div class="selector-card-header">
            <div class="selector-title-group">
              <h2 class="section-title">${t.availableTokens}</h2>
            </div>

            <div class="toggle-actions">
              <button type="button" class="action-btn" id="btn-enable-all">${t.enableAll}</button>
              <button type="button" class="action-btn" id="btn-disable-all">${t.disableAll}</button>
            </div>
          </div>

          <div class="token-categories-grid">
            ${TOKEN_CATEGORIES.map((cat) => {
              const rawCatTokens = REPLACEMENT_TOKENS.filter((tk) => cat.tokenIds.includes(tk.id));
              const catTokens = sortTokensByColor(rawCatTokens);
              const activeCount = catTokens.filter((tk) => this.enabledTokenIds.has(tk.id)).length;
              const catTitle = t.tokenCategories[cat.id];

              return `
                <div class="category-card cat-${cat.id}">
                  <div class="category-card-header">
                    <div class="category-title-wrapper">
                      <h3 class="cat-title">${catTitle}</h3>
                      <span class="cat-badge" id="cat-badge-${cat.id}">${activeCount}/${catTokens.length}</span>
                    </div>
                    <div class="cat-quick-actions">
                      <button type="button" class="cat-action-btn btn-cat-enable" data-cat-id="${cat.id}">${t.catAll}</button>
                      <button type="button" class="cat-action-btn btn-cat-disable" data-cat-id="${cat.id}">${t.catReset}</button>
                    </div>
                  </div>

                  <div class="category-chips-grid">
                    ${catTokens
                      .map((tk) => {
                        const isEnabled = this.enabledTokenIds.has(tk.id);
                        const colorClass = getTokenColorClass(tk.id);
                        const name = this.currentLang === 'en' ? tk.nameEn : tk.nameUk;
                        const desc = this.currentLang === 'en' ? tk.descriptionEn : tk.descriptionUk;
                        const shortName = getShortTokenName(name, this.currentLang);

                        return `
                          <button type="button" class="token-chip chip-color-${colorClass} ${isEnabled ? 'active' : ''}" data-token-id="${tk.id}" title="${desc}">
                            <span class="chip-status"></span>
                            <span class="chip-name">${formatTokenText(shortName, this.currentLang)}</span>
                          </button>
                        `;
                      })
                      .join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- COMPARISON TABLE CARD (MATCHING TOP TEAMS CARD STYLE) -->
          <div class="comparison-table-card">
            <div class="teams-opt-header">
              <span>${t.comparisonTableTitle}</span>
            </div>
            <div class="table-responsive-wrapper">
              <table class="tokens-comparison-table">
                <thead>
                  <tr>
                    <th class="col-token">${t.colToken}</th>
                    <th class="col-slot">${t.colCore}</th>
                    <th class="col-slot">${t.colMid}</th>
                    <th class="col-slot">${t.colSupport}</th>
                    <th class="col-recommend">${t.colBestSlot}</th>
                  </tr>
                </thead>
                <tbody id="tokens-table-body">
                  <!-- Dynamically rendered table rows -->
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  private renderSlotCard(slot: SlotState, sIdx: number): string {
    const t = TRANSLATIONS[this.currentLang];
    const slotTitle = t.slots[slot.id as 'core' | 'mid' | 'support'];

    return `
      <article class="slot-card" data-slot-index="${sIdx}">
        <!-- SLOT HEADER -->
        <div class="slot-header">
          <div class="slot-title-group">
            <h2 class="slot-title">${slotTitle}</h2>
          </div>
          <span class="slot-score-badge" id="score-badge-${slot.id}">0.00</span>
        </div>

        <!-- EMBLEMS LIST -->
        <div class="emblems-section">
          ${slot.emblems.map((emb, eIdx) => this.renderEmblemItem(sIdx, emb, eIdx)).join('')}
        </div>

        <!-- TOP 3 TEAMS OPTIMIZATION LIST -->
        <div class="top-teams-card" id="top-teams-box-${slot.id}">
          <div class="teams-opt-header">
            <span>${t.topTeamsForSlot}</span>
          </div>
          <div class="teams-options-list"></div>
        </div>
      </article>
    `;
  }

  private renderEmblemItem(sIdx: number, emb: EmblemState, eIdx: number): string {
    const colorCharList = CHARACTERISTICS_BY_COLOR[emb.color];

    return `
      <div class="emblem-item color-${emb.color}" data-slot="${sIdx}" data-emblem="${eIdx}">
        <!-- HEADER: CHARACTERISTIC SELECT + PERCENTAGE -->
        <div class="emblem-header">
          <select class="custom-select char-select compact-select" data-slot="${sIdx}" data-emblem="${eIdx}">
            ${colorCharList
              .map(
                (c) => {
                  const charName = this.currentLang === 'en' ? c.nameEn : c.nameUk;
                  return `
                    <option value="${c.key}" ${c.key === emb.characteristic ? 'selected' : ''}>
                      ${c.icon} ${charName}
                    </option>
                  `;
                }
              )
              .join('')}
          </select>
          <span class="emblem-mult-val" id="mult-tag-${sIdx}-${eIdx}">100%</span>
        </div>

        <!-- BODY: DEGREE SELECTOR + TRAIT SELECT -->
        <div class="emblem-body">
          <div class="degree-selector">
            ${DEGREES.map(
              (d) => `
              <button type="button" class="degree-btn ${emb.degree === d.value ? 'active' : ''}"
                data-slot="${sIdx}" data-emblem="${eIdx}" data-degree="${d.value}">
                ${d.value}
              </button>
            `
            ).join('')}
          </div>

          <select class="custom-select trait-select compact-select" data-slot="${sIdx}" data-emblem="${eIdx}">
            ${TRAITS.map(
              (tr) => {
                const traitName = this.currentLang === 'en' ? tr.nameEn : tr.nameUk;
                return `
                  <option value="${tr.key || 'none'}" ${tr.key === emb.trait ? 'selected' : ''}>
                    ${tr.icon} ${traitName}
                  </option>
                `;
              }
            ).join('')}
          </select>
        </div>
      </div>
    `;
  }

  private isListenersAttached = false;

  private attachEventListeners() {
    if (this.isListenersAttached) return;
    this.isListenersAttached = true;

    this.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('char-select')) {
        const sIdx = parseInt(target.getAttribute('data-slot') || '0', 10);
        const eIdx = parseInt(target.getAttribute('data-emblem') || '0', 10);
        this.slotStates[sIdx].emblems[eIdx].characteristic = (target as HTMLSelectElement).value as Characteristic;
        this.recalculateAll();
      } else if (target.classList.contains('trait-select')) {
        const sIdx = parseInt(target.getAttribute('data-slot') || '0', 10);
        const eIdx = parseInt(target.getAttribute('data-emblem') || '0', 10);
        const val = (target as HTMLSelectElement).value;
        this.slotStates[sIdx].emblems[eIdx].trait = val === 'none' ? null : (val as Trait);
        this.recalculateAll();
      }
    });

    this.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;

      const langBtn = target.closest('.lang-btn') as HTMLElement;
      if (langBtn) {
        const newLang = langBtn.getAttribute('data-lang') as Language;
        if (newLang && newLang !== this.currentLang) {
          this.currentLang = newLang;
          setStoredLanguage(newLang);
          this.updateDocumentMetadata();
          this.render();
          this.recalculateAll();
        }
        return;
      }

      const coachItem = target.closest('.coach-option-btn') as HTMLElement;
      if (coachItem) {
        const cIdx = parseInt(coachItem.getAttribute('data-coach-idx') || '0', 10);
        this.selectedCoachIdx = cIdx;
        this.recalculateAll();
        return;
      }

      const teamItem = target.closest('.team-option-btn') as HTMLElement;
      if (teamItem) {
        const sIdx = parseInt(teamItem.getAttribute('data-slot') || '0', 10);
        const tIdx = parseInt(teamItem.getAttribute('data-team-idx') || '0', 10);
        this.selectedTeamIdx[sIdx] = tIdx;
        this.recalculateAll();
        return;
      }

      const btnCatEnable = target.closest('.btn-cat-enable') as HTMLElement;
      if (btnCatEnable) {
        const catId = btnCatEnable.getAttribute('data-cat-id');
        const cat = TOKEN_CATEGORIES.find((c) => c.id === catId);
        if (cat) {
          cat.tokenIds.forEach((id) => this.enabledTokenIds.add(id));
          this.updateTokenChipsUI();
          this.recalculateAll();
        }
        return;
      }

      const btnCatDisable = target.closest('.btn-cat-disable') as HTMLElement;
      if (btnCatDisable) {
        const catId = btnCatDisable.getAttribute('data-cat-id');
        const cat = TOKEN_CATEGORIES.find((c) => c.id === catId);
        if (cat) {
          cat.tokenIds.forEach((id) => this.enabledTokenIds.delete(id));
          this.updateTokenChipsUI();
          this.recalculateAll();
        }
        return;
      }

      const tokenChip = target.closest('.token-chip') as HTMLElement;
      if (tokenChip) {
        const tokenId = tokenChip.getAttribute('data-token-id');
        if (tokenId) {
          if (this.enabledTokenIds.has(tokenId)) {
            this.enabledTokenIds.delete(tokenId);
            tokenChip.classList.remove('active');
          } else {
            this.enabledTokenIds.add(tokenId);
            tokenChip.classList.add('active');
          }
          this.updateCategoryBadgesUI();
          this.recalculateAll();
        }
        return;
      }

      if (target.id === 'btn-enable-all') {
        REPLACEMENT_TOKENS.forEach((tk) => this.enabledTokenIds.add(tk.id));
        this.updateTokenChipsUI();
        this.recalculateAll();
        return;
      }

      if (target.id === 'btn-disable-all') {
        this.enabledTokenIds.clear();
        this.updateTokenChipsUI();
        this.recalculateAll();
        return;
      }

      if (target.classList.contains('degree-btn')) {
        const sIdx = parseInt(target.getAttribute('data-slot') || '0', 10);
        const eIdx = parseInt(target.getAttribute('data-emblem') || '0', 10);
        const degree = target.getAttribute('data-degree') as Degree;

        this.slotStates[sIdx].emblems[eIdx].degree = degree;

        const parent = target.parentElement;
        if (parent) {
          parent.querySelectorAll('.degree-btn').forEach((btn) => btn.classList.remove('active'));
          target.classList.add('active');
        }

        this.recalculateAll();
      }
    });
  }

  private updateTokenChipsUI() {
    this.querySelectorAll('.token-chip').forEach((chip) => {
      const id = chip.getAttribute('data-token-id');
      if (id) {
        const isEnabled = this.enabledTokenIds.has(id);

        if (isEnabled) {
          chip.classList.add('active');
        } else {
          chip.classList.remove('active');
        }
      }
    });
    this.updateCategoryBadgesUI();
  }

  private updateCategoryBadgesUI() {
    TOKEN_CATEGORIES.forEach((cat) => {
      const catBadge = this.querySelector(`#cat-badge-${cat.id}`);
      if (catBadge) {
        const catTokens = REPLACEMENT_TOKENS.filter((tk) => cat.tokenIds.includes(tk.id));
        const activeCount = catTokens.filter((tk) => this.enabledTokenIds.has(tk.id)).length;
        catBadge.textContent = `${activeCount}/${catTokens.length}`;
      }
    });
  }

  // Send computation request to Web Worker
  private recalculateAll() {
    this.saveStateToStorage();
    if (!this.worker) return;

    this.worker.postMessage({
      slotStates: this.slotStates,
      selectedCoachIdx: this.selectedCoachIdx,
      selectedTeamIdx: this.selectedTeamIdx,
      enabledTokenIds: Array.from(this.enabledTokenIds),
    });
  }

  // Receive Web Worker computation results off main thread
  private handleWorkerResults(data: WorkerResponse) {
    const { topCoachCombos, topTeamsPerSlot, grandTotal, multiSlotSimulations } = data;
    const t = TRANSLATIONS[this.currentLang];

    // Smoothly update Coach Top-3 UI without layout shift
    const coachBox = this.querySelector('#coach-optimization-box');
    if (coachBox) {
      coachBox.innerHTML = `
        <div class="coach-opt-header">
          <span class="opt-title">${t.topCoachTitles}</span>
        </div>
        <div class="coach-options-list">
          ${topCoachCombos
            .map(
              (c, idx) => {
                const attrName = this.currentLang === 'en' ? c.attrNameEn : c.attrNameUk;
                const rankName = this.currentLang === 'en' ? c.rankNameEn : c.rankNameUk;
                return `
                  <button type="button" class="coach-option-btn ${idx === this.selectedCoachIdx ? 'active' : ''}" data-coach-idx="${idx}">
                    <span class="coach-rank-box">#${idx + 1}</span>
                    <span class="coach-info-group">
                      <span class="coach-name">${attrName}</span>
                      <span class="coach-tag-code">[${rankName}]</span>
                    </span>
                    <span class="coach-score">+${c.totalScore.toLocaleString(this.currentLang === 'en' ? 'en-US' : 'uk-UA', { maximumFractionDigits: 1 })}</span>
                  </button>
                `;
              }
            )
            .join('')}
        </div>
      `;
    }

    // Update Each Position Slot
    for (let sIdx = 0; sIdx < 3; sIdx++) {
      const slot = this.slotStates[sIdx];
      const topTeams = topTeamsPerSlot[sIdx] || [];

      const activeTeamIdx = this.selectedTeamIdx[sIdx] < topTeams.length ? this.selectedTeamIdx[sIdx] : 0;
      const activeTeam = topTeams[activeTeamIdx] || topTeams[0];

      if (!activeTeam) continue;
      const result = activeTeam.result;

      // Render Top 3 Teams for this Slot
      const topTeamsBox = this.querySelector(`#top-teams-box-${slot.id}`);
      if (topTeamsBox) {
        topTeamsBox.innerHTML = `
          <div class="teams-opt-header">
            <span>${t.topTeamsForSlot}</span>
          </div>
          <div class="teams-options-list">
            ${topTeams
              .map(
                (team, idx) => `
              <button type="button" class="team-option-btn ${idx === this.selectedTeamIdx[sIdx] ? 'active' : ''}"
                data-slot="${sIdx}" data-team-idx="${idx}">
                <span class="team-rank-box">#${idx + 1}</span>
                <span class="team-info-group">
                  <span class="team-name">${team.teamName}</span>
                  <span class="team-tag-code">[${team.tag}]</span>
                </span>
                <span class="team-score">${team.score.toLocaleString(this.currentLang === 'en' ? 'en-US' : 'uk-UA', { maximumFractionDigits: 1 })} ${t.pts}</span>
              </button>
            `
              )
              .join('')}
          </div>
        `;
      }

      // Update Slot Score Badge
      const scoreBadge = this.querySelector(`#score-badge-${slot.id}`);
      if (scoreBadge) {
        scoreBadge.textContent = `${activeTeam.score.toLocaleString(this.currentLang === 'en' ? 'en-US' : 'uk-UA', { maximumFractionDigits: 1 })}`;
      }

      // Update Mini Score
      const miniScore = this.querySelector(`#mini-score-${slot.id}`);
      if (miniScore) {
        miniScore.textContent = activeTeam.score.toLocaleString(this.currentLang === 'en' ? 'en-US' : 'uk-UA', { maximumFractionDigits: 1 });
      }

      // Update Emblem Multipliers
      for (let eIdx = 0; eIdx < result.emblemMultipliers.length; eIdx++) {
        const multTag = this.querySelector(`#mult-tag-${sIdx}-${eIdx}`);
        if (multTag) {
          const pctVal = Math.round(result.emblemMultipliers[eIdx] * 100);
          multTag.textContent = `${pctVal}%`;
        }
      }
    }

    // Update Grand Total Roster Score
    const totalEl = this.querySelector('#total-roster-score');
    if (totalEl) {
      totalEl.textContent = grandTotal.toLocaleString(this.currentLang === 'en' ? 'en-US' : 'uk-UA', { maximumFractionDigits: 1 });
    }

    // Render Multi-Slot Replacement Comparison Table
    const tableBody = this.querySelector('#tokens-table-body');
    if (tableBody) {
      if (!multiSlotSimulations || multiSlotSimulations.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="5" class="empty-table-msg">
              ${t.noTokensSelected}
            </td>
          </tr>
        `;
        return;
      }

      const sortedSimulations = sortTokensByColor(multiSlotSimulations);

      tableBody.innerHTML = sortedSimulations
        .map((sim) => {
          const renderSlotCell = (slotData: typeof sim.core) => {
            const { expectedValue, maxGain, maxLoss, winRate, isRecommended } = slotData;

            let badgeText = t.badgeRisk;
            let badgeClass = 'bg-bad';
            let cellClass = '';

            if (maxLoss === 0 && maxGain === 0) {
              badgeText = t.badgeNoChange;
              badgeClass = 'bg-neutral';
              cellClass = 'cell-neutral';
            } else if (maxLoss === 0 && expectedValue > 0) {
              badgeText = t.badgeWorthIt;
              badgeClass = 'bg-good';
              cellClass = 'cell-recommended';
            } else if (isRecommended) {
              badgeText = t.badgeWorthIt;
              badgeClass = 'bg-good';
              cellClass = 'cell-recommended';
            } else if (maxGain <= 0 && maxLoss < 0) {
              badgeText = t.badgeUnprofitable;
              badgeClass = 'bg-bad';
              cellClass = 'cell-bad';
            } else {
              badgeText = t.badgeRisk;
              badgeClass = 'bg-bad';
              cellClass = 'cell-bad';
            }

            const numberLocale = this.currentLang === 'en' ? 'en-US' : 'uk-UA';

            const evFormatted = expectedValue >= 0 
              ? `+${expectedValue.toLocaleString(numberLocale, { maximumFractionDigits: 0 })}` 
              : expectedValue.toLocaleString(numberLocale, { maximumFractionDigits: 0 });

            const maxGainFormatted = maxGain > 0 
              ? `+${maxGain.toLocaleString(numberLocale, { maximumFractionDigits: 0 })}` 
              : '0';

            const maxLossFormatted = maxLoss < 0 
              ? maxLoss.toLocaleString(numberLocale, { maximumFractionDigits: 0 }) 
              : '0';

            const riskTxtClass = maxLoss < 0 ? 'txt-bad' : 'txt-neutral';
            const evTxtClass = expectedValue > 0 ? 'txt-good' : expectedValue < 0 ? 'txt-bad' : 'txt-neutral';

            return `
              <td class="cell-slot ${cellClass}">
                <div class="cell-top">
                  <span class="cell-badge ${badgeClass}">
                    ${badgeText}
                  </span>
                  <span class="cell-ev ${evTxtClass}">
                    EV: ${evFormatted} ${t.pts}
                  </span>
                </div>
                <div class="cell-sub">
                  <span>${t.chance}: <b>${winRate.toFixed(0)}%</b></span>
                  <span>${t.win}: <b class="txt-good">${maxGainFormatted}</b> | ${t.risk}: <b class="${riskTxtClass}">${maxLossFormatted}</b></span>
                </div>
              </td>
            `;
          };

          let bestSlotHtml = '';
          const bestEvFmt = sim.bestSlotEv.toLocaleString(this.currentLang === 'en' ? 'en-US' : 'uk-UA', { maximumFractionDigits: 0 });
          if (sim.bestSlot === 'core') {
            bestSlotHtml = `<span class="best-badge badge-core">${t.bestBadgeCore(bestEvFmt)}</span>`;
          } else if (sim.bestSlot === 'mid') {
            bestSlotHtml = `<span class="best-badge badge-mid">${t.bestBadgeMid(bestEvFmt)}</span>`;
          } else if (sim.bestSlot === 'support') {
            bestSlotHtml = `<span class="best-badge badge-support">${t.bestBadgeSupport(bestEvFmt)}</span>`;
          } else {
            bestSlotHtml = `<span class="best-badge badge-none">${t.bestBadgeNone}</span>`;
          }

          const colorClass = getTokenColorClass(sim.tokenId);
          const tokenName = this.currentLang === 'en' ? sim.tokenNameEn : sim.tokenNameUk;
          const tokenDesc = this.currentLang === 'en' ? sim.tokenDescriptionEn : sim.tokenDescriptionUk;

          return `
            <tr class="table-row-color-${colorClass}">
              <td class="cell-token-info">
                <span class="token-title">${formatTokenText(tokenName, this.currentLang)}</span>
                <span class="token-desc">${formatTokenText(tokenDesc, this.currentLang)}</span>
              </td>
              ${renderSlotCell(sim.core)}
              ${renderSlotCell(sim.mid)}
              ${renderSlotCell(sim.support)}
              <td class="cell-best-recommend">
                ${bestSlotHtml}
              </td>
            </tr>
          `;
        })
        .join('');
    }
  }
}

if (!customElements.get('fantasy-app')) {
  customElements.define('fantasy-app', FantasyApp);
}
