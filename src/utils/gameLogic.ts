import type { GameState, Scenario, Virtues, VirtueKey, ArchetypeKey, Profile, ScenarioCategory, ChoiceRecord } from '../types';
import { savePlayedScenarioId } from './storage';
import { ORDERED_CATEGORIES } from '../constants/categories';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// PRNG simples baseado em seed string (como "2026-06-07")
function seedRandom(seedStr: string) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  return function() {
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };
}

export function drawSessionScenarios(
  pool: Record<ScenarioCategory, Scenario[]>,
  history: ChoiceRecord[],
  dailyDateSeed?: string,
  isQuickMode?: boolean
): Scenario[] {
  const playedIds = new Set(history.map(r => r.scenarioId));
  const categoriesToUse = isQuickMode 
    ? ORDERED_CATEGORIES.slice(0, 3) 
    : ORDERED_CATEGORIES;

  const randFunc = dailyDateSeed ? seedRandom(dailyDateSeed) : Math.random;

  return categoriesToUse.map(category => {
    // Para o Desafio Diário, não filtramos os já jogados para garantir que todos joguem exatamente a mesma sequência do dia civil!
    const available = dailyDateSeed 
      ? pool[category] 
      : pool[category].filter(s => !playedIds.has(s.id));
      
    const candidates = available.length > 0 ? available : pool[category];
    const idx = Math.floor(randFunc() * candidates.length);
    return candidates[idx];
  });
}

export function makeChoice(state: GameState, choiceIndex: 0 | 1, scenarios: Scenario[]): GameState {
  const scenario = scenarios[state.currentScenarioIndex];
  const choice = scenario.choices[choiceIndex];

  // Grava o ID no histórico de jogados imediatamente no momento da escolha, passando a categoria
  savePlayedScenarioId(scenario.id, scenario.category);

  const newVirtues = { ...state.virtues };
  (Object.entries(choice.impact) as [VirtueKey, number][]).forEach(([key, delta]) => {
    newVirtues[key] = clamp(newVirtues[key] + delta, 0, 100);
  });

  return {
    ...state,
    virtues: newVirtues,
    ataraxia: clamp(state.ataraxia + choice.ataraxiaImpact, 0, 100),
    choicesHistory: [
      ...state.choicesHistory,
      { scenarioId: scenario.id, choiceIndex, timestamp: Date.now() }
    ],
    phase: 'feedback',
    lastChoice: choice,
  };
}

export function getProfile(virtues: Virtues, ataraxia: number): Profile {
  // Ponderação para evitar empates e perfis genéricos
  const scores: Record<ArchetypeKey, number> = {
    contemplativo: virtues.wisdom * 1.5 + virtues.temperance * 0.5,
    guardião:      virtues.courage * 1.5 + virtues.justice * 0.5,
    árbitro:       virtues.justice * 1.5 + virtues.wisdom * 0.5,
    equilibrado:   virtues.temperance * 1.5 + virtues.courage * 0.5,
  };

  // Tratamento de empate total (ex: no início, onde todas as virtudes são iguais)
  const allEqual = virtues.wisdom === virtues.courage && 
                   virtues.courage === virtues.justice && 
                   virtues.justice === virtues.temperance;

  let dominant: ArchetypeKey;
  if (allEqual) {
    dominant = 'equilibrado';
  } else {
    dominant = (Object.entries(scores) as [ArchetypeKey, number][])
      .sort((a, b) => b[1] - a[1])[0][0];
  }

  const suffix = ataraxia >= 80 ? ' Iluminado' : ataraxia < 45 ? ' em Formação' : '';

  const profiles: Record<ArchetypeKey, Omit<Profile, 'name'>> = {
    contemplativo: { archetype: 'contemplativo', icon: '◎', description: 'Você governa pela razão antes de agir.' },
    guardião:      { archetype: 'guardião',      icon: '◈', description: 'Você avança onde outros recuam.' },
    árbitro:       { archetype: 'árbitro',       icon: '⊕', description: 'Você age pelo bem além do seu ego.' },
    equilibrado:   { archetype: 'equilibrado',   icon: '◉', description: 'Você encontra ordem no caos.' },
  };

  const nameMap: Record<ArchetypeKey, string> = {
    contemplativo: 'O Sábio Contemplativo',
    guardião:      'O Guardião Inabalável',
    árbitro:       'O Árbitro Justo',
    equilibrado:   'O Mestre do Equilíbrio',
  };

  return {
    ...profiles[dominant],
    name: nameMap[dominant] + suffix,
  };
}
