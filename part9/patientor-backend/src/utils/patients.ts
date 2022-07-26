import { Gender, NewPatient } from "../types";

type Fields = {
  name: unknown;
  occupation: unknown;
  gender: unknown;
  ssn?: unknown;
  dateOfBirth?: unknown;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing name");
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect ssn");
  }
  return ssn;
};

const parseDOB = (dob: unknown): string => {
  if (!isString(dob)) {
    throw new Error("Incorrect date of birth");
  }
  return dob;
};

const toNewPatient = ({
  name,
  occupation,
  gender,
  ssn,
  dateOfBirth,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    ssn: ssn ? parseSsn(ssn) : undefined,
    dateOfBirth: dateOfBirth ? parseDOB(dateOfBirth) : undefined,
    entries: []
  };

  return newPatient;
};

export default toNewPatient;
