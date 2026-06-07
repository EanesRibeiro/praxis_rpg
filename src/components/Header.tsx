import React, { useState, useEffect } from 'react';

interface HeaderProps {
  ataraxia: number;
}

export const Header: React.FC<HeaderProps> = ({ ataraxia }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    // Delay de 50ms para acionar a transição suave de largura no DOM
    const timer = setTimeout(() => {
      setAnimatedWidth(ataraxia);
    }, 500); // 500ms dá um tempo excelente de entrada na troca de cenários
    
    return () => clearTimeout(timer);
  }, [ataraxia]);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-obsidian-2 border-b border-[#2A2520] select-none">
      {/* Logo Esquerda */}
      <div className="font-cinzel text-[13px] font-normal text-bronze tracking-[3px]">
        Ἄσκησις · PRÁXIS ESTOICA
      </div>

      {/* Barra de Ataraxia Direita */}
      <div className="flex items-center gap-4">
        <span className="font-inter text-[10px] font-500 text-ivory-muted tracking-[2px]">
          ATARAXIA
        </span>
        
        {/* Progress Track */}
        <div className="w-[120px] h-1 bg-obsidian-5 rounded-[2px] overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-bronze-dark via-bronze to-bronze-light transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ width: `${animatedWidth}%` }}
          />
        </div>

        {/* Valor Numérico */}
        <span className="font-cinzel text-[11px] text-bronze min-w-[32px] text-right">
          {ataraxia}%
        </span>
      </div>
    </header>
  );
};
