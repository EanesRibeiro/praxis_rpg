# Ἄσκησις · Práxis Estoica — Spec Completa

> Documento de referência para implementação via Claude Code.  
> Toda decisão de design, lógica e arquitetura está aqui. O código deve derivar desta spec, nunca o inverso.

---

## 1. Visão Geral do Produto

Micro-RPG de texto interativo em página única. O usuário enfrenta dilemas morais sob a ótica estoica, e cada escolha impacta 4 virtudes cardeais e um índice de Ataraxia (Tranquilidade da Alma). Ao final de 5 dilemas, o jogo gera um "Perfil Estoico" e um card visual exportável para LinkedIn.

**Proposta de valor:** não é um quiz — é uma experiência reflexiva com consequências acumuladas e citações reais de Marco Aurélio, Sêneca e Epicteto. O card final é o vetor de compartilhamento.

---

## 2. Stack Técnico

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + Vite + TypeScript (strict mode) |
| Estilização | Tailwind CSS v3 |
| Ícones | Lucide React |
| Fontes | Google Fonts: Cinzel (400, 600, 700) + Inter (300, 400, 500) |
| Export | html2canvas v1.4+ |
| Persistência | localStorage (sem backend) |
| Linter | ESLint + Prettier (padrão Vite TS) |

**Restrição:** não usar CSS custom properties nos componentes capturados pelo html2canvas. Usar hex values diretamente no `ResultCard.tsx` — o html2canvas não resolve variáveis CSS de forma confiável.

---

## 3. Arquitetura de Dados

### 3.1 Types principais

```typescript
// types/index.ts

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
  choiceIndex: 0 | 1;
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
```

### 3.2 Estado inicial

```typescript
const INITIAL_STATE: GameState = {
  virtues: { wisdom: 60, courage: 60, justice: 60, temperance: 60 },
  ataraxia: 60,
  currentScenarioIndex: 0,
  choicesHistory: [],
  phase: 'intro',
  lastChoice: null,
};
```

### 3.3 Regras de calibração dos impactos

- Nenhuma virtude pode ultrapassar 95 ou cair abaixo de 20 ao final das 5 rodadas — usar `clamp(value, 0, 100)` em cada update, mas calibrar os cenários para evitar extremos.
- A soma total de `ataraxiaImpact` ao longo dos 5 cenários deve ter range possível entre 25 e +40 (partindo de 60), resultando em 35–100.
- Cada choice deve ter no máximo 3 virtudes impactadas e não mais que ±25 em qualquer virtude individual.
- Choices "estoicas claras" devem ter `ataraxiaImpact` positivo; choices que testam o jogador podem ser negativas.

---

## 4. Lógica do Jogo

### 4.1 Máquina de estados

```
intro → game → feedback → game (próximo) → ... → result
```

Transições:
- `intro → game`: clique em "Iniciar" na tela de intro
- `game → feedback`: usuário seleciona uma choice (chama `makeChoice(index)`)
- `feedback → game`: clique em "Continuar" (ou `game → result` se `currentScenarioIndex === SCENARIOS.length - 1`)
- `result → intro`: clique em "Jogar Novamente" (reseta estado, mantém histórico no localStorage)

### 4.2 Engine de escolha

```typescript
function makeChoice(state: GameState, choiceIndex: 0 | 1, scenarios: Scenario[]): GameState {
  const scenario = scenarios[state.currentScenarioIndex];
  const choice = scenario.choices[choiceIndex];

  const newVirtues = { ...state.virtues };
  (Object.entries(choice.impact) as [VirtueKey, number][]).forEach(([key, delta]) => {
    newVirtues[key] = Math.min(100, Math.max(0, newVirtues[key] + delta));
  });

  return {
    ...state,
    virtues: newVirtues,
    ataraxia: Math.min(100, Math.max(0, state.ataraxia + choice.ataraxiaImpact)),
    choicesHistory: [
      ...state.choicesHistory,
      { scenarioId: scenario.id, choiceIndex, timestamp: Date.now() }
    ],
    phase: 'feedback',
    lastChoice: choice,
  };
}
```

