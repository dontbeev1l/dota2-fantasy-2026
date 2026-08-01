import type { FantasyData, PlayerStats } from '../data.type';

// Інтерфейс для коефіцієнтів/значень фентезі-очок Dota 2
export interface FantasyScoringRules {
  kills: number; // +107.00 за вбивство
  deaths: {
    base: number; // 1 950.00 початково
    penalty: number; // -195.00 за смерть
  };
  creepScore: number; // +3.00 за останній удар чи добивання
  gpmMultiplier: number; // Золото за хвилину, помножене на 2.00
  bountyRunes: number; // +13.00 за зібраний лютит (Bounty Rune)
  towerKills: number; // +352.00 за останній удар по вежі
  wardsPlaced: number; // +117.00 за встановлений оглядовий вард
  campsStacked: number; // +234.00 за скиртування табору
  runesGrabbed: number; // +141.00 за підняту чи закорковану руну
  watchersCaptured: number; // +147.00 за захопленого споглядача
  lotusesPicked: number; // +176.00 за піднятий лотос
  roshanKills: number; // +1 172.00 за вбивство Рошана
  teamfightParticipationMax: number; // Макс. 2 124.00 за участь у командних боях
  stunsPerSecond: number; // +10.00 за секунду приголомшення
  tormentorKills: number; // +879.00 за вбивство мучителя
  courierKills: number; // +703.00 за вбивство кур'єра
  firstBlood: number; // 1 934.00 оч. за пролиття гравцем першої крові
  smokesUsed: number; // +293.00 оч. за використаний Дим омани
}

// Об'єкт з даними фентезі-очок
export const dotaFantasyScoring: FantasyScoringRules = {
  kills: 107.00,
  deaths: {
    base: 1950.00,
    penalty: -195.00,
  },
  creepScore: 3.00,
  gpmMultiplier: 2.00,
  bountyRunes: 13.00,
  towerKills: 352.00,
  wardsPlaced: 117.00,
  campsStacked: 234.00,
  runesGrabbed: 141.00,
  watchersCaptured: 147.00,
  lotusesPicked: 176.00,
  roshanKills: 1172.00,
  teamfightParticipationMax: 2124.00,
  stunsPerSecond: 10.00,
  tormentorKills: 879.00,
  courierKills: 703.00,
  firstBlood: 1934.00,
  smokesUsed: 293.00,
};

// ==========================================
// Типи та інтерфейси для Фентезі Слот Конфігу
// ==========================================

export type Position =
  | 'основа'
  | 'цент'
  | 'мід'
  | 'підтримка'
  | 'core'
  | 'mid'
  | 'support';

export type Characteristic =
  | keyof PlayerStats
  | 'убивства'
  | 'вбивства'
  | 'смерті'
  | 'кріпи'
  | 'рахунок_кріпів'
  | 'ззх'
  | 'лютит'
  | 'зібраний_лютит'
  | 'вежі'
  | 'знищення_веж'
  | 'варди'
  | 'поставлені_варди'
  | 'табори'
  | 'заскиртовані_табори'
  | 'руни'
  | 'підняті_руни'
  | 'споглядачі'
  | 'захоплені_споглядачі'
  | 'дими'
  | 'використані_дими'
  | 'лотоси'
  | 'підняті_лотоси'
  | 'рошан'
  | 'убивства_рошана'
  | 'участь'
  | 'участь_у_боях'
  | 'приголомшення'
  | 'мучителі'
  | 'вбивства_мучителів'
  | 'перша_кров'
  | 'курєри'
  | 'курьєри'
  | 'убивства_курєрів';

export type Degree = 1 | 2 | 3 | 4 | 5 | 'I' | 'II' | 'III' | 'IV' | 'V';

export type Trait =
  | 'fractal'
  | 'charitable'
  | 'vampiric'
  | 'unique'
  | 'friendly'
  | 'фрактальна'
  | 'благодійна'
  | 'вампірська'
  | 'унікальна'
  | 'дружня'
  | null
  | undefined;

export interface EmblemConfig {
  characteristic: Characteristic;
  degree: Degree;
  trait?: Trait;
}

export interface FlagConfig {
  emblems: EmblemConfig[];
}

