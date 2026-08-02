import dataJson from '../data.json';
import {
  calculateFantasyScore,
  FantasySlotConfig,
  FantasyScoreResult,
  Position,
  Degree,
  Trait,
  AttributeTitle,
  RankTitle,
  Characteristic,
} from './get-score';
import {
  COACH_ATTRIBUTES,
  COACH_RANKS,
  TEAMS_LIST,
  CHARACTERISTICS_BY_COLOR,
} from './fantasy-constants';

export interface EmblemState {
  color: 'red' | 'blue' | 'green';
  characteristic: Characteristic;
  degree: Degree;
  trait: Trait;
}

export interface SlotState {
  id: string;
  position: Position;
  titleUk: string;
  icon: string;
  emblems: [EmblemState, EmblemState, EmblemState];
}

export interface TopTeamInfo {
  teamName: string;
  tag: string;
  score: number;
  result: FantasyScoreResult;
}

export interface TopCoachCombo {
  attribute: AttributeTitle | 'none';
  rank: RankTitle | 'none';
  attrNameUk: string;
  attrNameEn: string;
  rankNameUk: string;
  rankNameEn: string;
  attrBoostUk: string;
  attrBoostEn: string;
  rankBoostUk: string;
  rankBoostEn: string;
  totalScore: number;
}

export interface TokenDefinition {
  id: string;
  nameUk: string;
  nameEn: string;
  descriptionUk: string;
  descriptionEn: string;
}

