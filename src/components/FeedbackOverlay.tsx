import React, { useState } from 'react';
import type { Choice, VirtueKey } from '../types';

interface FeedbackOverlayProps {
  choice: Choice;
  onContinue: () => void;
}

const VIRTUE_LABELS_FULL: Record<VirtueKey, string> = {
  wisdom: 'Sabedoria',
  courage: 'Coragem',
  justice: 'Justiça',
  temperance: 'Temperança',
};

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ choice, onContinue }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleContinue = React.useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onContinue();
    }, 150); // Tempo correspondente à duração do fade-out
  }, [onContinue]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // Evita scroll do espaço
        handleContinue();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleContinue]);

  const renderPill = (label: string, value: number) => {
    const isPos = value >= 0;
    const formattedVal = isPos ? `+${value}` : `${value}`;

    const pillClass = isPos
      ? 'bg-impact-pos-bg text-impact-pos-text border-impact-pos-border'
      : 'bg-impact-neg-bg text-impact-neg-text border-impact-neg-border';

    return (
      <span 
        key={label}
        className={`px-3 py-1 border rounded-[2px] font-inter text-[9px] font-500 tracking-[0.5px] uppercase ${pillClass}`}
      >
        {label} {formattedVal}
      </span>
    );
  };

  const pills: React.ReactNode[] = [];
  
  // Adiciona virtudes afetadas
  (Object.keys(VIRTUE_LABELS_FULL) as VirtueKey[]).forEach((key) => {
    const val = choice.impact[key];
    if (val !== undefined && val !== 0) {
      pills.push(renderPill(VIRTUE_LABELS_FULL[key], val));
    }
  });

  // Adiciona Ataraxia
  if (choice.ataraxiaImpact !== 0) {
    pills.push(renderPill('Ataraxia', choice.ataraxiaImpact));
  }

  return (
    <div 
      style={{ backgroundColor: 'rgba(13, 13, 13, 0.98)' }}
      className={`fixed inset-0 flex items-center justify-center z-50 p-6 select-none ${
        isExiting ? 'animate-fade-out' : 'animate-fade-in'
      }`}
    >
      <div className="max-w-[480px] w-full text-center flex flex-col items-center gap-6">
        
        {/* Philosopher Label */}
        <span className="font-inter text-[10px] font-500 tracking-[3px] uppercase text-bronze">
          — {choice.philosopher}
        </span>

        {/* Retrato e Citação */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full bg-obsidian-2 p-5 border border-[#2A2520] rounded-sm">
          {choice.portraitSvg && (
            <div 
              className="w-16 h-16 rounded-full overflow-hidden border border-bronze-dark bg-[#1A1A1A] flex-shrink-0"
              dangerouslySetInnerHTML={{ __html: choice.portraitSvg }}
            />
          )}
          
          <div className="relative text-left flex-1">
            {/* Aspas gigantes decorativas */}
            <span className="absolute -left-3 -top-6 font-cinzel text-5xl text-bronze-dark select-none opacity-40">
              “
            </span>
            <blockquote className="font-cinzel text-[14.5px] leading-relaxed text-ivory pl-3">
              {choice.quote}
            </blockquote>
          </div>
        </div>

        {/* Texto do Feedback / Consequência */}
        <p className="font-inter text-[13px] font-300 text-ivory-dim leading-relaxed">
          {choice.feedback}
        </p>

        {/* Pílulas de Impacto */}
        <div className="flex flex-wrap justify-center gap-2">
          {pills}
        </div>

        {/* Botão Continuar */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            onClick={handleContinue}
            className="px-7 py-2.5 border border-bronze text-bronze hover:bg-bronze hover:text-obsidian font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none"
          >
            Continuar →
          </button>
          <span className="font-inter text-[8px] text-ivory-dimmed tracking-[1px] uppercase">
            [ Pressione Espaço ou Enter ]
          </span>
        </div>
      </div>
    </div>
  );
};
