leta de Cores
--obsidian:       #0D0D0D  (background principal)
--obsidian-2:     #141414  (header, sidebar)
--obsidian-3:     #1C1C1C  (cards de escolha)
--obsidian-4:     #242424  (hover estado)
--obsidian-5:     #2E2E2E  (tracks vazios)

--bronze:         #B87333  (cor de destaque primária)
--bronze-light:   #D4A574  (gradiente fill ataraxia)
--bronze-dark:    #8B5E2A  (bordas, detalhes sutis)

--ivory:          #F5F0E8  (texto principal)
--ivory-dim:      #C8C0B0  (texto secundário / descrições)
--text-muted:     #8A8070  (labels, meta-info)
--text-dim:       #5A5248  (hints, placeholders)

--wisdom:         #7F77DD  (sabedoria — roxo)
--courage:        #E24B4A  (coragem — vermelho)
--justice:        #1D9E75  (justiça — verde)
--temperance:     #EF9F27  (temperança — âmbar)

impact-pos bg:    #1A2E20 / text: #4ECB84 / border: #1F4028
impact-neg bg:    #2E1A1A / text: #E24B4A / border: #401F1F
Tipografia
Cinzel (Google Fonts)          → títulos, logo, valores numéricos, botões CTA
Cinzel Decorative (opcional)   → elementos de selo/resultado
Inter                          → corpo, descrições, labels

Pesos usados: 300 (descrições), 400 (corpo), 500 (labels), 600/700 (títulos Cinzel)
Letter-spacing: 2–3px em labels uppercase, 1–1.5px em virtue names
Layout Estrutural
Single Page — sem scroll lateral

Header (fixo no topo)
├── Logo: "Ἄσκησις · Práxis Estoica" (Cinzel, bronze, letter-spacing 3px)
└── Ataraxia Bar: label + track 120px + valor numérico

Main (grid 2 colunas: 1fr | 200px)
├── Arena (coluna esquerda, padding 28px 24px)
│   ├── Scenario Meta: badge de categoria + "Dilema N de 3"
│   ├── Scenario Title (Cinzel 20px, ivory)
│   ├── Divider (40px, gradiente bronze → transparent)
│   ├── Scenario Description (Inter 13.5px, 300 weight, ivory-dim)
│   └── Choices Container (flex-col, gap 10px)
└── Sidebar (200px, obsidian-2, border-left 1px #1E1A16)
    └── Virtue List (4 itens, flex-col, gap 16px)

Feedback Overlay (position absolute, inset 0, z-index 10)
└── Feedback Card (max-width 480px, centralizado)

Result Screen (substitui Main inteiro)
└── Centered column layout
Componentes Detalhados
Header Ataraxia Bar
Track: 120px × 4px, background obsidian-5, border-radius 2px
Fill: gradiente linear bronze-dark → bronze → bronze-light
Transição: width 0.8s cubic-bezier(.4,0,.2,1)
Valor: Cinzel 11px, cor bronze
Choice Button
Background: obsidian-3
Border: 1px solid #2A2520
Border-radius: 4px
Padding: 14px 16px
Hover: border-color bronze-dark, background obsidian-4
::before pseudo: 3px left border bronze, opacity 0 → 1 no hover
Estrutura interna:
  - Philosopher label: 9px, letter-spacing 2px, uppercase, bronze
  - Choice text: 13px, ivory
  - Impact pills: flex row, gap 6px
Impact Pills
Positivo: bg #1A2E20, text #4ECB84, border 1px #1F4028
Negativo: bg #2E1A1A, text #E24B4A, border 1px #401F1F
Font: 9px, padding 2px 7px, border-radius 2px, letter-spacing 0.5px
Virtue Bar (Sidebar)
Label: 10px, letter-spacing 1.5px, uppercase, text-muted
Valor: Cinzel 12px, cor semântica da virtude
Track: 100% × 3px, background #1E1E1E, border-radius 1px
Fill: cor semântica, transição 0.8s cubic-bezier
Feedback Overlay
Background: rgba(13,13,13,0.97) — quase opaco, não totalmente
Citação: Cinzel 15px, line-height 1.7, com aspas decorativas gigantes
  - ::before: content '"', 48px, bronze-dark, absolute top-left
Texto de feedback: Inter 12.5px, 300 weight, ivory-dim
Botão "Continuar": border 1px bronze, Cinzel 11px, letter-spacing 2px
  - Hover: background bronze, color obsidian
Result Screen
Selo circular: 80px × 80px, border 2px bronze, border-radius 50%
  - Inner ring: ::after inset 4px, border 1px bronze-dark
  - Ícone central: 28px (◎ ◈ ⊕ ◉ variando por perfil dominante)
Profile name: Cinzel 22px 700, ivory
Ataraxia text: 12px, bronze, letter-spacing 1px
Virtues grid: 2×2, gap 10px, max-width 320px
  - Each card: obsidian-3, border 1px #2A2520, border-radius 4px, padding 10px
  - Label: 8px, letter-spacing 2px, text-dim
  - Valor: Cinzel 22px, cor semântica
Share button: background bronze, color obsidian, Cinzel 11px 600, letter-spacing 2px
Reset button: border obsidian-5, text-dim, 10px