export const REPLACEMENT_TOKENS: TokenDefinition[] = [
  // --- 💎 ЯКІСТЬ ЕМБЛЕМ (DEGREE) ---
  {
    id: 'reroll_first_red_degree',
    nameUk: 'Замінити якість першої червоної емблеми',
    nameEn: 'Reroll tier of first red emblem',
    descriptionUk: 'Перша червона емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'First red emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_first_blue_degree',
    nameUk: 'Замінити якість першої синьої емблеми',
    nameEn: 'Reroll tier of first blue emblem',
    descriptionUk: 'Перша синя емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'First blue emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_first_green_degree',
    nameUk: 'Замінити якість першої зеленої емблеми',
    nameEn: 'Reroll tier of first green emblem',
    descriptionUk: 'Перша зелена емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'First green emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_last_red_degree',
    nameUk: 'Замінити якість останньої червоної емблеми',
    nameEn: 'Reroll tier of last red emblem',
    descriptionUk: 'Остання червона емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'Last red emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_last_blue_degree',
    nameUk: 'Замінити якість останньої синьої емблеми',
    nameEn: 'Reroll tier of last blue emblem',
    descriptionUk: 'Остання синя емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'Last blue emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_last_green_degree',
    nameUk: 'Замінити якість останньої зеленої емблеми',
    nameEn: 'Reroll tier of last green emblem',
    descriptionUk: 'Остання зелена емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'Last green emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_random_red_degree',
    nameUk: 'Замінити якість випадкової червоної емблеми',
    nameEn: 'Reroll tier of random red emblem',
    descriptionUk: 'Випадкова червона емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'Random red emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_random_blue_degree',
    nameUk: 'Замінити якість випадкової синьої емблеми',
    nameEn: 'Reroll tier of random blue emblem',
    descriptionUk: 'Випадкова синя емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'Random blue emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_random_green_degree',
    nameUk: 'Замінити якість випадкової зеленої емблеми',
    nameEn: 'Reroll tier of random green emblem',
    descriptionUk: 'Випадкова зелена емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'Random green emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_all_red_degrees',
    nameUk: 'Замінити якість усіх червоних емблем',
    nameEn: 'Reroll tier of all red emblems',
    descriptionUk: 'Усі червоні емблеми отримують новий ступінь (I-V)',
    descriptionEn: 'All red emblems receive new tiers (I-V)',
  },
  {
    id: 'reroll_all_blue_degrees',
    nameUk: 'Замінити якість усіх синіх емблем',
    nameEn: 'Reroll tier of all blue emblems',
    descriptionUk: 'Усі сині емблеми отримують новий ступінь (I-V)',
    descriptionEn: 'All blue emblems receive new tiers (I-V)',
  },
  {
    id: 'reroll_all_green_degrees',
    nameUk: 'Замінити якість усіх зелених емблем',
    nameEn: 'Reroll tier of all green emblems',
    descriptionUk: 'Усі зелені емблеми отримують новий ступінь (I-V)',
    descriptionEn: 'All green emblems receive new tiers (I-V)',
  },
  {
    id: 'reroll_random_degree',
    nameUk: 'Замінити якість випадкової емблеми',
    nameEn: 'Reroll tier of random emblem',
    descriptionUk: 'Випадкова емблема змінює ступінь на новий (I-V)',
    descriptionEn: 'Random emblem receives a new tier (I-V)',
  },
  {
    id: 'reroll_all_degrees',
    nameUk: 'Замінити якість усіх емблем',
    nameEn: 'Reroll tier of all emblems',
    descriptionUk: 'Усі 3 емблеми на слоту отримують нові ступені',
    descriptionEn: 'All 3 emblems on slot receive new tiers',
  },
  {
    id: 'upgrade_1_random_degree',
    nameUk: 'Покращити одну випадкову якість',
    nameEn: 'Upgrade tier of one random emblem',
    descriptionUk: 'Випадкова емблема підвищує свій ступінь на +1 рівень',
    descriptionEn: 'Random emblem increases its tier by +1',
  },
  {
    id: 'upgrade_lowest_degree',
    nameUk: 'Покращити емблему з найнижчим ступенем',
    nameEn: 'Upgrade emblem with lowest tier',
    descriptionUk: 'Емблема з найменшим ступенем на стягу підвищується на +1 рівень',
    descriptionEn: 'Emblem with lowest tier on flag increases by +1 level',
  },
  {
    id: 'upgrade_2_downgrade_1_degree',
    nameUk: 'Покращити дві якості і погіршити одну',
    nameEn: 'Upgrade two tiers & downgrade one',
    descriptionUk: 'Дві емблеми отримують +1 ступінь, а одна -1 ступінь',
    descriptionEn: 'Two emblems gain +1 tier, and one loses -1 tier',
  },

  // --- 🎯 ХАРАКТЕРИСТИКИ ЕМБЛЕМ (CHARACTERISTIC) ---
  {
    id: 'reroll_first_red_char',
    nameUk: 'Змінити характеристику першої червоної емблеми',
    nameEn: 'Reroll stat of first red emblem',
    descriptionUk: 'Перша червона емблема змінює характеристику на іншу червону',
    descriptionEn: 'First red emblem changes stat to another red stat',
  },
  {
    id: 'reroll_first_blue_char',
    nameUk: 'Змінити характеристику першої синьої емблеми',
    nameEn: 'Reroll stat of first blue emblem',
    descriptionUk: 'Перша синя емблема змінює характеристику на іншу синю',
    descriptionEn: 'First blue emblem changes stat to another blue stat',
  },
  {
    id: 'reroll_first_green_char',
    nameUk: 'Змінити характеристику першої зеленої емблеми',
    nameEn: 'Reroll stat of first green emblem',
    descriptionUk: 'Перша зелена емблема змінює характеристику на іншу зелену',
    descriptionEn: 'First green emblem changes stat to another green stat',
  },
  {
    id: 'reroll_last_red_char',
    nameUk: 'Змінити характеристику останньої червоної емблеми',
    nameEn: 'Reroll stat of last red emblem',
    descriptionUk: 'Остання червона емблема змінює характеристику на іншу червону',
    descriptionEn: 'Last red emblem changes stat to another red stat',
  },
  {
    id: 'reroll_last_blue_char',
    nameUk: 'Змінити характеристику останньої синьої емблеми',
    nameEn: 'Reroll stat of last blue emblem',
    descriptionUk: 'Остання синя емблема змінює характеристику на іншу синю',
    descriptionEn: 'Last blue emblem changes stat to another blue stat',
  },
  {
    id: 'reroll_last_green_char',
    nameUk: 'Змінити характеристику останньої зеленої емблеми',
    nameEn: 'Reroll stat of last green emblem',
    descriptionUk: 'Остання зелена емблема змінює характеристику на іншу зелену',
    descriptionEn: 'Last green emblem changes stat to another green stat',
  },
  {
    id: 'reroll_random_red_char',
    nameUk: 'Змінити характеристику випадкової червоної емблеми',
    nameEn: 'Reroll stat of random red emblem',
    descriptionUk: 'Випадкова червона емблема змінює характеристику на іншу червону',
    descriptionEn: 'Random red emblem changes stat to another red stat',
  },
  {
    id: 'reroll_random_blue_char',
    nameUk: 'Змінити характеристику випадкової синьої емблеми',
    nameEn: 'Reroll stat of random blue emblem',
    descriptionUk: 'Випадкова синя емблема змінює характеристику на іншу синю',
    descriptionEn: 'Random blue emblem changes stat to another blue stat',
  },
  {
    id: 'reroll_random_green_char',
    nameUk: 'Змінити характеристику випадкової зеленої емблеми',
    nameEn: 'Reroll stat of random green emblem',
    descriptionUk: 'Випадкова зелена емблема змінює характеристику на іншу зелену',
    descriptionEn: 'Random green emblem changes stat to another green stat',
  },
  {
    id: 'reroll_all_red_chars',
    nameUk: 'Змінити характеристики всіх червоних емблем',
    nameEn: 'Reroll stats of all red emblems',
    descriptionUk: 'Усі червоні емблеми отримують нові характеристики свого кольору',
    descriptionEn: 'All red emblems receive new stats of their color',
  },
  {
    id: 'reroll_all_blue_chars',
    nameUk: 'Змінити характеристики всіх синіх емблем',
    nameEn: 'Reroll stats of all blue emblems',
    descriptionUk: 'Усі сині емблеми отримують нові характеристики своего кольору',
    descriptionEn: 'All blue emblems receive new stats of their color',
  },
  {
    id: 'reroll_all_green_chars',
    nameUk: 'Змінити характеристики всіх зелених емблем',
    nameEn: 'Reroll stats of all green emblems',
    descriptionUk: 'Усі зелені емблеми отримують нові характеристики свого кольору',
    descriptionEn: 'All green emblems receive new stats of their color',
  },
  {
    id: 'reroll_random_emblem_char',
    nameUk: 'Замінити характеристику випадкової емблеми',
    nameEn: 'Reroll stat of random emblem',
    descriptionUk: 'Випадкова емблема отримує нову характеристику свого кольору',
    descriptionEn: 'Random emblem receives a new stat of its color',
  },
  {
    id: 'reroll_all_chars',
    nameUk: 'Замінити всі характеристики на стягу',
    nameEn: 'Reroll stats of all emblems',
    descriptionUk: 'Усі 3 емблеми отримують нові характеристики свого кольору',
    descriptionEn: 'All 3 emblems receive new stats of their color',
  },

  // --- ✨ РИСИ ЕМБЛЕМ (TRAIT) ---
  {
    id: 'reroll_first_red_trait',
    nameUk: 'Змінити рису першої червоної емблеми',
    nameEn: 'Reroll trait of first red emblem',
    descriptionUk: 'Перша червона емблема змінює рису на нову',
    descriptionEn: 'First red emblem receives a new trait',
  },
  {
    id: 'reroll_first_blue_trait',
    nameUk: 'Змінити рису першої синьої емблеми',
    nameEn: 'Reroll trait of first blue emblem',
    descriptionUk: 'Перша синя емблема змінює рису на нову',
    descriptionEn: 'First blue emblem receives a new trait',
  },
  {
    id: 'reroll_first_green_trait',
    nameUk: 'Змінити рису першої зеленої емблеми',
    nameEn: 'Reroll trait of first green emblem',
    descriptionUk: 'Перша зелена емблема змінює рису на нову',
    descriptionEn: 'First green emblem receives a new trait',
  },
  {
    id: 'reroll_last_red_trait',
    nameUk: 'Змінити рису останньої червоної емблеми',
    nameEn: 'Reroll trait of last red emblem',
    descriptionUk: 'Остання червона емблема змінює рису на нову',
    descriptionEn: 'Last red emblem receives a new trait',
  },
  {
    id: 'reroll_last_blue_trait',
    nameUk: 'Змінити рису останньої синьої емблеми',
    nameEn: 'Reroll trait of last blue emblem',
    descriptionUk: 'Остання синя емблема змінює рису на нову',
    descriptionEn: 'Last blue emblem receives a new trait',
  },
  {
    id: 'reroll_last_green_trait',
    nameUk: 'Змінити рису останньої зеленої емблеми',
    nameEn: 'Reroll trait of last green emblem',
    descriptionUk: 'Остання зелена емблема змінює рису на нову',
    descriptionEn: 'Last green emblem receives a new trait',
  },
  {
    id: 'reroll_random_red_trait',
    nameUk: 'Змінити рису випадкової червоної емблеми',
    nameEn: 'Reroll trait of random red emblem',
    descriptionUk: 'Випадкова червона емблема змінює рису на нову',
    descriptionEn: 'Random red emblem receives a new trait',
  },
  {
    id: 'reroll_random_blue_trait',
    nameUk: 'Змінити рису випадкової синьої емблеми',
    nameEn: 'Reroll trait of random blue emblem',
    descriptionUk: 'Випадкова синя емблема змінює рису на нову',
    descriptionEn: 'Random blue emblem receives a new trait',
  },
  {
    id: 'reroll_random_green_trait',
    nameUk: 'Змінити рису випадкової зеленої емблеми',
    nameEn: 'Reroll trait of random green emblem',
    descriptionUk: 'Випадкова зелена емблема змінює рису на нову',
    descriptionEn: 'Random green emblem receives a new trait',
  },
  {
    id: 'reroll_all_red_traits',
    nameUk: 'Змінити рису усіх червоних емблем',
    nameEn: 'Reroll traits of all red emblems',
    descriptionUk: 'Усі червоні емблеми отримують нові риси',
    descriptionEn: 'All red emblems receive new traits',
  },
  {
    id: 'reroll_all_blue_traits',
    nameUk: 'Змінити рису усіх синіх емблем',
    nameEn: 'Reroll traits of all blue emblems',
    descriptionUk: 'Усі сині емблеми отримують нові риси',
    descriptionEn: 'All blue emblems receive new traits',
  },
  {
    id: 'reroll_all_green_traits',
    nameUk: 'Змінити рису усіх зелених емблем',
    nameEn: 'Reroll traits of all green emblems',
    descriptionUk: 'Усі зелені емблеми отримують нові риси',
    descriptionEn: 'All green emblems receive new traits',
  },
  {
    id: 'reroll_random_emblem_trait',
    nameUk: 'Замінити рису випадкової емблеми',
    nameEn: 'Reroll trait of random emblem',
    descriptionUk: 'Випадкова емблема отримує нову рису',
    descriptionEn: 'Random emblem receives a new trait',
  },
  {
    id: 'reroll_all_traits',
    nameUk: 'Замінити риси всіх емблем',
    nameEn: 'Reroll traits of all emblems',
    descriptionUk: 'Усі 3 емблеми отримують нові риси',
    descriptionEn: 'All 3 emblems receive new traits',
  },

  // --- 🔮 КОМБІНОВАНІ & ПОВНІ (COMBINED & FULL) ---
  {
    id: 'reroll_trait_and_degree',
    nameUk: 'Замінити рису та якість випадкової емблеми',
    nameEn: 'Reroll trait & tier of random emblem',
    descriptionUk: 'Випадкова емблема змінює і якість, і рису на нові',
    descriptionEn: 'Random emblem receives a new tier and a new trait',
  },
  {
    id: 'full_reroll_random_emblem',
    nameUk: 'Повна заміна випадкової емблеми',
    nameEn: 'Full reroll of random emblem',
    descriptionUk: 'Випадкова емблема повністю змінює характеристику, якість і рису',
    descriptionEn: 'Random emblem fully changes stat, tier, and trait',
  },
  {
    id: 'full_reroll_all_emblems',
    nameUk: 'Повна заміна всіх емблем на стягу',
    nameEn: 'Full reroll of all emblems on flag',
    descriptionUk: 'Усі 3 емблеми повністю змінюють характеристики, якості та риси',
    descriptionEn: 'All 3 emblems fully change stats, tiers, and traits',
  },
];

