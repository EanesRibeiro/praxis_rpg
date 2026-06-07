import { useGameState } from './hooks/useGameState';
import { IntroScreen } from './components/IntroScreen';
import { Header } from './components/Header';
import { GameLayout } from './components/GameLayout';
import { Arena } from './components/Arena';
import { FeedbackOverlay } from './components/FeedbackOverlay';
import { ResultScreen } from './components/ResultScreen';

function App() {
  const { state, startGame, makeChoice, nextScenario, resetGame } = useGameState();

  const showVignette = state.ataraxia < 40 && state.phase !== 'intro' && state.phase !== 'result';

  return (
    <div className={`relative min-h-screen bg-obsidian text-ivory transition-all duration-1000 overflow-x-hidden ${
      showVignette ? 'saturate-[0.85]' : ''
    }`}>
      {/* Fundo de Partículas Sóbrias (Task 3.2) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-ivory opacity-[0.06] blur-[0.5px] animate-particle-1" />
        <div className="absolute top-[60%] left-[80%] w-1 h-1 rounded-full bg-ivory opacity-[0.04] blur-[0.5px] animate-particle-2" />
        <div className="absolute top-[40%] left-[50%] w-2 h-2 rounded-full bg-ivory opacity-[0.05] blur-[1px] animate-particle-3" />
        <div className="absolute top-[80%] left-[15%] w-1.5 h-1.5 rounded-full bg-ivory opacity-[0.03] blur-[0.5px] animate-particle-4" />
        <div className="absolute top-[25%] left-[75%] w-1 h-1 rounded-full bg-ivory opacity-[0.05] blur-[0.5px] animate-particle-5" />
      </div>

      {/* Vinheta de Crise (Task 3.1) */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-50 shadow-[inset_0_0_100px_rgba(0,0,0,0.85)] ${
          showVignette ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Conteúdo Dinâmico */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {state.phase === 'intro' ? (
          <IntroScreen onStart={startGame} />
        ) : state.phase === 'result' ? (
          <ResultScreen 
            virtues={state.virtues} 
            ataraxia={state.ataraxia} 
            onReset={resetGame} 
          />
        ) : (
          <>
            {/* Header Fixo */}
            <Header ataraxia={state.ataraxia} />

            {/* Layout Principal (Grid Arena + Sidebar) */}
            {state.sessionScenarios[state.currentScenarioIndex] && (
              <GameLayout virtues={state.virtues}>
                <Arena
                  scenario={state.sessionScenarios[state.currentScenarioIndex]}
                  virtues={state.virtues}
                  currentStep={state.currentScenarioIndex + 1}
                  totalSteps={state.sessionScenarios.length}
                  onSelectChoice={makeChoice}
                />
              </GameLayout>
            )}

            {/* Overlay de Feedback */}
            {state.phase === 'feedback' && state.lastChoice && (
              <FeedbackOverlay
                choice={state.lastChoice}
                onContinue={nextScenario}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
