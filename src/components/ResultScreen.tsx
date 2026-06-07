import React, { useRef, useState } from 'react';
import type { Virtues } from '../types';
import { getProfile } from '../utils/gameLogic';
import { ResultCard } from './ResultCard';
import { Download, Clipboard } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ResultScreenProps {
  virtues: Virtues;
  ataraxia: number;
  onReset: () => void;
}

const VIRTUE_COLORS = {
  wisdom: '#7F77DD',
  courage: '#E24B4A',
  justice: '#1D9E75',
  temperance: '#EF9F27',
};

export const ResultScreen: React.FC<ResultScreenProps> = ({ virtues, ataraxia, onReset }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const profile = getProfile(virtues, ataraxia);

  const handleCopyToClipboard = async () => {
    const textToCopy = `Concluí a Práxis Estoica de hoje. 
Meu perfil de tomada de decisão foi classificado como: ${profile.name} com ${ataraxia}% de Ataraxia (Tranquilidade da Alma) diante de crises e dilemas cotidianos.

Como você reagiria sob a ótica de Sêneca e Marco Aurélio? Teste seu caráter na prática.
Jogue aqui: https://eanesribeiro.github.io/praxis_rpg/

#Estoicismo #ProductManagement #DataEngineering #Analytics`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Texto formatado copiado para a área de transferência! Só colar no LinkedIn junto com o seu card.');
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
    }
  };

  const handleExport = async () => {
    if (!cardRef.current || isExporting) return;
    setIsExporting(true);

    // Pequeno delay para garantir que qualquer renderização de estado anterior terminou e posicionamento limpo para captura
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(cardRef.current!, {
          backgroundColor: '#0D0D0D',
          scale: 2, // Mantém alta qualidade para exibição no feed do LinkedIn
          useCORS: true,
          allowTaint: true,
          logging: false,
        });

        const link = document.createElement('a');
        link.download = `praxis-estoica-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error('Erro ao exportar card:', err);
      } finally {
        setIsExporting(false);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-obsidian text-center p-6 sm:p-8 animate-slide-up select-none">
      
      {/* Selo Circular */}
      <div className="w-[80px] h-[80px] rounded-full border-2 border-bronze relative flex items-center justify-center bg-obsidian-2 mb-6">
        <div className="absolute inset-1 rounded-full border border-bronze-dark" />
        <span className="font-cinzel text-3xl text-bronze z-10">{profile.icon}</span>
      </div>

      {/* Perfil Dominante */}
      <h1 className="font-cinzel text-2xl sm:text-3xl font-700 text-ivory tracking-wide mb-2 max-w-[400px]">
        {profile.name}
      </h1>

      {/* Nível de Ataraxia */}
      <div className="font-inter text-xs font-500 text-bronze tracking-[2px] uppercase mb-4">
        ATARAXIA · {ataraxia}%
      </div>

      {/* Descrição do Perfil */}
      <p className="font-inter text-sm font-300 text-ivory-dim italic max-w-[360px] leading-relaxed mb-8">
        "{profile.description}"
      </p>

      {/* Grid de Virtudes (2x2) */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[320px] mb-8">
        {/* Sabedoria */}
        <div className="bg-obsidian-3 border border-[#2A2520] rounded-[4px] p-3.5 text-left">
          <div className="font-inter text-[8px] font-500 text-ivory-dimmed tracking-[2px] uppercase mb-1">
            SABEDORIA
          </div>
          <div className="font-cinzel text-lg font-600" style={{ color: VIRTUE_COLORS.wisdom }}>
            {virtues.wisdom}
          </div>
        </div>

        {/* Coragem */}
        <div className="bg-obsidian-3 border border-[#2A2520] rounded-[4px] p-3.5 text-left">
          <div className="font-inter text-[8px] font-500 text-ivory-dimmed tracking-[2px] uppercase mb-1">
            CORAGEM
          </div>
          <div className="font-cinzel text-lg font-600" style={{ color: VIRTUE_COLORS.courage }}>
            {virtues.courage}
          </div>
        </div>

        {/* Justiça */}
        <div className="bg-obsidian-3 border border-[#2A2520] rounded-[4px] p-3.5 text-left">
          <div className="font-inter text-[8px] font-500 text-ivory-dimmed tracking-[2px] uppercase mb-1">
            JUSTIÇA
          </div>
          <div className="font-cinzel text-lg font-600" style={{ color: VIRTUE_COLORS.justice }}>
            {virtues.justice}
          </div>
        </div>

        {/* Temperança */}
        <div className="bg-obsidian-3 border border-[#2A2520] rounded-[4px] p-3.5 text-left">
          <div className="font-inter text-[8px] font-500 text-ivory-dimmed tracking-[2px] uppercase mb-1">
            TEMPERANÇA
          </div>
          <div className="font-cinzel text-lg font-600" style={{ color: VIRTUE_COLORS.temperance }}>
            {virtues.temperance}
          </div>
        </div>
      </div>

      {/* Input de Nome Personalizado (Opcional) */}
      <div className="flex flex-col items-center gap-2 mb-8 w-full max-w-[280px]">
        <label className="font-inter text-[9px] font-500 text-ivory-muted tracking-[2px] uppercase">
          Nome no Card (Opcional)
        </label>
        <input 
          type="text" 
          placeholder="Digite seu nome..." 
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          maxLength={30}
          className="w-full bg-transparent border border-[#2A2520] focus:border-bronze rounded-[2px] px-4 py-2 text-sm text-ivory text-center font-inter tracking-[1px] outline-none placeholder:text-[#5A5248] transition-colors duration-200"
        />
      </div>

      {/* Ações */}
      <div className="flex flex-col items-center gap-3 w-full max-w-[320px]">
        {/* Botão Export */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center justify-center gap-2 w-full py-3 bg-bronze hover:bg-bronze-light text-obsidian font-cinzel text-[11px] font-600 tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {isExporting ? 'Processando Card...' : 'Baixar Card para LinkedIn'}
        </button>

        {/* Botão Copiar Texto */}
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center justify-center gap-2 w-full py-2.5 border border-bronze-dark bg-obsidian-2 text-ivory hover:bg-obsidian-4 font-cinzel text-[11px] font-600 tracking-[1px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none"
        >
          <Clipboard className="w-3.5 h-3.5" />
          Copiar Texto para Post do LinkedIn
        </button>

        {/* Botão Jogar Novamente */}
        <button
          onClick={onReset}
          className="w-full py-2 bg-transparent border border-[#2E2E2E] hover:border-bronze-dark text-ivory-dimmed hover:text-bronze font-inter text-[10px] tracking-[2px] uppercase rounded-sm cursor-pointer transition-all duration-200 outline-none"
        >
          Jogar Novamente
        </button>
      </div>

      {/* Card Oculto para captura do html2canvas */}
      <ResultCard
        cardRef={cardRef}
        virtues={virtues}
        ataraxia={ataraxia}
        profile={profile}
        userName={userName.trim()}
      />
    </div>
  );
};
