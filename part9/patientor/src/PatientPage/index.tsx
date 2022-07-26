import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Male, Female, Transgender } from "@mui/icons-material";

import EntryDetails from "../EntryDetails";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient, Entry } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
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
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </p>
    </div>
  );
};

export default PatientPage;
