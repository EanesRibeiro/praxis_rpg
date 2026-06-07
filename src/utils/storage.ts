import type { StoredSession, ChoiceRecord, Scenario, ScenarioCategory } from '../types';
import { SCENARIO_POOL } from '../data/scenarios';

const STORAGE_KEY = 'askesis_history';
const MAX_SESSIONS = 10;

export function saveSession(session: StoredSession): void {
  try {
    const existing = loadHistory();
    const updated = [session, ...existing].slice(0, MAX_SESSIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Falha ao salvar sessão no localStorage:', e);
  }
}

export function loadHistory(): StoredSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silencia erros se o localStorage estiver indisponível
  }
}

// ==========================================
// PERSISTÊNCIA DOS CENÁRIOS JOGADOS (Fase 7)
// ==========================================

export interface PlayedIndex {
  [category: string]: string[]; // IDs dos cenários já sorteados
}

export const PLAYED_KEY = 'askesis_played_index';

export function loadPlayedIndex(): PlayedIndex {
  try {
    const raw = localStorage.getItem(PLAYED_KEY);
    return raw ? JSON.parse(raw) : {
      'Trabalho': [],
      'Vida Pessoal': [],
      'Crise': [],
      'Saúde': [],
      'Filosofia': []
    };
  } catch {
    return {
      'Trabalho': [],
      'Vida Pessoal': [],
      'Crise': [],
      'Saúde': [],
      'Filosofia': []
    };
  }
}

export function savePlayedIndex(index: PlayedIndex): void {
  try {
    localStorage.setItem(PLAYED_KEY, JSON.stringify(index));
  } catch (e) {
    console.error('Falha ao salvar PlayedIndex no localStorage:', e);
  }
}

/**
 * Converte o índice de jogados para uma lista de registros fictícios ChoiceRecord,
 * servindo como histórico para a função pura de sorteio drawSessionScenarios.
 */
export function getPlayedHistory(): ChoiceRecord[] {
  const index = loadPlayedIndex();
  const history: ChoiceRecord[] = [];
  Object.entries(index).forEach(([_, ids]) => {
    ids.forEach(id => {
      history.push({
        scenarioId: id,
        choiceIndex: 0,
        timestamp: 0
      });
    });
  });
  return history;
}

/**
 * Atualiza o índice de cenários jogados no localStorage com os novos sorteados.
 * Se uma categoria atingir a saturação (todos jogados), limpa seu histórico específico.
 */
export function updatePlayedIndexAfterDraw(
  scenarios: Scenario[],
  pool: Record<ScenarioCategory, Scenario[]>
): void {
  const index = loadPlayedIndex();

  scenarios.forEach(s => {
    const cat = s.category;
    const poolSize = pool[cat]?.length || 6;

    // Se todos os cenários daquela categoria já foram jogados, reseta o histórico dela
    if (index[cat] && index[cat].length >= poolSize) {
      index[cat] = [];
    }

    if (!index[cat]) {
      index[cat] = [];
    }

    if (!index[cat].includes(s.id)) {
      index[cat].push(s.id);
    }
  });

  savePlayedIndex(index);
}

/**
 * Grava o ID do cenário no histórico de jogados imediatamente no momento da escolha.
 * Se a categoria atingir a saturação (todos jogados), limpa seu histórico específico.
 */
export function savePlayedScenarioId(scenarioId: string): void {
  const index = loadPlayedIndex();
  
  // Encontra a categoria correspondente a este cenário no SCENARIO_POOL
  let category: ScenarioCategory | null = null;
  for (const [cat, list] of Object.entries(SCENARIO_POOL)) {
    if (list.some(s => s.id === scenarioId)) {
      category = cat as ScenarioCategory;
      break;
    }
  }

  if (!category) return;

  const poolSize = SCENARIO_POOL[category]?.length || 6;

  // Se todos os cenários daquela categoria já foram jogados, reseta o histórico dela
  if (index[category] && index[category].length >= poolSize) {
    index[category] = [];
  }

  if (!index[category]) {
    index[category] = [];
  }

  if (!index[category].includes(scenarioId)) {
    index[category].push(scenarioId);
  }

  savePlayedIndex(index);
}
