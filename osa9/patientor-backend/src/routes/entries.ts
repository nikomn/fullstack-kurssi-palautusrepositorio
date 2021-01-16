/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import entryService from '../services/entryService';
import patientService from '../services/patientService';
import { toNewEntry } from '../utils';
//import { Entry, Patient } from '../types';
import { Patient } from '../types';

//Module '"../utils"' has no exported member 'toHealthCheckEntry'. Did you mean to use 'import toHealthCheckEntry from "../utils"' instead?ts(2614)

const router = express.Router();

router.post('/:id/entries', (req, res) => {
  console.log(req.params.id); // toimii...
  const patient = patientService.findById(req.params.id) as Patient;
  console.log(patient); // toimii...
  console.log("body:", req.body);

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      console.log("uus entry:", newEntry); // toimii
      const addedEntry = entryService.addEntry(newEntry, patient);
      res.json(addedEntry);
      //res.json(newEntry);
      
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      res.status(400).send(e.message);
    }
  }

  
});

export default router;