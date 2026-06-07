import React from 'react';
import type { Virtues } from '../types';
import { VirtueBar } from './VirtueBar';

interface SidebarProps {
  virtues: Virtues;
  layout?: 'sidebar' | 'inline';
}

export const Sidebar: React.FC<SidebarProps> = ({ virtues, layout = 'sidebar' }) => {
  const isInline = layout === 'inline';

  if (isInline) {
    return (
      <div className="w-full py-4 border-y border-[#2A2520] my-6 sm:hidden select-none">
        <div className="text-[9px] font-500 text-ivory-dimmed tracking-[2px] uppercase mb-3">
          VIRTUDES CARDEAIS
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <VirtueBar name="Sabedoria" virtueKey="wisdom" value={virtues.wisdom} />
          <VirtueBar name="Coragem" virtueKey="courage" value={virtues.courage} />
          <VirtueBar name="Justiça" virtueKey="justice" value={virtues.justice} />
          <VirtueBar name="Temperança" virtueKey="temperance" value={virtues.temperance} />
        </div>
      </div>
    );
  }

  return (
    <aside className="hidden sm:flex flex-col w-[200px] bg-obsidian-2 border-l border-[#1E1A16] p-6 select-none shrink-0 min-h-screen">
      <div className="font-inter text-[9px] font-500 text-ivory-dimmed tracking-[2.5px] uppercase mb-[18px]">
        VIRTUDES CARDEAIS
      </div>
      <div className="flex flex-col gap-4">
        <VirtueBar name="Sabedoria" virtueKey="wisdom" value={virtues.wisdom} />
        <VirtueBar name="Coragem" virtueKey="courage" value={virtues.courage} />
        <VirtueBar name="Justiça" virtueKey="justice" value={virtues.justice} />
        <VirtueBar name="Temperança" virtueKey="temperance" value={virtues.temperance} />
      </div>
    </aside>
  );
};
