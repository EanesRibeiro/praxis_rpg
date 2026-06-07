import React, { useState, useEffect } from 'react';
import type { VirtueKey } from '../types';

interface VirtueBarProps {
  name: string;
  virtueKey: VirtueKey;
  value: number;
}

const COLOR_MAP: Record<VirtueKey, string> = {
  wisdom: '#7F77DD',      // Roxo
  courage: '#E24B4A',     // Vermelho
  justice: '#1D9E75',     // Verde
  temperance: '#EF9F27',  // Âmbar
};

export const VirtueBar: React.FC<VirtueBarProps> = ({ name, virtueKey, value }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const virtueColor = COLOR_MAP[virtueKey];

  useEffect(() => {
    // Delay de 50ms para acionar a animação no carregamento/atualização
    const timer = setTimeout(() => {
      setAnimatedWidth(value);
    }, 50);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5 w-full select-none">
      {/* Informações da Virtude */}
      <div className="flex justify-between items-center">
        <span className="font-inter text-[10px] font-500 text-ivory-muted tracking-[1.5px] uppercase">
          {name}
        </span>
        <span 
          className="font-cinzel text-[12px] font-600"
          style={{ color: virtueColor }}
        >
          {value}
        </span>
      </div>

      {/* Track & Progress Fill */}
      <div className="w-full h-[3px] bg-[#1E1E1E] rounded-[1px] overflow-hidden">
        <div 
          className="h-full transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ 
            width: `${animatedWidth}%`,
            backgroundColor: virtueColor
          }}
        />
      </div>
    </div>
  );
};
