# Design System · Práxis Estoica

Este documento reúne todas as diretrizes visuais, tokens de estilo, componentes de interface e regras de design que governam a experiência do mini-RPG **Ἄσκησις · Práxis Estoica**.

---

## 🎨 Paleta de Cores (Tokens de Estilo)

A identidade visual do projeto foi pensada sob uma ótica estoica: tons escuros que simbolizam introspecção e sobriedade, contrastados com a riqueza clássica do bronze antigo.

### 1. Tons de Obsidian (Backgrounds e Superfícies)
- **`--obsidian` (`#0D0D0D` / `bg-obsidian`):** Cor de fundo principal da aplicação. Representa sobriedade e escuridão.
- **`--obsidian-2` (`#141414` / `bg-obsidian-2`):** Superfícies elevadas (Header e Sidebar em modo desktop).
- **`--obsidian-3` (`#1C1C1C` / `bg-obsidian-3`):** Cor de fundo dos cards de dilemas e botões de escolha.
- **`--obsidian-4` (`#242424` / `bg-obsidian-4`):** Estado de hover nos botões de escolha.
- **`--obsidian-5` (`#2E2E2E` / `bg-obsidian-5`):** Tracks vazios de progresso (Ataraxia e Virtudes).

### 2. Tons de Bronze (Destaque e Identidade)
- **`--bronze` (`#B87333` / `text-bronze` ou `border-bronze`):** Cor primária de destaque, representando ouro clássico e nobreza de espírito.
- **`--bronze-light` (`#D4A574` / `bg-bronze-light`):** Extremo luminoso da barra de Ataraxia e elementos ativos.
- **`--bronze-dark` (`#8B5E2A` / `text-bronze-dark` ou `border-bronze-dark`):** Detalhes discretos, bordas de cards e transição da barra de Ataraxia.

### 3. Tons de Ivory (Texto e Legibilidade)
- **`--ivory` (`#F5F0E8` / `text-ivory`):** Texto principal de alta legibilidade (branco marfim clássico).
- **`--ivory-dim` (`#C8C0B0` / `text-ivory-dim`):** Texto secundário (descrições narrativas de dilemas).
- **`--text-muted` (`#8A8070` / `text-ivory-muted`):** Metadados, labels e indicadores informativos.
- **`--text-dim` (`#5A5248` / `text-ivory-dimmed`):** Textos discretos de rodapé, marcas d'água e placeholders.

### 4. Cores das Virtudes Cardeais
- **Sabedoria (Wisdom):** `#7F77DD` (`text-wisdom` / `bg-wisdom`) — Roxo espiritual e analítico.
- **Coragem (Courage):** `#E24B4A` (`text-courage` / `bg-courage`) — Vermelho firmeza e força moral.
- **Justiça (Justice):** `#1D9E75` (`text-justice` / `bg-justice`) — Verde equidade e bem comum.
- **Temperança (Temperance):** `#EF9F27` (`text-temperance` / `bg-temperance`) — Âmbar autodisciplina e moderação.

### 5. Pílulas de Impacto (Variação de Virtude)
- **Positivo:** Fundo `#1A2E20` (`bg-impact-pos-bg`), Texto `#4ECB84` (`text-impact-pos-text`), Borda `#1F4028` (`border-impact-pos-border`).
- **Negativo:** Fundo `#2E1A1A` (`bg-impact-neg-bg`), Texto `#E24B4A` (`text-impact-neg-text`), Borda `#401F1F` (`border-impact-neg-border`).

---

## font-family Tipografia

O design typographic impõe um contraste clássico-moderno estrito:

1. **Cinzel (Google Fonts):** Usada para títulos, marca (logo), valores numéricos de dados e botões de chamada para ação (CTA). Representa o rigor epigráfico e a herança greco-romana.
2. **Inter:** Usada para a narrativa, descrições secundárias, feedbacks dos filósofos e rótulos secundários. Oferece alta legibilidade para telas em textos densos.

### Regra de Ouro da Tipografia
> [!IMPORTANT]
> **Nunca** misturar as fontes Cinzel e Inter na mesma linha de texto. Títulos e dados quantitativos são expressos em Cinzel; narrativas e instruções são expressas em Inter.

