import { Patient, NewEntry, Entry } from '../types';


import crypto from "crypto";

const addEntry = ( entry: NewEntry, patient: Patient ): Entry => {
  const newId = crypto.randomBytes(16).toString("hex");
  
  const newEntry = {
    id: newId,
    ...entry
  } as Entry;

  console.log(newEntry);
  console.log(patient);

  patient.entries.push(newEntry);
  return newEntry;
  //return "sheeet...";
};





export default {
  addEntry
};