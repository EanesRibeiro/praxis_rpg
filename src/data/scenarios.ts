import type { Scenario, ScenarioCategory } from '../types';
import { PORTRAITS } from './portraits';

const SCENARIOS_INTERNAL: Scenario[] = [
  // ==========================================
  // CATEGORIA 1: TRABALHO (6 Cenários)
  // ==========================================
  {
    id: 'scen_t1',
    category: 'Trabalho',
    title: 'O Mérito do Silêncio',
    description: 'Um colega apresenta em uma importante reunião uma ideia brilhante que nasceu de uma conversa informal a dois, levando todo o crédito. O gestor o elogia publicamente diante de toda a equipe.',
    choices: [
      {
        text: 'Interromper polidamente após a fala, pontuando sua coparticipação no desenvolvimento da ideia com clareza.',
        philosopher: 'Marco Aurélio',
        quote: 'A melhor vingança é não ser como aquele que causou a injustiça. Aja com justiça social, sem hostilidade.',
        impact: { courage: 15, justice: 10, wisdom: -5 },
        ataraxiaImpact: -5,
        feedback: 'Você escolheu defender a verdade objetiva. Expor a coparticipação exige coragem intelectual, mas lembre-se de fazê-lo sem ressentimento ou vaidade pelo reconhecimento.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Marco Aurélio']
      },
      {
        text: 'Manter o silêncio durante a reunião, considerando o reconhecimento externo como algo indiferente para sua virtude.',
        philosopher: 'Epicteto',
        quote: 'O que é teu por direito interno ninguém pode roubar. O aplauso alheio e os cargos são indiferentes; apenas teu caráter te pertence.',
        impact: { temperance: 15, wisdom: 10, courage: -10 },
        ataraxiaImpact: 10,
        feedback: 'Você praticou a dicotomia do controle. Ao abrir mão do aplauso externo, que não está sob seu controle, você resguarda a sua tranquilidade e fortalece a temperança.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      }
    ]
  },
  {
    id: 'scen_t2',
    category: 'Trabalho',
    title: 'A Promoção Injusta',
    description: 'A promoção que você esperava e pela qual trabalhou intensamente é dada a um colega visivelmente menos técnico, mas muito carismático e próximo da diretoria.',
    choices: [
      {
        text: 'Aceitar a decisão com dignidade, focando sua energia em continuar executando seu trabalho da melhor forma possível.',
        philosopher: 'Epicteto',
        quote: 'Deseja apenas o que está sob teu poder. Cargos e honras pertencem a quem decide concedê-los, não a ti.',
        impact: { wisdom: 15, temperance: 15, courage: 5 },
        ataraxiaImpact: 12,
        feedback: 'Ao focar na excelência interna do seu trabalho em vez de sofrer pelo reconhecimento alheio, você neutraliza a frustração e mantém sua paz interior inabalável.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Parabenizar o colega promovido de forma genuína e agendar uma conversa franca com o gestor para pedir feedback objetivo sobre sua carreira.',
        philosopher: 'Sêneca',
        quote: 'A inveja é a marca de uma mente fraca. O sábio alegra-se com o progresso do outro e analisa o próprio caminho com razão clara.',
        impact: { justice: 15, wisdom: 10, courage: 10 },
        ataraxiaImpact: 2,
        feedback: 'Sua escolha reflete inteligência emocional e justiça social. Parabenizar o outro limpa o coração de inveja, enquanto a conversa técnica com a gestão direciona seu esforço racionalmente.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_t3',
    category: 'Trabalho',
    title: 'Os Cortes na Equipe',
    description: 'A empresa passa por dificuldades e seu gestor pede que você indique secretamente um colega da sua equipe para ser demitido, de forma a preservar sua própria vaga.',
    choices: [
      {
        text: 'Recusar-se a apontar culpados ou bodes expiatórios, propondo em vez disso uma avaliação técnica impessoal fundamentada em métricas coletivas.',
        philosopher: 'Sêneca',
        quote: 'Nenhum ganho pessoal vale o preço de trair a própria consciência. O bem comum deve guiar nossas decisões mais difíceis.',
        impact: { justice: 20, courage: 15, wisdom: 5 },
        ataraxiaImpact: -10,
        feedback: 'Você agiu com justiça moral e integridade ao proteger sua equipe da politicagem. Recusar-se a sacrificar o outro pela própria segurança é um marco de caráter nobre.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Sêneca']
      },
      {
        text: 'Assumir a indicação com base em uma análise rigorosa do impacto das entregas e da sinergia do time, assumindo a liderança da decisão ética.',
        philosopher: 'Marco Aurélio',
        quote: 'O que não beneficia a colmeia, não beneficia a abelha. Se um corte é inevitável para a sobrevivência do todo, faça-o com retidão e sem crueldade.',
        impact: { wisdom: 15, courage: 10, temperance: 10 },
        ataraxiaImpact: -5,
        feedback: 'Você aceitou o fardo da liderança. Tomar decisões difíceis para a preservação do todo exige racionalidade estrita, mas o peso da escolha testa temporariamente sua serenidade.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Marco Aurélio']
      }
    ]
  },
  {
    id: 'scen_t4',
    category: 'Trabalho',
    title: 'O Cliente Abusivo',
    description: 'Um cliente que representa mais de metade do faturamento da sua operação trata você e seus subordinados com grosseria e exigências descabidas fora do horário comercial.',
    choices: [
      {
        text: 'Estabelecer limites profissionais rígidos e formais para as interações, estando disposto a perder o contrato se a falta de respeito persistir.',
        philosopher: 'Epicteto',
        quote: 'Nenhum homem é livre se não for mestre de si mesmo. Não venda sua dignidade por punhados de moedas de prata.',
        impact: { courage: 20, temperance: 10, wisdom: 5 },
        ataraxiaImpact: -5,
        feedback: 'Você escolheu proteger a soberania do seu caráter e da sua equipe. Demonstrar que o dinheiro não compra o respeito próprio é a essência da liberdade interior estoica.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Lidar com a grosseria do cliente com paciência estoica absoluta, interpretando a agressividade dele como um defeito dele que não pode atingir sua alma.',
        philosopher: 'Sêneca',
        quote: 'A ira é um vício temporário que apenas destrói quem a carrega. Trate o homem colérico como se fosse uma tempestade no mar: aguarde com calma.',
        impact: { temperance: 20, wisdom: 15, courage: -5 },
        ataraxiaImpact: 10,
        feedback: 'Você usou a temperança como escudo mental. Ao encarar a ira do cliente como um problema psicológico dele e não seu, você protegeu a paz interna e salvou o contrato comercial.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_t5',
    category: 'Trabalho',
    title: 'A Sabotagem de Projeto',
    description: 'Você descobre provas de que um par na liderança alterou as permissões de um repositório crítico para atrasar seu projeto e fazer você parecer incompetente na reunião de resultados.',
    choices: [
      {
        text: 'Apresentar as provas de forma neutra e impessoal apenas no fórum apropriado, focando no reestabelecimento da segurança do código, sem hostilizar o sabotador.',
        philosopher: 'Marco Aurélio',
        quote: 'O homem que comete injustiça prejudica a si mesmo. Se ele errou, o erro é dele; o meu dever é manter-me útil ao bem comum.',
        impact: { wisdom: 20, justice: 15, courage: 5 },
        ataraxiaImpact: 0,
        feedback: 'Sua conduta foi exemplar. Ao focar na solução técnica e na justiça sem ceder ao desejo de vingança pessoal ou humilhação pública, você demonstrou magnanimidade.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Marco Aurélio']
      },
      {
        text: 'Confrontar o colega reservadamente, de forma calma e firme, deixando claro que você está ciente das ações dele e que o código já foi corrigido.',
        philosopher: 'Sêneca',
        quote: 'O erro deve ser confrontado com firmeza racional, não com cólera. O silêncio cúmplice incentiva a maldade; o limite claro a desarma.',
        impact: { courage: 15, temperance: 10, justice: 10 },
        ataraxiaImpact: -5,
        feedback: 'Você escolheu o caminho do limite pedagógico. Confrontar o ofensor sem ira, mas com firmeza inabalável, demonstra autocontrole e desencoraja novos ataques espúrios.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_t6',
    category: 'Trabalho',
    title: 'O Erro da Liderança',
    description: 'Seu diretor comete um erro de cálculo óbvio em um slide que será apresentado para o Conselho de Administração dentro de poucos minutos, mas ele é conhecido por reagir mal a correções.',
    choices: [
      {
        text: 'Alertá-lo imediatamente de forma discreta e reservada antes de ele subir ao palco, priorizando o sucesso da organização sobre o medo do ego dele.',
        philosopher: 'Marco Aurélio',
        quote: 'Se alguém me mostrar que estou errado, mudarei com alegria. Busco a verdade que nunca prejudicou ninguém; apenas a teimosia cega fere.',
        impact: { courage: 15, justice: 15, wisdom: 5 },
        ataraxiaImpact: -5,
        feedback: 'Você colocou o interesse coletivo e a verdade acima da autopreservação. Mesmo correndo o risco de uma reação defensiva, seu ato protegeu o diretor e a empresa.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Marco Aurélio']
      },
      {
        text: 'Permanecer em silêncio, julgando que a apresentação do diretor e as reações dele a feedbacks não estão sob sua esfera de controle direto.',
        philosopher: 'Epicteto',
        quote: 'Não tentes consertar o que não te cabe. Deixe que o erro de cada homem sirva de tutor para sua própria vaidade.',
        impact: { temperance: 15, wisdom: 10, courage: -10 },
        ataraxiaImpact: 8,
        feedback: 'Você praticou a quietude da não-interferência. Evitar o conflito resguarda sua ataraxia imediata, mas o silêncio diante do erro alheio beira a omissão com o bem do grupo.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      }
    ]
  },

  // ==========================================
  // CATEGORIA 2: VIDA PESSOAL (6 Cenários)
  // ==========================================
  {
    id: 'scen_p1',
    category: 'Vida Pessoal',
    title: 'A Decisão sob Pressão',
    description: 'Um amigo de longa data implora para que você confirme um álibi falso para ele, livrando-o das consequências disciplinares de um erro grave que ele cometeu por pura irresponsabilidade.',
    choices: [
      {
        text: 'Recusar-se a mentir, mas oferecer apoio prático e emocional incondicional para ajudá-lo a enfrentar a verdade.',
        philosopher: 'Sêneca',
        quote: 'A lealdade não pode nos obrigar à mentira ou à desonra. Ajudar um amigo a enfrentar a própria sombra é o verdadeiro ato de amor e dever.',
        impact: { justice: 20, wisdom: 10, courage: 5 },
        ataraxiaImpact: -5,
        feedback: 'Você priorizou a justiça e a verdade, as bases de qualquer amizade virtuosa. Recusar a mentira preserva a integridade de ambos e direciona o amigo para o crescimento.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Sêneca']
      },
      {
        text: 'Confirmar a versão falsa dele para blindar a amizade e evitar um conflito direto imediato.',
        philosopher: 'Epicteto',
        quote: 'Aquele que cede às pressões alheias perde as rédeas de si mesmo. Tornar-se cúmplice da ilusão é escravizar o próprio julgamento.',
        impact: { courage: -10, justice: -15, temperance: -5 },
        ataraxiaImpact: -15,
        feedback: 'Ao ceder para evitar desconforto, você comprometeu sua integridade moral e incentivou o erro alheio. O medo de perder a amizade revelou apego ao que é externo.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Epicteto']
      }
    ]
  },
  {
    id: 'scen_p2',
    category: 'Vida Pessoal',
    title: 'O Jantar de Negócios',
    description: 'Um convite de negócios crucial surge no mesmo horário em que você prometeu estar presente em um evento significativo de seu filho ou cônjuge. A pressão profissional é alta.',
    choices: [
      {
        text: 'Honrar o compromisso com a família, declinando o convite corporativo e aceitando as potenciais consequências na rede de contatos.',
        philosopher: 'Sêneca',
        quote: 'A vida é curta e o tempo com quem amamos é finito e insubstituível. Não sacrifique a realidade presente pelas promessas de ganho futuro.',
        impact: { temperance: 15, wisdom: 10, justice: 10 },
        ataraxiaImpact: 10,
        feedback: 'Você praticou a sobriedade temporal. Ao priorizar os laços profundos e a promessa familiar sobre o networking profissional, você reforçou a temperança de seus valores.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Sêneca']
      },
      {
        text: 'Comparecer ao jantar profissional e explicar honestamente à família a importância do evento, comprometendo-se a compensá-los com dedicação integral depois.',
        philosopher: 'Marco Aurélio',
        quote: 'Cumpre teus deveres sociais com equilíbrio. O papel de provedor e trabalhador faz parte do tecido social; apenas age sem mentiras ou negligência deliberada.',
        impact: { courage: 10, wisdom: 10, temperance: -10 },
        ataraxiaImpact: -5,
        feedback: 'Você optou por administrar os deveres externos da vida em sociedade. Negociar o tempo exige cautela para que as compensações futuras não se tornem desculpas para a ausência crônica.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Marco Aurélio']
      }
    ]
  },
  {
    id: 'scen_p3',
    category: 'Vida Pessoal',
    title: 'O Sucesso Invejado',
    description: 'Após receber um prêmio acadêmico ou financeiro merecido, você percebe que seus amigos próximos de infância começam a fazer piadas sarcásticas e a afastar-se de você.',
    choices: [
      {
        text: 'Continuar tratando-os com a mesma simplicidade e afabilidade de antes, sem ostentar seus ganhos e sem cobrar satisfações pela mudança de humor.',
        philosopher: 'Sêneca',
        quote: 'O verdadeiro sábio não se envaidece com a riqueza nem se ressente com a pequenez alheia. A virtude é silenciosa e acolhedora.',
        impact: { temperance: 20, wisdom: 15, justice: 10 },
        ataraxiaImpact: 12,
        feedback: 'Você escolheu a magnanimidade. Ao não reagir ao ciúme com arrogância ou cobrança, você demonstra que o seu valor reside na sua virtude, não na aprovação do seu grupo.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Sêneca']
      },
      {
        text: 'Afastar-se do grupo gradativamente, buscando a companhia de pessoas cujas ambições e valores morais estejam mais alinhados ao seu momento atual.',
        philosopher: 'Epicteto',
        quote: 'Associa-te a pessoas que te elevem moralmente. Frequentar ambientes onde a virtude é ridicularizada corrompe até o caráter mais firme.',
        impact: { wisdom: 20, courage: 10, justice: -5 },
        ataraxiaImpact: 5,
        feedback: 'Você escolheu o isolamento protetivo. Selecionar o seu círculo social é prudente para o desenvolvimento da alma, embora a perda dos velhos laços traga uma leve melancolia.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      }
    ]
  },
  {
    id: 'scen_p4',
    category: 'Vida Pessoal',
    title: 'A Perda de Bem Material',
    description: 'Seu carro novo, estacionado em via pública, é seriamente riscado e danificado por vândalos anônimos durante a noite. Não há seguro e o prejuízo financeiro é considerável.',
    choices: [
      {
        text: 'Aceitar a perda sem lamentações ou buscas por vingança, reconhecendo que a integridade física do seu carro era um bem externo temporário.',
        philosopher: 'Epicteto',
        quote: 'O que se quebrou não era teu de forma permanente. Ao perder algo material, diga a ti mesmo: devolvi o que me havia sido emprestado.',
        impact: { temperance: 20, wisdom: 15, courage: 5 },
        ataraxiaImpact: 15,
        feedback: 'Você praticou o desapego budista/estoico. Aceitar que objetos físicos pertencem ao fluxo da entropia poupa seu fígado do veneno da raiva impotente.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Realizar os trâmites policiais necessários e providenciar o conserto com serenidade, focando nas providências práticas sem reclamar da maldade humana.',
        philosopher: 'Marco Aurélio',
        quote: 'O dano material não atinge a mente. A má conduta do agressor pertence a ele. Limite-se a agir com eficácia prática e retidão moral.',
        impact: { courage: 15, justice: 10, wisdom: 10 },
        ataraxiaImpact: 5,
        feedback: 'Você aliou a serenidade interna à ação pragmática do cidadão do cosmos. Resolver os problemas materiais sem se contaminar pela raiva é o equilíbrio estoico ideal.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Marco Aurélio']
      }
    ]
  },
  {
    id: 'scen_p5',
    category: 'Vida Pessoal',
    title: 'Conflito de Valores',
    description: 'Seu parceiro sugere omitir um defeito mecânico intermitente do carro de vocês para conseguir vendê-lo a um comprador particular pelo valor máximo de tabela.',
    choices: [
      {
        text: 'Recusar veementemente a omissão e insistir em declarar o defeito no anúncio, mesmo que isso reduza a margem financeira da venda.',
        philosopher: 'Marco Aurélio',
        quote: 'Se não é correto, não faça; se não é verdade, não diga. A integridade da alma vale mais que qualquer soma metálica.',
        impact: { justice: 25, courage: 10, wisdom: 5 },
        ataraxiaImpact: -5,
        feedback: 'Você escolheu a justiça moral inflexível. Manter a honestidade com um estranho, mesmo diante de pressões familiares, protege o bem supremo do seu caráter.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Marco Aurélio']
      },
      {
        text: 'Propor consertar o defeito mecânico integralmente antes de vender, dividindo o custo com o parceiro para garantir uma transação justa e lucrativa.',
        philosopher: 'Sêneca',
        quote: 'A virtude busca a harmonia prática. Resolver a falha antes de expor o produto atende ao dever ético sem causar rupturas desnecessárias na casa.',
        impact: { wisdom: 15, temperance: 10, justice: 10 },
        ataraxiaImpact: 8,
        feedback: 'Sua escolha encontrou o equilíbrio prudencial. Solucionar o problema real protege o comprador de danos futuros e preserva a paz nos relacionamentos domésticos.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_p6',
    category: 'Vida Pessoal',
    title: 'A Ofensa de um Familiar',
    description: 'Em uma comemoração de família, um parente influente ridiculariza abertamente seu estilo de vida minimalista, chamando você de preguiçoso e sem ambição diante de todos.',
    choices: [
      {
        text: 'Sorrir calmamente e não responder à provocação, julgando que as opiniões do parente revelam mais sobre os apegos dele do que sobre seu caráter.',
        philosopher: 'Epicteto',
        quote: 'Lembra-te de que a ofensa só existe se tu permitires. Se alguém tenta te insultar, ele está apenas batendo no vento.',
        impact: { temperance: 20, wisdom: 15, courage: -5 },
        ataraxiaImpact: 12,
        feedback: 'Você usou o silêncio altivo e a compaixão estoica. Tratar o insulto como um ruído de fundo indiferente desarma o agressor e preserva sua tranquilidade integral.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Responder de forma concisa, educada e firme, explicando que cada indivíduo escolhe suas métricas de sucesso com base na própria razão.',
        philosopher: 'Sêneca',
        quote: 'Responder à grosseria com elegância racional é a maior demonstração de poder. Não desças ao nível do ofensor; eleva-o ao teu.',
        impact: { courage: 15, wisdom: 10, justice: 10 },
        ataraxiaImpact: 2,
        feedback: 'Você escolheu o limite pedagógico. Responder com firmeza polida sem perder o controle emocional educa o ambiente e impede que a passividade seja interpretada como covardia.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },

  // ==========================================
  // CATEGORIA 3: CRISE (6 Cenários)
  // ==========================================
  {
    id: 'scen_c1',
    category: 'Crise',
    title: 'O Fracasso Público',
    description: 'Um erro grave sob sua responsabilidade direta compromete a entrega de um projeto crítico da empresa. A falha é pública e a liderança convoca você para dar explicações.',
    choices: [
      {
        text: 'Assumir a falha integralmente na frente de todos, detalhando o aprendizado e apresentando um plano de contingência robusto.',
        philosopher: 'Marco Aurélio',
        quote: 'Aceite os fatos como eles se apresentam. Errar é humano; o que nos define é a velocidade e a integridade com que buscamos corrigir o rumo comum.',
        impact: { courage: 25, wisdom: 15, justice: 10 },
        ataraxiaImpact: 5,
        feedback: 'Assumir a falha com integridade anula a ansiedade da ocultação. Você transformou um revés técnico em uma demonstração prática de liderança ética e coragem.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Marco Aurélio']
      },
      {
        text: 'Explicar a situação dividindo o peso com fatores externos e imprevistos técnicos reais sem negar explicitamente sua culpa.',
        philosopher: 'Sêneca',
        quote: 'A razão deve analisar as coisas com calma. O orgulho tenta nos proteger da vergonha, mas fragmentar a verdade enfraquece nossa clareza sobre o ocorrido.',
        impact: { wisdom: 10, temperance: 5, courage: -5 },
        ataraxiaImpact: -5,
        feedback: 'Você tentou racionalizar o erro para abrandar o golpe social. Embora a análise de fatores externos seja prudente, diluir a responsabilidade pode mascarar oportunidades de aprendizado.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_c2',
    category: 'Crise',
    title: 'A Calúnia Espalhada',
    description: 'Boatos anônimos e mentirosos sobre você cometer desvio de conduta ética ou assédio moral no trabalho começam a se espalhar nos canais de comunicação interna da empresa.',
    choices: [
      {
        text: 'Ignorar a fofoca e focar em entregar seus resultados de forma irrepreensível, deixando que suas ações no dia a dia desmintam o boato com o tempo.',
        philosopher: 'Epicteto',
        quote: 'Se dizem mal de ti de forma falsa, por que te importas? A verdade não precisa de advogados histéricos; ela brilha na constância da conduta.',
        impact: { temperance: 20, wisdom: 15, courage: -5 },
        ataraxiaImpact: 15,
        feedback: 'Você escolheu o refúgio da conduta intocável. Deixar que a integridade prática desminta a calúnia protege seu fígado da ansiedade e mostra maturidade espiritual.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Apresentar imediatamente um dossiê com relatórios formais e registros técnicos para o departamento de Recursos Humanos, exigindo investigação interna.',
        philosopher: 'Marco Aurélio',
        quote: 'Aja com justiça e energia. O dever social exige que a mentira não sabote o funcionamento da comunidade. Defenda a verdade com rigor.',
        impact: { courage: 20, justice: 15, wisdom: 5 },
        ataraxiaImpact: -5,
        feedback: 'Você optou por defender a verdade institucional. Exigir o rito da justiça protege o bom andamento do time, embora o atrito processual consuma energia e foco temporariamente.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Marco Aurélio']
      }
    ]
  },
  {
    id: 'scen_c3',
    category: 'Crise',
    title: 'A Ruína Financeira',
    description: 'Um golpe de mercado ou falência da instituição onde estavam todas as suas economias de uma vida inteira apaga seu saldo bancário, deixando você com dívidas imediatas.',
    choices: [
      {
        text: 'Aceitar a ruína financeira com serenidade absoluta, reconhecendo que a riqueza é um bem externo e que você mantém sua inteligência e caráter intactos.',
        philosopher: 'Epicteto',
        quote: 'Não perdi nada; apenas devolvi à fortuna o que era dela. A mente soberana e a virtude não podem ser confiscadas por nenhum banco.',
        impact: { wisdom: 25, temperance: 20, courage: 10 },
        ataraxiaImpact: 12,
        feedback: 'Você atingiu o ápice do desapego estoico. Entender que o dinheiro é um elemento neutro e indiferente em relação à sua capacidade de ser um homem bom é a verdadeira liberdade.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Focar na reorganização das finanças de forma pragmática e racional, cortando gastos drásticos imediatos e traçando um plano de recuperação econômica.',
        philosopher: 'Sêneca',
        quote: 'O sábio prefere a riqueza por comodidade, mas não a idolatra. Diante da pobreza súbita, ele se adapta sem desespero e reconstrói o que é necessário.',
        impact: { courage: 20, temperance: 15, wisdom: 10 },
        ataraxiaImpact: 2,
        feedback: 'Você abordou a crise com racionalidade reconstrutiva. Agir de forma prática e disciplinada diante da pobreza demonstra que a fortuna externa não dita seus passos.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_c4',
    category: 'Crise',
    title: 'A Demissão Injusta',
    description: 'Após anos de dedicação exemplar, você é demitido sumariamente em uma reestruturação abrupta sem qualquer explicação plausível de seu superior direto.',
    choices: [
      {
        text: 'Agradecer a oportunidade de forma profissional, assinar os documentos e sair de cabeça erguida, sem manifestar mágoa ou cobrar explicações dos superiores.',
        philosopher: 'Sêneca',
        quote: 'A fortuna nos dá e nos tira conforme seus próprios caprichos. A demissão não altera quem você é; apenas muda a sala onde você senta.',
        impact: { temperance: 20, wisdom: 15, courage: 5 },
        ataraxiaImpact: 10,
        feedback: 'Você praticou a dignidade diante da impermanência. Sair com postura intocável mostra que seu valor intrínseco não depende da validação de nenhuma corporação.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Sêneca']
      },
      {
        text: 'Solicitar uma reunião formal com a diretoria de Recursos Humanos para expor os resultados gerados na sua gestão, visando garantir uma transição digna.',
        philosopher: 'Epicteto',
        quote: 'Age bem no papel que a ti foi designado. Se o papel de profissional está sendo encerrado, encerre-o exigindo o cumprimento da justiça devida.',
        impact: { courage: 20, justice: 15, wisdom: 5 },
        ataraxiaImpact: -5,
        feedback: 'Você escolheu defender a simetria de obrigações. Exigir o rito da transparência e a compensação justa é um ato de justiça cívica, mesmo que exija confrontar a liderança.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Epicteto']
      }
    ]
  },
  {
    id: 'scen_c5',
    category: 'Crise',
    title: 'A Notícia Médica',
    description: 'Você recebe o resultado de exames clínicos que apontam uma disfunção cardíaca crônica e progressiva, obrigando você a abandonar esportes competitivos de forma permanente.',
    choices: [
      {
        text: 'Aceitar as novas restrições físicas com paz de espírito, adaptando seus hábitos diários sem reclamar da fragilidade do corpo.',
        philosopher: 'Epicteto',
        quote: 'A doença é um obstáculo para o corpo, não para a vontade racional de agir de forma justa. Adapte-se ao instrumento que te resta.',
        impact: { wisdom: 25, temperance: 15, courage: 10 },
        ataraxiaImpact: 12,
        feedback: 'Você abraçou o Amor Fati de forma exemplar. Compreender que o corpo físico é um empréstimo temporário da natureza poupa a alma do sofrimento do apego.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Buscar segundas opiniões médicas de forma pragmática, iniciando um tratamento científico imediato e disciplinado com foco na longevidade.',
        philosopher: 'Marco Aurélio',
        quote: 'O corpo é a morada da alma racional; cuide dele com seriedade enquanto estiver sob sua guarda, para que você possa continuar sendo útil.',
        impact: { courage: 20, wisdom: 15, temperance: 5 },
        ataraxiaImpact: 5,
        feedback: 'Sua escolha aliou a temperança à responsabilidade científica. Cuidar da saúde física com racionalidade é um dever estoico prático de autopreservação ativa.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Marco Aurélio']
      }
    ]
  },
  {
    id: 'scen_c6',
    category: 'Crise',
    title: 'A Traição Societária',
    description: 'Seu sócio e amigo de infância esvazia a conta corrente da empresa de vocês e foge para o exterior, deixando você pessoalmente endividado com fornecedores locais.',
    choices: [
      {
        text: 'Iniciar o processo legal cabível de forma fria e estratégica, sem nutrir raiva ou desejos de revanche contra o antigo amigo.',
        philosopher: 'Sêneca',
        quote: 'A ira é uma loucura temporária que causa mais destruição do que a ofensa original. A lei deve agir com razão pura e sem paixão.',
        impact: { justice: 20, wisdom: 15, courage: 10 },
        ataraxiaImpact: -5,
        feedback: 'Você escolheu o caminho do juiz estóico. Tratar o caso policial sem contaminação emocional permite que você tome decisões jurídicas limpas e preserva sua paz interior.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Sêneca']
      },
      {
        text: 'Reunir os credores pessoalmente, expor a situação de forma transparente e propor um cronograma realista de pagamento parcelado com seus bens pessoais.',
        philosopher: 'Marco Aurélio',
        quote: 'O dever moral do cidadão é inegociável. A conduta alheia não pode macular a minha honra. Se os credores confiaram em mim, responderei.',
        impact: { justice: 25, courage: 20, wisdom: 5 },
        ataraxiaImpact: -15,
        feedback: 'Você demonstrou integridade radical. Sacrificar seus bens para honrar compromissos que você não causou é o ápice da justiça cosmopolita estoica, embora o custo material seja severo.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Marco Aurélio']
      }
    ]
  },

  // ==========================================
  // CATEGORIA 4: SAÚDE (6 Cenários)
  // ==========================================
  {
    id: 'scen_s1',
    category: 'Saúde',
    title: 'O Corpo como Instrumento',
    description: 'Você está no limite físico da exaustão após semanas de esforço extremo. O gestor, visivelmente sobrecarregado, pergunta se você pode liderar um novo projeto urgente e de alta visibilidade.',
    choices: [
      {
        text: 'Declinar o convite de forma honesta, justificando que o limite da sua capacidade de entrega saudável foi atingido.',
        philosopher: 'Epicteto',
        quote: 'O corpo é um instrumento sob nossa guarda, não nosso senhor. Saber dizer não ao excesso é zelar pela sanidade da alma e do julgamento.',
        impact: { temperance: 20, wisdom: 10, courage: 5 },
        ataraxiaImpact: 12,
        feedback: 'Você praticou a moderação ao reconhecer seus limites biológicos. Preservar-se contra a exaustão impede que a pressa comprometa o discernimento e a qualidade das suas futuras ações.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Aceitar o encargo imediatamente, ignorando o cansaço acumulado em nome do compromisso profissional e do dever.',
        philosopher: 'Sêneca',
        quote: 'Muitas vezes nos impomos fardos que destroem nossa paz apenas para manter aparências. O dever cego que consome a saúde flerta com a imprudência.',
        impact: { courage: -5, temperance: -15, wisdom: -5 },
        ataraxiaImpact: -15,
        feedback: 'Você cedeu à vaidade da produtividade insustentável. Sacrificar a mente e o corpo por aprovação ou medo do julgamento alheio distancia você do verdadeiro autodomínio.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_s2',
    category: 'Saúde',
    title: 'A Dor Física',
    description: 'Uma lesão lombar crônica de difícil tratamento deixa você com dores lancinantes ao longo do dia, prejudicando sua capacidade de concentração nas atividades de rotina.',
    choices: [
      {
        text: 'Aceitar a dor como uma sensação física neutra enviada pela natureza, focando sua mente no que pode ser pensado, sem lamentações.',
        philosopher: 'Epicteto',
        quote: 'A dor é uma sensação no corpo, não uma opinião da mente sobre a vida. Ela pode atingir a carne, mas nunca a vontade racional.',
        impact: { wisdom: 25, courage: 15, temperance: 10 },
        ataraxiaImpact: 10,
        feedback: 'Você ergueu a cidadela interna. Desacoplar a sensação de dor biológica do sofrimento psicológico é uma das conquistas mais difíceis da disciplina estoica.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Iniciar tratamentos terapêuticos intensivos e de reabilitação sem ansiedade pelo resultado, tratando seu corpo com o respeito devido a um servo útil.',
        philosopher: 'Sêneca',
        quote: 'Devemos cuidar da saúde do corpo com carinho, mas sem aflição. A reabilitação exige método, paciência e submissão à ciência médica.',
        impact: { temperance: 20, courage: 10, wisdom: 10 },
        ataraxiaImpact: 5,
        feedback: 'Você escolheu o pragmatismo prudente. Tratar a lesão de forma metódica e livre de desespero demonstra que você cuida da sua morada física com equilíbrio.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_s3',
    category: 'Saúde',
    title: 'A Prova de Abstinência',
    description: 'Você percebe que está viciado em cafeína, doces ou redes sociais, sentindo irritabilidade e ansiedade sempre que tenta passar algumas horas longe deles.',
    choices: [
      {
        text: 'Realizar uma abstinência voluntária drástica de 15 dias, encarando o desconforto como um treinamento moral necessário.',
        philosopher: 'Epicteto',
        quote: 'Abstém-te daquilo que dita teu humor. A verdadeira liberdade é não precisar de nada que a fortuna possa te retirar amanhã.',
        impact: { temperance: 25, courage: 15, wisdom: 5 },
        ataraxiaImpact: -5,
        feedback: 'Você escolheu a ascese ativa. O desconforto voluntário destrói a dependência psicológica e prova que a mente racional reina soberana sobre os instintos primordiais.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Adotar regras de uso moderado e progressivo, medindo o apego racionalmente e testando seu autocontrole em pequenas doses reguladas.',
        philosopher: 'Sêneca',
        quote: 'A moderação é mais difícil que a abstinência completa, pois exige vigilância constante da razão sobre o limite exato do uso.',
        impact: { temperance: 20, wisdom: 15, justice: 5 },
        ataraxiaImpact: 8,
        feedback: 'Você optou pelo caminho do consumo temperado. Monitorar os desejos e impor regras racionais de moderação exige vigilância contínua da inteligência moral.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_s4',
    category: 'Saúde',
    title: 'O Envelhecimento',
    description: 'Você percebe as primeiras rugas acentuadas, fios brancos e que seu tempo de recuperação física após esforços simples duplicou, sinalizando o declínio da juventude.',
    choices: [
      {
        text: 'Acolher a passagem do tempo com serenidade, reconhecendo o envelhecimento como um processo natural e belo de maturação interna.',
        philosopher: 'Sêneca',
        quote: 'A velhice é cheia de prazeres se soubermos como usá-la. A maturação do caráter compensa com sobra a perda do vigor físico.',
        impact: { wisdom: 20, temperance: 15, courage: 5 },
        ataraxiaImpact: 12,
        feedback: 'Você praticou a aceitação racional do tempo. Enxergar o envelhecimento como a colheita da sabedoria liberta você da ilusão da vaidade infantil.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Sêneca']
      },
      {
        text: 'Focar em otimizar sua rotina de sono, nutrição e treinos regenerativos, adaptando sua biologia aos limites da sua idade atual de forma ativa.',
        philosopher: 'Marco Aurélio',
        quote: 'Observe o ciclo dos astros e mude junto com o cosmos. Adapte seu corpo com inteligência para continuar útil ao tecido social comum.',
        impact: { courage: 15, wisdom: 10, temperance: 10 },
        ataraxiaImpact: 8,
        feedback: 'Você escolheu o cuidado ativo. Mapear e aceitar as novas restrições físicas para ajustar a biologia às necessidades do dever prático é excelente conduta.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Marco Aurélio']
      }
    ]
  },
  {
    id: 'scen_s5',
    category: 'Saúde',
    title: 'O Sono Sacrificado',
    description: 'Um projeto intelectual ou profissional de alto valor pessoal empolga você a ponto de você considerar passar noites em claro para acelerar os resultados finais.',
    choices: [
      {
        text: 'Impor limites rígidos de sono e descanso diários, entendendo que a consistência biológica é necessária para a integridade da razão.',
        philosopher: 'Marco Aurélio',
        quote: 'Não sacrifique o instrumento da razão pelo entusiasmo desordenado. A moderação diária protege a longevidade da nossa utilidade no mundo.',
        impact: { temperance: 20, wisdom: 15, courage: 5 },
        ataraxiaImpact: 10,
        feedback: 'Você praticou a prudência biológica. Preservar o sono protege o discernimento e impede que a ansiedade disfarçada de produtividade domine seus hábitos.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Marco Aurélio']
      },
      {
        text: 'Trabalhar até a exaustão por alguns dias para aproveitar o fluxo criativo intenso, aceitando o cansaço posterior como um custo calculado.',
        philosopher: 'Sêneca',
        quote: 'O entusiasmo ardente deve ser canalizado, mas a mente exausta perde sua clareza crítica. Cuidado para não confundir furor com dever.',
        impact: { courage: 15, temperance: -15, wisdom: -5 },
        ataraxiaImpact: -10,
        feedback: 'Você permitiu que o impulso criativo ditasse as regras. Sacrificar a base biológica em nome de metas rápidas flerta com a impaciência e a desmoderação.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_s6',
    category: 'Saúde',
    title: 'A Hipocondria',
    description: 'Um pequeno formigamento muscular inexplicado leva você a passar horas pesquisando sintomas catastróficos em buscadores digitais, gerando um estado de pânico interno.',
    choices: [
      {
        text: 'Desligar as telas, sentar em silêncio e observar a sensação física com curiosidade neutra, sem classificá-la como uma tragédia.',
        philosopher: 'Epicteto',
        quote: 'A morte e a doença não são terríveis; o terrível é a opinião mental que temos sobre a doença e a morte.',
        impact: { wisdom: 25, temperance: 15, courage: 10 },
        ataraxiaImpact: 12,
        feedback: 'Você desarmou a paranoia. Afastar-se do fluxo informativo de pânico e focar na observação neutra do corpo restaura a sobriedade da alma.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Agendar uma consulta médica de rotina para realizar a verificação biológica factual, sem nutrir fantasias ou sofrer por antecipação.',
        philosopher: 'Sêneca',
        quote: 'Sofremos muito mais na imaginação do que na realidade física. Recorra aos fatos e à ciência médica para dissipar os fantasmas do medo.',
        impact: { courage: 15, wisdom: 15, temperance: 10 },
        ataraxiaImpact: 5,
        feedback: 'Você aliou a razão cívica à ciência prática. Dissipar a hipocondria com exames factuais impede que a fantasia sabote sua paz interior.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },

  // ==========================================
  // CATEGORIA 5: FILOSOFIA (6 Cenários)
  // ==========================================
  {
    id: 'scen_f1',
    category: 'Filosofia',
    title: 'A Opinião Alheia',
    description: 'Você compartilha publicamente uma posição impopular e recebe críticas intensas. Parte das críticas é válida. Você pode recuar publicamente ou sustentar sua posição com refinamentos.',
    choices: [
      {
        text: 'Acolher as críticas válidas publicamente, mantendo e refinando sua tese original sem agressividade ou retratação total.',
        philosopher: 'Marco Aurélio',
        quote: 'Se alguém me provar que estou errado e me convencer disso, mudarei de bom grado. Busco a verdade, pela qual ninguém jamais foi prejudicado.',
        impact: { wisdom: 20, courage: 15, justice: 5 },
        ataraxiaImpact: 5,
        feedback: 'Você demonstrou a plasticidade da mente sábia. Mudar de opinião diante da verdade não é fraqueza, mas sim o alinhamento do caráter com a realidade objetiva.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Marco Aurélio']
      },
      {
        text: 'Publicar um pedido formal de desculpas e retirar totalmente sua publicação para pacificar os ânimos e encerrar o debate.',
        philosopher: 'Sêneca',
        quote: 'Agradar a multidão exige que nos moldemos aos seus caprichos. Ceder ao clamor da turba apenas por paz imediata enfraquece o vigor da alma.',
        impact: { temperance: 5, courage: -20, wisdom: -10 },
        ataraxiaImpact: -5,
        feedback: 'Você escolheu o caminho do menor atrito social sacrificando sua integridade intelectual. O silêncio forçado pelo medo do conflito debilita a firmeza estoica diante das adversidades.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_f2',
    category: 'Filosofia',
    title: 'Riqueza vs Integridade',
    description: 'Um fundo de investimentos oferece uma soma expressiva para acelerar sua iniciativa pessoal, sob a condição de você adotar técnicas de marketing que manipulam psicologicamente o usuário.',
    choices: [
      {
        text: 'Recusar o aporte financeiro imediatamente, preservando a transparência e a integridade da sua relação com o público.',
        philosopher: 'Epicteto',
        quote: 'A pobreza virtuosa é mais livre do que a riqueza cúmplice. Não troques a soberania do teu caráter por ornamentos da fortuna.',
        impact: { justice: 25, courage: 15, wisdom: 5 },
        ataraxiaImpact: 10,
        feedback: 'Você praticou a justiça inegociável. Entender que o dinheiro é um preferível indiferente e que a integridade ética é o único bem real é a essência do estoicismo prático.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Propor uma contraproposta comercial reduzida, aceitando um aporte menor contanto que a iniciativa mantenha controle ético estrito sobre a comunicação.',
        philosopher: 'Sêneca',
        quote: 'O sábio não rejeita a riqueza se ela puder ser obtida sem desonra. Ele a usa como ferramenta útil, mas mantém-se senhor dela.',
        impact: { wisdom: 20, temperance: 15, justice: 10 },
        ataraxiaImpact: 2,
        feedback: 'Você optou pelo caminho da negociação equilibrada. Usar a fortuna externa de forma regulada sem comprometer a essência ética do projeto é excelente manifestação de prudência.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_f3',
    category: 'Filosofia',
    title: 'A Perda e o Luto',
    description: 'Você é atingido pela perda súbita de uma pessoa extremamente querida e se depara com a dor avassaladora da ausência definitiva no seu cotidiano.',
    choices: [
      {
        text: 'Vivenciar a tristeza de forma consciente, mas sem desespero ou revolta contra a lei natural da mortalidade comum a todos.',
        philosopher: 'Sêneca',
        quote: 'Chorar a perda de um amigo é humano; lamentar-se com rebeldia contra a natureza é tolice. Agradeça pelo tempo que a fortuna te concedeu ao lado dele.',
        impact: { wisdom: 25, courage: 20, temperance: 10 },
        ataraxiaImpact: 8,
        feedback: 'Você abraçou a sobriedade emocional no luto. Aceitar a finitude dos entes queridos sem desespero reconhece que tudo o que amamos pertence ao fluxo universal.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Sêneca']
      },
      {
        text: 'Canalizar a dor e a memória do ente querido em ações práticas de solidariedade social e auxílio a outras pessoas que sofrem o mesmo luto.',
        philosopher: 'Epicteto',
        quote: 'Não tentes prender o que flui. Transforme a saudade em utilidade ativa para o bem da comunidade cívica; faça do amor ação moral.',
        impact: { justice: 25, courage: 15, wisdom: 10 },
        ataraxiaImpact: 2,
        feedback: 'Você transformou o luto em cosmopolitismo ativo. Direcionar o sofrimento pessoal para o alívio da dor coletiva é a maior manifestação de justiça estoica.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Epicteto']
      }
    ]
  },
  {
    id: 'scen_f4',
    category: 'Filosofia',
    title: 'O Destino Adverso',
    description: 'Uma nevasca ou desastre técnico cancela a viagem internacional que você planejou minuciosamente por mais de um ano para realizar um sonho pessoal antigo.',
    choices: [
      {
        text: 'Aceitar a frustração imediatamente com bom humor, organizando uma alternativa interessante na sua própria cidade de forma a praticar o Amor Fati.',
        philosopher: 'Marco Aurélio',
        quote: 'O obstáculo é o caminho. O que impede a ação física pode ser utilizado pela mente para exercitar a virtude da adaptação e da paciência.',
        impact: { wisdom: 20, temperance: 20, courage: 5 },
        ataraxiaImpact: 12,
        feedback: 'Você praticou a plasticidade mental ideal. Transformar o plano cancelado em oportunidade para treinar a paciência e a alegria local é um marco de maturidade moral.',
        archetype: 'equilibrado',
        portraitSvg: PORTRAITS['Marco Aurélio']
      },
      {
        text: 'Manter-se sereno e iniciar imediatamente os trâmites burocráticos de estorno de passagens e reservas, sem nutrir desespero ou ressentimento contra as forças climáticas.',
        philosopher: 'Epicteto',
        quote: 'O tempo e o clima não respondem à tua vontade. Aceite o que acontece como necessário e foca em resolver o que te cabe com razão pura.',
        impact: { temperance: 20, wisdom: 15, courage: 10 },
        ataraxiaImpact: 5,
        feedback: 'Você abordou o imprevisto com frieza pragmática. Resolver as contingências legais sem contaminação emocional de raiva ou frustração preserva sua paz interior.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Epicteto']
      }
    ]
  },
  {
    id: 'scen_f5',
    category: 'Filosofia',
    title: 'A Bajulação',
    description: 'Após sua iniciativa de sucesso, um grupo de colegas começa a cercar você com elogios pomposos e bajulações exageradas na tentativa de conseguir favores profissionais futuros.',
    choices: [
      {
        text: 'Tratar os bajuladores com cortesia e distância profissional, ignorando os elogios e mantendo suas decisões pautadas apenas em méritos técnicos.',
        philosopher: 'Marco Aurélio',
        quote: 'A esmeralda não perde o seu valor por falta de elogios, nem a lama se torna nobre pelo aplauso. Foca no teu dever; a bajulação é poeira.',
        impact: { temperance: 20, wisdom: 15, justice: 10 },
        ataraxiaImpact: 12,
        feedback: 'Você ignorou o canto da sereia da vaidade. Manter-se imune ao elogio interesseiro é a base da sobriedade mental de quem governa a si mesmo.',
        archetype: 'contemplativo',
        portraitSvg: PORTRAITS['Marco Aurélio']
      },
      {
        text: 'Agradecer polidamente e confrontá-los sutilmente sobre a factualidade do trabalho, direcionando a conversa de forma firme para metas concretas do time.',
        philosopher: 'Sêneca',
        quote: 'O elogio falso é um veneno adocicado. O sábio o neutraliza devolvendo a conversa para a realidade dos fatos e do esforço comum.',
        impact: { wisdom: 15, justice: 15, courage: 5 },
        ataraxiaImpact: 8,
        feedback: 'Você desarmou a adulação com pragmatismo. Trazer o foco de volta para o trabalho coletivo neutraliza a falsidade e protege o ambiente de intrigas de interesse.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  },
  {
    id: 'scen_f6',
    category: 'Filosofia',
    title: 'Pregação vs Ação',
    description: 'Você se depara com a oportunidade de se apropriar de um pequeno objeto de valor extraviado que pertence a uma grande corporação varejista. Ninguém poderá descobrir sua ação.',
    choices: [
      {
        text: 'Ignorar o objeto e deixá-lo no local, julgando que a integridade moral no anonimato vale infinitamente mais que qualquer ganho material sorrateiro.',
        philosopher: 'Epicteto',
        quote: 'A virtude não se veste para o público. A conduta na escuridão, quando ninguém observa, é o único espelho real do teu caráter.',
        impact: { justice: 25, temperance: 15, courage: 5 },
        ataraxiaImpact: 12,
        feedback: 'Você praticou a retidão incondicional. Compreender que a integridade íntima não depende de vigilância externa é a máxima realização da liberdade interior estoica.',
        archetype: 'árbitro',
        portraitSvg: PORTRAITS['Epicteto']
      },
      {
        text: 'Entregar o objeto no setor de achados e perdidos da própria loja de forma neutra, gastando alguns minutos para cumprir o rito social da honestidade cívica.',
        philosopher: 'Sêneca',
        quote: 'O cidadão virtuoso contribui ativamente para a ordem da sua comunidade. Realizar o rito da devolução é o dever prático que organiza o todo.',
        impact: { justice: 25, courage: 10, wisdom: 10 },
        ataraxiaImpact: 5,
        feedback: 'Você escolheu a ação cívica disciplinada. Despender tempo pessoal para garantir que a propriedade alheia retorne ao rito da integridade fortalece o tecido social comum.',
        archetype: 'guardião',
        portraitSvg: PORTRAITS['Sêneca']
      }
    ]
  }
];

export const SCENARIO_POOL: Record<ScenarioCategory, Scenario[]> = {
  'Trabalho': SCENARIOS_INTERNAL.filter(s => s.category === 'Trabalho'),
  'Vida Pessoal': SCENARIOS_INTERNAL.filter(s => s.category === 'Vida Pessoal'),
  'Crise': SCENARIOS_INTERNAL.filter(s => s.category === 'Crise'),
  'Saúde': SCENARIOS_INTERNAL.filter(s => s.category === 'Saúde'),
  'Filosofia': SCENARIOS_INTERNAL.filter(s => s.category === 'Filosofia'),
};
