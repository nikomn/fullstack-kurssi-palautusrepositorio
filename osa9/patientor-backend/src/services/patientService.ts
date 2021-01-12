import patients from '../../data/patients.json';
import { NonSensitivePatientData, Patient, NewPatient, Entry } from '../types';

import crypto from "crypto";


const getPatients = (): NonSensitivePatientData [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = ( id: string ): Patient | undefined => {
  const patient = patients.find(p => p.id === id) as Patient;
  const entryList: Entry[] = [];

  if (patient && !patient?.entries) {
    return {
      ...patient,
      entries: entryList
    }; 
  } else {
    return undefined;
  }
  

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