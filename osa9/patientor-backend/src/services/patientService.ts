import patients from '../../data/patients.json';
import { NonSensitivePatientData, Patient, NewPatient } from '../types';

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
  const newPatient = {
    id: "uusi-id-1234",
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};





export default {
  getPatients,
  addPatient
};