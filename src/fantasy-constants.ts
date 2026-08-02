import type { Characteristic, Degree, Trait, AttributeTitle, RankTitle } from './get-score';

export interface CharacteristicDef {
  key: Characteristic;
  nameUk: string;
  nameEn: string;
  color: 'red' | 'blue' | 'green';
  scoringTextUk: string;
  scoringTextEn: string;
  icon: string;
}

export interface DegreeDef {
  value: Degree;
  labelUk: string;
  labelEn: string;
  boostText: string;
  boostVal: number;
}

export interface TraitDef {
  key: Trait;
  nameUk: string;
  nameEn: string;
  descriptionUk: string;
  descriptionEn: string;
  icon: string;
}

export interface CoachAttributeDef {
  key: AttributeTitle | 'none';
  nameUk: string;
  nameEn: string;
  boostTextUk: string;
  boostTextEn: string;
}

export interface CoachRankDef {
  key: RankTitle | 'none';
  nameUk: string;
  nameEn: string;
  boostTextUk: string;
  boostTextEn: string;
}

export const CHARACTERISTICS_BY_COLOR: Record<'red' | 'blue' | 'green', CharacteristicDef[]> = {
  red: [
    { key: 'kills', nameUk: 'Убивства', nameEn: 'Kills', color: 'red', scoringTextUk: '+107.00 / вбивство', scoringTextEn: '+107.00 per kill', icon: '' },
    { key: 'deaths', nameUk: 'Смерті', nameEn: 'Deaths', color: 'red', scoringTextUk: '1950.00 base, -195.00 / смерть', scoringTextEn: '1,950.00 base, -195.00 per death', icon: '' },
    { key: 'creep_score', nameUk: 'Рахунок кріпів (CS)', nameEn: 'Creep Score', color: 'red', scoringTextUk: '+3.00 / кріп', scoringTextEn: '+3.00 per last hit or deny', icon: '' },
    { key: 'gpm', nameUk: 'ЗЗХ (GPM)', nameEn: 'GPM', color: 'red', scoringTextUk: 'GPM × 2.00', scoringTextEn: 'GPM × 2.00', icon: '' },
    { key: 'madstone_collected', nameUk: 'Зібраний лютит', nameEn: 'Madstone Collected', color: 'red', scoringTextUk: '+13.00 / лютит', scoringTextEn: '+13.00 per Madstone collected', icon: '' },
    { key: 'tower_kills', nameUk: 'Знищення веж', nameEn: 'Tower Kills', color: 'red', scoringTextUk: '+352.00 / вежа', scoringTextEn: '+352.00 per Tower last hit', icon: '' },
  ],
  blue: [
    { key: 'observer_wards_placed', nameUk: 'Поставлені варди', nameEn: 'Wards Placed', color: 'blue', scoringTextUk: '+117.00 / вард', scoringTextEn: '+117.00 per observer ward placed', icon: '' },
    { key: 'camps_stacked', nameUk: 'Заскиртовані табори', nameEn: 'Camps Stacked', color: 'blue', scoringTextUk: '+234.00 / табір', scoringTextEn: '+234.00 per camp stacked', icon: '' },
    { key: 'runes_grabbed', nameUk: 'Підняті руни', nameEn: 'Runes Grabbed', color: 'blue', scoringTextUk: '+141.00 / руна', scoringTextEn: '+141.00 per rune bottled or taken', icon: '' },
    { key: 'watchers_taken', nameUk: 'Захоплені споглядачі', nameEn: 'Watchers Taken', color: 'blue', scoringTextUk: '+147.00 / споглядач', scoringTextEn: '+147.00 per captured watcher', icon: '' },
    { key: 'smokes_used', nameUk: 'Використані дими', nameEn: 'Smokes Used', color: 'blue', scoringTextUk: '+293.00 / смоук', scoringTextEn: '+293.00 per Smoke of Deceit used', icon: '' },
    { key: 'lotuses_collected', nameUk: 'Підняті лотоси', nameEn: 'Lotuses Grabbed', color: 'blue', scoringTextUk: '+176.00 / лотос', scoringTextEn: '+176.00 per lotus taken', icon: '' },
  ],
  green: [
    { key: 'roshan_kills', nameUk: 'Убивства Рошана', nameEn: 'Roshan Kills', color: 'green', scoringTextUk: '+1172.00 / Рошан', scoringTextEn: '+1,172.00 per Roshan kill', icon: '' },
    { key: 'teamfight_participation', nameUk: 'Участь у боях', nameEn: 'Teamfight Participation', color: 'green', scoringTextUk: 'до 2124.00 (від %)', scoringTextEn: 'max 2,124.00 for teamfights', icon: '' },
    { key: 'stun_seconds', nameUk: 'Приголомшення', nameEn: 'Stuns', color: 'green', scoringTextUk: '+10.00 / сек контролю', scoringTextEn: '+10.00 per second of stun', icon: '' },
    { key: 'tormentor_kills', nameUk: 'Вбивства мучителів', nameEn: 'Tormentor Kills', color: 'green', scoringTextUk: '+879.00 / мучитель', scoringTextEn: '+879.00 per Tormentor kill', icon: '' },
    { key: 'first_blood', nameUk: 'Перша кров (FB)', nameEn: 'First Blood', color: 'green', scoringTextUk: '+1934.00 за FB', scoringTextEn: '+1,934.00 points for First Blood', icon: '' },
    { key: 'courier_kills', nameUk: 'Убивства кур’єрів', nameEn: 'Courier Kills', color: 'green', scoringTextUk: '+703.00 / кур’єр', scoringTextEn: '+703.00 per Courier kill', icon: '' },
  ],
};

