import React, { useState, useEffect, useRef } from 'react';
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

const VIRTUE_DESCRIPTIONS: Record<VirtueKey, string> = {
  wisdom: 'Sabedoria: Discernimento do que é bom, ruim ou indiferente.',
  courage: 'Coragem: Firmeza da mente diante do medo, dor ou perigo.',
  justice: 'Justiça: Dar a cada um o seu devido valor e agir com equidade.',
  temperance: 'Temperança: Autodomínio, moderação e controle dos impulsos.',
};

export const VirtueBar: React.FC<VirtueBarProps> = ({ name, virtueKey, value }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [delta, setDelta] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const prevValueRef = useRef(value);

  const virtueColor = COLOR_MAP[virtueKey];

  useEffect(() => {
    // Delay de 50ms para acionar a animação no carregamento/atualização
    const timer = setTimeout(() => {
      setAnimatedWidth(value);
    }, 50);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const prev = prevValueRef.current;
    if (prev !== value) {
      const diff = value - prev;
      setDelta(diff);
      setAnimationKey(prevKey => prevKey + 1);
      prevValueRef.current = value;
    }
  }, [value]);

  useEffect(() => {
    if (delta !== null) {
      const timer = setTimeout(() => {
        setDelta(null);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [delta, animationKey]);

  return (
    <div 
      title={VIRTUE_DESCRIPTIONS[virtueKey]} 
      className="flex flex-col gap-1.5 w-full select-none cursor-help"
    >
      {/* Informações da Virtude */}
      <div className="flex justify-between items-center">
        <span className="font-inter text-[10px] font-500 text-ivory-muted tracking-[1.5px] uppercase">
          {name}
        </span>
        <div className="relative flex items-center justify-end">
          {delta !== null && delta !== 0 && (
            <span
              key={animationKey}
              className={`absolute right-0 bottom-full mb-1 font-cinzel text-[11px] font-bold pointer-events-none animate-float-up ${
                delta > 0 ? 'text-impact-pos-text' : 'text-impact-neg-text'
              }`}
            >
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
          <span 
            className="font-cinzel text-[12px] font-600"
            style={{ color: virtueColor }}
          >
            {value}
          </span>
        </div>
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