export type AttributeTitle =
  | 'crimson'
  | 'azure'
  | 'emerald'
  | 'royal'
  | 'gold'
  | 'elemental'
  | 'ethereal'
  | 'heroic'
  | 'кармазиновий'
  | 'лазурний'
  | 'смарагдовий'
  | 'королівський'
  | 'золотий'
  | 'елементальний'
  | 'потойбічний'
  | 'героїчний';

export type RankTitle =
  | 'sufferer'
  | 'blessed'
  | 'patient'
  | 'unlucky'
  | 'agile'
  | 'decider'
  | 'lucky'
  | 'executioner'
  | 'страдник'
  | 'послушник'
  | 'терпеливець'
  | 'нещасливець'
  | 'спритник'
  | 'вирішайло'
  | 'щасливчик'
  | 'кат';

export interface CoachConfig {
  attribute?: AttributeTitle;
  rank?: RankTitle;
}

export interface FantasySlotConfig {
  position: Position;
  teamName: string;
  flag: FlagConfig;
  coach?: CoachConfig;
}

// ==========================================
// Інтерфейси для результатних даних підрахунку
// ==========================================

export interface GameScoreDetail {
  matchId: number;
  date: string;
  opponentTeamId: number;
  score: number;
  playerScores: Array<{
    playerName: string;
    score: number;
  }>;
}

export interface SeriesDetail {
  seriesKey: string;
  date: string;
  opponentTeamId: number;
  seriesScore: number;
  gameScores: GameScoreDetail[];
  bestGamesScores: number[];
}

export interface FantasyScoreResult {
  totalPoints: number;
  position: Position;
  normalizedRole: 'core' | 'mid' | 'support';
  teamName: string;
  playersCount: number;
  players: string[];
  bestSeries: SeriesDetail | null;
  allSeries: SeriesDetail[];
  emblemMultipliers: number[];
}

// ==========================================
// Допоміжні функції оптимізації та розрахунку
// ==========================================

export function normalizePosition(pos: Position): 'core' | 'mid' | 'support' {
  const p = String(pos).toLowerCase().trim();
  if (p === 'основа' || p === 'core') return 'core';
  if (p === 'цент' || p === 'мід' || p === 'mid') return 'mid';
  if (p === 'підтримка' || p === 'support') return 'support';
  throw new Error(`Невідома позиція/слот: "${pos}". Допустимі: "основа", "цент", "підтримка".`);
}

export function normalizeCharacteristic(stat: Characteristic): keyof PlayerStats {
  const s = String(stat).toLowerCase().trim().replace(/\s+/g, '_');
  const aliasMap: Record<string, keyof PlayerStats> = {
    kills: 'kills',
    убивства: 'kills',
    вбивства: 'kills',
    deaths: 'deaths',
    смерті: 'deaths',
    creep_score: 'creep_score',
    кріпи: 'creep_score',
    рахунок_кріпів: 'creep_score',
    gpm: 'gpm',
    ззх: 'gpm',
    madstone_collected: 'madstone_collected',
    лютит: 'madstone_collected',
    зібраний_лютит: 'madstone_collected',
    tower_kills: 'tower_kills',
    вежі: 'tower_kills',
    знищення_веж: 'tower_kills',
    observer_wards_placed: 'observer_wards_placed',
    варди: 'observer_wards_placed',
    поставлені_варди: 'observer_wards_placed',
    camps_stacked: 'camps_stacked',
    табори: 'camps_stacked',
    заскиртовані_табори: 'camps_stacked',
    runes_grabbed: 'runes_grabbed',
    руни: 'runes_grabbed',
    підняті_руни: 'runes_grabbed',
    watchers_taken: 'watchers_taken',
    споглядачі: 'watchers_taken',
    захоплені_споглядачі: 'watchers_taken',
    smokes_used: 'smokes_used',
    дими: 'smokes_used',
    використані_дими: 'smokes_used',
    lotuses_collected: 'lotuses_collected',
    лотоси: 'lotuses_collected',
    підняті_лотоси: 'lotuses_collected',
    roshan_kills: 'roshan_kills',
    рошан: 'roshan_kills',
    убивства_рошана: 'roshan_kills',
    teamfight_participation: 'teamfight_participation',
    участь: 'teamfight_participation',
    участь_у_боях: 'teamfight_participation',
    stun_seconds: 'stun_seconds',
    приголомшення: 'stun_seconds',
    tormentor_kills: 'tormentor_kills',
    мучителі: 'tormentor_kills',
    вбивства_мучителів: 'tormentor_kills',
    first_blood: 'first_blood',
    перша_кров: 'first_blood',
    courier_kills: 'courier_kills',
    курєри: 'courier_kills',
    курьєри: 'courier_kills',
    убивства_курєрів: 'courier_kills',
  };

  const key = aliasMap[s] || (s as keyof PlayerStats);
  return key;
}