### 4.3 Geração de perfil

```typescript
function getProfile(virtues: Virtues, ataraxia: number): Profile {
  // Ponderação para evitar empates e perfis genéricos
  const scores: Record<ArchetypeKey, number> = {
    contemplativo: virtues.wisdom * 1.5 + virtues.temperance * 0.5,
    guardião:      virtues.courage * 1.5 + virtues.justice * 0.5,
    árbitro:       virtues.justice * 1.5 + virtues.wisdom * 0.5,
    equilibrado:   virtues.temperance * 1.5 + virtues.courage * 0.5,
  };

  const dominant = (Object.entries(scores) as [ArchetypeKey, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

  const suffix = ataraxia >= 80 ? ' Iluminado' : ataraxia < 45 ? ' em Formação' : '';

  const profiles: Record<ArchetypeKey, Omit<Profile, 'name'>> = {
    contemplativo: { archetype: 'contemplativo', icon: '◎', description: 'Você governa pela razão antes de agir.' },
    guardião:      { archetype: 'guardião',      icon: '◈', description: 'Você avança onde outros recuam.' },
    árbitro:       { archetype: 'árbitro',       icon: '⊕', description: 'Você age pelo bem além do seu ego.' },
    equilibrado:   { archetype: 'equilibrado',   icon: '◉', description: 'Você encontra ordem no caos.' },
  };

  const nameMap: Record<ArchetypeKey, string> = {
    contemplativo: 'O Sábio Contemplativo',
    guardião:      'O Guardião Inabalável',
    árbitro:       'O Árbitro Justo',
    equilibrado:   'O Mestre do Equilíbrio',
  };

  return {
    ...profiles[dominant],
    name: nameMap[dominant] + suffix,
  };
}
```

---

## 5. Cenários (Data File)

Arquivo: `src/data/scenarios.ts` — exportar como `SCENARIOS: Scenario[]`, comprimento 5.

### Estrutura obrigatória por cenário

- `category`: uma das 5 categorias definidas no type
- `title`: máximo 5 palavras, enigmático
- `description`: 2–4 frases, presente do indicativo, sem julgamento moral explícito
- `choices[0]`: sempre a escolha de maior risco e maior potencial de virtude
- `choices[1]`: sempre a escolha mais segura ou cômodea, com trade-offs claros
- `quote`: citação verificável — não inventar, não parafrasear

### Os 5 cenários

**Cenário 1 — Trabalho: "O Mérito do Silêncio"**
Colega apresenta em reunião uma ideia que nasceu de conversa a dois, sem te mencionar. Gestor elogia publicamente.
- Choice A (Coragem+15, Justiça+10, Sabedoria-5, Ataraxia+5) — Marco Aurélio: interromper com clareza e sem agressividade
- Choice B (Temperança+15, Sabedoria+10, Coragem-10, Ataraxia+10) — Epicteto: silêncio deliberado, o reconhecimento externo é indiferente

**Cenário 2 — Vida Pessoal: "A Decisão sob Pressão"**
Amigo próximo pede que você minta para protegê-lo de consequência que ele mesmo causou.
- Choice A (Justiça+20, Sabedoria+10, Coragem+5, Ataraxia+15) — Sêneca: recusar com compaixão, oferecer apoio para enfrentar
- Choice B (Coragem-10, Justiça-15, Temperança-5, Ataraxia-20) — Epicteto: concordar, ceder à pressão da lealdade

**Cenário 3 — Crise: "O Fracasso Público"**
Erro grave em projeto importante. Equipe e liderança cientes. Opção de minimizar responsabilidade ou assumir integralmente.
- Choice A (Coragem+25, Sabedoria+15, Justiça+10, Ataraxia+20) — Marco Aurélio: assumir, apresentar aprendizado e plano
- Choice B (Sabedoria+10, Temperança+5, Coragem-5, Ataraxia+5) — Sêneca: contextualizar fatores externos sem negar a parte

