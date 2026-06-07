import React from 'react';
import type { Virtues } from '../types';
import { Sidebar } from './Sidebar';

interface GameLayoutProps {
  virtues: Virtues;
  children: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ virtues, children }) => {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[1fr_200px] w-full min-h-[calc(100vh-65px)] bg-transparent">
      {/* Coluna Esquerda: Arena do Dilema */}
      <main className="flex-grow flex items-center justify-center py-6 sm:py-8">
        {children}
      </main>

      {/* Coluna Direita: Sidebar (oculta em mobile, flutua no lado direito em desktop) */}
      <Sidebar virtues={virtues} layout="sidebar" />
    </div>
  );
};
