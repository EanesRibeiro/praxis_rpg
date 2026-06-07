# Ἄσκησις · Práxis Estoica

**Práxis Estoica** é um micro-RPG interativo de página única desenvolvido para exercitar a tomada de decisões à luz do estoicismo clássico. O jogador assume o controle de suas virtudes e de sua paz interior (Ataraxia) enfrentando dilemas práticos do cotidiano moderno inspirados por ensinamentos históricos de **Marco Aurélio**, **Sêneca** e **Epicteto**.

O projeto foi projetado com uma estética minimalista e premium, utilizando tons de obsidiana e bronze clássico, com micro-animações suaves e tipografia clássica elegante.

---

## 🎮 O Jogo e Mecânicas

### As Quatro Virtudes Cardeais
Ao longo do jogo, suas decisões alteram dinamicamente seus níveis de:
*   **Sabedoria (Wisdom)**: Capacidade de discernir o que é bom, ruim ou indiferente.
*   **Coragem (Courage)**: Firmeza intelectual e moral diante da adversidade e do medo.
*   **Justiça (Justice)**: Ação em prol do bem comum e equidade social.
*   **Temperança (Temperance)**: Autocontrole, moderação de desejos e disciplina biológica.

*Dica: Passe o mouse (ou toque) sobre as barras de virtudes na barra lateral para ler uma explicação detalhada sobre cada uma delas.*

### Ataraxia (A Paz de Espírito)
Representa sua tranquilidade interna. Algumas decisões trazem paz imediata ao abrir mão do controle do que é externo, enquanto outras testam sua serenidade em prol de um dever moral maior.

### Modos de Jogo
Na tela de introdução, o jogador pode escolher entre três modalidades de jornada:
1.  **Jornada Padrão**: O fluxo clássico do jogo com 5 dilemas, sorteando exatamente 1 dilema de cada uma das 5 categorias disponíveis do pool.
2.  **Desafio Diário (☀)**: Uma sequência especial de 5 dilemas que é idêntica para todos os jogadores que jogarem no mesmo dia civil (baseado na data local). Concluir este modo garante um selo visual exclusivo de Desafio Diário no card de resultado.
3.  **Modo Rápido**: Uma jornada ágil contendo apenas 3 dilemas (selecionados das categorias Trabalho, Vida Pessoal e Crise), ideal para sessões rápidas e sem interferir nas estatísticas principais da sua conta.

### Registro da Alma (Estatísticas de Caráter)
O jogo monitora sua progressão ao longo de todas as rodadas completadas, acumulando dados de forma contínua no navegador:
*   **Jornadas Completas**: Quantidade de sessões padrão finalizadas.
*   **Perfil Predominante**: O arquétipo de tomada de decisão em que você mais obteve correspondência historicamente.
*   **Dilemas Enfrentados**: Acompanhamento visual de quantos cenários únicos de ascese você já experimentou (X/30). Um ícone discreto `⚡` é exibido ao lado do título da Arena caso você já tenha enfrentado aquele dilema em rodadas passadas.
*   **Médias Gerais das Virtudes**: A média geral de pontuação obtida em cada virtude cardeal ao longo das partidas.

### Salvamento Ativo de Progresso
Não se preocupe em fechar a aba do navegador. O jogo salva o progresso do dilema e o estado das suas virtudes automaticamente em tempo real. Ao reabrir a página, o botão pulsante **Retomar Jornada** estará disponível para você continuar exatamente de onde parou.

### Exportação e Compartilhamento de Resultados
Ao final de cada jornada de dilemas, você recebe um arquétipo de caráter dominante (ex. *O Sábio Contemplativo*, *O Guardião Inabalável*, *O Árbitro Justo*, *O Mestre do Equilíbrio*) e tem duas opções de compartilhamento:
1.  **Card PNG do LinkedIn**: Gera e faz o download de uma imagem de alta resolução (escala `@2x` de 1600x900px) contendo seu nome, arquétipo, pontuações e nível de Ataraxia.
2.  **Link de Resultado Direto**: Copia um link encriptado em Base64 no hash da URL (ex: `#result=...`). Ao acessar esse link, qualquer pessoa consegue carregar e visualizar diretamente sua tela de resultados para comparar as virtudes.

### Feedback de Impacto e Imersão Estética
O jogo utiliza recursos visuais dinâmicos para aprofundar a experiência reflexiva do jogador:
*   **Pílulas Flutuantes de Impacto**: Ao tomar uma decisão, pequenas pílulas animadas exibem o delta de variação de cada virtude (ex: `+15`, `-10`) flutuando e sumindo suavemente na barra lateral ao longo de `800ms`.
*   **Vinheta de Crise**: Caso seu nível de Ataraxia (paz de espírito) caia abaixo de `40%`, uma vinheta escura é projetada nas bordas da tela e a saturação geral da interface é levemente reduzida, simulando visualmente o peso e a urgência psicológica da situação de desequilíbrio.

### Atalhos de Teclado Rápidos
*   **Espaço ou Enter**: No painel de consequência e citação de feedback do filósofo, pressione qualquer uma dessas teclas para continuar rapidamente para o próximo dilema.
*   **Tecla R**: Em andamento ou na tela de resultados, pressione a tecla `R` para redefinir e reiniciar o jogo (pede confirmação caso você esteja no meio de uma partida ativa).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído usando as melhores práticas de desenvolvimento moderno de web apps de página única:

*   **Vite** + **React 18** + **TypeScript** (Modo estrito para robustez de tipos).
*   **Tailwind CSS v3**: Estilização baseada em utilitários focada no design system premium.
*   **html2canvas**: Renderização e exportação de componentes DOM para imagem de alta resolução na escala `@2x` sem problemas de CORS, graças aos retratos dos filósofos codificados diretamente em **SVG inline**.
*   **Lucide React**: Biblioteca de ícones vetoriais.

---

## ⚙️ Instalação e Execução Local

Para rodar o projeto em sua máquina local, certifique-se de ter o [Node.js](https://nodejs.org/) instalado e siga os passos abaixo:

1.  **Clonar o repositório**:
    ```bash
    git clone https://github.com/EanesRibeiro/praxis_rpg.git
    cd praxis_rpg
    ```

2.  **Instalar as dependências**:
    ```bash
    npm install
    ```

3.  **Executar o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

4.  **Gerar o build de produção**:
    ```bash
    npm run build
    ```

---

## 🚀 Deploy Automatizado (GitHub Pages)

Este repositório está configurado com **GitHub Actions** para automação de CI/CD.

Toda vez que um novo commit é enviado para a branch `main`, o workflow em `.github/workflows/deploy.yml` executa as seguintes tarefas:
1.  Realiza o checkout do repositório.
2.  Instala as dependências de forma limpa.
3.  Executa o build de produção do Vite.
4.  Publica os arquivos gerados no diretório `dist/` na branch `gh-pages` de forma automática.

---

## 🛡️ Práticas de Segurança e Integridade

*   **Sem Credenciais no Código**: O projeto não utiliza chaves de API públicas ou privadas no frontend. Todas as informações dinâmicas são computadas localmente ou consumidas via estado efêmero e persistência segura no `localStorage` do navegador do usuário.
*   **Controle de CORS com SVG Inline**: Os retratos de Marco Aurélio, Sêneca e Epicteto são injetados diretamente via strings SVG no código (`src/data/portraits.ts`). Isso impede ataques de injeção de assets e contaminação de canvas (tainting), permitindo que o `html2canvas` gere a imagem localmente sem dependência de conexões de rede externas inseguras.
