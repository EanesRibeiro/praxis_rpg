export interface Virtues {
  wisdom: number;      // Sabedoria    — 0 a 100
  courage: number;     // Coragem      — 0 a 100
  justice: number;     // Justiça      — 0 a 100
  temperance: number;  // Temperança   — 0 a 100
}

export type VirtueKey = keyof Virtues;

export type PhilosopherName = 'Marco Aurélio' | 'Sêneca' | 'Epicteto';

export type ScenarioCategory = 'Trabalho' | 'Vida Pessoal' | 'Crise' | 'Saúde' | 'Filosofia';

export type ArchetypeKey = 'contemplativo' | 'guardião' | 'árbitro' | 'equilibrado';

export interface Choice {
  text: string;
  philosopher: PhilosopherName;
  quote: string;              // Citação real e verificável
  impact: Partial<Virtues>;   // Deltas: ex. { wisdom: +15, courage: -5 }
  ataraxiaImpact: number;     // Delta direto em Ataraxia
  feedback: string;           // Consequência sob ótica estoica (2–3 frases)
  archetype: ArchetypeKey;    // Qual perfil esta escolha favorece
  portraitSvg?: string;       // SVG inline como string do retrato do filósofo
}

export interface Scenario {
  id: string;
  category: ScenarioCategory;
  title: string;
  description: string;        // 2–4 frases, presente do indicativo
  choices: [Choice, Choice];  // Exatamente 2 choices — tuple, não array genérico
}

export interface ChoiceRecord {
  scenarioId: string;
  choiceIndex: 0 | 1 | -1;
  timestamp: number;
}

export type GamePhase = 'intro' | 'game' | 'feedback' | 'result';

export interface GameState {
  virtues: Virtues;
  ataraxia: number;
  currentScenarioIndex: number;
  choicesHistory: ChoiceRecord[];
  phase: GamePhase;
  lastChoice: Choice | null;   // Para renderizar o feedback overlay
  sessionScenarios: Scenario[]; // Cenários sorteados para a sessão atual
  isDailyChallenge?: boolean;   // Flag para desafio diário
  isQuickMode?: boolean;         // Flag para modo rápido
}

export interface Profile {
  name: string;         // Ex: "O Árbitro Justo Iluminado"
  archetype: ArchetypeKey;
  icon: string;         // Símbolo unicode: ◎ ◈ ⊕ ◉
  description: string;  // 1 frase descritiva do perfil
}

export interface StoredSession {
  date: string;         // ISO 8601
  profile: string;
  ataraxia: number;
  virtues: Virtues;
}
