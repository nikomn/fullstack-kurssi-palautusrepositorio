/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry } from './types';

const parseName = (name: any): string => {
  if (!name || !typeIsString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const typeIsString = (arg: any): arg is string => {
  return typeof arg === 'string' || arg instanceof String;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !typeIsString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !typeIsString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

const typeIsDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !typeIsString(dateOfBirth) || !typeIsDate(dateOfBirth)) {
      throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const typeIsGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !typeIsGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  const entryList: Entry[] = [];
  const addedPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: entryList,
  };

  return addedPatient;
};

export default toNewPatient;