export function degreeToBoost(degree: Degree): number {
  if (degree === 1 || degree === 'I') return 0.10;
  if (degree === 2 || degree === 'II') return 0.30;
  if (degree === 3 || degree === 'III') return 0.60;
  if (degree === 4 || degree === 'IV') return 1.00;
  if (degree === 5 || degree === 'V') return 1.50;
  return 0;
}

export function normalizeTrait(t?: Trait): 'fractal' | 'charitable' | 'vampiric' | 'unique' | 'friendly' | null {
  if (!t) return null;
  const s = String(t).toLowerCase().trim();
  if (s === 'fractal' || s === 'фрактальна') return 'fractal';
  if (s === 'charitable' || s === 'благодійна') return 'charitable';
  if (s === 'vampiric' || s === 'вампірська') return 'vampiric';
  if (s === 'unique' || s === 'унікальна') return 'unique';
  if (s === 'friendly' || s === 'дружня') return 'friendly';
  return null;
}

export function getBaseStatScore(statName: keyof PlayerStats, stats: PlayerStats): number {
  switch (statName) {
    case 'kills':
      return (stats.kills || 0) * dotaFantasyScoring.kills;
    case 'deaths':
      return dotaFantasyScoring.deaths.base + (stats.deaths || 0) * dotaFantasyScoring.deaths.penalty;
    case 'creep_score':
      return (stats.creep_score || 0) * dotaFantasyScoring.creepScore;
    case 'gpm':
      return (stats.gpm || 0) * dotaFantasyScoring.gpmMultiplier;
    case 'madstone_collected':
      return (stats.madstone_collected || 0) * dotaFantasyScoring.bountyRunes;
    case 'tower_kills':
      return (stats.tower_kills || 0) * dotaFantasyScoring.towerKills;
    case 'observer_wards_placed':
      return (stats.observer_wards_placed || 0) * dotaFantasyScoring.wardsPlaced;
    case 'camps_stacked':
      return (stats.camps_stacked || 0) * dotaFantasyScoring.campsStacked;
    case 'runes_grabbed':
      return (stats.runes_grabbed || 0) * dotaFantasyScoring.runesGrabbed;
    case 'watchers_taken':
      return (stats.watchers_taken || 0) * dotaFantasyScoring.watchersCaptured;
    case 'smokes_used':
      return (stats.smokes_used || 0) * dotaFantasyScoring.smokesUsed;
    case 'lotuses_collected':
      return (stats.lotuses_collected || 0) * dotaFantasyScoring.lotusesPicked;
    case 'roshan_kills':
      return (stats.roshan_kills || 0) * dotaFantasyScoring.roshanKills;
    case 'teamfight_participation':
      return (stats.teamfight_participation || 0) * dotaFantasyScoring.teamfightParticipationMax;
    case 'stun_seconds':
      return (stats.stun_seconds || 0) * dotaFantasyScoring.stunsPerSecond;
    case 'tormentor_kills':
      return (stats.tormentor_kills || 0) * dotaFantasyScoring.tormentorKills;
    case 'first_blood':
      return ((stats.first_blood || 0) > 0 ? 1 : 0) * dotaFantasyScoring.firstBlood;
    case 'courier_kills':
      return (stats.courier_kills || 0) * dotaFantasyScoring.courierKills;
    default:
      return 0;
  }
}

