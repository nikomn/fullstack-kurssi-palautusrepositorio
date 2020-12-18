import express = require('express');
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  //res.send(`Here be bmi calculator! Parameters are height: ${req.query.height}, weight: ${req.query.weight}`);
  //res.send(calculateBmi(["", "", String(req.query.height), String(req.query.weight)]))
  try {
    const bmi = calculateBmi(["", "", String(req.query.height), String(req.query.weight)]);
    //const bmi = 0;
    res.send(JSON.parse(`{
              "weight": ${Number(req.query.weight)},
              "height": ${Number(req.query.height)},
              "bmi": "${bmi}"
              }`));
  } catch {
    res.status(400).send(JSON.parse(`{"error": "malformatted parameters"}`));
    //res.send(JSON.stringify('{error: "malformatted parameters"}'))
    //res.send(`{error: "malformatted parameters"}`);
    }  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});