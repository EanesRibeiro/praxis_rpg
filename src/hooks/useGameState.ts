import { useReducer, useEffect } from 'react';
import type { GameState } from '../types';
import { makeChoice as applyChoice, getProfile, drawSessionScenarios } from '../utils/gameLogic';
import { saveSession, getPlayedHistory } from '../utils/storage';
import { SCENARIO_POOL } from '../data/scenarios';

const getInitialState = (): GameState => ({
  virtues: { wisdom: 60, courage: 60, justice: 60, temperance: 60 },
  ataraxia: 60,
  currentScenarioIndex: 0,
  choicesHistory: [],
  phase: 'intro',
  lastChoice: null,
  sessionScenarios: [], // Será gerado na montagem/inicialização
});

type Action =
  | { type: 'START_GAME' }
  | { type: 'MAKE_CHOICE'; choiceIndex: 0 | 1 }
  | { type: 'NEXT_SCENARIO' }
  | { type: 'RESET' };

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const history = getPlayedHistory();
      const chosen = drawSessionScenarios(SCENARIO_POOL, history);
      return {
        ...state,
        sessionScenarios: chosen,
        phase: 'game',
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
  useEffect(() => {
    if (state.phase === 'result') {
      const profile = getProfile(state.virtues, state.ataraxia);
      saveSession({
        date: new Date().toISOString(),
        profile: profile.name,
        ataraxia: state.ataraxia,
        virtues: state.virtues,
      });
    }
  }, [state.phase, state.virtues, state.ataraxia]);

  const startGame = () => dispatch({ type: 'START_GAME' });
  const makeChoice = (choiceIndex: 0 | 1) => dispatch({ type: 'MAKE_CHOICE', choiceIndex });
  const nextScenario = () => dispatch({ type: 'NEXT_SCENARIO' });
  const resetGame = () => dispatch({ type: 'RESET' });

  return {
    state,
    startGame,
    makeChoice,
    nextScenario,
    resetGame,
  };
}