**Cenário 4 — Saúde: "O Corpo como Instrumento"**
Você está exausto há semanas. Um projeto urgente surge e seu gestor pergunta se você consegue assumir. Sua resposta real é não, mas a pressão é visível.
- Choice A (Temperança+20, Sabedoria+10, Coragem+5, Ataraxia+15) — Epicteto: recusar com honestidade, nomear o limite como sabedoria
- Choice B (Coragem-5, Temperança-15, Sabedoria-5, Ataraxia-15) — Sêneca: aceitar, sacrificar o corpo pelo dever externo

**Cenário 5 — Filosofia: "A Opinião Alheia"**
Você compartilha publicamente uma posição impopular e recebe críticas intensas. Parte das críticas é válida. Você pode recuar publicamente ou sustentar sua posição com refinamentos.
- Choice A (Sabedoria+20, Coragem+15, Justiça+5, Ataraxia+20) — Marco Aurélio: sustentar com refinamentos, incorporar críticas válidas sem capitular
- Choice B (Temperança+5, Coragem-20, Sabedoria-10, Ataraxia-10) — Sêneca: recuar publicamente para evitar conflito

---

## 6. Design System

### 6.1 Paleta de cores

```css
/* Backgrounds */
--obsidian:    #0D0D0D  /* bg principal */
--obsidian-2:  #141414  /* header, sidebar */
--obsidian-3:  #1C1C1C  /* cards de choice */
--obsidian-4:  #242424  /* hover */
--obsidian-5:  #2E2E2E  /* tracks vazios */

/* Bronze — cor de destaque primária */
--bronze:       #B87333
--bronze-light: #D4A574
--bronze-dark:  #8B5E2A

/* Texto */
--ivory:      #F5F0E8  /* texto primário */
--ivory-dim:  #C8C0B0  /* texto secundário */
--text-muted: #8A8070  /* labels e meta */
--text-dim:   #5A5248  /* hints */

/* Virtudes — cores semânticas fixas */
--wisdom:     #7F77DD  /* Sabedoria — roxo */
--courage:    #E24B4A  /* Coragem — vermelho */
--justice:    #1D9E75  /* Justiça — verde */
--temperance: #EF9F27  /* Temperança — âmbar */

/* Impact pills */
--impact-pos-bg:     #1A2E20
--impact-pos-text:   #4ECB84
--impact-pos-border: #1F4028
--impact-neg-bg:     #2E1A1A
--impact-neg-text:   #E24B4A
--impact-neg-border: #401F1F
```

### 6.2 Tipografia

| Uso | Fonte | Peso | Tamanho | Letter-spacing |
|---|---|---|---|---|
| Logo / Marca | Cinzel | 400 | 13px | 3px |
| Títulos de cenário | Cinzel | 600 | 20px | normal |
| Nome do perfil (result) | Cinzel | 700 | 22px | normal |
| Valores numéricos | Cinzel | 600 | 12–22px | normal |
| Citações (feedback) | Cinzel | 400 | 15px | normal |
| Botão CTA | Cinzel | 600 | 11px | 2px |
| Descrições / corpo | Inter | 300 | 13.5px | normal |
| Labels uppercase | Inter | 500 | 9–10px | 2–3px |
| Feedback text | Inter | 300 | 12.5px | normal |

**Regra:** nunca misturar Cinzel e Inter na mesma linha. Cinzel = identidade e dados. Inter = narrativa e instrução.

### 6.3 Bordas e raios

```
Border padrão:       1px solid #2A2520
Border destaque:     1px solid var(--bronze-dark)
Border-radius cards: 4px
Border-radius pills: 2px
Border-radius selo:  50%
Divider:             1px, gradiente bronze → transparent, width 40px
```

### 6.4 Animações

