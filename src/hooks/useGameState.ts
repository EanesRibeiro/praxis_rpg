import { useReducer, useEffect } from 'react';
import type { GameState } from '../types';
import { makeChoice as applyChoice, getProfile, drawSessionScenarios } from '../utils/gameLogic';
import { 
  saveSession, 
  getPlayedHistory, 
  updatePlayedIndexAfterDraw,
  saveGameProgress,
  clearGameProgress,
  saveDailyProgress,
  clearDailyProgress,
  updatePlayerStats,
  saveDailyChallengeCompleted
} from '../utils/storage';
import { SCENARIO_POOL } from '../data/scenarios';

const getInitialState = (): GameState => ({
  virtues: { wisdom: 60, courage: 60, justice: 60, temperance: 60 },
  ataraxia: 60,
  currentScenarioIndex: 0,
  choicesHistory: [],
  phase: 'intro',
  lastChoice: null,
  sessionScenarios: [],
});

type Action =
  | { type: 'START_GAME'; isDailyChallenge?: boolean; isQuickMode?: boolean; dailyDateSeed?: string }
  | { type: 'LOAD_PROGRESS'; savedState: GameState }
  | { type: 'MAKE_CHOICE'; choiceIndex: 0 | 1 }
  | { type: 'NEXT_SCENARIO' }
  | { type: 'RESET' };

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const history = getPlayedHistory();
      const chosen = drawSessionScenarios(
        SCENARIO_POOL, 
        history, 
        action.dailyDateSeed, 
        action.isQuickMode
      );
      
      // Atualiza o índice de jogados para evitar repetições, exceto no desafio diário (que é fixo por dia)
      if (!action.isDailyChallenge) {
        updatePlayedIndexAfterDraw(chosen, SCENARIO_POOL);
      }

      return {
        ...state,
        sessionScenarios: chosen,
        isDailyChallenge: action.isDailyChallenge,
        isQuickMode: action.isQuickMode,
        dailyDateSeed: action.dailyDateSeed,
        phase: 'game',
        currentScenarioIndex: 0,
        choicesHistory: [],
        virtues: { wisdom: 60, courage: 60, justice: 60, temperance: 60 },
        ataraxia: 60,
        lastChoice: null,
      };
    }
    case 'LOAD_PROGRESS': {
      return {
        ...action.savedState
      };
    }
    case 'MAKE_CHOICE':
      return applyChoice(state, action.choiceIndex, state.sessionScenarios);
    case 'NEXT_SCENARIO':
      const isLast = state.currentScenarioIndex === state.sessionScenarios.length - 1;
      if (isLast) {
        return {
          ...state,
          phase: 'result',
        };
      }
      return {
        ...state,
        currentScenarioIndex: state.currentScenarioIndex + 1,
        phase: 'game',
        lastChoice: null,
      };
    case 'RESET':
      return getInitialState();
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, getInitialState());

  // Efeito de persistência: Salva a sessão no localStorage ao alcançar a fase de resultados
  // E salva o progresso ativo em tempo real se o jogo estiver rodando
  useEffect(() => {
    if (state.phase === 'result') {
      const profile = getProfile(state.virtues, state.ataraxia);
      const sessionData = {
        date: new Date().toISOString(),
        profile: profile.name,
        ataraxia: state.ataraxia,
        virtues: state.virtues,
      };
      
      saveSession(sessionData);

      if (!state.isQuickMode) {
        updatePlayerStats(sessionData, state.choicesHistory);
      }

      if (state.isDailyChallenge) {
        saveDailyChallengeCompleted(new Date().toISOString().slice(0, 10));
        clearDailyProgress();
      } else {
        clearGameProgress();
      }
    } else if (state.phase === 'game' || state.phase === 'feedback') {
      if (state.isDailyChallenge) {
        saveDailyProgress(state);
      } else {
        saveGameProgress(state);
      }
    }
  }, [state.phase, state.virtues, state.ataraxia, state.isQuickMode, state.isDailyChallenge, state.choicesHistory]);

  const startGame = (isDailyChallenge?: boolean, isQuickMode?: boolean) => {
    let dailyDateSeed: string | undefined = undefined;
    if (isDailyChallenge) {
      dailyDateSeed = new Date().toISOString().slice(0, 10);
    }
    dispatch({ type: 'START_GAME', isDailyChallenge, isQuickMode, dailyDateSeed });
  };
  
  const loadProgress = (savedState: GameState) => {
    dispatch({ type: 'LOAD_PROGRESS', savedState });
  };

  const makeChoice = (choiceIndex: 0 | 1) => dispatch({ type: 'MAKE_CHOICE', choiceIndex });
  const nextScenario = () => dispatch({ type: 'NEXT_SCENARIO' });
  const resetGame = () => dispatch({ type: 'RESET' });

  return {
    state,
    startGame,
    loadProgress,
    makeChoice,
    nextScenario,
    resetGame,
  };
}
