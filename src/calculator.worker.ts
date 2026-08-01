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
  rankNameUk: string;
  attrBoost: string;
  rankBoost: string;
  totalScore: number;
}

export interface TokenDefinition {
  id: string;
  nameUk: string;
  descriptionUk: string;
}

export const REPLACEMENT_TOKENS: TokenDefinition[] = [
  {
    id: 'reroll_random_red_degree',
    nameUk: 'Замінити якість випадкової червоної емблеми',
    descriptionUk: 'Випадкова червона емблема змінює ступінь на новий (I-V)',
  },
  {
    id: 'reroll_random_blue_degree',
    nameUk: 'Замінити якість випадкової синьої емблеми',
    descriptionUk: 'Випадкова синя емблема змінює ступінь на новий (I-V)',
  },
  {
    id: 'reroll_random_green_degree',
    nameUk: 'Замінити якість випадкової зеленої емблеми',
    descriptionUk: 'Випадкова зелена емблема змінює ступінь на новий (I-V)',
  },
  {
    id: 'upgrade_2_downgrade_1_degree',
    nameUk: 'Покращити дві якості і погіршити одну',
    descriptionUk: 'Дві емблеми отримують +1 ступінь, а одна -1 ступінь',
  },
  {
    id: 'upgrade_1_random_degree',
    nameUk: 'Покращити одну випадкову якість',
    descriptionUk: 'Випадкова емблема підвищує свій ступінь на +1 рівень',
  },
  {
    id: 'upgrade_lowest_degree',
    nameUk: 'Покращити емблему з найнижчим ступенем',
    descriptionUk: 'Емблема з найменшим ступенем на стягу підвищується на +1 рівень',
  },
  {
    id: 'reroll_all_red_degrees',
    nameUk: 'Замінити якість червоних емблем',
    descriptionUk: 'Усі червоні емблеми отримують новий ступінь (I-V)',
  },
  {
    id: 'reroll_all_green_degrees',
    nameUk: 'Замінити якість зелених емблем',
    descriptionUk: 'Усі зелені емблеми отримують новий ступінь (I-V)',
  },
  {
    id: 'reroll_all_blue_degrees',
    nameUk: 'Замінити якість синіх емблем',
    descriptionUk: 'Усі сині емблеми отримують новий ступінь (I-V)',
  },
  {
    id: 'reroll_first_red_char',
    nameUk: 'Змінити характеристику першої червоної емблеми',
    descriptionUk: 'Перша червона емблема змінює характеристику на іншу червону',
  },
  {
    id: 'reroll_first_blue_char',
    nameUk: 'Змінити характеристику першої синьої емблеми',
    descriptionUk: 'Перша синя емблема змінює характеристику на іншу синю',
  },
  {
    id: 'reroll_first_green_char',
    nameUk: 'Змінити характеристику першої зеленої емблеми',
    descriptionUk: 'Перша зелена емблема змінює характеристику на іншу зелену',
  },
  {
    id: 'reroll_random_emblem_char',
    nameUk: 'Замінити характеристику випадкової емблеми',
    descriptionUk: 'Випадкова емблема отримує нову характеристику свого кольору',
  },
  {
    id: 'reroll_all_chars',
    nameUk: 'Замінити всі характеристики на стягу',
    descriptionUk: 'Усі 3 емблеми отримують нові характеристики свого кольору',
  },
  {
    id: 'reroll_random_emblem_trait',
    nameUk: 'Замінити рису випадкової емблеми',
    descriptionUk: 'Випадкова емблема отримує нову рису',
  },
  {
    id: 'reroll_all_traits',
    nameUk: 'Замінити риси всіх емблем',
    descriptionUk: 'Усі 3 емблеми отримують нові риси',
  },
  {
    id: 'reroll_all_degrees',
    nameUk: 'Замінити якість усіх емблем',
    descriptionUk: 'Усі 3 емблеми на слоту отримують нові ступені',
  },
  {
    id: 'reroll_trait_and_degree',
    nameUk: 'Замінити рису та якість випадкової емблеми',
    descriptionUk: 'Випадкова емблема змінює і якість, і рису на нові',
  },
  {
    id: 'full_reroll_random_emblem',
    nameUk: 'Повна заміна випадкової емблеми',
    descriptionUk: 'Випадкова емблема повністю змінює характеристику, якість і рису',
  },
];

