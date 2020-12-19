import patients from '../../data/patients.json';
import { NonSensitivePatientData } from '../types';

const getPatients = (): NonSensitivePatientData [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};



export default {
  getPatients
};