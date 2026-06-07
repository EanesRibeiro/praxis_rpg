import React from 'react';
import type { Scenario, Virtues } from '../types';
import { ChoiceButton } from './ChoiceButton';
import { Sidebar } from './Sidebar';
import { loadPlayedIndex } from '../utils/storage';

interface ArenaProps {
  scenario: Scenario;
  virtues: Virtues;
  currentStep: number;
  totalSteps: number;
  onSelectChoice: (index: 0 | 1) => void;
}

export const Arena: React.FC<ArenaProps> = ({
  scenario,
  virtues,
  currentStep,
  totalSteps,
  onSelectChoice,
}) => {
  const playedIndex = loadPlayedIndex();
  const alreadyPlayed = Object.values(playedIndex).some(ids => ids.includes(scenario.id));

  return (
    <section 
      key={scenario.id}
      className="flex flex-col p-6 sm:p-[28px_24px] w-full max-w-[560px] mx-auto sm:mx-0 select-none animate-arena-enter"
    >
      {/* Scenario Meta */}
      <div className="flex items-center gap-3 mb-3.5">
        <span className="px-2.5 py-[3px] border border-[#3A2E22] bg-[#1A1510] text-bronze rounded-[2px] font-inter text-[9px] font-500 tracking-[2.5px] uppercase">
          {scenario.category}
        </span>
        <span className="font-inter text-[10px] font-normal text-ivory-dimmed tracking-[1px]">
          Dilema {currentStep} de {totalSteps}
        </span>
      </div>

      {/* Scenario Title */}
      <h1 className="font-cinzel text-xl font-600 text-ivory leading-[1.3] mb-3.5 flex items-center gap-2">
        {scenario.title}
        {alreadyPlayed && (
          <span 
            title="Você já enfrentou este dilema em uma jornada anterior." 
            className="text-[12px] text-bronze cursor-help select-none animate-pulse"
          >
            ⚡
          </span>
        )}
      </h1>

      {/* Divider */}
      <div className="w-10 h-[1px] bg-gradient-to-r from-bronze to-transparent mb-3.5" />

      {/* Scenario Description */}
      <p className="font-inter text-[13.5px] font-300 text-ivory-dim leading-[1.8] mb-6 sm:mb-7">
        {scenario.description}
      </p>

      {/* Mobile-only Inline Sidebar (exibido apenas abaixo do breakpoint sm: 640px) */}
      <Sidebar virtues={virtues} layout="inline" />

      {/* Choices Container */}
      <div className="flex flex-col gap-2.5">
        <ChoiceButton 
          choice={scenario.choices[0]} 
          onSelect={() => onSelectChoice(0)} 
        />
        <ChoiceButton 
          choice={scenario.choices[1]} 
          onSelect={() => onSelectChoice(1)} 
        />
      </div>
    </section>
  );
};
