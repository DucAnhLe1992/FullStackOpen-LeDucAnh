import { HealthCheckRating, Diagnosis, NewHealthCheckEntry } from "../types";

interface HealthCheckEntryFields {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: Array<Diagnosis["code"]>;
  healthCheckRating: HealthCheckRating;
}

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist name");
  }
  return specialist;
};

/* const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing date");
  }
  return employerName;
};
 */

const toNewHealthCheckEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
}: HealthCheckEntryFields): NewHealthCheckEntry => {
  const newHealthCheckEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes,
    healthCheckRating: isHealthCheckRating(healthCheckRating)
      ? healthCheckRating
      : HealthCheckRating.CriticalRisk,
  };
  return newHealthCheckEntry;
};

export default toNewHealthCheckEntry;