export const DEGREES: DegreeDef[] = [
  { value: 'I', labelUk: 'Ступінь I', labelEn: 'Tier I', boostText: '+10%', boostVal: 0.10 },
  { value: 'II', labelUk: 'Ступінь II', labelEn: 'Tier II', boostText: '+30%', boostVal: 0.30 },
  { value: 'III', labelUk: 'Ступінь III', labelEn: 'Tier III', boostText: '+60%', boostVal: 0.60 },
  { value: 'IV', labelUk: 'Ступінь IV', labelEn: 'Tier IV', boostText: '+100%', boostVal: 1.00 },
  { value: 'V', labelUk: 'Ступінь V', labelEn: 'Tier V', boostText: '+150%', boostVal: 1.50 },
];

export const TRAITS: TraitDef[] = [
  { key: null, nameUk: 'Без риси', nameEn: 'No trait', descriptionUk: 'Не додає додаткових ефектів', descriptionEn: 'Adds no additional effects', icon: '' },
  { key: 'fractal', nameUk: 'Фрактальна', nameEn: 'Fractal', descriptionUk: '+60% емблемі, якщо ступінь усіх 3 емблем різний', descriptionEn: '+60% to the stat bonus if all emblem qualities on the War Banner are different.', icon: '' },
  { key: 'benevolent', nameUk: 'Благодійна', nameEn: 'Benevolent', descriptionUk: '+20% до значень сусідніх емблем', descriptionEn: 'Provides a 20% bonus to the stat value of adjacent emblems.', icon: '' },
  { key: 'vampiric', nameUk: 'Вампірська', nameEn: 'Vampiric', descriptionUk: '+50% цієї емблемі, -10% сусіднім емблемам', descriptionEn: 'Increases the stat value of this emblem by 50%, but lowers the stat value of adjacent emblems by 10%', icon: '' },
  { key: 'unique', nameUk: 'Унікальна', nameEn: 'Unique', descriptionUk: '+30% емблемі, якщо на стягу немає інших з цією рисою', descriptionEn: '+30% to the stat bonus if this is the only Unique emblem on the War Banner.', icon: '' },
  { key: 'friendly', nameUk: 'Дружня', nameEn: 'Friendly', descriptionUk: '+50% емблемі, якщо на стягу є щонайменше 3 дружні емблеми', descriptionEn: '+50% to the stat bonus if there are at least 3 Friendly emblems on the War Banner.', icon: '' },
];

