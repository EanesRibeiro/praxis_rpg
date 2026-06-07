import React from 'react';
import type { Virtues, Profile } from '../types';

interface ResultCardProps {
  cardRef: React.RefObject<HTMLDivElement>;
  virtues: Virtues;
  ataraxia: number;
  profile: Profile;
  userName?: string;
}

const VIRTUE_COLORS = {
  wisdom: '#7F77DD',
  courage: '#E24B4A',
  justice: '#1D9E75',
  temperance: '#EF9F27',
};

export const ResultCard: React.FC<ResultCardProps> = ({
  cardRef,
  virtues,
  ataraxia,
  profile,
  userName,
}) => {
  const formattedDate = new Date().toLocaleDateString('pt-BR');

  return (
    <div 
      ref={cardRef}
      style={{
        width: '800px',
        height: '450px',
        backgroundColor: '#0D0D0D',
        border: '1px solid #8B5E2A',
        padding: '40px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        left: '-9999px', // Oculta visualmente em todas as resoluções sem desestruturar do DOM
        top: '0',
        zIndex: -100,
        boxSizing: 'border-box',
      }}
      className="font-inter text-[#F5F0E8]"
    >
      {/* Topo do Card */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 500, color: '#8A8070', letterSpacing: '3px', textTransform: 'uppercase' }}>
          PERFIL ESTOICO DO DIA
        </span>
        <span style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '11px', fontWeight: 400, color: '#B87333', letterSpacing: '3px' }}>
          Ἄσκησις
        </span>
      </div>

      {/* Centro do Card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {/* Selo Estoico */}
        <div 
          style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            border: '2px solid #B87333', 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#141414',
            flexShrink: 0,
            boxSizing: 'border-box',
          }}
        >
          {/* Inner Ring */}
          <div 
            style={{ 
              position: 'absolute',
              inset: '4px',
              borderRadius: '50%', 
              border: '1px solid #8B5E2A',
              boxSizing: 'border-box',
            }}
          />
          <span style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '28px', color: '#B87333', zIndex: 2 }}>
            {profile.icon}
          </span>
        </div>

        {/* Informações de Perfil */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '28px', fontWeight: 700, color: '#F5F0E8', margin: 0, lineHeight: 1.2 }}>
            {profile.name}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500, color: '#B87333', letterSpacing: '2px' }}>
              ATARAXIA · {ataraxia}%
            </span>
            {userName && (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500, color: '#8A8070', letterSpacing: '1px' }}>
                | Práxis de: {userName}
              </span>
            )}
          </div>
          
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 300, color: '#8A8070', fontStyle: 'italic', margin: 0 }}>
            {profile.description}
          </p>
        </div>
      </div>

      {/* Grid de Virtudes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {/* Sabedoria */}
        <div style={{ backgroundColor: '#1C1C1C', border: '1px solid #2A2520', borderRadius: '4px', padding: '10px 14px', textAlign: 'left' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', fontWeight: 500, color: '#5A5248', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2px' }}>
            SABEDORIA
          </div>
          <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '20px', fontWeight: 600, color: VIRTUE_COLORS.wisdom }}>
            {virtues.wisdom}
          </div>
        </div>

        {/* Coragem */}
        <div style={{ backgroundColor: '#1C1C1C', border: '1px solid #2A2520', borderRadius: '4px', padding: '10px 14px', textAlign: 'left' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', fontWeight: 500, color: '#5A5248', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2px' }}>
            CORAGEM
          </div>
          <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '20px', fontWeight: 600, color: VIRTUE_COLORS.courage }}>
            {virtues.courage}
          </div>
        </div>

        {/* Justiça */}
        <div style={{ backgroundColor: '#1C1C1C', border: '1px solid #2A2520', borderRadius: '4px', padding: '10px 14px', textAlign: 'left' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', fontWeight: 500, color: '#5A5248', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2px' }}>
            JUSTIÇA
          </div>
          <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '20px', fontWeight: 600, color: VIRTUE_COLORS.justice }}>
            {virtues.justice}
          </div>
        </div>

        {/* Temperança */}
        <div style={{ backgroundColor: '#1C1C1C', border: '1px solid #2A2520', borderRadius: '4px', padding: '10px 14px', textAlign: 'left' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', fontWeight: 500, color: '#5A5248', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2px' }}>
            TEMPERANÇA
          </div>
          <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '20px', fontWeight: 600, color: VIRTUE_COLORS.temperance }}>
            {virtues.temperance}
          </div>
        </div>
      </div>

      {/* Rodapé do Card */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#5A5248' }}>
          {formattedDate}
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#5A5248' }}>
          askesis.app
        </span>
      </div>
    </div>
  );
};