```css
/* Barras de progresso (Ataraxia e Virtudes) */
transition: width 0.8s cubic-bezier(.4, 0, .2, 1);
/* Aplicar após 50ms de delay do DOM update via setTimeout */

/* Entrada do Feedback Overlay */
animation: fadeIn 200ms ease-in;
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* Saída do Feedback Overlay (antes de renderizar próximo cenário) */
animation: fadeOut 150ms ease-out;
/* Controlar via state, não via CSS puro — remover do DOM após animação */

/* Result Screen entrada */
animation: slideUp 400ms ease;
@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**Proibido:** pulse, glow, shimmer, neon, gradiente animado, loop infinito de qualquer tipo.

---

## 7. Estrutura de Componentes

```
src/
├── data/
│   └── scenarios.ts          # SCENARIOS: Scenario[] — os 5 dilemas
├── types/
│   └── index.ts              # Todos os types do item 3.1
├── hooks/
│   └── useGameState.ts       # Reducer + actions + localStorage sync
├── utils/
│   ├── gameLogic.ts          # makeChoice(), getProfile(), clamp()
│   └── storage.ts            # saveSession(), loadHistory()
└── components/
    ├── App.tsx                # Roteamento de fase (intro/game/result)
    ├── IntroScreen.tsx        # Tela inicial — logo, descrição, botão iniciar
    ├── GameLayout.tsx         # Grid principal: Arena + Sidebar
    ├── Header.tsx             # Logo + Ataraxia bar
    ├── Arena.tsx              # Scenario meta + title + description + choices
    ├── ChoiceButton.tsx       # Botão individual de escolha com impact pills
    ├── Sidebar.tsx            # 4 virtue bars
    ├── VirtueBar.tsx          # Item individual de virtude
    ├── FeedbackOverlay.tsx    # Modal de citação + impacto + "Continuar"
    ├── ResultScreen.tsx       # Tela final — perfil + virtudes + share
    └── ResultCard.tsx         # Componente isolado capturado pelo html2canvas
```

### 7.1 `useGameState.ts`

```typescript
// Padrão useReducer + dispatch
// Actions: START_GAME | MAKE_CHOICE | NEXT_SCENARIO | RESET
// Salvar no localStorage a cada transição de fase (via useEffect)
// Não expor o dispatch diretamente — expor funções nomeadas:
//   startGame(), makeChoice(index), nextScenario(), resetGame()
```

### 7.2 `Header.tsx`

```
Layout: flex, space-between, align-center
Padding: 16px 24px
Background: #141414
Border-bottom: 1px solid #2A2520

Esquerda:
  Logo "Ἄσκησις · Práxis Estoica"
  Font: Cinzel 400 13px, color #B87333, letter-spacing 3px

