import type { StoredSession, ChoiceRecord, Scenario, ScenarioCategory, GameState, VirtueKey } from '../types';

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
// PERSISTÊNCIA DOS CENÁRIOS JOGADOS
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
 * Converte o índice de jogados para uma lista de registros ChoiceRecord,
 * servindo como histórico para a função pura de sorteio drawSessionScenarios.
 */
export function getPlayedHistory(): ChoiceRecord[] {
  const index = loadPlayedIndex();
  const history: ChoiceRecord[] = [];
  Object.entries(index).forEach(([_, ids]) => {
    ids.forEach(id => {
      history.push({
        scenarioId: id,
        choiceIndex: -1,
        timestamp: Date.now()
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
export function savePlayedScenarioId(
  scenarioId: string,
  category: ScenarioCategory,
  poolSize: number = 6
): void {
  const index = loadPlayedIndex();

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

// ==========================================
// PERSISTÊNCIA DO PROGRESSO EM ANDAMENTO
// ==========================================

const PROGRESS_KEY = 'askesis_saved_progress';

export function saveGameProgress(state: GameState): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Falha ao salvar progresso do jogo:', e);
  }
}

export function loadGameProgress(): GameState | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearGameProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // Silencia erros
  }
}

// ==========================================
// ACUMULAÇÃO E LEITURA DE ESTATÍSTICAS
// ==========================================

export interface PlayerStats {
  totalRuns: number;
  uniqueScenariosCount: number;
  virtueAverages: Record<VirtueKey, number>;
  mostCommonArchetype: string;
}

export interface AccumStats {
  totalRuns: number;
  virtueSums: Record<VirtueKey, number>;
  archetypeCounts: Record<string, number>;
}

const STATS_KEY = 'askesis_accum_stats';
const UNIQUE_GLOBAL_KEY = 'askesis_unique_global_played';

export function updatePlayerStats(session: StoredSession, choicesHistory: ChoiceRecord[]): void {
  try {
    // 1. Atualizar estatísticas acumuladas de runs e virtudes
    const raw = localStorage.getItem(STATS_KEY);
    const stats: AccumStats = raw ? JSON.parse(raw) : {
      totalRuns: 0,
      virtueSums: { wisdom: 0, courage: 0, justice: 0, temperance: 0 },
      archetypeCounts: {}
    };
    
    stats.totalRuns += 1;
    
    // Adiciona as virtudes ao total
    (Object.keys(stats.virtueSums) as VirtueKey[]).forEach(key => {
      stats.virtueSums[key] += session.virtues[key] || 0;
    });
    
    // Extrai o nome do arquétipo básico (removendo " Iluminado" ou " em Formação")
    let baseProfile = session.profile;
    if (baseProfile.includes('O Sábio Contemplativo')) baseProfile = 'O Sábio Contemplativo';
    else if (baseProfile.includes('O Guardião Inabalável')) baseProfile = 'O Guardião Inabalável';
    else if (baseProfile.includes('O Árbitro Justo')) baseProfile = 'O Árbitro Justo';
    else if (baseProfile.includes('O Mestre do Equilíbrio')) baseProfile = 'O Mestre do Equilíbrio';
    
    stats.archetypeCounts[baseProfile] = (stats.archetypeCounts[baseProfile] || 0) + 1;
    
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    
    // 2. Atualizar IDs de cenários únicos enfrentados
    const rawUnique = localStorage.getItem(UNIQUE_GLOBAL_KEY);
    const uniqueIds: string[] = rawUnique ? JSON.parse(rawUnique) : [];
    choicesHistory.forEach(c => {
      if (!uniqueIds.includes(c.scenarioId)) {
        uniqueIds.push(c.scenarioId);
      }
    });
    localStorage.setItem(UNIQUE_GLOBAL_KEY, JSON.stringify(uniqueIds));
  } catch (e) {
    console.error('Falha ao atualizar estatísticas do jogador:', e);
  }
}

export function loadPlayerStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    const stats: AccumStats = raw ? JSON.parse(raw) : {
      totalRuns: 0,
      virtueSums: { wisdom: 0, courage: 0, justice: 0, temperance: 0 },
      archetypeCounts: {}
    };
    
    const rawUnique = localStorage.getItem(UNIQUE_GLOBAL_KEY);
    const uniqueIds: string[] = rawUnique ? JSON.parse(rawUnique) : [];
    
    const virtueAverages: Record<VirtueKey, number> = { wisdom: 0, courage: 0, justice: 0, temperance: 0 };
    if (stats.totalRuns > 0) {
      (Object.keys(virtueAverages) as VirtueKey[]).forEach(key => {
        virtueAverages[key] = Math.round(stats.virtueSums[key] / stats.totalRuns);
      });
    }
    
    let mostCommonArchetype = 'Nenhum';
    let maxCount = 0;
    Object.entries(stats.archetypeCounts).forEach(([arch, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonArchetype = arch;
      }
    });
    
    return {
      totalRuns: stats.totalRuns,
      uniqueScenariosCount: uniqueIds.length,
      virtueAverages,
      mostCommonArchetype
    };
  } catch {
    return {
      totalRuns: 0,
      uniqueScenariosCount: 0,
      virtueAverages: { wisdom: 0, courage: 0, justice: 0, temperance: 0 },
      mostCommonArchetype: 'Nenhum'
    };
  }
}

export function clearPlayerStats(): void {
  try {
    localStorage.removeItem(STATS_KEY);
    localStorage.removeItem(UNIQUE_GLOBAL_KEY);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PLAYED_KEY);
  } catch (e) {
    console.error('Falha ao resetar estatísticas do jogador:', e);
  }
}


// ==========================================
// PERSISTÊNCIA DOS DESAFIOS DIÁRIOS
// ==========================================

const DAILY_COMPLETED_KEY = 'askesis_daily_completed_dates';

export function saveDailyChallengeCompleted(dateStr: string): void {
  try {
    const raw = localStorage.getItem(DAILY_COMPLETED_KEY);
    const dates: string[] = raw ? JSON.parse(raw) : [];
    if (!dates.includes(dateStr)) {
      dates.push(dateStr);
      localStorage.setItem(DAILY_COMPLETED_KEY, JSON.stringify(dates));
    }
  } catch (e) {
    console.error('Falha ao salvar conclusão de desafio diário:', e);
  }
}

export function isDailyChallengeCompleted(dateStr: string): boolean {
  try {
    const raw = localStorage.getItem(DAILY_COMPLETED_KEY);
    const dates: string[] = raw ? JSON.parse(raw) : [];
    return dates.includes(dateStr);
  } catch {
    return false;
  }
}

// ==========================================
// PERSISTÊNCIA DO PROGRESSO EM ANDAMENTO DO DESAFIO DIÁRIO
// ==========================================

const DAILY_PROGRESS_KEY = 'askesis_daily_saved_progress';

export function saveDailyProgress(state: GameState): void {
  try {
    localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Falha ao salvar progresso do desafio diário:', e);
  }
}

export function loadDailyProgress(): GameState | null {
  try {
    const raw = localStorage.getItem(DAILY_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearDailyProgress(): void {
  try {
    localStorage.removeItem(DAILY_PROGRESS_KEY);
  } catch {
    // Silencia erros
  }
}