export interface TokenSimulationResult {
  tokenId: string;
  tokenNameUk: string;
  tokenNameEn: string;
  totalOutcomes: number;
  winOutcomes: number;
  lossOutcomes: number;
  neutralOutcomes: number;
  winRate: number; // 0-100% (weighted probability)
  expectedValue: number; // EV delta score (weighted)
  maxGain: number;
  maxLoss: number;
  isRecommended: boolean;
}

export interface TokenMultiSlotResult {
  tokenId: string;
  tokenNameUk: string;
  tokenNameEn: string;
  tokenDescriptionUk: string;
  tokenDescriptionEn: string;
  core: TokenSimulationResult;
  mid: TokenSimulationResult;
  support: TokenSimulationResult;
  bestSlot: 'core' | 'mid' | 'support' | 'none';
  bestSlotEv: number;
}

export interface WorkerRequest {
  slotStates: SlotState[];
  selectedCoachIdx: number;
  selectedTeamIdx: [number, number, number];
  enabledTokenIds: string[];
}

export interface WorkerResponse {
  topCoachCombos: TopCoachCombo[];
  topTeamsPerSlot: TopTeamInfo[][];
  grandTotal: number;
  multiSlotSimulations: TokenMultiSlotResult[];
}

const DEGREE_ORDER: Degree[] = ['I', 'II', 'III', 'IV', 'V'];

// Probability weights for Emblem Degrees (I to V)
// Tier I: 40%, Tier II: 30%, Tier III: 18%, Tier IV: 9%, Tier V: 3%
const DEGREE_WEIGHTS: Record<Degree, number> = {
  1: 0.40,
  2: 0.30,
  3: 0.18,
  4: 0.09,
  5: 0.03,
  'I': 0.40,
  'II': 0.30,
  'III': 0.18,
  'IV': 0.09,
  'V': 0.03,
};

export function shiftDegree(deg: Degree, delta: number): Degree {
  const idx = DEGREE_ORDER.indexOf(deg);
  const newIdx = Math.max(0, Math.min(DEGREE_ORDER.length - 1, idx + delta));
  return DEGREE_ORDER[newIdx];
}

