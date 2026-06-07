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

### Ataraxia (A Paz de Espírito)
Representa sua tranquilidade interna. Algumas decisões trazem paz imediata ao abrir mão do controle do que é externo, enquanto outras testam sua serenidade em prol de um dever moral maior.

### Sistema de Rejogabilidade (Fase 7)
O jogo possui um pool de **30 cenários históricos e autênticos** (6 para cada uma das 5 categorias fixas):
1.  **Trabalho**: Dilemas éticos, corporativos e de liderança.
2.  **Vida Pessoal**: Conflitos familiares, amizade e integridade íntima.
3.  **Crise**: Situações de perda abrupta, calúnia e ruína.
4.  **Saúde**: Limites do corpo, abstinência voluntária e envelhecimento.
5.  **Filosofia**: Integridade conceitual, bajulação e virtude no anonimato.

A cada nova rodada, a aplicação sorteia **exatamente 1 dilema de cada categoria**, proporcionando **7.776 combinações únicas de jornada**.

### Exportação e Compartilhamento
Ao final da jornada de 5 dilemas, o jogador recebe um arquétipo de caráter dominante (ex: *O Sábio Contemplativo*, *O Guardião Inabalável*, etc.) e pode gerar e exportar um card personalizado de alta fidelidade (PNG de 1600x900px) idealizado para compartilhamento no LinkedIn ou outras redes sociais.

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

Toda vez que um novo commit é enviado para as branches `main` ou `master`, o workflow em `.github/workflows/deploy.yml` executa as seguintes tarefas:
1.  Realiza o checkout do repositório.
2.  Instala as dependências de forma limpa.
3.  Executa o build de produção do Vite.
4.  Publica os arquivos gerados no diretório `dist/` na branch `gh-pages` de forma automática.

### Ativando no GitHub:
1. Vá até a aba **Settings** do seu repositório no GitHub.
2. Acesse a seção **Pages** na barra lateral esquerda.
3. Em **Build and deployment**, sob **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `gh-pages` e a pasta `/ (root)`.
5. Clique em **Save**. O jogo estará público em minutos!

---

## 🛡️ Práticas de Segurança e Integridade

*   **Sem Credenciais no Código**: O projeto não utiliza chaves de API públicas ou privadas no frontend. Todas as informações dinâmicas são computadas localmente ou consumidas via estado efêmero e persistência segura no `localStorage` do navegador do usuário.
*   **Controle de CORS com SVG Inline**: Os retratos de Marco Aurélio, Sêneca e Epicteto são injetados diretamente via strings SVG no código (`src/data/portraits.ts`). Isso impede ataques de injeção de assets e contaminação de canvas (tainting), permitindo que o `html2canvas` gere a imagem localmente sem dependência de conexões de rede externas inseguras.
