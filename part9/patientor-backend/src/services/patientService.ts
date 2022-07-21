import patientData from "../data/patients.json";
import { Patient, NonSsnPatient } from "../types";

const patients: Patient[] = patientData as Array<Patient>;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSsnPatients = (): NonSsnPatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = () => {
  return [];
};

export default { getPatients, addPatient, getNonSsnPatients };
