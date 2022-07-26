import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const searchForDiagnosis = (diagnosisList: Diagnosis[], code: string) => {
    return diagnosisList.find((d: Diagnosis) => d.code === code);
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <p>
            {entry.date} <i>{entry.description}</i>
          </p>
          <p>Diagnosed by {entry.specialist}</p>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code: string) => (
                <li key={code}>
                  {code}{" "}
                  {diagnoses.length > 0 &&
                    searchForDiagnosis(diagnoses, code)?.name}
                </li>
              ))}
          </ul>
          <p>Health check ratings: {entry.healthCheckRating}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>
            {entry.date} <i>{entry.description}</i>
          </p>
          <p>Diagnosed by {entry.specialist}</p>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code: string) => (
                <li key={code}>
                  {code}{" "}
                  {diagnoses.length > 0 &&
                    searchForDiagnosis(diagnoses, code)?.name}
                </li>
              ))}
          </ul>
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave && (
            <p>
              Sick leave: from {entry.sickLeave.startDate} to{" "}
              {entry.sickLeave.endDate}
            </p>
          )}
        </div>
      );
    case "Hospital":
      return (
        <div>
          <p>
            {entry.date} <i>{entry.description}</i>
          </p>
          <p>Diagnosed by {entry.specialist}</p>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code: string) => (
                <li key={code}>
                  {code}{" "}
                  {diagnoses.length > 0 &&
                    searchForDiagnosis(diagnoses, code)?.name}
                </li>
              ))}
          </ul>
          <p>
            Discharged on {entry.discharge.date} under the criteria:{" "}
            {entry.discharge.criteria}
          </p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
