import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Male, Female, Transgender } from "@mui/icons-material";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient, Entry, Diagnosis } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  useEffect(() => {
    const fetchSinglePatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "LOAD_SINGLE_PATIENT", payload: patientFromApi });
      } catch (e) {
        let errorMessage = "Something went wrong.";
        if (axios.isAxiosError(e) && e.response) {
          errorMessage += " Error: " + String(e.response.data.message);
        }
        console.error(errorMessage);
      }
    };
    void fetchSinglePatient(id as string);
  }, [patient, dispatch]);

  const searchForDiagnosis = (diagnosisList: Diagnosis[], code: string) => {
    return diagnosisList.find((d: Diagnosis) => d.code === code);
  };

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient.gender === "male" ? (
          <Male />
        ) : patient.gender === "female" ? (
          <Female />
        ) : (
          <Transgender />
        )}
      </h2>
      <p>SSN: {patient.ssn ? patient.ssn : "unknown"}</p>
      <p>Occupation: {patient.occupation}</p>
      <h3>entries</h3>
      <p>
        {patient.entries.map((entry: Entry) => (
          <div key={entry.id}>
            <p>
              {entry.date} <i>{entry.description}</i>
            </p>
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
          </div>
        ))}
      </p>
    </div>
  );
};

export default PatientPage;