export function computeEmblemMultipliers(emblems: EmblemConfig[]): number[] {
  const normalized = emblems.map((e) => ({
    characteristic: normalizeCharacteristic(e.characteristic),
    degree: e.degree,
    degreeVal: degreeToBoost(e.degree),
    trait: normalizeTrait(e.trait),
  }));

  const allDegreesDistinct = new Set(normalized.map((e) => e.degree)).size === normalized.length;
  const friendlyCount = normalized.filter((e) => e.trait === 'friendly').length;

  return normalized.map((e, idx) => {
    const qBoost = e.degreeVal;
    let tBoost = 0;

    if (e.trait === 'fractal' && allDegreesDistinct) {
      tBoost += 0.60;
    }
    if (e.trait === 'vampiric') {
      tBoost += 0.50;
    }
    if (e.trait === 'unique') {
      const sameTraitCount = normalized.filter((other) => other.trait === 'unique').length;
      if (sameTraitCount === 1) tBoost += 0.30;
    }
    if (e.trait === 'friendly' && friendlyCount >= 3) {
      tBoost += 0.50;
    }

    let neighborBoost = 0;
    const neighbors = [idx - 1, idx + 1].filter((i) => i >= 0 && i < normalized.length);
    for (const nIdx of neighbors) {
      const nTrait = normalized[nIdx].trait;
      if (nTrait === 'charitable') neighborBoost += 0.20;
      if (nTrait === 'vampiric') neighborBoost -= 0.10;
    }

    return 1 + qBoost + tBoost + neighborBoost;
  });
}

export function getCoachBoost(
  coach: CoachConfig | undefined,
  gameInfo: { isLoss: boolean; isDecider: boolean }
): number {
  if (!coach) return 0;
  let boost = 0;

  if (coach.attribute) {
    const attr = String(coach.attribute).toLowerCase();
    if (attr === 'crimson' || attr === 'кармазиновий') boost += 0.06;
    else if (attr === 'azure' || attr === 'лазурний') boost += 0.11;
    else if (attr === 'emerald' || attr === 'смарагдовий') boost += 0.06;
    else if (attr === 'royal' || attr === 'королівський') boost += 0.10;
    else if (attr === 'gold' || attr === 'золотий') boost += 0.08;
    else if (attr === 'elemental' || attr === 'елементальний') boost += 0.08;
    else if (attr === 'ethereal' || attr === 'потойбічний') boost += 0.07;
    else if (attr === 'heroic' || attr === 'героїчний') boost += 0.09;
  }

  if (coach.rank) {
    const r = String(coach.rank).toLowerCase();
    if (r === 'sufferer' || r === 'страдник') boost += 0.23;
    else if (r === 'blessed' || r === 'послушник') boost += 0.09;
    else if (r === 'patient' || r === 'терпеливець') boost += 0.23;
    else if (r === 'unlucky' || r === 'нещасливець') {
      if (gameInfo.isLoss) boost += 0.06;
    } else if (r === 'agile' || r === 'спритник') boost += 0.24;
    else if (r === 'decider' || r === 'вирішайло') {
      if (gameInfo.isDecider) boost += 0.16;
    } else if (r === 'lucky' || r === 'щасливчик') boost += 0.21;
    else if (r === 'executioner' || r === 'кат') boost += 0.13;
  }

  return boost;
}

/**
 * Головна функція підрахунку фентезі-очок для вказаного слота/конфігу команди на основі data.json
 *
 * @param config Конфігурація слота: позиція, команда, прапор з емблемами та тренерські титули
 * @param fantasyData Об'єкт даних з матчів та гравців (data.json)
 * @returns Детальний результат з набраними очками, найкращою серією та розподілом
 */
