import { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { IntroScreen } from './components/IntroScreen';
import { Header } from './components/Header';
import { GameLayout } from './components/GameLayout';
import { Arena } from './components/Arena';
import { FeedbackOverlay } from './components/FeedbackOverlay';
import { ResultScreen } from './components/ResultScreen';
import { StatsScreen } from './components/StatsScreen';
import type { Virtues } from './types';

const decodeResult = (hash: string) => {
  try {
    const code = hash.replace('#result=', '');
    const decoded = JSON.parse(decodeURIComponent(escape(atob(code))));
    return decoded; // { virtues, ataraxia }
  } catch (e) {
    console.error('Falha ao decodificar hash de resultado:', e);
    return null;
  }
};

function App() {
  const { state, startGame, loadProgress, makeChoice, nextScenario, resetGame } = useGameState();
  const [showStats, setShowStats] = useState(false);
  const [sharedResult, setSharedResult] = useState<{ virtues: Virtues, ataraxia: number } | null>(null);

  // Monitora alterações no hash da URL para renderizar resultados compartilhados
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash.startsWith('#result=')) {
        const decoded = decodeResult(window.location.hash);
        if (decoded) {
          setSharedResult(decoded);
        }
      } else {
        setSharedResult(null);
      }
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleReset = () => {
    if (window.location.hash) {
      window.location.hash = ''; // Limpa o hash
    }
    setSharedResult(null);
    resetGame();
  };

  // Scroll automático para o topo ao trocar de dilema
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state.currentScenarioIndex]);

  // Atalho de teclado 'R' para reiniciar com confirmação
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'r' || e.key === 'R') && (state.phase === 'game' || state.phase === 'result' || sharedResult)) {
        const confirmReset = (state.phase === 'game')
          ? window.confirm('Tem certeza? Sua jornada atual será perdida.')
          : true;
        if (confirmReset) {
          handleReset();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.phase, sharedResult]);

  const showVignette = state.ataraxia < 40 && state.phase !== 'intro' && state.phase !== 'result' && !sharedResult;

  return (
    <div className={`relative min-h-screen bg-obsidian text-ivory transition-all duration-1000 overflow-x-hidden ${
      showVignette ? 'saturate-[0.85]' : ''
    }`}>
      {/* Fundo de Partículas Sóbrias */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-ivory opacity-[0.06] blur-[0.5px] animate-particle-1" />
        <div className="absolute top-[60%] left-[80%] w-1 h-1 rounded-full bg-ivory opacity-[0.04] blur-[0.5px] animate-particle-2" />
        <div className="absolute top-[40%] left-[50%] w-2 h-2 rounded-full bg-ivory opacity-[0.05] blur-[1px] animate-particle-3" />
        <div className="absolute top-[80%] left-[15%] w-1.5 h-1.5 rounded-full bg-ivory opacity-[0.03] blur-[0.5px] animate-particle-4" />
        <div className="absolute top-[25%] left-[75%] w-1 h-1 rounded-full bg-ivory opacity-[0.05] blur-[0.5px] animate-particle-5" />
      </div>

      {/* Vinheta de Crise */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-50 shadow-[inset_0_0_100px_rgba(0,0,0,0.85)] ${
          showVignette ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Conteúdo Dinâmico */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {sharedResult ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <ResultScreen 
              virtues={sharedResult.virtues} 
              ataraxia={sharedResult.ataraxia} 
              onReset={handleReset} 
            />
          </div>
        ) : state.phase === 'intro' ? (
          <IntroScreen 
            onStart={startGame} 
            onLoadProgress={loadProgress} 
            onOpenStats={() => setShowStats(true)} 
          />
        ) : state.phase === 'result' ? (
          <ResultScreen 
            virtues={state.virtues} 
            ataraxia={state.ataraxia} 
            onReset={handleReset} 
            isDailyChallenge={state.isDailyChallenge}
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

      {/* Painel de Estatísticas */}
      {showStats && <StatsScreen onClose={() => setShowStats(false)} />}
    </div>
  );
}

export default App;
