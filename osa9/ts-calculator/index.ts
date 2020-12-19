import express = require('express');
import { calculateBmi } from "./bmiCalculator";
import { parseArgs, calculateExercises, ExerciseData } from "./exerciseCalculator";

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  //const unsafeBlaaBlaa: unknown = req.body;
  const testi = req.body as ExerciseData;
  console.log(testi);

  const data = [];
  data.push("");
  data.push("");
  data.push(target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i = 0; i < daily_exercises.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    data.push(daily_exercises[i]);
  }
  
  //console.log(daily_exercises);
  //console.log(target);
  //console.log(req.body);
  
  if (target === undefined || daily_exercises === undefined) {
    res.status(400).send(JSON.parse(`{"error": "parameters missing!"}`));
  } else {
    try {
      const { targetValue, hours } = parseArgs(data);
      console.log(targetValue);
      console.log(hours);
      const output = calculateExercises(hours, targetValue);
      //const output = calculateExercises(daily_exercises, target);
      //console.log(output);
      res.json(output);
    } catch {
      res.status(400).send(JSON.parse(`{"error": "malformatted parameters"}`));
      
      }
  }
  
  
  
  
  
    
    
  
  

  

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});