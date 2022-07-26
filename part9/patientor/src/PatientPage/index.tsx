import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Male, Female, Transgender } from "@mui/icons-material";
import { Button } from "@material-ui/core";

import EntryDetails from "../EntryDetails";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient, Entry } from "../types";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

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

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
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
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