export interface TokenSimulationResult {
  tokenId: string;
  tokenNameUk: string;
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
  tokenDescriptionUk: string;
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

function shiftDegree(deg: Degree, delta: number): Degree {
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
        rankNameUk: rank.nameUk,
        attrBoost: attr.boostText,
        rankBoost: rank.boostText,
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
    const currentSlotScore = targetTopTeams[0] ? targetTopTeams[0].score : 0;
    const tokenDef = REPLACEMENT_TOKENS.find((t) => t.id === tokenId);

    const getSlotScoreWithEmblems = (emblems: [EmblemState, EmblemState, EmblemState]): number => {
      let maxScore = 0;
      for (const team of TEAMS_LIST) {
        const config: FantasySlotConfig = {
          position: targetSlot.position,
          teamName: team.name,
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
          if (res.totalPoints > maxScore) {
            maxScore = res.totalPoints;
          }
        } catch (err) {}
      }
      return maxScore;
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
      } else if (colorIndices.length >= 2) {
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

    if (tokenId === 'reroll_random_red_degree') {
      simulateRandomColorDegree('red');
    } else if (tokenId === 'reroll_random_blue_degree') {
      simulateRandomColorDegree('blue');
    } else if (tokenId === 'reroll_random_green_degree') {
      simulateRandomColorDegree('green');
    } else if (tokenId === 'upgrade_2_downgrade_1_degree') {
      for (let downIdx = 0; downIdx < 3; downIdx++) {
        const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
        for (let i = 0; i < 3; i++) {
          if (i === downIdx) {
            cloned[i].degree = shiftDegree(cloned[i].degree, -1);
          } else {
            cloned[i].degree = shiftDegree(cloned[i].degree, 1);
          }
        }
        const newScore = getSlotScoreWithEmblems(cloned);
        outcomes.push({
          delta: newScore - currentSlotScore,
          weight: 1 / 3,
        });
      }
    } else if (tokenId === 'upgrade_1_random_degree') {
      for (let eIdx = 0; eIdx < 3; eIdx++) {
        const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
        cloned[eIdx].degree = shiftDegree(cloned[eIdx].degree, 1);
        const newScore = getSlotScoreWithEmblems(cloned);
        outcomes.push({
          delta: newScore - currentSlotScore,
          weight: 1 / 3,
        });
      }
    } else if (tokenId === 'upgrade_lowest_degree') {
      const degreesVal = targetSlot.emblems.map((e) => DEGREE_ORDER.indexOf(e.degree));
      const minDegVal = Math.min(...degreesVal);
      const lowestIndices = degreesVal.map((v, idx) => (v === minDegVal ? idx : -1)).filter((i) => i !== -1);

      for (const idx of lowestIndices) {
        const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
        cloned[idx].degree = shiftDegree(cloned[idx].degree, 1);
        const newScore = getSlotScoreWithEmblems(cloned);
        outcomes.push({
          delta: newScore - currentSlotScore,
          weight: 1 / lowestIndices.length,
        });
      }
    } else if (tokenId === 'reroll_all_red_degrees') {
      simulateColorDegreeReroll('red');
    } else if (tokenId === 'reroll_all_green_degrees') {
      simulateColorDegreeReroll('green');
    } else if (tokenId === 'reroll_all_blue_degrees') {
      simulateColorDegreeReroll('blue');
    } else if (tokenId === 'reroll_first_red_char') {
      simulateFirstColorChar('red');
    } else if (tokenId === 'reroll_first_blue_char') {
      simulateFirstColorChar('blue');
    } else if (tokenId === 'reroll_first_green_char') {
      simulateFirstColorChar('green');
    } else if (tokenId === 'reroll_random_emblem_char') {
      for (let eIdx = 0; eIdx < 3; eIdx++) {
        const emb = targetSlot.emblems[eIdx];
        const chars = CHARACTERISTICS_BY_COLOR[emb.color];
        const numOptions = chars.length - 1;
        for (const c of chars) {
          if (c.key === emb.characteristic) continue;
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[eIdx].characteristic = c.key;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: (1 / 3) * (1 / Math.max(1, numOptions)),
          });
        }
      }
    } else if (tokenId === 'reroll_all_chars') {
      const chars0 = CHARACTERISTICS_BY_COLOR[targetSlot.emblems[0].color];
      const chars1 = CHARACTERISTICS_BY_COLOR[targetSlot.emblems[1].color];
      const chars2 = CHARACTERISTICS_BY_COLOR[targetSlot.emblems[2].color];

      const count = chars0.length * chars1.length * chars2.length;
      for (const c0 of chars0) {
        for (const c1 of chars1) {
          for (const c2 of chars2) {
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[0].characteristic = c0.key;
            cloned[1].characteristic = c1.key;
            cloned[2].characteristic = c2.key;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: 1 / count,
            });
          }
        }
      }
    } else if (tokenId === 'reroll_random_emblem_trait') {
      const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
      for (let eIdx = 0; eIdx < 3; eIdx++) {
        const emb = targetSlot.emblems[eIdx];
        const numOptions = allTraits.length - 1;
        for (const tr of allTraits) {
          if (tr === emb.trait) continue;
          const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
          cloned[eIdx].trait = tr;
          const newScore = getSlotScoreWithEmblems(cloned);
          outcomes.push({
            delta: newScore - currentSlotScore,
            weight: (1 / 3) * (1 / Math.max(1, numOptions)),
          });
        }
      }
    } else if (tokenId === 'reroll_all_traits') {
      const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
      const count = allTraits.length * allTraits.length * allTraits.length;
      for (const t0 of allTraits) {
        for (const t1 of allTraits) {
          for (const t2 of allTraits) {
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[0].trait = t0;
            cloned[1].trait = t1;
            cloned[2].trait = t2;
            const newScore = getSlotScoreWithEmblems(cloned);
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: 1 / count,
            });
          }
        }
      }
    } else if (tokenId === 'reroll_all_degrees') {
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
    } else if (tokenId === 'reroll_trait_and_degree') {
      const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
      for (let eIdx = 0; eIdx < 3; eIdx++) {
        const emb = targetSlot.emblems[eIdx];
        const currentDeg = emb.degree;
        const currentTrait = emb.trait;

        const remDegWeight = DEGREE_ORDER.reduce(
          (sum, d) => (d !== currentDeg ? sum + DEGREE_WEIGHTS[d] : sum),
          0
        );

        for (const deg of DEGREE_ORDER) {
          if (deg === currentDeg) continue;
          for (const tr of allTraits) {
            if (tr === currentTrait) continue;
            const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
            cloned[eIdx].degree = deg;
            cloned[eIdx].trait = tr;
            const newScore = getSlotScoreWithEmblems(cloned);
            const w = (1 / 3) * (DEGREE_WEIGHTS[deg] / remDegWeight) * (1 / (allTraits.length - 1));
            outcomes.push({
              delta: newScore - currentSlotScore,
              weight: w,
            });
          }
        }
      }
    } else if (tokenId === 'full_reroll_random_emblem') {
      const allTraits: Trait[] = ['fractal', 'charitable', 'vampiric', 'unique', 'friendly', null];
      for (let eIdx = 0; eIdx < 3; eIdx++) {
        const emb = targetSlot.emblems[eIdx];
        const colorChars = CHARACTERISTICS_BY_COLOR[emb.color];

        for (const c of colorChars) {
          for (const deg of DEGREE_ORDER) {
            for (const tr of allTraits) {
              const cloned: [EmblemState, EmblemState, EmblemState] = JSON.parse(JSON.stringify(targetSlot.emblems));
              cloned[eIdx].characteristic = c.key;
              cloned[eIdx].degree = deg;
              cloned[eIdx].trait = tr;
              const newScore = getSlotScoreWithEmblems(cloned);
              const w = (1 / 3) * (1 / colorChars.length) * DEGREE_WEIGHTS[deg] * (1 / allTraits.length);
              outcomes.push({
                delta: newScore - currentSlotScore,
                weight: w,
              });
            }
          }
        }
      }
    }

    const totalWeight = outcomes.reduce((sum, o) => sum + o.weight, 0);

    let winOutcomes = 0;
    let lossOutcomes = 0;
    let neutralOutcomes = 0;
    let winRate = 0;
    let expectedValue = 0;
    let maxGain = 0;
    let maxLoss = 0;

    for (const o of outcomes) {
      const normW = totalWeight > 0 ? o.weight / totalWeight : 0;
      expectedValue += o.delta * normW;

      if (o.delta > 0.1) {
        winOutcomes++;
        winRate += normW * 100;
        if (o.delta > maxGain) maxGain = o.delta;
      } else if (o.delta < -0.1) {
        lossOutcomes++;
        if (o.delta < maxLoss) maxLoss = o.delta;
      } else {
        neutralOutcomes++;
      }
    }

    const isRecommended = expectedValue > 0 && winRate >= 50;

    return {
      tokenId,
      tokenNameUk: tokenDef ? tokenDef.nameUk : tokenId,
      totalOutcomes: outcomes.length,
      winOutcomes,
      lossOutcomes,
      neutralOutcomes,
      winRate,
      expectedValue,
      maxGain,
      maxLoss,
      isRecommended,
    };
  };

  // 4. Simulate enabled tokens across all 3 slots simultaneously
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
      tokenDescriptionUk: tokenDef.descriptionUk,
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