export const COACH_ATTRIBUTES: CoachAttributeDef[] = [
  { key: 'none', nameUk: 'Без атрибута', nameEn: 'No Attribute', boostTextUk: '+0%', boostTextEn: '+0%' },
  { key: 'crimson', nameUk: 'Кармазиновий', nameEn: 'Crimson', boostTextUk: '+6% (червоний герой)', boostTextEn: '+6% when playing a red hero.' },
  { key: 'cerulean', nameUk: 'Лазурний', nameEn: 'Cerulean', boostTextUk: '+11% (синій герой)', boostTextEn: '+11% when playing a blue hero.' },
  { key: 'emerald', nameUk: 'Смарагдовий', nameEn: 'Emerald', boostTextUk: '+6% (зелений герой)', boostTextEn: '+6% when playing a green hero.' },
  { key: 'royal', nameUk: 'Королівський', nameEn: 'Royal', boostTextUk: '+10% (пурпуровий герой)', boostTextEn: '+10% when playing a purple hero.' },
  { key: 'golden', nameUk: 'Золотий', nameEn: 'Golden', boostTextUk: '+8% (жовтий/коричневий)', boostTextEn: '+8% when playing a yellow or brown hero.' },
  { key: 'elemental', nameUk: 'Елементальний', nameEn: 'Elemental', boostTextUk: '+8% (стихійний герой)', boostTextEn: '+8% when playing an Aquatic, Fiery, or Icy Hero.' },
  { key: 'otherworldly', nameUk: 'Потойбічний', nameEn: 'Otherworldly', boostTextUk: '+7% (дух/демон/немертвий)', boostTextEn: '+7% when playing an Undead, Demon, or Spirit Hero.' },
  { key: 'heroic', nameUk: 'Героїчний', nameEn: 'Heroic', boostTextUk: '+9% (плащ або маска)', boostTextEn: '+9% when playing a Caped or Masked Hero.' },
];

export const COACH_RANKS: CoachRankDef[] = [
  { key: 'none', nameUk: 'Без звання', nameEn: 'No Rank', boostTextUk: '+0%', boostTextEn: '+0%' },
  { key: 'tormented', nameUk: 'Страдник', nameEn: 'the Tormented', boostTextUk: '+0% (немає даних телеметрії)', boostTextEn: '+0% (no telemetry data available)' },
  { key: 'flayed_twins_acolyte', nameUk: 'Послушник', nameEn: 'the Flayed Twins Acolyte', boostTextUk: '+0% (немає даних телеметрії)', boostTextEn: '+0% (no telemetry data available)' },
  { key: 'patient', nameUk: 'Терпеливець', nameEn: 'the Patient', boostTextUk: '+0% (немає даних телеметрії)', boostTextEn: '+0% (no telemetry data available)' },
  { key: 'underdog', nameUk: 'Нещасливець', nameEn: 'the Underdog', boostTextUk: '+6% (при поразці)', boostTextEn: '+6% in games where the player loses.' },
  { key: 'decisive', nameUk: 'Спритник', nameEn: 'the Decisive', boostTextUk: '+0% (немає даних тривалості)', boostTextEn: '+0% (no duration data available)' },
  { key: 'clutch', nameUk: 'Вирішайло', nameEn: 'the Clutch', boostTextUk: '+16% (вирішальний матч)', boostTextEn: '+16% when playing the last possible match of a series.' },
  { key: 'lucky', nameUk: 'Щасливчик', nameEn: 'the Lucky', boostTextUk: '+0% (немає даних тривалості)', boostTextEn: '+0% (no duration data available)' },
  { key: 'cruel', nameUk: 'Кат', nameEn: 'the Cruel', boostTextUk: '+0% (немає даних телеметрії)', boostTextEn: '+0% (no telemetry data available)' },
];

export const TEAMS_LIST = [
  { name: 'Team Spirit', tag: 'TSpirit', elo: 1632.2 },
  { name: 'Aurora Gaming', tag: 'Aurora', elo: 1602.5 },
  { name: 'Team Liquid', tag: 'Liquid', elo: 1535.8 },
  { name: 'Team Falcons', tag: 'FLCN', elo: 1623.1 },
  { name: 'BoomBoys', tag: 'BB', elo: 1692.6 },
  { name: 'Iron Wing', tag: 'IW', elo: 1444.4 },
  { name: 'Team Yandex', tag: 'TY', elo: 1771.6 },
  { name: 'Xtreme Gaming', tag: 'XG', elo: 1428.7 },
  { name: 'Nigma Galaxy', tag: 'NGX', elo: 1603.6 },
  { name: 'HULIGANI', tag: 'HU', elo: 1559.0 },
  { name: 'Team Resilience', tag: 'Resilience', elo: 1591.2 },
  { name: 'Vici Gaming', tag: 'VG', elo: 1569.4 },
  { name: 'OG', tag: 'OG', elo: 1521.4 },
  { name: 'GamerLegion', tag: 'GL', elo: 1476.6 },
  { name: 'LGD Gaming', tag: 'LGD', elo: 1628.0 },
];