Direita (Ataraxia):
  Label "ATARAXIA" — Inter 500 10px, #8A8070, letter-spacing 2px
  Track: 120px × 4px, bg #2E2E2E, border-radius 2px
    Fill: gradiente linear(#8B5E2A, #B87333, #D4A574)
    Transição: width 0.8s cubic-bezier(.4,0,.2,1)
  Valor numérico: Cinzel 11px, #B87333, min-width 32px
```

### 7.3 `Arena.tsx`

```
Padding: 28px 24px
Flex-direction: column

Scenario Meta (flex row, gap 10px):
  Category badge:
    Font: Inter 500 9px, letter-spacing 2.5px, uppercase
    Color: #B87333
    Border: 1px solid #3A2E22
    Background: #1A1510
    Padding: 3px 10px, border-radius 2px
  Step indicator:
    "Dilema N de 5"
    Font: Inter 400 10px, #5A5248, letter-spacing 1px

Scenario Title:
  Font: Cinzel 600 20px, #F5F0E8, line-height 1.3
  Margin-bottom: 14px

Divider:
  Width: 40px, height: 1px
  Background: linear-gradient(90deg, #B87333, transparent)
  Margin-bottom: 14px

Scenario Description:
  Font: Inter 300 13.5px, #C8C0B0, line-height 1.8
  Margin-bottom: 28px

Choices Container:
  Flex-col, gap 10px
```

### 7.4 `ChoiceButton.tsx`

```
Props: choice: Choice, onSelect: () => void

Container:
  Background: #1C1C1C
  Border: 1px solid #2A2520
  Border-radius: 4px
  Padding: 14px 16px
  Cursor: pointer
  Position: relative, overflow: hidden

  ::before pseudo-element:
    Position: absolute, left 0, top 0, bottom 0
    Width: 3px, background: #B87333
    Opacity: 0 por padrão → 1 no hover
    Transition: opacity 200ms

  Hover state:
    Border-color: #8B5E2A
    Background: #242424

Interno (flex-col, gap 4px):
  Philosopher label:
    Font: Inter 500 9px, letter-spacing 2px, uppercase, #B87333

  Choice text:
    Font: Inter 400 13px, #F5F0E8, line-height 1.5

  Impact pills (flex row, gap 6px, margin-top 8px):
    Positivo: bg #1A2E20, text #4ECB84, border 1px #1F4028
    Negativo: bg #2E1A1A, text #E24B4A, border 1px #401F1F
    Font: Inter 500 9px, padding 2px 7px, border-radius 2px, letter-spacing 0.5px
    Labels abreviados: Sab / Cor / Jus / Tem / Atar
```

### 7.5 `Sidebar.tsx` + `VirtueBar.tsx`

```
Sidebar:
  Width: 200px
  Background: #141414
  Border-left: 1px solid #1E1A16
  Padding: 24px 16px

  Título "VIRTUDES CARDEAIS":
    Inter 500 9px, letter-spacing 2.5px, uppercase, #5A5248
    Margin-bottom: 18px

  Lista: flex-col, gap 16px

VirtueBar (por virtude):
  Header: flex, space-between, align-center
    Name: Inter 500 10px, letter-spacing 1.5px, uppercase, #8A8070
    Value: Cinzel 600 12px, cor semântica da virtude

  Track: 100% × 3px, bg #1E1E1E, border-radius 1px, overflow hidden
    Fill: cor semântica, transição 0.8s cubic-bezier(.4,0,.2,1)
```

### 7.6 `FeedbackOverlay.tsx`

```
Container:
  Position: absolute, inset 0
  Background: rgba(13,13,13,0.97)
  Display: flex, align-center, justify-center
  Z-index: 10
  Padding: 28px
  Animation: fadeIn 200ms ease-in na entrada

Feedback Card (max-width 480px, text-align center):

  Philosopher label:
    "— Marco Aurélio" / "— Sêneca" / "— Epicteto"
    Inter 500 10px, letter-spacing 3px, uppercase, #B87333
    Margin-bottom: 20px

  Quote block:
    Font: Cinzel 400 15px, #F5F0E8, line-height 1.7
    Padding: 0 12px
    Position: relative
    ::before: content '"', font-size 48px, #8B5E2A, absolute top-left

  Feedback text:
    Inter 300 12.5px, #C8C0B0, line-height 1.7
    Margin-bottom: 24px

  Impact pills (justify-center, flex-wrap):
    Mesmo estilo do ChoiceButton mas com labels completos:
    Sabedoria / Coragem / Justiça / Temperança / Ataraxia

  Botão "Continuar →":
    Background: transparent
    Border: 1px solid #B87333
    Color: #B87333
    Font: Cinzel 600 11px, letter-spacing 2px, uppercase
    Padding: 10px 28px, border-radius 2px
    Hover: background #B87333, color #0D0D0D
    Transition: all 200ms
```

### 7.7 `ResultScreen.tsx`

```
Container: flex-col, align-center, justify-center, min-height 500px, text-center
Padding: 28px 24px
Animation: slideUp 400ms ease na entrada

Componente ResultCard (capturável pelo html2canvas):
  → Documentado separadamente no item 7.8

Botão Share:
  Background: #B87333
  Color: #0D0D0D
  Font: Cinzel 600 11px, letter-spacing 2px, uppercase
  Padding: 12px 28px, border-radius 2px
  Ícone Download (Lucide): 16px, margin-right 8px
  Texto: "Baixar Card para LinkedIn"

Botão Reset:
  Background: transparent
  Border: 1px solid #2E2E2E
  Color: #5A5248
  Font: Inter 400 10px, letter-spacing 2px, uppercase
  Padding: 8px 20px, border-radius 2px
  Margin-top: 10px
  Texto: "Jogar Novamente"
```

### 7.8 `ResultCard.tsx` — Componente para Export

```
IMPORTANTE: usar hex values hardcoded — sem CSS custom properties.
Dimensões fixas: width 800px, height 450px (landscape LinkedIn).
Não responsivo — este componente existe apenas para captura.
Visualmente oculto por padrão (position absolute, left -9999px) ou em um
portal fora do viewport. html2canvas o captura pelo ref.

Layout interno:
  Background: #0D0D0D
  Border: 1px solid #8B5E2A
  Padding: 40px 48px
  Display: flex, flex-direction: column, justify: space-between

  Topo (flex, space-between):
    Esquerda:
      Tagline "PERFIL ESTOICO DO DIA"
      Inter 500 9px, #8A8070, letter-spacing 3px, uppercase
    Direita:
      Logo "Ἄσκησις"
      Cinzel 400 11px, #B87333, letter-spacing 3px

  Centro (flex, align-center, gap 32px):
    Selo (80px × 80px):
      Border: 2px solid #B87333, border-radius 50%
      Inner ring: inset 4px, border 1px solid #8B5E2A
      Ícone unicode 28px (◎ ◈ ⊕ ◉)

    Texto central (flex-col, gap 6px):
      Nome do perfil: Cinzel 700 28px, #F5F0E8
      Ataraxia: "ATARAXIA · 78%" — Inter 500 11px, #B87333, letter-spacing 2px
      Descrição do perfil: Inter 300 13px, #8A8070, font-style italic

  Grid de virtudes (4 cards em linha, gap 12px):
    Cada card: bg #1C1C1C, border 1px #2A2520, border-radius 4px, padding 10px 14px
      Label: Inter 500 8px, letter-spacing 2px, uppercase, #5A5248
      Valor: Cinzel 600 20px, cor semântica da virtude

  Rodapé (flex, space-between, align-center):
    Data: Inter 400 10px, #5A5248
    URL: "askesis.app" — Inter 400 10px, #5A5248
```

---

## 8. Persistência (localStorage)

```typescript
// utils/storage.ts

const STORAGE_KEY = 'askesis_history';
const MAX_SESSIONS = 10;

export function saveSession(session: StoredSession): void {
  const existing = loadHistory();
  const updated = [session, ...existing].slice(0, MAX_SESSIONS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function loadHistory(): StoredSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
```

**Quando salvar:** apenas na transição `feedback → result` (última rodada). Não salvar a cada escolha.

---

## 9. Export para LinkedIn (html2canvas)

```typescript
// Em ResultScreen.tsx

const cardRef = useRef<HTMLDivElement>(null);

async function handleExport(): Promise<void> {
  if (!cardRef.current) return;

  const canvas = await html2canvas(cardRef.current, {
    backgroundColor: '#0D0D0D',
    scale: 2,              // 2x para qualidade em telas retina
    useCORS: true,
    logging: false,
  });

  const link = document.createElement('a');
  link.download = `askesis-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
```

**Output esperado:** PNG 1600×900px (800×450 em scale 2), fundo escuro com borda bronze, pronto para upload no LinkedIn como imagem de post.

---

## 10. Responsividade

```
Breakpoint: 640px (Tailwind: sm)

> 640px (desktop):
  Main grid: grid-cols [1fr 200px]
  Sidebar: posicionada à direita
  FeedbackOverlay: position absolute sobre o main

≤ 640px (mobile):
  Main: flex-col
  Sidebar: colapsa para barra horizontal no TOPO da arena
    → 4 virtue items em grid 2×2 compacto
    → Track de 60px, valor em 10px
    → Antes das choices, abaixo do título
  FeedbackOverlay: position fixed, inset 0 (cobre toda a tela)
  ResultCard: max-width 360px (card portrait adaptado — não capturar em mobile)
  ChoiceButton: padding reduzido para 10px 12px
```

---

## 11. Intro Screen

Tela exibida antes do primeiro dilema (`phase === 'intro'`).

```
Background: #0D0D0D, full height, flex-col, align-center, justify-center, text-center
Padding: 48px 24px

Símbolo: "⊕" — Cinzel 48px, #B87333
Margin-bottom: 16px

Título: "Ἄσκησις" — Cinzel 700 32px, #F5F0E8, letter-spacing 4px
Subtítulo: "Práxis Estoica" — Cinzel 400 14px, #8A8070, letter-spacing 6px
Margin-bottom: 32px

Divider: 60px × 1px, gradiente bronze, mx-auto
Margin-bottom: 32px

Descrição (max-width 420px):
  Inter 300 14px, #C8C0B0, line-height 1.9
  "Cinco dilemas. Quatro virtudes. Um reflexo do seu caráter.
   Escolha com sabedoria — cada decisão moldará seu perfil estoico."

Margin-bottom: 40px

Botão "Iniciar a Práxis":
  Estilo idêntico ao botão "Continuar" do Feedback Overlay
  Padding: 12px 36px
```

---

## 12. Ordem de Implementação (para Claude Code)

Executar uma etapa por vez, verificar o critério de sucesso antes de avançar.

**Etapa 1 — Fundação**
Setup Vite + React + TypeScript + Tailwind. Instalar dependências: `html2canvas`, `lucide-react`. Configurar Google Fonts no `index.html`. Criar `types/index.ts` e `data/scenarios.ts` com os 5 cenários completos.
Critério: `npm run dev` sem erros, `console.log(SCENARIOS.length)` retorna 5.

**Etapa 2 — Estado e Lógica**
Implementar `useGameState.ts` com useReducer, `gameLogic.ts` e `storage.ts`.
Critério: testar `makeChoice()` e `getProfile()` com snapshots de valores — confirmar que clamp funciona e que o perfil dominante é o correto para cada combinação.

**Etapa 3 — Componentes base**
`Header`, `Sidebar`, `VirtueBar`, `Arena`, `ChoiceButton`. Aplicar design system completo.
Critério: tela de jogo renderiza o cenário 1 com barras de virtude animando ao clicar em qualquer choice.

**Etapa 4 — Feedback e fluxo completo**
`FeedbackOverlay` com animações de entrada/saída. `IntroScreen`. Transições de fase.
Critério: fluxo completo de 5 cenários sem nenhum erro de console, ataraxia e virtudes atualizando corretamente.

**Etapa 5 — Result e Export**
`ResultScreen`, `ResultCard` (isolado para html2canvas), botão de download.
Critério: PNG gerado tem 1600×900px, fundo escuro, sem texto cortado, sem layout quebrado.

**Etapa 6 — Polish e Persistência**
localStorage, animação slideUp do ResultScreen, ajustes mobile.
Critério: reload da página não perde histórico; em 375px de largura o layout não quebra.

---

## 13. Restrições e Proibições

- Não usar `any` no TypeScript — strict mode ativo
- Não usar inline styles no Tailwind quando uma classe já existe
- Não inventar citações filosóficas — todas as quotes devem ser verificáveis
- Não adicionar bibliotecas além das listadas sem justificativa explícita
- Não animar nada em loop infinito
- Não usar gradientes ou sombras fora dos casos especificados nesta spec
- `ResultCard.tsx` não deve usar CSS custom properties — somente hex hardcoded
- O botão de reset deve limpar o estado do React mas nunca o localStorage
