/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, /* EntryType, */ NewEntry } from './types';

const typeIsEntry = (type: string): boolean => {
  console.log("type jota ollaan lisäämässä:", type);
  if (type === "Hospital") {
    return true;
  }
  if (type === "HealthCheck") {
    return true;
  }
  if (type === "OccupationalHealthcare") {
    return true;
  } else {
    return false;
  }
  /* return (type === EntryType.HealthCheck 
    || type === EntryType.Hospital 
    || type === EntryType.OccupationalHealthcare); */
  
};

const parseEntry = (entry: any): Entry => {
  if (!entry || !typeIsEntry(entry.type)) {
    throw new Error('Incorrect or missing type: ' + entry.type);
  }
  if (!entry.description) {
    throw new Error('Missing mandatory field: description');
  }
  if (!entry.specialist) {
    throw new Error('Missing mandatory field: specialist');
  }
  if (!entry.date) {
    throw new Error('Missing mandatory field: date');
  }
  
  return entry as Entry;
};

const parseHospitalEntry = (entry: any): Entry => {
  const entryTest = parseEntry(entry);
  if (!entryTest || entryTest.type !== "Hospital") {
    throw new Error('Incorrect type: ' + entryTest.type);
  }

  if (!entryTest.discharge) {
    throw new Error('Missing mandatory field: discharge!');
  }
  return entryTest;
};

const parseOccupationalHealtcheckEntry = (entry: any): Entry => {
  const entryTest = parseEntry(entry);
  if (!entryTest || entryTest.type !== "OccupationalHealthcare") {
    throw new Error('Incorrect type: ' + entryTest.type);
  }

  if (!entryTest.employerName) {
    throw new Error('Missing mandatory field: employerName!');
  }

  return entryTest;
};

const parseHealthCheckEntry = (entry: any): Entry => {
  const entryTest = parseEntry(entry);
  if (!entryTest || entryTest.type !== "HealthCheck") {
    throw new Error('Incorrect type: ' + entryTest.type);
  }

  if (!entryTest.healthCheckRating) {
    throw new Error('Missing mandatory field: healthCheckRating!');
  }

  return entryTest;
};

const parseEntries = (entries: any[]): Entry[] => {
  for (let i = 0; i < entries.length; i++) {
    console.log(entries[i].type);
    try {
      parseEntry(entries[i]);
    } catch (error) {
      console.log("Error in entry: ", error);
      throw new Error('Incorrect or missing entry: ' + entries[i]);
      
    }
  }

  return entries as Entry[];
};

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
  console.log("Ollaan lisäämässä uutta patientia...", object);
  //const entryList: Entry[] = [];
  const addedPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };

  return addedPatient;
};

export const toNewEntry = (object: any): NewEntry => {
  console.log("Ollaan lisäämässä uutta entryä...", object);
  let addedEntry: NewEntry = parseEntry(object);
  if (addedEntry.type === 'HealthCheck') {
    addedEntry = parseHealthCheckEntry(object);
  }
  if (addedEntry.type === 'Hospital') {
    addedEntry = parseHospitalEntry(object);
  }
  if (addedEntry.type === 'OccupationalHealthcare') {
    addedEntry = parseOccupationalHealtcheckEntry(object);
  }
  return addedEntry;
}; 

export default toNewPatient;