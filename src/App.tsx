import { useGameState } from './hooks/useGameState';
import { IntroScreen } from './components/IntroScreen';
import { Header } from './components/Header';
import { GameLayout } from './components/GameLayout';
import { Arena } from './components/Arena';
import { FeedbackOverlay } from './components/FeedbackOverlay';
import { ResultScreen } from './components/ResultScreen';

function App() {
  const { state, startGame, makeChoice, nextScenario, resetGame } = useGameState();

  if (state.phase === 'intro') {
    return <IntroScreen onStart={startGame} />;
  }

  if (state.phase === 'result') {
    return (
      <ResultScreen 
        virtues={state.virtues} 
        ataraxia={state.ataraxia} 
        onReset={resetGame} 
      />
    );
  }

  // Fases: 'game' e 'feedback'
  const currentScenario = state.sessionScenarios[state.currentScenarioIndex];

  if (!currentScenario) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-obsidian text-ivory">
      {/* Header Fixo */}
      <Header ataraxia={state.ataraxia} />

      {/* Layout Principal (Grid Arena + Sidebar) */}
      <GameLayout virtues={state.virtues}>
        <Arena
          scenario={currentScenario}
          virtues={state.virtues}
          currentStep={state.currentScenarioIndex + 1}
          totalSteps={state.sessionScenarios.length}
          onSelectChoice={makeChoice}
        />
      </GameLayout>

      {/* Overlay de Feedback */}
      {state.phase === 'feedback' && state.lastChoice && (
        <FeedbackOverlay
          choice={state.lastChoice}
          onContinue={nextScenario}
        />
      )}
    </div>
  );
}

export default App;