export function calculateFantasyScore(
  config: FantasySlotConfig,
  fantasyData: FantasyData
): FantasyScoreResult {
  const role = normalizePosition(config.position);
  const teamNameNorm = config.teamName.trim().toLowerCase();

  // Пошук гравців вказаної команди та ролі
  const players = fantasyData.players.filter((p) => {
    const pTeam = p.teamName.trim().toLowerCase();
    return (
      (pTeam === teamNameNorm || pTeam.includes(teamNameNorm) || teamNameNorm.includes(pTeam)) &&
      p.role === role
    );
  });

  if (players.length === 0) {
    throw new Error(`Гравців для команди "${config.teamName}" з роллю "${config.position}" не знайдено.`);
  }

  // Обчислюємо множники емблем стяга
  const emblemMults = computeEmblemMultipliers(config.flag.emblems);

  // Групуємо карти за matchId
  const matchesMap = new Map<
    number,
    {
      matchId: number;
      date: string;
      opponentTeamId: number;
      startTime: number;
      playerMaps: Array<{ player: (typeof players)[0]; map: (typeof players)[0]['maps'][0] }>;
    }
  >();

  for (const p of players) {
    for (const m of p.maps) {
      if (!matchesMap.has(m.matchId)) {
        matchesMap.set(m.matchId, {
          matchId: m.matchId,
          date: m.date,
          opponentTeamId: m.opponentTeamId,
          startTime: m.startTime,
          playerMaps: [],
        });
      }
      matchesMap.get(m.matchId)!.playerMaps.push({ player: p, map: m });
    }
  }

  // Групуємо матчі у серії (за датою та ID суперника)
  const seriesMap = new Map<string, Array<(typeof matchesMap) extends Map<any, infer V> ? V : never>>();
  for (const match of matchesMap.values()) {
    const key = `${match.date}_${match.opponentTeamId}`;
    if (!seriesMap.has(key)) seriesMap.set(key, []);
    seriesMap.get(key)!.push(match);
  }

  const allSeriesDetails: SeriesDetail[] = [];

  for (const [seriesKey, matches] of seriesMap.entries()) {
    matches.sort((a, b) => a.startTime - b.startTime);
    const totalGamesInSeries = matches.length;

    const gameDetails: GameScoreDetail[] = [];

    for (let gIdx = 0; gIdx < totalGamesInSeries; gIdx++) {
      const match = matches[gIdx];
      const isLoss = match.playerMaps.some((pm) => !pm.map.win);
      const isDecider = totalGamesInSeries >= 3 && gIdx === totalGamesInSeries - 1;

      const coachBoost = getCoachBoost(config.coach, { isLoss, isDecider });
      const coachMult = 1 + coachBoost;

      const playerScores: Array<{ playerName: string; score: number }> = [];
      let totalPlayerScore = 0;

      for (const pm of match.playerMaps) {
        let pScore = 0;
        for (let i = 0; i < config.flag.emblems.length; i++) {
          const statKey = normalizeCharacteristic(config.flag.emblems[i].characteristic);
          const base = getBaseStatScore(statKey, pm.map.stats);
          pScore += base * emblemMults[i];
        }
        pScore *= coachMult;
        playerScores.push({ playerName: pm.player.name, score: pScore });
        totalPlayerScore += pScore;
      }

      // Фінальний рахунок гри = усереднення рахунку всіх гравців на ролі у цій карті
      const mapAvgScore = totalPlayerScore / match.playerMaps.length;
      gameDetails.push({
        matchId: match.matchId,
        date: match.date,
        opponentTeamId: match.opponentTeamId,
        score: mapAvgScore,
        playerScores,
      });
    }

    // Два найкращих рахунки за серію підсумовуються
    gameDetails.sort((a, b) => b.score - a.score);
    const bestTwo = gameDetails.slice(0, 2);
    const seriesScore = bestTwo.reduce((sum, g) => sum + g.score, 0);

    allSeriesDetails.push({
      seriesKey,
      date: matches[0].date,
      opponentTeamId: matches[0].opponentTeamId,
      seriesScore,
      gameScores: gameDetails,
      bestGamesScores: bestTwo.map((g) => g.score),
    });
  }

  // Обирається найкращий результат серед усіх серій за період
  allSeriesDetails.sort((a, b) => b.seriesScore - a.seriesScore);

  const bestSeries = allSeriesDetails.length > 0 ? allSeriesDetails[0] : null;
  const totalPoints = bestSeries ? bestSeries.seriesScore : 0;

  return {
    totalPoints,
    position: config.position,
    normalizedRole: role,
    teamName: config.teamName,
    playersCount: players.length,
    players: players.map((p) => p.name),
    bestSeries,
    allSeries: allSeriesDetails,
    emblemMultipliers: emblemMults,
  };
}