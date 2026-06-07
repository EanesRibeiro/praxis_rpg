import React from 'react';
import type { Choice, VirtueKey } from '../types';

interface ChoiceButtonProps {
  choice: Choice;
  onSelect: () => void;
}

const VIRTUE_LABELS: Record<VirtueKey, string> = {
  wisdom: 'Sab',
  courage: 'Cor',
  justice: 'Jus',
  temperance: 'Tem',
};

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onSelect }) => {
  const renderPill = (label: string, value: number) => {
    const isPos = value >= 0;
    const formattedVal = isPos ? `+${value}` : `${value}`;
    
    const pillClass = isPos
      ? 'bg-impact-pos-bg text-impact-pos-text border-impact-pos-border'
      : 'bg-impact-neg-bg text-impact-neg-text border-impact-neg-border';

    return (
      <span 
        key={label}
        className={`px-[7px] py-[2px] border rounded-[2px] font-inter text-[9px] font-500 tracking-[0.5px] ${pillClass}`}
      >
        {label} {formattedVal}
      </span>
    );
  };

  const pills: React.ReactNode[] = [];
  
  // Adiciona as virtudes afetadas na ordem correta
  (Object.keys(VIRTUE_LABELS) as VirtueKey[]).forEach((key) => {
    const val = choice.impact[key];
    if (val !== undefined && val !== 0) {
      pills.push(renderPill(VIRTUE_LABELS[key], val));
    }
  });

  // Adiciona impacto de Ataraxia
  if (choice.ataraxiaImpact !== 0) {
    pills.push(renderPill('Atar', choice.ataraxiaImpact));
  }

  return (
    <button 
      onClick={onSelect}
      className="group relative w-full text-left bg-obsidian-3 border border-[#2A2520] hover:border-bronze-dark hover:bg-obsidian-4 rounded-sm p-4 cursor-pointer select-none transition-all duration-200 overflow-hidden outline-none focus:border-bronze"
    >
      {/* Indicador bronze na lateral esquerda (simula ::before) */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-bronze opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200" />

      <div className="flex flex-col gap-2.5 pl-1.5">
        {/* Cabeçalho com Retrato e Nome do Filósofo */}
        <div className="flex items-center gap-2.5">
          {choice.portraitSvg && (
            <div 
              className="w-7 h-7 rounded-full overflow-hidden border border-bronze-dark bg-[#1A1A1A] flex-shrink-0"
              dangerouslySetInnerHTML={{ __html: choice.portraitSvg }}
            />
          )}
          <span className="font-inter text-[9px] font-500 tracking-[2px] uppercase text-bronze">
            {choice.philosopher}
          </span>
        </div>

        {/* Texto da Escolha */}
        <p className="font-inter text-[13px] font-300 text-ivory leading-relaxed">
          {choice.text}
        </p>

        {/* Pílulas de Impacto */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {pills}
        </div>
      </div>
    </button>
  );
};
