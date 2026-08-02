export type Language = 'uk' | 'en';

const LANG_STORAGE_KEY = 'dota_fantasy_lang';

export function getStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'uk' || saved === 'en') {
      return saved;
    }
  } catch (e) {}
  return 'uk';
}

export function setStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (e) {}
}

export interface TranslationDictionary {
  appTitle: string;
  metaDescription: string;
  totalLabel: string;
  pts: string;
  topCoachTitles: string;
  topTeamsForSlot: string;
  availableTokens: string;
  enableAll: string;
  disableAll: string;
  catAll: string;
  catReset: string;
  comparisonTableTitle: string;
  colToken: string;
  colCore: string;
  colMid: string;
  colSupport: string;
  colBestSlot: string;
  noTokensSelected: string;
  badgeWorthIt: string;
  badgeRisk: string;
  badgeNoChange: string;
  badgeUnprofitable: string;
  chance: string;
  win: string;
  risk: string;
  bestBadgeCore: (score: string) => string;
  bestBadgeMid: (score: string) => string;
  bestBadgeSupport: (score: string) => string;
  bestBadgeNone: string;
  slots: {
    core: string;
    mid: string;
    support: string;
  };
  tokenCategories: {
    degree: string;
    characteristic: string;
    trait: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  uk: {
    appTitle: 'Dota 2 Fantasy 2026',
    metaDescription: 'Аналітичний калькулятор фентезі-балів для Dota 2 The International 2026. Оптимізація складу, аналіз карт, Elo рейтинги та бета-моделі на Web Components.',
    totalLabel: 'Разом:',
    pts: 'оч.',
    topCoachTitles: 'Топ-3 Титули Тренера:',
    topTeamsForSlot: 'Топ-3 Команди для слота:',
    availableTokens: 'Наявні Жетони Замін',
    enableAll: 'Увімкнути всі',
    disableAll: 'Вимкнути всі',
    catAll: 'Всі',
    catReset: 'Скинути',
    comparisonTableTitle: 'Аналіз та Порівняльна Таблиця Жетонів Замін за Слотами',
    colToken: 'Жетон / Заміна',
    colCore: 'Основа',
    colMid: 'Центр',
    colSupport: 'Підтримка',
    colBestSlot: 'Найкраще використати',
    noTokensSelected: 'Не вибрано жодного жетону. Увімкніть жетони вище, щоб побачити аналіз!',
    badgeWorthIt: 'ВАРТО',
    badgeRisk: 'РИЗИК',
    badgeNoChange: 'БЕЗ ЗМІН',
    badgeUnprofitable: 'ЗБИТКОВО',
    chance: 'Шанс',
    win: 'Виграш',
    risk: 'Ризик',
    bestBadgeCore: (score: string) => `Основа (+${score} оч.)`,
    bestBadgeMid: (score: string) => `Мід (+${score} оч.)`,
    bestBadgeSupport: (score: string) => `Підтримка (+${score} оч.)`,
    bestBadgeNone: 'Не вигідно на жодному',
    slots: {
      core: 'Основа',
      mid: 'Центр',
      support: 'Підтримка',
    },
    tokenCategories: {
      degree: 'Замінити якість',
      characteristic: 'Замінити характеристику',
      trait: 'Замінити рису',
    },
  },
  en: {
    appTitle: 'Dota 2 Fantasy 2026',
    metaDescription: 'Dota 2 The International 2026 Fantasy points analytics calculator. Roster optimization, map analysis, Elo ratings, and roll token simulation.',
    totalLabel: 'Total:',
    pts: 'pts',
    topCoachTitles: 'Top 3 Coaching Titles:',
    topTeamsForSlot: 'Top 3 Teams for Slot:',
    availableTokens: 'Available Roll Tokens',
    enableAll: 'Enable all',
    disableAll: 'Disable all',
    catAll: 'All',
    catReset: 'Reset',
    comparisonTableTitle: 'Roll Token Simulation & Comparison Table by Slot',
    colToken: 'Roll Token',
    colCore: 'Core',
    colMid: 'Mid',
    colSupport: 'Support',
    colBestSlot: 'Best War Banner Slot',
    noTokensSelected: 'No roll tokens selected. Enable tokens above to see the simulation!',
    badgeWorthIt: 'WORTH IT',
    badgeRisk: 'RISK',
    badgeNoChange: 'NO CHANGE',
    badgeUnprofitable: 'UNPROFITABLE',
    chance: 'Chance',
    win: 'Gain',
    risk: 'Risk',
    bestBadgeCore: (score: string) => `Core (+${score} pts)`,
    bestBadgeMid: (score: string) => `Mid (+${score} pts)`,
    bestBadgeSupport: (score: string) => `Support (+${score} pts)`,
    bestBadgeNone: 'Not profitable on any slot',
    slots: {
      core: 'Core',
      mid: 'Mid',
      support: 'Support',
    },
    tokenCategories: {
      degree: 'Emblem Quality (Tiers)',
      characteristic: 'Emblem Stats',
      trait: 'Emblem Traits',
    },
  },
};

export function formatTokenText(text: string, lang: Language): string {
  if (lang === 'en') {
    const targetWordsEn = [
      'first',
      'last',
      'random',
      'one',
      'two',
      'lowest',
      'all',
    ];
    const pattern = new RegExp(`(?<![a-zA-Z0-9_])(${targetWordsEn.join('|')})(?![a-zA-Z0-9_])`, 'gui');
    return text.replace(pattern, '<b class="target-emblem-kw">$1</b>');
  }

  const targetWordsUk = [
    'першої',
    'перша',
    'першу',
    'останньої',
    'остання',
    'останню',
    'випадкової',
    'випадкова',
    'випадкову',
    'випадкові',
    'випадкових',
    'одну',
    'один',
    'дві',
    'двох',
    'найнижчим',
    'найнижчою',
    'найнижчим ступенем',
    'найнижчу',
    'найменшим',
    'усіх',
    'усі',
    'всіх',
    'всі',
  ];

  const pattern = new RegExp(`(?<![а-яіїєґА-ЯІЇЄҐa-zA-Z0-9_])(${targetWordsUk.join('|')})(?![а-яіїєґА-ЯІЇЄҐa-zA-Z0-9_])`, 'gui');
  return text.replace(pattern, '<b class="target-emblem-kw">$1</b>');
}

export function getShortTokenName(name: string, lang: Language): string {
  if (lang === 'en') {
    return name
      .replace(/^Replace tier of /i, '')
      .replace(/^Reroll tier of /i, '')
      .replace(/^Replace stat of /i, '')
      .replace(/^Reroll stat of /i, '')
      .replace(/^Replace stats of /i, '')
      .replace(/^Reroll stats of /i, '')
      .replace(/^Replace trait of /i, '')
      .replace(/^Reroll trait of /i, '')
      .replace(/^Replace traits of /i, '')
      .replace(/^Reroll traits of /i, '')
      .replace(/^Upgrade tier of one random emblem/i, 'One random emblem')
      .replace(/^Upgrade emblem with lowest tier/i, 'Lowest tier emblem')
      .replace(/^Upgrade two tiers & downgrade one/i, '2 upgrades + 1 downgrade')
      .replace(/^Reroll trait & tier of random emblem/i, 'Trait & tier of random')
      .replace(/^Full reroll of random emblem/i, 'Full reroll of random')
      .replace(/^Full reroll of all emblems on flag/i, 'Full reroll of all');
  }

  return name
    .replace(/^Замінити якість /i, '')
    .replace(/^Змінити характеристику /i, '')
    .replace(/^Замінити характеристику /i, '')
    .replace(/^Змінити характеристики /i, '')
    .replace(/^Замінити всі характеристики на стягу/i, 'Усі характеристики')
    .replace(/^Змінити рису /i, '')
    .replace(/^Змінити риси /i, '')
    .replace(/^Замінити рису /i, '')
    .replace(/^Замінити риси /i, '')
    .replace(/^Покращити одну випадкову якість/i, 'Одна випадкова емблема')
    .replace(/^Покращити емблему з найнижчим ступенем/i, 'Найнижчий ступінь')
    .replace(/^Покращити дві якості і погіршити одну/i, '2 покращення + 1 погіршення')
    .replace(/^Замінити рису та якість випадкової емблеми/i, 'Риса та якість випадкової')
    .replace(/^Повна заміна випадкової емблеми/i, 'Повна заміна випадкової')
    .replace(/^Повна заміна всіх емблем на стягу/i, 'Повна заміна всіх');
}
