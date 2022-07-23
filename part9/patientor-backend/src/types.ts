export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type NonSsnPatient = Omit<Patient, "ssn">;
