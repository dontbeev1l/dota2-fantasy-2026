/**
 * Роль гравця у Dota 2 Fantasy
 */
export type PlayerRole = 'core' | 'mid' | 'support';

/**
 * Статистичні показники гравця за одну карту / гру
 */
export interface PlayerStats {
  /** Кількість вбивств ворожих героїв (Kills) */
  kills: number;

  /** Кількість смертей власного героя (Deaths) */
  deaths: number;

  /** Золото на хвилину (Gold Per Minute) */
  gpm: number;

  /** Кількість зібраного Безумного Каменю (Madstone) — новий ресурс/механіка Dota 2 у 2026 році */
  madstone_collected: number;

  /** Кількість зруйнованих / добитих веж (Tower Kills) */
  tower_kills: number;

  /** Кількість встановлених вардів спостереження (Observer Wards Placed) */
  observer_wards_placed: number;

  /** Кількість застаканих таборів нейтральних кріпів (Camps Stacked) */
  camps_stacked: number;

  /** Кількість підібраних рун (Runes Grabbed: Bounty, Water, Power Runes) */
  runes_grabbed: number;

  /** Кількість активованих / захоплених Смотрителів (Watchers Taken) */
  watchers_taken: number;

  /** Кількість використаних Смоуків (Smokes Used / Smoke of Deceit) */
  smokes_used: number;

  /** Кількість вбитого Рошана (Roshan Kills) */
  roshan_kills: number;

  /** Відсоток участі у командних боях (Teamfight Participation, від 0.0 до 1.0) */
  teamfight_participation: number;

  /** Загальна тривалість оглушення / контролю ворогів у секундах (Stun Duration in Seconds) */
  stun_seconds: number;

  /** Кількість вбитого Катувальника (Tormentor Kills) */
  tormentor_kills: number;

  /** Здійснення Першої Крові (First Blood: 1 якщо вбив першим, 0 якщо ні) */
  first_blood: number;

  /** Кількість вбитих ворожих кур'єрів (Courier Kills) */
  courier_kills: number;

  /** Загальна кількість добитих кріпів (Creep Score: Last Hits + Denies) */
  creep_score: number;

  /** Кількість зібраних лотусів зі Ставка Лотусів (Lotuses Collected from Lotus Pool) */
  lotuses_collected: number;
}

/**
 * Вагові коефіцієнти (бета) для розрахунку фентезі очок для конкретної ролі
 */
export type RoleBetas = Record<keyof PlayerStats, number>;

/**
 * Вагові коефіцієнти фентезі балів, згруповані за ролями гравців (Core, Mid, Support)
 */
export interface BetasConfig {
  /** Коефіцієнти для сапортів (позиції 4 та 5) */
  support: RoleBetas;

  /** Коефіцієнти для корі-гравців (позиції 1 та 3: керрі та офлейн) */
  core: RoleBetas;

  /** Коефіцієнти для мідлейнерів (позиція 2) */
  mid: RoleBetas;
}

/**
 * Інформація про турнір / лігу
 */
export interface LeagueInfo {
  /** Унікальний ID турніру у структурі Valve/OpenDota */
  id: number;

  /** Назва турніру (наприклад, "Esports World Cup 2026", "DreamLeague Season 29") */
  name: string;
}

/**
 * Метаінформація датасету та налаштування аналітичних моделей
 */
export interface MetaConfig {
  /** Дата генерації / збору даних (наприклад, "2026-08-01") */
  builtAt: string;

  /** Список турнірів та ліг, дані яких присутні в датасеті */
  leagues: LeagueInfo[];

  /** Період напіврозпаду в днях для дисконтування давніших результатів матчів (Half-life days) */
  halfLifeDays: number;

  /** Коефіцієнт зміщення K у рейтинговій системі Elo */
  eloK: number;

  /** Референсний базовий рейтинг Elo для розрахунку сили команд */
  eloRef: number;

  /** Вагові коефіцієнти статистичних параметрів залежно від ролі гравця */
  betas: BetasConfig;
}

/**
 * Інформація про кіберспортивну команду з Dota 2
 */
export interface Team {
  /** Унікальний ідентифікатор команди у Dota 2 */
  id: number;

  /** Повна назва команди (наприклад, "Team Spirit") */
  name: string;

  /** Скорочений тег команди (наприклад, "TSpirit") */
  tag: string;

  /** Поточний аналітичний рейтинг Elo команди */
  elo: number;
}

/**
 * Статистика гравця на окремо зіграній карті (матчі)
 */
export interface PlayerMap {
  /** Унікальний ID матчу у Dota 2 */
  matchId: number;

  /** Дата проведення матчу у форматі РРРР-ММ-ДД ("YYYY-MM-DD") */
  date: string;

  /** Час початку матчу (Unix Timestamp у секундах) */
  startTime: number;

  /** ID команди суперника */
  opponentTeamId: number;

  /** Чи перемогла команда гравця у цій карті (true - перемога, false - поразка) */
  win: boolean;

  /** Чи завершився матч успішно (статус завершеності) */
  complete: boolean;

  /** Індивідуальні статистичні показники гравця на цієї карті */
  stats: PlayerStats;
}

/**
 * Профіль професійного гравця Dota 2
 */
export interface Player {
  /** Унікальний 32-бітний ID акаунту гравця у Steam / Dota 2 */
  id: number;

  /** Нікнейм / ігрове ім'я гравця */
  name: string;

  /** ID команди, до складу якої входить гравець */
  teamId: number;

  /** Назва команди гравця */
  teamName: string;

  /** Основна роль / позиція гравця ('core', 'mid' або 'support') */
  role: PlayerRole;

  /** Історія зіграних карт/матчів гравця з детальною статистикою */
  maps: PlayerMap[];
}

/**
 * Головний об'єкт структури даних fantasy-калькулятора (data.json)
 */
export interface FantasyData {
  /** Метаінформація та конфігурація вагових коефіцієнтів */
  meta: MetaConfig;

  /** Список усіх команд та їх рейтинги Elo */
  teams: Team[];

  /** Список усіх гравців та їх де деталізована статистика матчів */
  players: Player[];
}
