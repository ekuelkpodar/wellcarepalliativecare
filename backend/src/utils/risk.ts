import { SymptomLog, FunctionalStatus, Utilization } from '../types';

export const computeRiskScore = (symptoms: SymptomLog[], functional: FunctionalStatus[], utilizations: Utilization[]) => {
  const latestSymptom = symptoms.sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0];
  const latestFunction = functional.sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0];

  const painScore = latestSymptom?.pain ?? 0;
  const dyspneaScore = latestSymptom?.dyspnea ?? 0;
  const fatigueScore = latestSymptom?.fatigue ?? 0;
  const functionPenalty = latestFunction?.performance ? Number(latestFunction.performance.replace(/\D/g, '')) : 70;
  const utilizationPenalty = Math.min(utilizations.length * 2, 6);

  const composite = Math.min(
    10,
    Math.round((painScore + dyspneaScore + fatigueScore) / 3 + (100 - functionPenalty) / 15 + utilizationPenalty)
  );

  return { composite, latestSymptom, latestFunction };
};

export const triageSymptom = (pain?: number, dyspnea?: number) => {
  if ((pain ?? 0) >= 8 || (dyspnea ?? 0) >= 7) {
    return { level: 'urgent', recommendation: 'Call patient immediately, consider visit within 4 hours.' };
  }
  if ((pain ?? 0) >= 6 || (dyspnea ?? 0) >= 5) {
    return { level: 'priority', recommendation: 'RN follow-up within 24 hours, adjust meds if needed.' };
  }
  return { level: 'routine', recommendation: 'Acknowledge message and reinforce home instructions.' };
};
