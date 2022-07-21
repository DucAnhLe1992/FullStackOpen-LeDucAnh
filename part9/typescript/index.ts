import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import { calculateBmi } from "./src/bmiCalculator";
import { exerciseCalculator } from "./src/exerciseCalculator";

const PORT = 3000;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  try {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      res.send({
        weight,
        height,
        bmi: calculateBmi(Number(height), Number(weight)),
      });
    } else {
      res.send({
        error: "malformatted parameters",
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({
        error: error.message,
      });
    }
  }
});

app.post("/calculator", (req, res) => {
  const { hours, target } = req.body;

  try {
    if (hours === undefined || target === undefined) {
      res.send({
        error: "missing parameters",
      });
    }
    if (Array.isArray(hours)) {
      const isInputArray =
        hours.length > 0 &&
        hours.every((value) => {
          return typeof value === "number";
        });
      if (!isInputArray) {
        res.send({
          error: "malformatted parameters",
        });
      }
      res.json(exerciseCalculator(hours, target));
    } else {
      res.send({
        error: "malformatted parameters",
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({
        error: error.message,
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