interface WeightedOutcome {
  delta: number;
  weight: number;
}

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const { slotStates, selectedCoachIdx, selectedTeamIdx, enabledTokenIds } = e.data;

  // 1. Calculate Top 3 Global Coach Combinations
  const coachCombos: TopCoachCombo[] = [];

  for (const attr of COACH_ATTRIBUTES) {
    for (const rank of COACH_RANKS) {
      let comboScore = 0;

      for (let sIdx = 0; sIdx < 3; sIdx++) {
        const slot = slotStates[sIdx];
        let bestTeamScore = 0;

        for (const team of TEAMS_LIST) {
          const config: FantasySlotConfig = {
            position: slot.position,
            teamName: team.name,
            flag: {
              emblems: slot.emblems.map((e) => ({
                characteristic: e.characteristic,
                degree: e.degree,
                trait: e.trait,
              })),
            },
            coach: {
              attribute: attr.key === 'none' ? undefined : (attr.key as AttributeTitle),
              rank: rank.key === 'none' ? undefined : (rank.key as RankTitle),
            },
          };

          try {
            const res = calculateFantasyScore(config, dataJson as any);
            if (res.totalPoints > bestTeamScore) {
              bestTeamScore = res.totalPoints;
            }
          } catch (err) {}
        }

        comboScore += bestTeamScore;
      }

      coachCombos.push({
        attribute: attr.key,
        rank: rank.key,
        attrNameUk: attr.nameUk,
        attrNameEn: attr.nameEn,
        rankNameUk: rank.nameUk,
        rankNameEn: rank.nameEn,
        attrBoostUk: attr.boostTextUk,
        attrBoostEn: attr.boostTextEn,
        rankBoostUk: rank.boostTextUk,
        rankBoostEn: rank.boostTextEn,
        totalScore: comboScore,
      });
    }
  }

  coachCombos.sort((a, b) => b.totalScore - a.totalScore);
  const topCoachCombos = coachCombos.slice(0, 3);

  const activeCoachIdx = selectedCoachIdx < topCoachCombos.length ? selectedCoachIdx : 0;
  const activeCoach = topCoachCombos[activeCoachIdx] || topCoachCombos[0];

  // 2. For each slot, calculate Top 3 Teams under active coach
  const topTeamsPerSlot: TopTeamInfo[][] = [];
  let grandTotal = 0;

  for (let sIdx = 0; sIdx < 3; sIdx++) {
    const slot = slotStates[sIdx];
    const teamResults: TopTeamInfo[] = [];

    for (const team of TEAMS_LIST) {
      const config: FantasySlotConfig = {
        position: slot.position,
        teamName: team.name,
        flag: {
          emblems: slot.emblems.map((e) => ({
            characteristic: e.characteristic,
            degree: e.degree,
            trait: e.trait,
          })),
        },
        coach: {
          attribute: activeCoach.attribute === 'none' ? undefined : activeCoach.attribute,
          rank: activeCoach.rank === 'none' ? undefined : activeCoach.rank,
        },
      };

      try {
        const res = calculateFantasyScore(config, dataJson as any);
        teamResults.push({
          teamName: team.name,
          tag: team.tag,
          score: res.totalPoints,
          result: res,
        });
      } catch (err) {}
    }

    teamResults.sort((a, b) => b.score - a.score);
    const top3 = teamResults.slice(0, 3);
    topTeamsPerSlot.push(top3);

    const activeTeamIdx = selectedTeamIdx[sIdx] < top3.length ? selectedTeamIdx[sIdx] : 0;
    const activeTeam = top3[activeTeamIdx] || top3[0];
    if (activeTeam) {
      grandTotal += activeTeam.score;
    }
  }

  // 3. Helper to simulate a token on a specific slot index (0 = Core, 1 = Mid, 2 = Support)
  const simulateTokenForSlot = (sIdx: number, tokenId: string): TokenSimulationResult => {
    const targetSlot = slotStates[sIdx];
    const targetTopTeams = topTeamsPerSlot[sIdx] || [];
    const activeTeamIdx = selectedTeamIdx[sIdx] < targetTopTeams.length ? selectedTeamIdx[sIdx] : 0;
    const activeTeam = targetTopTeams[activeTeamIdx] || targetTopTeams[0];
    const currentSlotScore = activeTeam ? activeTeam.score : 0;
    const activeTeamName = activeTeam ? activeTeam.teamName : (TEAMS_LIST[0] ? TEAMS_LIST[0].name : '');
    const tokenDef = REPLACEMENT_TOKENS.find((t) => t.id === tokenId);

    const getSlotScoreWithEmblems = (emblems: [EmblemState, EmblemState, EmblemState]): number => {
      if (!activeTeamName) return 0;
      const config: FantasySlotConfig = {
        position: targetSlot.position,
        teamName: activeTeamName,
        flag: {
          emblems: emblems.map((e) => ({
            characteristic: e.characteristic,
            degree: e.degree,
            trait: e.trait,
          })),
        },
        coach: {
          attribute: activeCoach.attribute === 'none' ? undefined : activeCoach.attribute,
          rank: activeCoach.rank === 'none' ? undefined : activeCoach.rank,
        },
      };
      try {
        const res = calculateFantasyScore(config, dataJson as any);
        return res.totalPoints;
      } catch (err) {
        return 0;
      }
    };

    const outcomes: WeightedOutcome[] = [];

    const simulateColorDegreeReroll = (color: 'red' | 'green' | 'blue') => {
      const colorIndices = targetSlot.emblems
        .map((e, idx) => (e.color === color ? idx : -1))
        .filter((idx) => idx !== -1);

      if (colorIndices.length === 1) {
        for (const d1 of DEGREE_ORDER) {
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[colorIndices[0]].degree = d1;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: DEGREE_WEIGHTS[d1],
          });
        }
      } else if (colorIndices.length === 2) {
        for (const d1 of DEGREE_ORDER) {
          for (const d2 of DEGREE_ORDER) {
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[colorIndices[0]].degree = d1;
            cloned[colorIndices[1]].degree = d2;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: DEGREE_WEIGHTS[d1] * DEGREE_WEIGHTS[d2],
            });
          }
        }
      } else if (colorIndices.length === 3) {
        for (const d1 of DEGREE_ORDER) {
          for (const d2 of DEGREE_ORDER) {
            for (const d3 of DEGREE_ORDER) {
              const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
              cloned[0].degree = d1;
              cloned[1].degree = d2;
              cloned[2].degree = d3;
              const newScore = getSlotScoreWithEmblems(cloned);
              outcomes.push({
                delta: newScore - currentSlotScore,
                weight: DEGREE_WEIGHTS[d1] * DEGREE_WEIGHTS[d2] * DEGREE_WEIGHTS[d3],
              });
            }
          }
        }
      }
    };

    const simulateRandomColorDegree = (color: 'red' | 'green' | 'blue') => {
      const colorIndices = targetSlot.emblems
        .map((e, idx) => (e.color === color ? idx : -1))
        .filter((idx) => idx !== -1);

      const numColor = colorIndices.length;
      if (numColor > 0) {
        for (const idx of colorIndices) {
          const currentDeg = targetSlot.emblems[idx].degree;
          const remainingWeightSum = DEGREE_ORDER.reduce(
            (sum, d) => (d !== currentDeg ? sum + DEGREE_WEIGHTS[d] : sum),
            0
          );

          for (const deg of DEGREE_ORDER) {
            if (deg === currentDeg) continue;
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[idx].degree = deg;
            const newScore = getSlotScoreWithEmblems(cloned);
            const w = (1 / numColor) * (DEGREE_WEIGHTS[deg] / remainingWeightSum);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: w,
            });
          }
        }
      }
    };

    const simulateFirstColorChar = (color: 'red' | 'green' | 'blue') => {
      const cIdx = targetSlot.emblems.findIndex((e) => e.color === color);
      if (cIdx !== -1) {
        const currentChar = targetSlot.emblems[cIdx].characteristic;
        const colorChars = CHARACTERISTICS_BY_COLOR[color];
        const numOptions = colorChars.length - 1;
        for (const gc of colorChars) {
          if (gc.key === currentChar) continue;
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[cIdx].characteristic = gc.key;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: 1 / Math.max(1, numOptions),
          });
        }
      }
    };

    const simulateRandomColorChar = (color: 'red' | 'green' | 'blue') => {
      const colorIndices = targetSlot.emblems
        .map((e, idx) => (e.color === color ? idx : -1))
        .filter((idx) => idx !== -1);

      const numColor = colorIndices.length;
      if (numColor > 0) {
        const colorChars = CHARACTERISTICS_BY_COLOR[color];
        for (const idx of colorIndices) {
          const currentChar = targetSlot.emblems[idx].characteristic;
          const numOptions = colorChars.length - 1;
          for (const c of colorChars) {
            if (c.key === currentChar) continue;
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[idx].characteristic = c.key;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: (1 / numColor) * (1 / Math.max(1, numOptions)),
            });
          }
        }
      }
    };

    const simulateFirstColorDegree = (color: 'red' | 'green' | 'blue') => {
      const cIdx = targetSlot.emblems.findIndex((e) => e.color === color);
      if (cIdx !== -1) {
        const currentDeg = targetSlot.emblems[cIdx].degree;
        const remainingWeightSum = DEGREE_ORDER.reduce(
          (sum, d) => (d !== currentDeg ? sum + DEGREE_WEIGHTS[d] : sum),
          0
        );

        for (const deg of DEGREE_ORDER) {
          if (deg === currentDeg) continue;
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[cIdx].degree = deg;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: DEGREE_WEIGHTS[deg] / remainingWeightSum,
          });
        }
      }
    };

    const simulateLastColorDegree = (color: 'red' | 'green' | 'blue') => {
      const colorIndices = targetSlot.emblems
        .map((e, idx) => (e.color === color ? idx : -1))
        .filter((idx) => idx !== -1);
      if (colorIndices.length > 0) {
        const cIdx = colorIndices[colorIndices.length - 1];
        const currentDeg = targetSlot.emblems[cIdx].degree;
        const remainingWeightSum = DEGREE_ORDER.reduce(
          (sum, d) => (d !== currentDeg ? sum + DEGREE_WEIGHTS[d] : sum),
          0
        );

        for (const deg of DEGREE_ORDER) {
          if (deg === currentDeg) continue;
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[cIdx].degree = deg;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: DEGREE_WEIGHTS[deg] / remainingWeightSum,
          });
        }
      }
    };

    const simulateLastColorChar = (color: 'red' | 'green' | 'blue') => {
      const colorIndices = targetSlot.emblems
        .map((e, idx) => (e.color === color ? idx : -1))
        .filter((idx) => idx !== -1);
      if (colorIndices.length > 0) {
        const cIdx = colorIndices[colorIndices.length - 1];
        const currentChar = targetSlot.emblems[cIdx].characteristic;
        const colorChars = CHARACTERISTICS_BY_COLOR[color];
        const numOptions = colorChars.length - 1;
        for (const gc of colorChars) {
          if (gc.key === currentChar) continue;
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[cIdx].characteristic = gc.key;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: 1 / Math.max(1, numOptions),
          });
        }
      }
    };

    const simulateLastColorTrait = (color: 'red' | 'green' | 'blue') => {
      const colorIndices = targetSlot.emblems
        .map((e, idx) => (e.color === color ? idx : -1))
        .filter((idx) => idx !== -1);
      if (colorIndices.length > 0) {
        const cIdx = colorIndices[colorIndices.length - 1];
        const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
        const currentTrait = targetSlot.emblems[cIdx].trait;
        const numOptions = allTraits.length - 1;
        for (const tr of allTraits) {
          if (tr === currentTrait) continue;
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[cIdx].trait = tr;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: 1 / Math.max(1, numOptions),
          });
        }
      }
    };

    const simulateColorCharReroll = (color: 'red' | 'green' | 'blue') => {
      const colorIndices = targetSlot.emblems
        .map((e, idx) => (e.color === color ? idx : -1))
        .filter((idx) => idx !== -1);

      const colorChars = CHARACTERISTICS_BY_COLOR[color];
      const numColor = colorIndices.length;

      if (numColor === 1) {
        for (const c1 of colorChars) {
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[colorIndices[0]].characteristic = c1.key;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: 1 / colorChars.length,
          });
        }
      } else if (numColor === 2) {
        for (const c1 of colorChars) {
          for (const c2 of colorChars) {
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[colorIndices[0]].characteristic = c1.key;
            cloned[colorIndices[1]].characteristic = c2.key;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: 1 / (colorChars.length * colorChars.length),
            });
          }
        }
      } else if (numColor === 3) {
        for (const c1 of colorChars) {
          for (const c2 of colorChars) {
            for (const c3 of colorChars) {
              const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
              cloned[0].characteristic = c1.key;
              cloned[1].characteristic = c2.key;
              cloned[2].characteristic = c3.key;
              const newScore = getSlotScoreWithEmblems(cloned);
              outcomes.push({
                delta: newScore - currentSlotScore,
                weight: 1 / (colorChars.length * colorChars.length * colorChars.length),
              });
            }
          }
        }
      }
    };

    const simulateFirstColorTrait = (color: 'red' | 'green' | 'blue') => {
      const cIdx = targetSlot.emblems.findIndex((e) => e.color === color);
      if (cIdx !== -1) {
        const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
        const currentTrait = targetSlot.emblems[cIdx].trait;
        const numOptions = allTraits.length - 1;
        for (const tr of allTraits) {
          if (tr === currentTrait) continue;
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[cIdx].trait = tr;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: 1 / Math.max(1, numOptions),
          });
        }
      }
    };

    const simulateRandomColorTrait = (color: 'red' | 'green' | 'blue') => {
      const colorIndices = targetSlot.emblems
        .map((e, idx) => (e.color === color ? idx : -1))
        .filter((idx) => idx !== -1);

      const numColor = colorIndices.length;
      if (numColor > 0) {
        const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
        for (const idx of colorIndices) {
          const currentTrait = targetSlot.emblems[idx].trait;
          const numOptions = allTraits.length - 1;
          for (const tr of allTraits) {
            if (tr === currentTrait) continue;
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[idx].trait = tr;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: (1 / numColor) * (1 / Math.max(1, numOptions)),
            });
          }
        }
      }
    };

    const simulateColorTraitReroll = (color: 'red' | 'green' | 'blue') => {
      const colorIndices = targetSlot.emblems
        .map((e, idx) => (e.color === color ? idx : -1))
        .filter((idx) => idx !== -1);

      const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
      const numColor = colorIndices.length;

      if (numColor === 1) {
        for (const t1 of allTraits) {
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[colorIndices[0]].trait = t1;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: 1 / allTraits.length,
          });
        }
      } else if (numColor === 2) {
        for (const t1 of allTraits) {
          for (const t2 of allTraits) {
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[colorIndices[0]].trait = t1;
            cloned[colorIndices[1]].trait = t2;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: 1 / (allTraits.length * allTraits.length),
            });
          }
        }
      } else if (numColor === 3) {
        for (const t1 of allTraits) {
          for (const t2 of allTraits) {
            for (const t3 of allTraits) {
              const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
              cloned[0].trait = t1;
              cloned[1].trait = t2;
              cloned[2].trait = t3;
              const newScore = getSlotScoreWithEmblems(cloned);
              outcomes.push({
                delta: newScore - currentSlotScore,
                weight: 1 / (allTraits.length * allTraits.length * allTraits.length),
              });
            }
          }
        }
      }
    };

    switch (tokenId) {
      case 'reroll_first_red_degree':
        simulateFirstColorDegree('red');
        break;
      case 'reroll_first_blue_degree':
        simulateFirstColorDegree('blue');
        break;
      case 'reroll_first_green_degree':
        simulateFirstColorDegree('green');
        break;
      case 'reroll_last_red_degree':
        simulateLastColorDegree('red');
        break;
      case 'reroll_last_blue_degree':
        simulateLastColorDegree('blue');
        break;
      case 'reroll_last_green_degree':
        simulateLastColorDegree('green');
        break;
      case 'reroll_random_red_degree':
        simulateRandomColorDegree('red');
        break;
      case 'reroll_random_blue_degree':
        simulateRandomColorDegree('blue');
        break;
      case 'reroll_random_green_degree':
        simulateRandomColorDegree('green');
        break;
      case 'reroll_all_red_degrees':
        simulateColorDegreeReroll('red');
        break;
      case 'reroll_all_blue_degrees':
        simulateColorDegreeReroll('blue');
        break;
      case 'reroll_all_green_degrees':
        simulateColorDegreeReroll('green');
        break;
      case 'reroll_random_degree':
        for (let idx = 0; idx < 3; idx++) {
          const currentDeg = targetSlot.emblems[idx].degree;
          const remainingWeightSum = DEGREE_ORDER.reduce(
            (sum, d) => (d !== currentDeg ? sum + DEGREE_WEIGHTS[d] : sum),
            0
          );
          for (const deg of DEGREE_ORDER) {
            if (deg === currentDeg) continue;
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[idx].degree = deg;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: (1 / 3) * (DEGREE_WEIGHTS[deg] / remainingWeightSum),
            });
          }
        }
        break;
      case 'reroll_all_degrees':
        for (const d1 of DEGREE_ORDER) {
          for (const d2 of DEGREE_ORDER) {
            for (const d3 of DEGREE_ORDER) {
              const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
              cloned[0].degree = d1;
              cloned[1].degree = d2;
              cloned[2].degree = d3;
              const newScore = getSlotScoreWithEmblems(cloned);
              outcomes.push({
                delta: newScore - currentSlotScore,
                weight: DEGREE_WEIGHTS[d1] * DEGREE_WEIGHTS[d2] * DEGREE_WEIGHTS[d3],
              });
            }
          }
        }
        break;

      case 'upgrade_1_random_degree':
        for (let idx = 0; idx < 3; idx++) {
          const currentDeg = targetSlot.emblems[idx].degree;
          if (currentDeg === 'V') {
            outcomes.push({ delta: 0, weight: 1 / 3 });
          } else {
            const nextDeg = shiftDegree(currentDeg, 1);
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[idx].degree = nextDeg;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({ delta: newScore - currentSlotScore, weight: 1 / 3 });
          }
        }
        break;

      case 'upgrade_lowest_degree': {
        const degreeValues: Record<Degree, number> = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5 };
        let minVal = 99;
        targetSlot.emblems.forEach((e) => {
          const val = degreeValues[e.degree] || 1;
          if (val < minVal) minVal = val;
        });

        const lowestIndices = targetSlot.emblems
          .map((e, idx) => ((degreeValues[e.degree] || 1) === minVal ? idx : -1))
          .filter((idx) => idx !== -1);

        for (const idx of lowestIndices) {
          const currentDeg = targetSlot.emblems[idx].degree;
          if (currentDeg === 'V') {
            outcomes.push({ delta: 0, weight: 1 / lowestIndices.length });
          } else {
            const nextDeg = shiftDegree(currentDeg, 1);
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[idx].degree = nextDeg;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: 1 / lowestIndices.length,
            });
          }
        }
        break;
      }

      case 'upgrade_2_downgrade_1_degree': {
        for (let downIdx = 0; downIdx < 3; downIdx++) {
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[downIdx].degree = shiftDegree(cloned[downIdx].degree, -1);
          for (let upIdx = 0; upIdx < 3; upIdx++) {
            if (upIdx !== downIdx) {
              cloned[upIdx].degree = shiftDegree(cloned[upIdx].degree, 1);
            }
          }
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: 1 / 3,
          });
        }
        break;
      }

      case 'reroll_first_red_char':
        simulateFirstColorChar('red');
        break;
      case 'reroll_first_blue_char':
        simulateFirstColorChar('blue');
        break;
      case 'reroll_first_green_char':
        simulateFirstColorChar('green');
        break;
      case 'reroll_last_red_char':
        simulateLastColorChar('red');
        break;
      case 'reroll_last_blue_char':
        simulateLastColorChar('blue');
        break;
      case 'reroll_last_green_char':
        simulateLastColorChar('green');
        break;
      case 'reroll_random_red_char':
        simulateRandomColorChar('red');
        break;
      case 'reroll_random_blue_char':
        simulateRandomColorChar('blue');
        break;
      case 'reroll_random_green_char':
        simulateRandomColorChar('green');
        break;
      case 'reroll_all_red_chars':
        simulateColorCharReroll('red');
        break;
      case 'reroll_all_blue_chars':
        simulateColorCharReroll('blue');
        break;
      case 'reroll_all_green_chars':
        simulateColorCharReroll('green');
        break;

      case 'reroll_random_emblem_char':
        for (let idx = 0; idx < 3; idx++) {
          const color = targetSlot.emblems[idx].color;
          const currentChar = targetSlot.emblems[idx].characteristic;
          const colorChars = CHARACTERISTICS_BY_COLOR[color];
          const numOptions = colorChars.length - 1;
          for (const c of colorChars) {
            if (c.key === currentChar) continue;
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[idx].characteristic = c.key;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: (1 / 3) * (1 / Math.max(1, numOptions)),
            });
          }
        }
        break;

      case 'reroll_all_chars':
        for (const c1 of CHARACTERISTICS_BY_COLOR[targetSlot.emblems[0].color]) {
          for (const c2 of CHARACTERISTICS_BY_COLOR[targetSlot.emblems[1].color]) {
            for (const c3 of CHARACTERISTICS_BY_COLOR[targetSlot.emblems[2].color]) {
              const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
              cloned[0].characteristic = c1.key;
              cloned[1].characteristic = c2.key;
              cloned[2].characteristic = c3.key;
              const newScore = getSlotScoreWithEmblems(cloned);
              outcomes.push({
                delta: newScore - currentSlotScore,
                weight:
                  1 /
                  (CHARACTERISTICS_BY_COLOR[targetSlot.emblems[0].color].length *
                    CHARACTERISTICS_BY_COLOR[targetSlot.emblems[1].color].length *
                    CHARACTERISTICS_BY_COLOR[targetSlot.emblems[2].color].length),
              });
            }
          }
        }
        break;

      case 'reroll_first_red_trait':
        simulateFirstColorTrait('red');
        break;
      case 'reroll_first_blue_trait':
        simulateFirstColorTrait('blue');
        break;
      case 'reroll_first_green_trait':
        simulateFirstColorTrait('green');
        break;
      case 'reroll_last_red_trait':
        simulateLastColorTrait('red');
        break;
      case 'reroll_last_blue_trait':
        simulateLastColorTrait('blue');
        break;
      case 'reroll_last_green_trait':
        simulateLastColorTrait('green');
        break;
      case 'reroll_random_red_trait':
        simulateRandomColorTrait('red');
        break;
      case 'reroll_random_blue_trait':
        simulateRandomColorTrait('blue');
        break;
      case 'reroll_random_green_trait':
        simulateRandomColorTrait('green');
        break;
      case 'reroll_all_red_traits':
        simulateColorTraitReroll('red');
        break;
      case 'reroll_all_blue_traits':
        simulateColorTraitReroll('blue');
        break;
      case 'reroll_all_green_traits':
        simulateColorTraitReroll('green');
        break;

      case 'reroll_random_emblem_trait':
        for (let idx = 0; idx < 3; idx++) {
          const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
          const currentTrait = targetSlot.emblems[idx].trait;
          const numOptions = allTraits.length - 1;
          for (const tr of allTraits) {
            if (tr === currentTrait) continue;
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[idx].trait = tr;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: (1 / 3) * (1 / Math.max(1, numOptions)),
            });
          }
        }
        break;

      case 'reroll_all_traits': {
        const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
        for (const t1 of allTraits) {
          for (const t2 of allTraits) {
            for (const t3 of allTraits) {
              const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
              cloned[0].trait = t1;
              cloned[1].trait = t2;
              cloned[2].trait = t3;
              const newScore = getSlotScoreWithEmblems(cloned);
              outcomes.push({
                delta: newScore - currentSlotScore,
                weight: 1 / (allTraits.length * allTraits.length * allTraits.length),
              });
            }
          }
        }
        break;
      }

      case 'reroll_trait_and_degree': {
        const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
        for (let idx = 0; idx < 3; idx++) {
          const currentTrait = targetSlot.emblems[idx].trait;
          const currentDeg = targetSlot.emblems[idx].degree;

          const traitOptions = allTraits.filter((t) => t !== currentTrait);
          const degOptions = DEGREE_ORDER.filter((d) => d !== currentDeg);

          const degRemainingWeight = degOptions.reduce((sum, d) => sum + DEGREE_WEIGHTS[d], 0);

          for (const tr of traitOptions) {
            for (const deg of degOptions) {
              const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
              cloned[idx].trait = tr;
              cloned[idx].degree = deg;
              const newScore = getSlotScoreWithEmblems(cloned);
              const w =
                (1 / 3) * (1 / traitOptions.length) * (DEGREE_WEIGHTS[deg] / degRemainingWeight);
              outcomes.push({
                delta: newScore - currentSlotScore,
                weight: w,
              });
            }
          }
        }
        break;
      }

      case 'full_reroll_random_emblem': {
        const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
        for (let idx = 0; idx < 3; idx++) {
          const color = targetSlot.emblems[idx].color;
          const colorChars = CHARACTERISTICS_BY_COLOR[color];

          for (const c of colorChars) {
            for (const deg of DEGREE_ORDER) {
              for (const tr of allTraits) {
                const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
                cloned[idx].characteristic = c.key;
                cloned[idx].degree = deg;
                cloned[idx].trait = tr;
                const newScore = getSlotScoreWithEmblems(cloned);
                const w =
                  (1 / 3) *
                  (1 / colorChars.length) *
                  DEGREE_WEIGHTS[deg] *
                  (1 / allTraits.length);
                outcomes.push({
                  delta: newScore - currentSlotScore,
                  weight: w,
                });
              }
            }
          }
        }
        break;
      }

      case 'full_reroll_all_emblems': {
        const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
        const c0List = CHARACTERISTICS_BY_COLOR[targetSlot.emblems[0].color];
        const c1List = CHARACTERISTICS_BY_COLOR[targetSlot.emblems[1].color];
        const c2List = CHARACTERISTICS_BY_COLOR[targetSlot.emblems[2].color];

        const sampleSize = 120;
        for (let i = 0; i < sampleSize; i++) {
          const c0 = c0List[Math.floor(Math.random() * c0List.length)];
          const c1 = c1List[Math.floor(Math.random() * c1List.length)];
          const c2 = c2List[Math.floor(Math.random() * c2List.length)];

          const d0 = DEGREE_ORDER[Math.floor(Math.random() * DEGREE_ORDER.length)];
          const d1 = DEGREE_ORDER[Math.floor(Math.random() * DEGREE_ORDER.length)];
          const d2 = DEGREE_ORDER[Math.floor(Math.random() * DEGREE_ORDER.length)];

          const t0 = allTraits[Math.floor(Math.random() * allTraits.length)];
          const t1 = allTraits[Math.floor(Math.random() * allTraits.length)];
          const t2 = allTraits[Math.floor(Math.random() * allTraits.length)];

          const cloned: [EmblemState, EmblemState, EmblemState] = [
            { color: targetSlot.emblems[0].color, characteristic: c0.key, degree: d0, trait: t0 },
            { color: targetSlot.emblems[1].color, characteristic: c1.key, degree: d1, trait: t1 },
            { color: targetSlot.emblems[2].color, characteristic: c2.key, degree: d2, trait: t2 },
          ];

          const newScore = getSlotScoreWithEmblems(cloned);
          const w =
            (DEGREE_WEIGHTS[d0] * DEGREE_WEIGHTS[d1] * DEGREE_WEIGHTS[d2]) / sampleSize;

          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: w,
          });
        }
        break;
      }
    }

    let winWeight = 0;
    let lossWeight = 0;
    let neutralWeight = 0;
    let totalWeightSum = 0;
    let evDeltaSum = 0;
    let maxGain = -Infinity;
    let maxLoss = Infinity;

    for (const out of outcomes) {
      totalWeightSum += out.weight;
      evDeltaSum += out.delta * out.weight;

      if (out.delta > 0.01) {
        winWeight += out.weight;
      } else if (out.delta < -0.01) {
        lossWeight += out.weight;
      } else {
        neutralWeight += out.weight;
      }

      if (out.delta > maxGain) maxGain = out.delta;
      if (out.delta < maxLoss) maxLoss = out.delta;
    }

    if (maxGain === -Infinity) maxGain = 0;
    if (maxLoss === Infinity) maxLoss = 0;

    const expectedValue = totalWeightSum > 0 ? evDeltaSum / totalWeightSum : 0;
    const winRate = totalWeightSum > 0 ? (winWeight / totalWeightSum) * 100 : 0;
    const isRecommended = expectedValue > 0 && maxLoss >= -500;

    return {
      tokenId,
      tokenNameUk: tokenDef ? tokenDef.nameUk : tokenId,
      tokenNameEn: tokenDef ? tokenDef.nameEn : tokenId,
      totalOutcomes: outcomes.length,
      winOutcomes: Math.round(winWeight * 100),
      lossOutcomes: Math.round(lossWeight * 100),
      neutralOutcomes: Math.round(neutralWeight * 100),
      winRate,
      expectedValue,
      maxGain,
      maxLoss,
      isRecommended,
    };
  };

  // 4. Perform Multi-Slot Simulations for enabled tokens
  const multiSlotSimulations: TokenMultiSlotResult[] = [];

  for (const tokenId of enabledTokenIds) {
    const tokenDef = REPLACEMENT_TOKENS.find((t) => t.id === tokenId);
    if (!tokenDef) continue;

    const coreSim = simulateTokenForSlot(0, tokenId);
    const midSim = simulateTokenForSlot(1, tokenId);
    const supportSim = simulateTokenForSlot(2, tokenId);

    let bestSlot: 'core' | 'mid' | 'support' | 'none' = 'none';
    let bestSlotEv = -Infinity;

    if (coreSim.expectedValue > 0 && coreSim.expectedValue > bestSlotEv) {
      bestSlot = 'core';
      bestSlotEv = coreSim.expectedValue;
    }
    if (midSim.expectedValue > 0 && midSim.expectedValue > bestSlotEv) {
      bestSlot = 'mid';
      bestSlotEv = midSim.expectedValue;
    }
    if (supportSim.expectedValue > 0 && supportSim.expectedValue > bestSlotEv) {
      bestSlot = 'support';
      bestSlotEv = supportSim.expectedValue;
    }

    if (bestSlotEv <= 0) {
      bestSlot = 'none';
      bestSlotEv = 0;
    }

    multiSlotSimulations.push({
      tokenId,
      tokenNameUk: tokenDef.nameUk,
      tokenNameEn: tokenDef.nameEn,
      tokenDescriptionUk: tokenDef.descriptionUk,
      tokenDescriptionEn: tokenDef.descriptionEn,
      core: coreSim,
      mid: midSim,
      support: supportSim,
      bestSlot,
      bestSlotEv,
    });
  }

  const response: WorkerResponse = {
    topCoachCombos,
    topTeamsPerSlot,
    grandTotal,
    multiSlotSimulations,
  };

  self.postMessage(response);
};
