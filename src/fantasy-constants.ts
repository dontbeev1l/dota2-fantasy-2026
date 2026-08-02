import type { Characteristic, Degree, Trait, AttributeTitle, RankTitle } from './get-score';

export interface CharacteristicDef {
  key: Characteristic;
  nameUk: string;
  color: 'red' | 'blue' | 'green';
  scoringText: string;
  icon: string;
}

export interface DegreeDef {
  value: Degree;
  label: string;
  boostText: string;
  boostVal: number;
}

export interface TraitDef {
  key: Trait;
  nameUk: string;
  description: string;
  icon: string;
}

export interface CoachAttributeDef {
  key: AttributeTitle | 'none';
  nameUk: string;
  boostText: string;
}

export interface CoachRankDef {
  key: RankTitle | 'none';
  nameUk: string;
  boostText: string;
}

export const CHARACTERISTICS_BY_COLOR: Record<'red' | 'blue' | 'green', CharacteristicDef[]> = {
  red: [
    { key: 'kills', nameUk: 'Убивства', color: 'red', scoringText: '+107.00 / вбивство', icon: '' },
    { key: 'deaths', nameUk: 'Смерті', color: 'red', scoringText: '1950.00 base, -195.00 / смерть', icon: '' },
    { key: 'creep_score', nameUk: 'Рахунок кріпів (CS)', color: 'red', scoringText: '+3.00 / кріп', icon: '' },
    { key: 'gpm', nameUk: 'ЗЗХ (GPM)', color: 'red', scoringText: 'GPM × 2.00', icon: '' },
    { key: 'madstone_collected', nameUk: 'Зібраний лютит', color: 'red', scoringText: '+13.00 / лютит', icon: '' },
    { key: 'tower_kills', nameUk: 'Знищення веж', color: 'red', scoringText: '+352.00 / вежа', icon: '' },
  ],
  blue: [
    { key: 'observer_wards_placed', nameUk: 'Поставлені варди', color: 'blue', scoringText: '+117.00 / вард', icon: '' },
    { key: 'camps_stacked', nameUk: 'Заскиртовані табори', color: 'blue', scoringText: '+234.00 / табір', icon: '' },
    { key: 'runes_grabbed', nameUk: 'Підняті руни', color: 'blue', scoringText: '+141.00 / руна', icon: '' },
    { key: 'watchers_taken', nameUk: 'Захоплені споглядачі', color: 'blue', scoringText: '+147.00 / споглядач', icon: '' },
    { key: 'smokes_used', nameUk: 'Використані дими', color: 'blue', scoringText: '+293.00 / смоук', icon: '' },
    { key: 'lotuses_collected', nameUk: 'Підняті лотоси', color: 'blue', scoringText: '+176.00 / лотос', icon: '' },
  ],
  green: [
    { key: 'roshan_kills', nameUk: 'Убивства Рошана', color: 'green', scoringText: '+1172.00 / Рошан', icon: '' },
    { key: 'teamfight_participation', nameUk: 'Участь у боях', color: 'green', scoringText: 'до 2124.00 (від %)', icon: '' },
    { key: 'stun_seconds', nameUk: 'Приголомшення', color: 'green', scoringText: '+10.00 / сек контролю', icon: '' },
    { key: 'tormentor_kills', nameUk: 'Вбивства мучителів', color: 'green', scoringText: '+879.00 / мучитель', icon: '' },
    { key: 'first_blood', nameUk: 'Перша кров (FB)', color: 'green', scoringText: '+1934.00 за FB', icon: '' },
    { key: 'courier_kills', nameUk: 'Убивства кур’єрів', color: 'green', scoringText: '+703.00 / кур’єр', icon: '' },
  ],
};

export const DEGREES: DegreeDef[] = [
  { value: 'I', label: 'Ступінь I', boostText: '+10%', boostVal: 0.10 },
  { value: 'II', label: 'Ступінь II', boostText: '+30%', boostVal: 0.30 },
  { value: 'III', label: 'Ступінь III', boostText: '+60%', boostVal: 0.60 },
  { value: 'IV', label: 'Ступінь IV', boostText: '+100%', boostVal: 1.00 },
  { value: 'V', label: 'Ступінь V', boostText: '+150%', boostVal: 1.50 },
];

export const TRAITS: TraitDef[] = [
  { key: null, nameUk: 'Без риси', description: 'Не додає додаткових ефектів', icon: '' },
  { key: 'fractal', nameUk: 'Фрактальна', description: '+60% емблемі, якщо ступінь усіх 3 емблем різний', icon: '' },
  { key: 'charitable', nameUk: 'Благодійна', description: '+20% до значень сусідніх емблем', icon: '' },
  { key: 'vampiric', nameUk: 'Вампірська', description: '+50% цієї емблемі, -10% сусіднім емблемам', icon: '' },
  { key: 'unique', nameUk: 'Унікальна', description: '+30% емблемі, якщо на стягу немає інших з цією рисою', icon: '' },
  { key: 'friendly', nameUk: 'Дружня', description: '+50% емблемі, якщо на стягу є щонайменше 3 дружні емблеми', icon: '' },
];

export const COACH_ATTRIBUTES: CoachAttributeDef[] = [
  { key: 'none', nameUk: 'Без атрибута', boostText: '+0%' },
  { key: 'crimson', nameUk: 'Кармазиновий', boostText: '+6% (червоний герой)' },
  { key: 'azure', nameUk: 'Лазурний', boostText: '+11% (синій герой)' },
  { key: 'emerald', nameUk: 'Смарагдовий', boostText: '+6% (зелений герой)' },
  { key: 'royal', nameUk: 'Королівський', boostText: '+10% (пурпуровий герой)' },
  { key: 'gold', nameUk: 'Золотий', boostText: '+8% (жовтий/коричневий)' },
  { key: 'elemental', nameUk: 'Елементальний', boostText: '+8% (стихійний герой)' },
  { key: 'ethereal', nameUk: 'Потойбічний', boostText: '+7% (дух/демон/немертвий)' },
  { key: 'heroic', nameUk: 'Героїчний', boostText: '+9% (плащ або маска)' },
];

export const COACH_RANKS: CoachRankDef[] = [
  { key: 'none', nameUk: 'Без звання', boostText: '+0%' },
  { key: 'sufferer', nameUk: 'Страдник', boostText: '+23% (смерть від мучителя)' },
  { key: 'blessed', nameUk: 'Послушник', boostText: '+9% (FB до сурми)' },
  { key: 'patient', nameUk: 'Терпеливець', boostText: '+23% (без FB до 10 хв)' },
  { key: 'unlucky', nameUk: 'Нещасливець', boostText: '+6% (при поразці)' },
  { key: 'agile', nameUk: 'Спритник', boostText: '+24% (матч < 25 хв)' },
  { key: 'decider', nameUk: 'Вирішайло', boostText: '+16% (вирішальний матч)' },
  { key: 'lucky', nameUk: 'Щасливчик', boostText: '+21% (тривалість закінч. на 8)' },
  { key: 'executioner', nameUk: 'Кат', boostText: '+13% (вбито на фонтані)' },
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
