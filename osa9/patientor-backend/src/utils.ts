/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, EntryType } from './types';

const typeIsEntry = (type: string): boolean => {
  return (type === EntryType.HealthCheck 
    || type === EntryType.Hospital 
    || type === EntryType.OccupationalHealthcare);
  
};

const parseEntry = (entry: any): Entry => {
  if (!entry || !typeIsEntry(entry)) {
    throw new Error('Incorrect or missing type: ' + entry.type);
  }
  return entry as Entry;
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

export default toNewPatient;