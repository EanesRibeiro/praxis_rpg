import React from 'react';
import { loadGameProgress, loadDailyProgress, isDailyChallengeCompleted } from '../utils/storage';

interface IntroScreenProps {
  onStart: (isDaily?: boolean, isQuick?: boolean) => void;
  onLoadProgress: (state: any) => void;
  onOpenStats: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ 
  onStart, 
  onLoadProgress, 
  onOpenStats 
}) => {
  const savedProgress = loadGameProgress();
  const dailyProgress = loadDailyProgress();
  const todayStr = new Date().toISOString().slice(0, 10);
  const dailyCompleted = isDailyChallengeCompleted(todayStr);
  const isDailyPending = dailyProgress && dailyProgress.dailyDateSeed === todayStr;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-center px-6 py-12 select-none animate-fade-in">
      <div className="max-w-[420px] w-full flex flex-col items-center">
        
        {/* Símbolo Estoico Central */}
        <span className="font-cinzel text-5xl text-bronze mb-4">
          ⊕
        </span>

        {/* Título Principal */}
        <h1 className="font-cinzel text-3xl sm:text-4xl font-700 text-ivory tracking-[4px] uppercase mb-1">
          Ἄσκησις
        </h1>
        
        {/* Subtítulo */}
        <h2 className="font-cinzel text-sm font-normal text-ivory-muted tracking-[6px] uppercase mb-8">
          Práxis Estoica
        </h2>

        {/* Divisor */}
        <div className="w-[60px] h-[1px] bg-gradient-to-r from-transparent via-bronze to-transparent mb-8" />

        {/* Descrição Narrativa */}
        <p className="font-inter text-sm font-300 text-ivory-dim leading-[1.9] mb-10">
          Dilemas cotidianos. Virtudes cardeais. Um espelho da razão.<br />
          Escolha com serenidade — cada passo moldará o seu caráter.
        </p>

        {/* Lista de Ações de Início */}
        <div className="flex flex-col gap-4 w-full max-w-[280px]">
          {savedProgress && (
            <div className="flex flex-col w-full gap-1 mb-1">
              <button
                onClick={() => onLoadProgress(savedProgress)}
                className="w-full py-3 bg-bronze/10 border border-bronze text-bronze hover:bg-bronze hover:text-obsidian font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none animate-pulse text-center"
              >
                ▶ Continuar Partida ({savedProgress.currentScenarioIndex + 1}/{savedProgress.sessionScenarios.length})
              </button>
              <div className="w-full h-[1px] bg-[#2A2520]/60 mt-3" />
            </div>
          )}

          {/* Bloco Jornada Clássica */}
          <div className="flex flex-col w-full gap-1.5">
            <button
              onClick={() => {
                if (savedProgress && !window.confirm('Tem certeza? Seu progresso salvo da jornada clássica anterior será perdido.')) {
                  return;
                }
                onStart(false, false);
              }}
              className="w-full py-3 border border-bronze text-bronze hover:bg-bronze hover:text-obsidian font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none text-center"
            >
              📜 Jornada Clássica
            </button>
            <p className="font-inter text-[10px] text-ivory-dim/60 tracking-[0.5px] leading-relaxed select-none px-1 text-center">
              5 dilemas aleatórios. Sem restrições. Salva estatísticas.
            </p>
          </div>

          {/* Bloco Desafio do Dia */}
          <div className="flex flex-col w-full gap-1.5">
            {dailyCompleted ? (
              <button
                disabled
                className="w-full py-3 border border-[#1D1A18] text-[#5C5246] font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-not-allowed outline-none opacity-60 text-center"
              >
                ☀️ Desafio do Dia ✔️ (Concluído)
              </button>
            ) : isDailyPending ? (
              <button
                onClick={() => onLoadProgress(dailyProgress)}
                className="w-full py-3 bg-bronze/10 border border-bronze text-bronze hover:bg-bronze hover:text-obsidian font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none animate-pulse text-center"
              >
                ☀️ Retomar Desafio ({dailyProgress.currentScenarioIndex + 1}/{dailyProgress.sessionScenarios.length})
              </button>
            ) : (
              <button
                onClick={() => onStart(true, false)}
                className="w-full py-3 border border-[#3E3E3E] text-ivory-dim hover:border-bronze hover:text-bronze font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none text-center"
              >
                ☀️ Desafio do Dia
              </button>
            )}
            <p className="font-inter text-[10px] text-ivory-dim/60 tracking-[0.5px] leading-relaxed select-none px-1 text-center">
              5 dilemas fixos (iguais para todos hoje). Uma tentativa por dia. Selo dourado ao concluir.
            </p>
          </div>

          {/* Bloco Modo Rápido */}
          <div className="flex flex-col w-full gap-1.5">
            <button
              onClick={() => {
                if (savedProgress && !window.confirm('Tem certeza? Seu progresso salvo da jornada clássica anterior será perdido.')) {
                  return;
                }
                onStart(false, true);
              }}
              className="w-full py-3 border border-[#3E3E3E] text-ivory-dim hover:border-bronze hover:text-bronze font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none text-center"
            >
              ⚡ Modo Rápido (3 dilemas)
            </button>
            <p className="font-inter text-[10px] text-ivory-dim/60 tracking-[0.5px] leading-relaxed select-none px-1 text-center">
              3 dilemas rápidos. Não afeta estatísticas.
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#2A2520]/60 my-2" />

          <button
            onClick={onOpenStats}
            className="w-full py-2 bg-transparent hover:text-bronze text-ivory-dimmed font-inter text-[10px] font-500 tracking-[2px] uppercase rounded-sm cursor-pointer transition-colors duration-200 outline-none text-center"
          >
            📊 Ver Registro da Alma (Estatísticas)
          </button>
        </div>
      </div>
    </div>
  );
};
