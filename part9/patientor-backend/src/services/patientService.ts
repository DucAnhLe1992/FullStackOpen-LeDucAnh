import { v1 as uuid } from "uuid";
import {
  Patient,
  NonSsnPatient,
  NewPatient,
  PublicPatient,
  HealthCheckEntry,
  NewHealthCheckEntry,
} from "../types";
import patients from "../data/patients";

const getNonSsnPatients = (): NonSsnPatient[] => {
  return patients.map(
    ({ id, name, occupation, gender, dateOfBirth, entries }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
      entries,
    })
  );
};

const getPublicPatients = (): PublicPatient[] => {
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

const addHealthCheckEntry = (
  entry: NewHealthCheckEntry,
  patientId: string
): NewHealthCheckEntry => {
  const id = uuid();
  const newEntry = {
    id,
    ...entry,
    type: "HealthCheck",
  };
  patients
    .find((patient: Patient) => patient.id === patientId)
    ?.entries.push(newEntry as HealthCheckEntry);
  return newEntry;
};

export default {
  addPatient,
  getNonSsnPatients,
  findPatientById,
  getPublicPatients,
  addHealthCheckEntry,
};
