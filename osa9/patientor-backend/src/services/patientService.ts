import patients from '../../data/patients.json';
import { NonSensitivePatientData, Patient, NewPatient } from '../types';

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
  addPatient
};