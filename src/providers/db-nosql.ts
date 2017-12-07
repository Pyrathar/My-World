import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";

import { Environment } from "../models/environment";
import { Item } from "../models/item";
import { Note } from "../models/note";
import { Patient } from "../models/patient";
import { Constants } from "./constants";

@Injectable()
export class DatabaseNoSQL {
  // public environments: Environment[];
  public questions;

  constructor(private storage: Storage, public C: Constants) {}

/**
 * 0. User Settings
 */
  public getInstructionStatus(): Observable<boolean> {
    return Observable.create((observer) => {
      this.storage.get("instructionsSeen")
        .then((status) => {

          status = (status)
            ? true
            : false;

          observer.next(status);
          observer.complete();
        },
      ).catch(
        (err) => console.log("ZYGI: getPatients() ERROR:", err),
      );

    });
  }

  public setInstructionStatus(status: boolean): Observable<boolean> {
    return Observable.create((observer) => {

      this.storage.set("instructionsSeen", status)
        .then((instructionStatus) => {
          observer.next(instructionStatus);
          observer.complete();
        },
      );

    });
  }

/**
 * 1. Patients Management
 */
// TODO: check all observable types
  public getPatients(): Observable<Patient[]> {
    return Observable.create((observer) => {
      this.storage.get("patients")
      .then( (patients) => {

        patients = (patients)
          ? patients
          : [];

        observer.next(patients);
        observer.complete();
      },
      ).catch(
        (err) => console.log("ZYGI: getPatients() ERROR:", err),
      );

    });
  }

  public setPatients(patients: Patient[]): Observable<Patient[]> {
    return Observable.create((observer) => {

      this.storage.set("patients", patients).then((storedPatients) => {
        observer.next(storedPatients);
        observer.complete();
      });

    });
  }

  public addPatient(patient: Patient): Observable<Patient[]> {
    return Observable.create((observer) => {

      this.getPatients().subscribe((patientsDB) => {

        patient.id = Date.now();
        patientsDB.unshift(patient);

        this.setPatients(patientsDB).subscribe(() => {
          observer.next(patientsDB);
          observer.complete();
        });

        },
      );
    });
  }

  public editPatient(patient: Patient): Observable<Patient> {
    return Observable.create((observer) => {

      this.getPatients().subscribe((patientsDB) => {

        const selectedPatient = patientsDB.find((selected) => selected.id === patient.id);

        if (selectedPatient) {
          selectedPatient.name = patient.name;
          selectedPatient.avatar = patient.avatar;
        }

        this.setPatients(patientsDB).subscribe(() => {
          observer.next(selectedPatient);
          observer.complete();
        });

      });
    });
  }

  public deletePatient(patient: Patient, index: number): Observable<Patient[]> {
    return Observable.create((observer) => {

      this.getPatients().subscribe((patientsDB) => {
        patientsDB.splice(index, 1);
        this.storage.remove(`p${patient.id}`);

        this.setPatients(patientsDB).subscribe(() => {
          observer.next(patientsDB);
          observer.complete();
        });

      });

    });
  }

  public getFilteredPatients(searchText: string): Observable<Patient[]> {
    return Observable.create((observer) => {
      this.getPatients().subscribe((patientsDB) => {

        if (searchText && searchText.length > 0) {

          const filteredPatients = patientsDB
            .filter((patient) => patient.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);

          observer.next(filteredPatients);

        } else {

          observer.next(patientsDB);

        }

      });
    });
  }

/**
 * 2. Environments Management
 */

  public getEnvironments(patientId: string): Observable<Environment[]> {
    return Observable.create((observer) => {
      this.storage.get(patientId)
        .then((environments: Environment[]) => {

          environments = (environments)
            ? environments
            : [];

          observer.next(environments);
          observer.complete();
        },
      ).catch(
        (err) => console.log("ZYGI: getEnvironments() ERROR:", err),
      );

    });
  }

  public setEnvironments(patientId, environments: Environment[]): Observable<Environment[]> {
    return Observable.create((observer) => {

      this.storage.set(patientId, environments).then((storedEnvironments) => {
        observer.next(storedEnvironments);
        observer.complete();
      });

    });
  }

  public addEnvironment(patientId: string, environment: Environment) {
    return Observable.create((observer) => {

      this.getEnvironments(patientId).subscribe((environmentsDB) => {

        environmentsDB.push(environment);

        this.setEnvironments(patientId, environmentsDB).subscribe(() => {
          observer.next(environmentsDB);
          observer.complete();
        });

      });
    });
  }

  public updateEnvironment(patientId: string, environment: Environment, item: Item): Observable<Environment> {
    return Observable.create((observer) => {

      this.getEnvironments(patientId).subscribe((environmentsDB) => {

        const filteredEnvironment = environmentsDB.find((selectedEnv) => selectedEnv.id === environment.id);
        filteredEnvironment.items = environment.items;

        const filteredItem = filteredEnvironment.items.find((selectedItem) => selectedItem.id === item.id);

        filteredItem.x = item.x;
        filteredItem.y = item.y;
        filteredItem.rotationAngle = item.rotationAngle;

        this.setEnvironments(patientId, environmentsDB).subscribe(() => {
          observer.next(filteredEnvironment);
          observer.complete();
        });

      });

    });
  }

