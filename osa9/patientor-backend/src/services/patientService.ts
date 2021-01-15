import patients from '../../data/patients';
import { NonSensitivePatientData, Patient, NewPatient, Entry } from '../types';

import crypto from "crypto";


const getPatients = (): NonSensitivePatientData [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const findById = ( id: string ): Patient | undefined => {
  //console.log(id);
  //console.log(patients);
  let patient = patients.find(p => p.id === id) as Patient;
  const entryList: Entry[] = [];

  if (patient && !patient?.entries) {
    patient = {...patient, entries: entryList}; 
  } 
  return patient;
  

};

const addPatient = ( patient: NewPatient ): Patient => {
  const newId = crypto.randomBytes(16).toString("hex");
  const newPatient = {
    id: newId,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};





export default {
  getPatients,
  addPatient,
  findById,
};