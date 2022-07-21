import diagnosisData from "../data/diagnoses.json";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosisData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return [];
};

export default { getDiagnoses, addDiagnosis };
