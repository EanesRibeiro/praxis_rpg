import { SCENARIO_POOL } from '../data/scenarios';
import { drawSessionScenarios, clamp } from './gameLogic';
import type { Virtues } from '../types';

function simulateGameSession(): { virtues: Virtues; ataraxia: number } {
  // Estado inicial padrão do jogo
  const virtues: Virtues = { wisdom: 60, courage: 60, justice: 60, temperance: 60 };
  let ataraxia = 60;

  // Sorteia cenários (passamos histórico vazio para simular qualquer combinação do pool)
  const scenarios = drawSessionScenarios(SCENARIO_POOL, []);

  // Simula as escolhas aleatórias para os 5 cenários sorteados
  scenarios.forEach(scenario => {
    const choiceIndex = Math.random() < 0.5 ? 0 : 1;
    const choice = scenario.choices[choiceIndex];

    // Aplica impactos de virtudes
    Object.entries(choice.impact).forEach(([key, val]) => {
      const vKey = key as keyof Virtues;
      virtues[vKey] = clamp(virtues[vKey] + (val || 0), 0, 100);
    });

    // Aplica impacto em ataraxia
    ataraxia = clamp(ataraxia + choice.ataraxiaImpact, 0, 100);
  });

  return { virtues, ataraxia };
}

function runSimulation(iterations: number = 5000) {
  console.log(`\n==================================================`);
  console.log(` Iniciando Simulação de ${iterations} Partidas Aleatórias`);
  console.log(`==================================================`);

  const results = {
    wisdom: [] as number[],
    courage: [] as number[],
    justice: [] as number[],
    temperance: [] as number[],
    ataraxia: [] as number[]
  };

  let boundsViolationsCount = 0;

  for (let i = 0; i < iterations; i++) {
    const finalState = simulateGameSession();
    results.wisdom.push(finalState.virtues.wisdom);
    results.courage.push(finalState.virtues.courage);
    results.justice.push(finalState.virtues.justice);
    results.temperance.push(finalState.virtues.temperance);
    results.ataraxia.push(finalState.ataraxia);

    // Verifica se alguma virtude caiu abaixo de 20 ou subiu acima de 95
    const hasViolation = Object.values(finalState.virtues).some(val => val < 20 || val > 95);
    if (hasViolation) {
      boundsViolationsCount++;
    }
  }

  // Helper para estatísticas básicas
  const stats = (arr: number[]) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const sum = arr.reduce((a, b) => a + b, 0);
    const avg = Math.round((sum / arr.length) * 10) / 10;
    return { min, max, avg };
  };

  const wStats = stats(results.wisdom);
  const cStats = stats(results.courage);
  const jStats = stats(results.justice);
  const tStats = stats(results.temperance);
  const aStats = stats(results.ataraxia);

  console.log(`\nEstatísticas Finais de Virtudes e Ataraxia:`);
  console.log(`- Sabedoria   | Mín: ${wStats.min} | Máx: ${wStats.max} | Média: ${wStats.avg}`);
  console.log(`- Coragem     | Mín: ${cStats.min} | Máx: ${cStats.max} | Média: ${cStats.avg}`);
  console.log(`- Justiça     | Mín: ${jStats.min} | Máx: ${jStats.max} | Média: ${jStats.avg}`);
  console.log(`- Temperança  | Mín: ${tStats.min} | Máx: ${tStats.max} | Média: ${tStats.avg}`);
  console.log(`- Ataraxia    | Mín: ${aStats.min} | Máx: ${aStats.max} | Média: ${aStats.avg}`);

  const violationRate = Math.round((boundsViolationsCount / iterations) * 1000) / 10;
  console.log(`\nTaxa de Violabilidade de Limites (virtudes < 20 ou > 95):`);
  console.log(`- Total de Violações: ${boundsViolationsCount} de ${iterations} (${violationRate}%)`);

  console.log(`\nStatus da Validação:`);
  if (violationRate < 5) {
    console.log(`✅ APROVADO: Os impactos estão perfeitamente balanceados.`);
  } else {
    console.log(`⚠️ ALERTA: Há uma taxa alta de violações de limites em extremos. Considere calibrar.`);
  }
  console.log(`==================================================\n`);
}

// Executa a simulação
runSimulation();
