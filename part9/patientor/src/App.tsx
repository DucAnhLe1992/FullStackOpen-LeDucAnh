import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";
import { Diagnosis, Patient } from "./types";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
        dispatch({ type: "SET_DIAGNOSIS_LIST", payload: diagnosesListFromApi });
      } catch (e) {
        let errorMessage = "Something went wrong.";
        if (axios.isAxiosError(e) && e.response) {
          errorMessage += " Error: " + String(e.response.data.message);
        }
        console.error(errorMessage);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<PatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
