# Ἄσκησις · Práxis Estoica — Especificação Técnica Completa

> **Documento de Referência da Arquitetura e Engenharia do Projeto.**  
> Este documento representa o estado atual do projeto, documentando toda a lógica de negócio, tipos, regras de balanceamento de mecânicas, fluxos de persistência e decisões de design aplicados.

---

## 1. Visão Geral do Produto

**Práxis Estoica** (Ἄσκησις) é um micro-RPG interativo de texto de página única. O jogador é confrontado com dilemas éticos cotidianos e escolhas morais sob a ótica dos grandes filósofos do estoicismo clássico: **Marco Aurélio**, **Sêneca** e **Epicteto**.

Cada decisão altera dinamicamente os níveis de suas quatro virtudes cardeais (Sabedoria, Coragem, Justiça e Temperança) e sua paz interior (Ataraxia). Ao final da jornada, o sistema gera um arquétipo de caráter predominante e possibilita a exportação de um card visual de resultados projetado especificamente para compartilhamento no LinkedIn.

---

## 2. Stack Técnico

| Camada | Tecnologia / Biblioteca | Finalidade |
|---|---|---|
| **Framework** | React 18 + Vite | Estruturação do fluxo SPA rápido. |
| **Linguagem** | TypeScript (Strict Mode) | Robustez e segurança de tipos em toda a aplicação. |
| **Estilização** | Tailwind CSS v3 | Design system utilitário e responsividade móvel. |
| **Ícones** | Lucide React | Ícones vetoriais modernos de interface. |
| **Fontes** | Google Fonts | Cinzel (títulos e dados) e Inter (corpo e narrativa). |
| **Exportação** | html2canvas v1.4+ | Renderização do card DOM em imagem de alta definição. |
| **Persistência** | localStorage | Salvamento de progresso e estatísticas históricas localmente. |

---

## 3. Estrutura de Tipos e Dados