  public deleteEnvironment(patientId: string, environmentId: number): Observable<Environment[]> {
    return Observable.create((observer) => {

      this.getEnvironments(patientId).subscribe((environmentsDB) => {

        const filteredEnvironments = environmentsDB.filter((selected) => selected.id !== environmentId);
        this.storage.remove(patientId);

        this.setEnvironments(patientId, filteredEnvironments).subscribe(() => {
          observer.next(filteredEnvironments);
          observer.complete();
        });

      });

    });
  }

  // TODO: check if needed
  public openEnvironment(patientId: string, environment: Environment): Observable<Environment> {
    return Observable.create((observer) => {
      this.storage.get(patientId)
        .then((environmentsDB: Environment[]) => {

          const selectedEnvironment = environmentsDB.find((selected) => selected.id === environment.id);
          observer.next(selectedEnvironment);
          observer.complete();
        },
      ).catch(
        (err) => console.log("ZYGI: openEnvironment() ERROR:", err),
      );

    });
  }

/**
 * 3. Mainframe Management
 */

  public addItemToEnvironment(patientId: string, environment: Environment, item: Item): Observable<Environment> {
    return Observable.create((observer) => {

      this.getEnvironments(patientId).subscribe(
        (environmentsDB) => {

          const selectedEnvironment = environmentsDB.find((selected) => selected.id === environment.id);
          selectedEnvironment.items = environment.items;
          item.id = Date.now();
          selectedEnvironment.items.push(item);

          this.setEnvironments(patientId, environmentsDB).subscribe(() => {
            observer.next(selectedEnvironment);
            observer.complete();
          });

        },
      );
    });
  }

  public pregenerateEnvironment(patientId: string, environment: Environment, itemsToAdd: Item[]): Observable<Environment> {
    return Observable.create((observer) => {

      this.getEnvironments(patientId).subscribe(
        (environmentsDB) => {

          const selectedEnvironment = environmentsDB.find((selected) => selected.id === environment.id);
          selectedEnvironment.items = environment.items.concat(itemsToAdd);

          this.setEnvironments(patientId, environmentsDB).subscribe(() => {
            observer.next(selectedEnvironment);
            observer.complete();
          });

        },
      );
    });
  }

  public deleteItemFromEnvironment(patientId: string, environment: Environment, item: Item): Observable<Environment> {
    return Observable.create((observer) => {

      this.getEnvironments(patientId).subscribe((environmentsDB) => {

        const filteredEnvironment = environmentsDB.find((selectedEnv) => selectedEnv.id === environment.id);

        filteredEnvironment.items = filteredEnvironment.items.filter((selectedItem) => selectedItem.id !== item.id);

        this.setEnvironments(patientId, environmentsDB).subscribe(() => {
          observer.next(filteredEnvironment);
          observer.complete();
        });

      });

    });
  }

  /**
   * 3. Notes Management
   */

  public saveNote(note: Note, currentPatient: Patient): Observable <Patient> {
    return Observable.create((observer) => {

      this.getPatients().subscribe(
        (patientsDB) => {
          const selectedPatient = patientsDB.find((selected) => selected.id === currentPatient.id);

          if (selectedPatient) {

            const foundNote = selectedPatient.notes.find((selectedNote) => selectedNote.id === note.id);

            if (foundNote) {
              foundNote.q1 = note.q1;
              foundNote.q2a = note.q2a;
              foundNote.q2b = note.q2b;
              foundNote.q2c = note.q2c;
              foundNote.q3a = note.q3a;
              foundNote.q3b = note.q3b;
              foundNote.q4 = note.q4;
              foundNote.q5 = note.q5;
              foundNote.q6a = note.q6a;
              foundNote.q6b = note.q6b;
              foundNote.q6c = note.q6c;
              foundNote.q6d = note.q6d;
              foundNote.q7 = note.q7;
              foundNote.q8 = note.q8;
            } else {
              selectedPatient.notes.push(note);
            }
          }

          this.setPatients(patientsDB).subscribe(() => {
            observer.next(selectedPatient);
            observer.complete();
          });

        },
      );
    });
  }

  public deleteNote(note: Note, patientId: number): Observable<Patient> {
    return Observable.create((observer) => {

      this.getPatients().subscribe((patientsDB) => {

        const filteredPatient = patientsDB.find((selectedPatient) => selectedPatient.id === patientId);

        filteredPatient.notes = filteredPatient.notes.filter((selectedNote) => selectedNote.id !== note.id);

        this.setPatients(patientsDB).subscribe(() => {
          observer.next(filteredPatient);
          observer.complete();
        });

      });

    });
  }

}