- **Pesos Utilizados:**
  - `300` (Inter): Descrições narrativas de dilemas e corpo de citação.
  - `400` (Inter / Cinzel): Textos secundários, atalhos, logo "Ἄσκησις".
  - `500` (Inter): Labels uppercase com espaçamento estendido.
  - `600` / `700` (Cinzel): Títulos principais, valores numéricos da Arena e Sidebar, botões.
- **Letter-spacing (Espaçamento de Letras):**
  - Labels uppercase: `2px` a `3px` de tracking.
  - Título do logo secundário: `6px` de tracking.

---

## 📐 Layout Estrutural e Responsividade

A aplicação é projetada para rodar em **Página Única (Single Page)**, sem barras de scroll desnecessárias em telas comuns de desktop.

### 1. Grade Principal (Desktop - acima de `640px`):
- **Header:** Fixo no topo contendo o logotipo estendido ("Ἄσκησις · Práxis Estoica") à esquerda e o indicador dinâmico de Ataraxia à direita.
- **Área Central:** Dividida em duas colunas:
  - **Arena (Coluna Esquerda - `1fr`):** Espaço para o dilema atual, contendo categoria, título, descrição narrativa e botões de escolha.
  - **Sidebar (Coluna Direita - `200px`):** Painel vertical para a exibição das barras de progresso das quatro Virtudes Cardeais.

### 2. Layout Compacto (Mobile - abaixo de `640px`):
- **Fluxo Vertical:** O layout se adapta para uma única coluna contínua.
- **Sidebar Colapsada:** O painel de virtudes se transforma em um grid horizontal compacto (`2x2`) posicionado no **topo da Arena**, logo abaixo dos metadados do cenário.
- **Feedback Overlay:** O modal de consequência e citação de filósofo ocupa `100vh` (tela cheia fixa), garantindo foco total do jogador.

---

## ⚡ Efeitos Visuais e Imersão Dinâmica

### 1. Fundo de Partículas Sóbrias
Cinco partículas sutis de luz cinza (`opacity-[0.03]` a `opacity-[0.09]`) flutuam lentamente ao fundo em direções variadas com loops contínuos de `28s` a `42s` de duração. O efeito adiciona profundidade espacial à interface sem gerar distrações cognitivas.

### 2. Vinheta de Crise (Ataraxia Sob Pressão)
Quando os níveis de **Ataraxia caem abaixo de 40%**, o aplicativo ativa a **Vinheta de Crise**:
- Uma sombra interna sutil de `rgba(0,0,0,0.85)` envolve as bordas do navegador.
- Toda a aplicação recebe um filtro de redução de saturação gradual (`saturate-[0.85]`), tornando as cores levemente mais cinzentas para passar uma sensação de urgência psicológica.

### 3. Pílulas Flutuantes de Delta na Sidebar
Ao receber uma alteração de estado no final de um dilema, uma pílula com o delta de variação (Ex: `+15` na cor verde ou `-10` na cor vermelha) aparece sobre a respectiva virtude na Sidebar, flutuando verticalmente e sumindo suavemente em `800ms` usando a animação `animate-float-up`.

---

## 🧩 Componentes Chave

- **ChoiceButton:** O botão de escolha possui borda discreta e um filete vertical bronze oculto à esquerda que se ilumina (`opacity-100`) durante a interação por hover. Mostra pílulas abreviadas dos impactos nas virtudes cardeais (`Sab / Cor / Jus / Tem / Atar`).
- **FeedbackOverlay:** Apresenta a citação com aspas gigantes decorativas (`font-size: 48px`, cor bronze escuro) e o texto de consequência estoica estruturado. As pílulas de impacto aqui são exibidas com os nomes por extenso das virtudes.
- **ResultCard (Captura de Imagem):** Um componente invisível no fluxo principal que possui dimensões travadas de `800x450px` e estilos puramente estáticos (`hexadecimais hardcoded`, sem variáveis CSS) para garantir que a biblioteca `html2canvas` gere a imagem sem problemas de CORS ou falha de cor. Ao exportar em escala `2`, resulta em um PNG de postagem do LinkedIn de alta definição (`1600x900px`).