import React from 'react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-obsidian text-center px-6 py-12 select-none">
      <div className="max-w-[420px] w-full flex flex-col items-center">
        
        {/* Símbolo Estoico Central */}
        <span className="font-cinzel text-5xl text-bronze mb-4 animate-fade-in">
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
          Cinco dilemas. Quatro virtudes. Um reflexo do seu caráter.<br />
          Escolha com sabedoria — cada decisão moldará seu perfil estoico.
        </p>

        {/* Botão de Início */}
        <button
          onClick={onStart}
          className="px-9 py-3 border border-bronze text-bronze hover:bg-bronze hover:text-obsidian font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none"
        >
          Iniciar a Práxis
        </button>
      </div>
    </div>
  );
};
