import React from 'react';
import { loadPlayerStats } from '../utils/storage';
import { X, Award, BarChart2, CheckCircle } from 'lucide-react';
import type { VirtueKey } from '../types';

interface StatsScreenProps {
  onClose: () => void;
}

const VIRTUE_COLORS: Record<VirtueKey, string> = {
  wisdom: '#7F77DD',      // Roxo
  courage: '#E24B4A',     // Vermelho
  justice: '#1D9E75',     // Verde
  temperance: '#EF9F27',  // Âmbar
};

const VIRTUE_LABELS: Record<VirtueKey, string> = {
  wisdom: 'Sabedoria',
  courage: 'Coragem',
  justice: 'Justiça',
  temperance: 'Temperança',
};

export const StatsScreen: React.FC<StatsScreenProps> = ({ onClose }) => {
  const stats = loadPlayerStats();
  const totalScenarios = 30; // Total de cenários no pool (6 por categoria * 5 categorias)
  const percentScenariosPlayed = Math.round((stats.uniqueScenariosCount / totalScenarios) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-obsidian/95 backdrop-blur-sm select-none animate-fade-in">
      <div className="relative w-full max-w-[460px] bg-obsidian-2 border border-[#2A2520] rounded-[4px] p-6 shadow-2xl flex flex-col gap-6">
        
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ivory-dim hover:text-bronze cursor-pointer transition-colors duration-200"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Título */}
        <div className="flex flex-col items-center text-center mt-2">
          <span className="font-cinzel text-3xl text-bronze mb-1">⊕</span>
          <h2 className="font-cinzel text-xl font-700 text-ivory tracking-[3px] uppercase">
            Registro da Alma
          </h2>
          <span className="font-inter text-[9px] text-ivory-muted tracking-[2px] uppercase">
            Estatísticas Históricas de Caráter
          </span>
          <div className="w-[60px] h-[1px] bg-gradient-to-r from-transparent via-bronze to-transparent mt-4" />
        </div>

        {/* Grid de Resumos */}
        <div className="grid grid-cols-2 gap-3">
          {/* Jornadas Completadas */}
          <div className="bg-obsidian-3 border border-[#231E1A] p-3.5 rounded-[2px] flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-bronze shrink-0" />
            <div className="text-left">
              <div className="font-inter text-[8px] text-ivory-dimmed tracking-[1px] uppercase">
                Jornadas Completas
              </div>
              <div className="font-cinzel text-lg font-600 text-ivory">
                {stats.totalRuns}
              </div>
            </div>
          </div>

          {/* Arquétipo Frequente */}
          <div className="bg-obsidian-3 border border-[#231E1A] p-3.5 rounded-[2px] flex items-center gap-3">
            <Award className="w-5 h-5 text-bronze shrink-0" />
            <div className="text-left overflow-hidden">
              <div className="font-inter text-[8px] text-ivory-dimmed tracking-[1px] uppercase">
                Perfil Predominante
              </div>
              <div className="font-cinzel text-xs font-600 text-ivory truncate" title={stats.mostCommonArchetype}>
                {stats.mostCommonArchetype === 'Nenhum' ? 'Em Progresso' : stats.mostCommonArchetype}
              </div>
            </div>
          </div>
        </div>

        {/* Progresso de Dilemas Enfrentados */}
        <div className="bg-obsidian-3 border border-[#231E1A] p-4 rounded-[2px] flex flex-col gap-2">
          <div className="flex justify-between items-center text-left">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-bronze" />
              <span className="font-inter text-[9px] text-ivory-muted tracking-[1.5px] uppercase">
                Dilemas Enfrentados
              </span>
            </div>
            <span className="font-cinzel text-xs text-bronze">
              {stats.uniqueScenariosCount} / {totalScenarios} ({percentScenariosPlayed}%)
            </span>
          </div>
          {/* Barra de Progresso */}
          <div className="w-full h-1.5 bg-obsidian-5 rounded-[1px] overflow-hidden">
            <div 
              className="h-full bg-bronze transition-all duration-1000"
              style={{ width: `${percentScenariosPlayed}%` }}
            />
          </div>
        </div>

        {/* Médias das Virtudes Cardeais */}
        <div className="bg-obsidian-3 border border-[#231E1A] p-4 rounded-[2px] flex flex-col gap-3.5">
          <span className="font-inter text-[9px] text-ivory-muted tracking-[2px] uppercase text-left">
            Média Geral das Virtudes
          </span>
          <div className="flex flex-col gap-3">
            {(Object.keys(VIRTUE_LABELS) as VirtueKey[]).map((key) => {
              const value = stats.virtueAverages[key] || 0;
              const color = VIRTUE_COLORS[key];
              return (
                <div key={key} className="flex flex-col gap-1 text-left">
                  <div className="flex justify-between text-[10px] font-inter">
                    <span className="text-ivory-dim tracking-[1px]">{VIRTUE_LABELS[key]}</span>
                    <span className="font-cinzel font-600" style={{ color }}>{value}</span>
                  </div>
                  <div className="w-full h-1 bg-obsidian-5 rounded-[1px] overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000"
                      style={{ width: `${value}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-transparent border border-[#2E2E2E] hover:border-bronze text-ivory-dim hover:text-bronze font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none"
        >
          Retornar
        </button>
      </div>
    </div>
  );
};
