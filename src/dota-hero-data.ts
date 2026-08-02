export type HeroColor = 'red' | 'blue' | 'green' | 'purple' | 'yellow_brown';

export interface DotaHero {
  id: string;
  name: string;
  color: HeroColor;
  isElemental: boolean;
  isOtherworldly: boolean;
  isHeroic: boolean;
  roles: Array<'core' | 'mid' | 'support'>;
}

export interface MatchMetadata {
  matchId: number;
  durationSeconds: number;
  durationMinutes: number;
  isShortMatch: boolean; // < 25 min (1500 seconds)
  isLuckyDuration: boolean; // ends with 8 (seconds or minutes)
  diedToTormentor: boolean;
  firstBloodPreHorn: boolean;
  firstBloodPost10m: boolean;
  fountainKill: boolean;
}

// Повний реєстр героїв Dota 2 із класифікацією для атрибутів тренера
export const DOTA_HEROES: DotaHero[] = [
  // --- RED HEROES ---
  { id: 'axe', name: 'Axe', color: 'red', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core'] },
  { id: 'dragon_knight', name: 'Dragon Knight', color: 'red', isElemental: true, isOtherworldly: false, isHeroic: true, roles: ['core', 'mid'] },
  { id: 'doom', name: 'Doom', color: 'red', isElemental: true, isOtherworldly: true, isHeroic: false, roles: ['core'] },
  { id: 'mars', name: 'Mars', color: 'red', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core'] },
  { id: 'sven', name: 'Sven', color: 'red', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core', 'support'] },
  { id: 'lycan', name: 'Lycan', color: 'red', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core'] },
  { id: 'clinkz', name: 'Clinkz', color: 'red', isElemental: true, isOtherworldly: true, isHeroic: false, roles: ['core'] },
  { id: 'shadow_fiend', name: 'Shadow Fiend', color: 'red', isElemental: true, isOtherworldly: true, isHeroic: false, roles: ['mid', 'core'] },
  { id: 'phoenix', name: 'Phoenix', color: 'red', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['support'] },
  { id: 'snapfire', name: 'Snapfire', color: 'red', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['support', 'mid'] },
  { id: 'chaos_knight', name: 'Chaos Knight', color: 'red', isElemental: false, isOtherworldly: true, isHeroic: true, roles: ['core'] },
  { id: 'huskar', name: 'Huskar', color: 'red', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['mid', 'core'] },
  { id: 'bloodseeker', name: 'Bloodseeker', color: 'red', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core'] },
  { id: 'ogre_magi', name: 'Ogre Magi', color: 'red', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['support'] },
  { id: 'bristleback', name: 'Bristleback', color: 'red', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core'] },
  { id: 'legion_commander', name: 'Legion Commander', color: 'red', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core'] },
  { id: 'lifestealer', name: 'Lifestealer', color: 'red', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['core'] },
  { id: 'primal_beast', name: 'Primal Beast', color: 'red', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core', 'mid'] },
  { id: 'centaur', name: 'Centaur Warrunner', color: 'red', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core'] },

  // --- BLUE HEROES ---
  { id: 'storm_spirit', name: 'Storm Spirit', color: 'blue', isElemental: true, isOtherworldly: true, isHeroic: false, roles: ['mid'] },
  { id: 'phantom_lancer', name: 'Phantom Lancer', color: 'blue', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core'] },
  { id: 'razor', name: 'Razor', color: 'blue', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['core', 'mid'] },
  { id: 'morphling', name: 'Morphling', color: 'blue', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['core', 'mid'] },
  { id: 'puck', name: 'Puck', color: 'blue', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['mid'] },
  { id: 'lich', name: 'Lich', color: 'blue', isElemental: true, isOtherworldly: true, isHeroic: false, roles: ['support'] },
  { id: 'ancient_apparition', name: 'Ancient Apparition', color: 'blue', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['support'] },
  { id: 'crystal_maiden', name: 'Crystal Maiden', color: 'blue', isElemental: true, isOtherworldly: false, isHeroic: true, roles: ['support'] },
  { id: 'winter_wyvern', name: 'Winter Wyvern', color: 'blue', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['support', 'mid'] },
  { id: 'zeus', name: 'Zeus', color: 'blue', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['mid', 'support'] },
  { id: 'leshrac', name: 'Leshrac', color: 'blue', isElemental: true, isOtherworldly: true, isHeroic: false, roles: ['mid', 'core'] },
  { id: 'visage', name: 'Visage', color: 'blue', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['core', 'mid'] },
  { id: 'phantom_assassin', name: 'Phantom Assassin', color: 'blue', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core'] },
  { id: 'night_stalker', name: 'Night Stalker', color: 'blue', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['core'] },
  { id: 'naga_siren', name: 'Naga Siren', color: 'blue', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['core', 'support'] },
  { id: 'disruptor', name: 'Disruptor', color: 'blue', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['support'] },
  { id: 'tinker', name: 'Tinker', color: 'blue', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['mid', 'support'] },
  { id: 'enigma', name: 'Enigma', color: 'blue', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['core', 'support'] },
  { id: 'oracle', name: 'Oracle', color: 'blue', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['support'] },
  { id: 'riki', name: 'Riki', color: 'blue', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core', 'support'] },
  { id: 'slark', name: 'Slark', color: 'blue', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['core'] },
  { id: 'weaver', name: 'Weaver', color: 'blue', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core', 'support'] },

  // --- GREEN HEROES ---
  { id: 'viper', name: 'Viper', color: 'green', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['mid', 'core'] },
  { id: 'venomancer', name: 'Venomancer', color: 'green', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['support', 'core'] },
  { id: 'necrophos', name: 'Necrophos', color: 'green', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['core', 'mid'] },
  { id: 'pugna', name: 'Pugna', color: 'green', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['support', 'mid'] },
  { id: 'treant', name: 'Treant Protector', color: 'green', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['support'] },
  { id: 'furion', name: "Nature's Prophet", color: 'green', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core', 'support'] },
  { id: 'rubick', name: 'Rubick', color: 'green', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['support', 'mid'] },
  { id: 'medusa', name: 'Medusa', color: 'green', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core'] },
  { id: 'tidehunter', name: 'Tidehunter', color: 'green', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['core'] },
  { id: 'earth_spirit', name: 'Earth Spirit', color: 'green', isElemental: true, isOtherworldly: true, isHeroic: true, roles: ['mid', 'support'] },
  { id: 'underlord', name: 'Underlord', color: 'green', isElemental: true, isOtherworldly: true, isHeroic: false, roles: ['core'] },
  { id: 'wraith_king', name: 'Wraith King', color: 'green', isElemental: false, isOtherworldly: true, isHeroic: true, roles: ['core'] },
  { id: 'abaddon', name: 'Abaddon', color: 'green', isElemental: false, isOtherworldly: true, isHeroic: true, roles: ['core', 'support'] },
  { id: 'enchantress', name: 'Enchantress', color: 'green', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['support', 'core'] },
  { id: 'hoodwink', name: 'Hoodwink', color: 'green', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['support'] },

  // --- PURPLE HEROES ---
  { id: 'faceless_void', name: 'Faceless Void', color: 'purple', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core'] },
  { id: 'bane', name: 'Bane', color: 'purple', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['support'] },
  { id: 'dark_seer', name: 'Dark Seer', color: 'purple', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core'] },
  { id: 'dazzle', name: 'Dazzle', color: 'purple', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['support', 'mid'] },
  { id: 'spectre', name: 'Spectre', color: 'purple', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['core'] },
  { id: 'ta', name: 'Templar Assassin', color: 'purple', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core', 'mid'] },
  { id: 'witch_doctor', name: 'Witch Doctor', color: 'purple', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['support'] },
  { id: 'silencer', name: 'Silencer', color: 'purple', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['support', 'mid'] },
  { id: 'od', name: 'Outworld Destroyer', color: 'purple', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['mid'] },
  { id: 'antimage', name: 'Anti-Mage', color: 'purple', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['core'] },
  { id: 'qop', name: 'Queen of Pain', color: 'purple', isElemental: false, isOtherworldly: true, isHeroic: true, roles: ['mid'] },
  { id: 'shadow_demon', name: 'Shadow Demon', color: 'purple', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['support'] },
  { id: 'void_spirit', name: 'Void Spirit', color: 'purple', isElemental: false, isOtherworldly: true, isHeroic: true, roles: ['mid'] },
  { id: 'vengeful', name: 'Vengeful Spirit', color: 'purple', isElemental: false, isOtherworldly: true, isHeroic: false, roles: ['support'] },

  // --- YELLOW / BROWN HEROES ---
  { id: 'earthshaker', name: 'Earthshaker', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['support', 'mid'] },
  { id: 'sand_king', name: 'Sand King', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core'] },
  { id: 'tiny', name: 'Tiny', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['mid', 'core', 'support'] },
  { id: 'meepo', name: 'Meepo', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['mid', 'core'] },
  { id: 'alchemist', name: 'Alchemist', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core', 'mid'] },
  { id: 'bounty_hunter', name: 'Bounty Hunter', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['support', 'core'] },
  { id: 'omniknight', name: 'Omniknight', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: true, roles: ['support', 'core'] },
  { id: 'clockwerk', name: 'Clockwerk', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['support'] },
  { id: 'brewmaster', name: 'Brewmaster', color: 'yellow_brown', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['core'] },
  { id: 'lone_druid', name: 'Lone Druid', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['core', 'mid'] },
  { id: 'dawnbreaker', name: 'Dawnbreaker', color: 'yellow_brown', isElemental: true, isOtherworldly: false, isHeroic: true, roles: ['core', 'support'] },
  { id: 'sniper', name: 'Sniper', color: 'yellow_brown', isElemental: false, isOtherworldly: false, isHeroic: false, roles: ['mid', 'core'] },
  { id: 'kotl', name: 'Keeper of the Light', color: 'yellow_brown', isElemental: true, isOtherworldly: false, isHeroic: false, roles: ['support', 'mid'] },
  { id: 'pudge', name: 'Pudge', color: 'yellow_brown', isElemental: false, isOtherworldly: true, isHeroic: true, roles: ['support', 'core'] },
  { id: 'kunkka', name: 'Kunkka', color: 'yellow_brown', isElemental: true, isOtherworldly: false, isHeroic: true, roles: ['mid', 'core'] },
];

/**
 * Проста та стабільна детермінована хеш-функція (Mulberry/FNV-1a variant)
 */
function hashNumbers(a: number, b: number = 0): number {
  let h = (a ^ 2166136261) >>> 0;
  h = Math.imul(h ^ b, 16777619) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 2246822507) >>> 0;
  return (h ^ (h >>> 13)) >>> 0;
}

const matchMetadataCache = new Map<number, MatchMetadata>();

/**
 * Обчислення / симуляція детермінованих метаданих матчу за matchId
 */
export function getMatchMetadata(matchId: number): MatchMetadata {
  if (matchMetadataCache.has(matchId)) {
    return matchMetadataCache.get(matchId)!;
  }

  const h = hashNumbers(matchId, 777);

  // Тривалість у секундах: від 18 хвилин (1080s) до 62 хвилин (3720s), медіана ~38 хв
  const rawDuration = 1080 + (h % 2640);
  const durationMinutes = Math.floor(rawDuration / 60);

  // Decisive: тривалість менше 25 хвилин (1500s)
  const isShortMatch = rawDuration < 1500;

  // Lucky: тривалість закінчується на 8 (наприклад, 1828s або 38 хвилин)
  const isLuckyDuration = rawDuration % 10 === 8 || durationMinutes % 10 === 8;

  // Події матчу з реалістичними процінтними шансами
  const hEvents = hashNumbers(matchId, 999);
  const diedToTormentor = (hEvents % 100) < 22; // ~22% ігор
  const firstBloodPreHorn = ((hEvents >>> 8) % 100) < 18; // ~18% ігор
  const firstBloodPost10m = !firstBloodPreHorn && ((hEvents >>> 16) % 100) < 6; // ~5% ігор
  const fountainKill = ((hEvents >>> 24) % 100) < 14; // ~14% ігор

  const meta: MatchMetadata = {
    matchId,
    durationSeconds: rawDuration,
    durationMinutes,
    isShortMatch,
    isLuckyDuration,
    diedToTormentor,
    firstBloodPreHorn,
    firstBloodPost10m,
    fountainKill,
  };

  matchMetadataCache.set(matchId, meta);
  return meta;
}

const playerHeroCache = new Map<string, DotaHero>();

/**
 * Детерміноване призначення героя гравцю на конкретній карті згідно із його роллю
 */
export function getPlayerHero(matchId: number, playerId: number, role: 'core' | 'mid' | 'support'): DotaHero {
  const cacheKey = `${matchId}_${playerId}_${role}`;
  if (playerHeroCache.has(cacheKey)) {
    return playerHeroCache.get(cacheKey)!;
  }

  // Фільтруємо героїв за роллю
  const suitableHeroes = DOTA_HEROES.filter((h) => h.roles.includes(role));
  const pool = suitableHeroes.length > 0 ? suitableHeroes : DOTA_HEROES;

  const h = hashNumbers(matchId, playerId);
  const hero = pool[h % pool.length];

  playerHeroCache.set(cacheKey, hero);
  return hero;
}
