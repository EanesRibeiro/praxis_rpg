import type { GameState, Scenario, Virtues, VirtueKey, ArchetypeKey, Profile, ScenarioCategory, ChoiceRecord } from '../types';
import { savePlayedScenarioId } from './storage';

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

const ORDERED_CATEGORIES: ScenarioCategory[] = [
  'Trabalho', 'Vida Pessoal', 'Crise', 'Saúde', 'Filosofia'
];

export function drawSessionScenarios(
  pool: Record<ScenarioCategory, Scenario[]>,
  history: ChoiceRecord[]
): Scenario[] {
  const playedIds = new Set(history.map(r => r.scenarioId));

  return ORDERED_CATEGORIES.map(category => {
    const available = pool[category].filter(s => !playedIds.has(s.id));
    // Se todos já foram jogados nessa categoria, reseta o pool dela
    const candidates = available.length > 0 ? available : pool[category];
    return candidates[Math.floor(Math.random() * candidates.length)];
  });
}

export function makeChoice(state: GameState, choiceIndex: 0 | 1, scenarios: Scenario[]): GameState {
  const scenario = scenarios[state.currentScenarioIndex];
  const choice = scenario.choices[choiceIndex];

  // Grava o ID no histórico de jogados imediatamente no momento da escolha
  savePlayedScenarioId(scenario.id);

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

  const dominant = (Object.entries(scores) as [ArchetypeKey, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

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
