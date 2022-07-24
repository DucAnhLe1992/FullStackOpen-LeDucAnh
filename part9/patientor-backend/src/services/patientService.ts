import { v1 as uuid } from "uuid";
import patientData from "../data/patients.json";
import { Patient, NonSsnPatient, NewPatient } from "../types";

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

const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient, getNonSsnPatients, findPatientById };