Os tipos de dados definidos em [`src/types/index.ts`](file:///c:/Users/eanes/.gemini/antigravity/scratch/mini_rpg/src/types/index.ts) garantem a coerência de estado entre os módulos de lógica de jogo e de renderização.

```typescript
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
  impact: Partial<Virtues>;   // Deltas de impacto: ex. { wisdom: +15, courage: -5 }
  ataraxiaImpact: number;     // Alteração na paz de espírito (Ataraxia)
  feedback: string;           // Consequência descritiva sob a perspectiva do filósofo
  archetype: ArchetypeKey;    // Perfil de caráter que esta escolha favorece
  portraitSvg?: string;       // Retrato do filósofo codificado em SVG inline
}

export interface Scenario {
  id: string;
  category: ScenarioCategory;
  title: string;
  description: string;        // Descrição narrativa em 2-4 frases
  choices: [Choice, Choice];  // Exatamente duas escolhas (Tupla estruturada)
}

export interface ChoiceRecord {
  scenarioId: string;
  choiceIndex: 0 | 1 | -1;    // -1 indica cenários jogados em outras jornadas ou skipados
  timestamp: number;
}

export type GamePhase = 'intro' | 'game' | 'feedback' | 'result';

export interface GameState {
  virtues: Virtues;
  ataraxia: number;
  currentScenarioIndex: number;
  choicesHistory: ChoiceRecord[];
  phase: GamePhase;
  lastChoice: Choice | null;     // Última escolha feita (exibida no overlay de feedback)
  sessionScenarios: Scenario[];   // Cenários selecionados para a rodada atual
  isDailyChallenge?: boolean;     // Indica se está no Desafio Diário
  isQuickMode?: boolean;          // Indica se está no Modo Rápido (3 dilemas)
  dailyDateSeed?: string;         // Seed de data no formato YYYY-MM-DD
}

export interface Profile {
  name: string;                   // Ex: "O Árbitro Justo Iluminado"
  archetype: ArchetypeKey;
  icon: string;                   // Símbolo unicode representativo (◎ ◈ ⊕ ◉)
  description: string;            // Resumo descritivo da mentalidade do perfil
}

export interface StoredSession {
  date: string;                   // Formato ISO
  profile: string;                // Nome do perfil obtido
  ataraxia: number;
  virtues: Virtues;
}
```

---

## 4. Lógica de Sorteio e Balanceamento

### 4.1 Sorteio Pura de Cenários (PRNG com Seed)
A seleção de dilemas é realizada em [`src/utils/gameLogic.ts`](file:///c:/Users/eanes/.gemini/antigravity/scratch/mini_rpg/src/utils/gameLogic.ts). Para garantir que o **Desafio Diário** seja idêntico para todos os jogadores no mesmo dia, utiliza-se um gerador de números pseudo-aleatórios (PRNG) baseado em seno com seed correspondente ao dia civil local (`YYYY-MM-DD`):

- **Jornada Clássica:** Sorteia 5 dilemas (1 de cada uma das 5 categorias disponíveis). Filtra e exclui cenários já jogados anteriormente (persistidos em `PlayedIndex`) para priorizar cenários inéditos.
- **Desafio Diário:** Sorteia 5 dilemas de forma determinística com base no seed da data. Não filtra cenários já jogados para garantir a consistência global do desafio diário.
- **Modo Rápido:** Sorteia apenas 3 dilemas rápidos das categorias Trabalho, Vida Pessoal e Crise.

### 4.2 Máquina de Estados e Motor de Decisões
A transição de estados segue o ciclo:
```
intro (Escolha de Modo) ──> game (Cenário) ──> feedback (Overlay do Filósofo) ──> game (Próximo) ──> result (Perfil e Exportação)
```
- Cada escolha aplica os deltas nas virtudes acumuladas e na Ataraxia, limitando as pontuações entre `0` e `100` via função `clamp`.
- Os cenários de dilemas são calibrados para evitar flutuações extremas, garantindo que as médias históricas convirjam para patamares realistas.

### 4.3 Algoritmo de Geração de Perfil
Para determinar o arquétipo de caráter predominante do jogador ao final da jornada, é realizada uma ponderação matemática sobre as virtudes com o intuito de evitar empates e perfis genéricos:

```typescript
const scores: Record<ArchetypeKey, number> = {
  contemplativo: virtues.wisdom * 1.5 + virtues.temperance * 0.5,
  guardião:      virtues.courage * 1.5 + virtues.justice * 0.5,
  árbitro:       virtues.justice * 1.5 + virtues.wisdom * 0.5,
  equilibrado:   virtues.temperance * 1.5 + virtues.courage * 0.5,
};
```
O arquétipo com a maior pontuação ponderada é selecionado. 
- **Tratamento de Empate:** Caso todas as virtudes tenham valores idênticos (por exemplo, no estado inicial de 60), o perfil de caráter padrão atribuído é o **Mestre do Equilíbrio** (`equilibrado`).
- **Sufixos de Nível de Ataraxia:**
  - `Ataraxia >= 80`: Sufixo **" Iluminado"** (Ex: *O Sábio Contemplativo Iluminado*).
  - `Ataraxia < 45`: Sufixo **" em Formação"** (Ex: *O Guardião Inabalável em Formação*).
  - Caso contrário, mantém o nome base do arquétipo.

---

## 5. Pool de Cenários (Dilemas Morais)

O jogo possui **30 dilemas morais** estruturados no arquivo [`src/data/scenarios.ts`](file:///c:/Users/eanes/.gemini/antigravity/scratch/mini_rpg/src/data/scenarios.ts), divididos igualmente em 5 categorias (6 dilemas em cada):

1.  **Trabalho:** Dilemas focados em autoria, reconhecimento, politicagem de escritório, cortes de equipe, assédio profissional de clientes e sabotagem de projetos.
2.  **Vida Pessoal:** Situações envolvendo mentiras protetivas para amigos, equilíbrio entre carreira e dever familiar, inveja de sucesso pessoal, danos a bens materiais e conflito de valores morais íntimos.
3.  **Crise:** Eventos imprevistos e graves como erros públicos de projeto, calúnias corporativas, falência financeira, demissões sem justificativa clara e notícias de saúde limitantes.
4.  **Saúde:** Conflitos envolvendo exaustão crônica, convívio mental com a dor física crônica, abstinência voluntária e moderação, aceitação natural do envelhecimento biológico e hipocondria.
5.  **Filosofia:** Debates sobre partilha pública de opiniões impopulares, integridade comercial contra lucros fáceis, e o confronto da finitude do tempo (Memento Mori).

---

## 6. Persistência de Dados (localStorage)

O gerenciamento de persistência local é centralizado no utilitário [`src/utils/storage.ts`](file:///c:/Users/eanes/.gemini/antigravity/scratch/mini_rpg/src/utils/storage.ts):

1.  **Histórico de Rodadas (`askesis_history`):** Salva as últimas 10 sessões de jogo concluídas com data, perfil, pontuação final de Ataraxia e Virtudes.
2.  **Índice de Cenários Jogados (`askesis_played_index`):** Mantém um índice dos IDs dos dilemas enfrentados por categoria para evitar repetições em novas jornadas. Quando todos os cenários de uma categoria são consumidos, o índice daquela categoria é limpo automaticamente (saturação resolvida).
3.  **Progresso Salvo (`askesis_saved_progress` e `askesis_daily_saved_progress`):** Salva o progresso ativo em tempo real (escolhas, virtudes e Ataraxia acumuladas). Permite que o jogador feche o navegador e retome a jornada exatamente de onde parou através do botão "Retomar Jornada".
4.  **Registro da Alma (`askesis_accum_stats` e `askesis_unique_global_played`):** Acumula estatísticas globais consolidadas:
    - Total de jornadas concluídas.
    - Contagem de cenários únicos enfrentados (X de 30).
    - Médias gerais de pontuação para cada uma das virtudes cardeais.
    - Arquétipo de caráter dominante mais obtido historicamente.
5.  **Desafios Diários (`askesis_daily_completed_dates`):** Registra as datas civis em que o jogador completou com sucesso o Desafio Diário, impedindo múltiplas jogadas no mesmo dia e habilitando o selo dourado correspondente.

---

## 7. Módulo de Estatísticas (StatsScreen) e Redefinição

A interface de estatísticas [`src/components/StatsScreen.tsx`](file:///c:/Users/eanes/.gemini/antigravity/scratch/mini_rpg/src/components/StatsScreen.tsx) exibe os dados consolidados do "Registro da Alma".
- **Reset de Dados:** O jogador pode limpar permanentemente todo o histórico, progresso, índice de jogados e estatísticas acumuladas.
- **Dupla Confirmação:** O botão de reset exige dois cliques sucessivos. Caso o segundo clique não ocorra em até 4 segundos, o botão retorna ao estado padrão de repouso, prevenindo exclusões acidentais.

---

## 8. Exportação de Card para LinkedIn

O componente [`src/components/ResultCard.tsx`](file:///c:/Users/eanes/.gemini/antigravity/scratch/mini_rpg/src/components/ResultCard.tsx) é projetado especificamente para renderização.
- Ele possui dimensões estáticas rígidas de **`800px` de largura por `450px` de altura** (proporção ideal para imagens no feed do LinkedIn).
- **Sem Variáveis CSS:** Não utiliza CSS custom properties, pois a biblioteca `html2canvas` falha ao renderizar cores dinâmicas no canvas. Todas as cores são injetadas como valores hexadecimais estáticos.
- **SVG Inline:** Os retratos dos filósofos são embutidos como strings de dados SVG em [`src/data/portraits.ts`](file:///c:/Users/eanes/.gemini/antigravity/scratch/mini_rpg/src/data/portraits.ts), eliminando qualquer requisição externa de rede (CORS) e evitando contaminação (tainting) de canvas durante a exportação.
- **Alta Resolução:** O canvas é renderizado com `scale: 2`, gerando um arquivo de download PNG de **`1600x900px`** perfeitamente nítido em telas comuns e de alta densidade (Retina).
