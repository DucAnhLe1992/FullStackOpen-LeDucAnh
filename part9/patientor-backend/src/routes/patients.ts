import express from "express";
import patientService from "../services/patientService";
import toNewHealthCheckEntry from "../utils/entries";
import toNewPatient from "../utils/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSsnPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try{
    const id = req.params.id
    const patient = patientService.findPatientById(id);
    if(patient){
      const newEntry = toNewHealthCheckEntry(req.body);
      const addedEntry = patientService.addHealthCheckEntry(newEntry, id);
      res.json(addedEntry)
    }
  }catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

export default router;
