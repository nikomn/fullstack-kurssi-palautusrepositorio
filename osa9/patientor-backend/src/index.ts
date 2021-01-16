import express from 'express';
import entriesRouter from './routes/entries';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());

import cors from 'cors';
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


app.use('/api/diagnoses', diagnoseRouter);

app.use('/api/patients/', entriesRouter);

app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});