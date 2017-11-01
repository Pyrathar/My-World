import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { Constants } from "./constants";
import { Environment, Item, Patient } from "./models";

@Injectable()
export class DatabaseNoSQL {
  // public is default access modifier
  public patients: Patient[];
  public environments: Environment[];
  public envIndex;
  public questions;

  constructor(private storage: Storage, public C: Constants) {}

  public getDriver() {
    return this.storage.driver;
  }

  public preloadDb() {
    this.storage.get("dbPopulated")
      .then((dbPopulated) => {
        if (!dbPopulated) {
          this.storage.set("patients", []);
          this.storage.set("environments", []);
          this.storage.set("dbPopulated", true);
          this.storage.set("instructionsSeen", false);
        }
        this.getPatients();
      })
      .catch(
        (err) => console.warn("ZYGI: ERROR in preloadDb() ", err),
      );
  }

  public save(key, value) {
    this.storage.set(key, value);
  }

  public remove(key) {
    this.storage.remove(key);
  }

/**
 * 0. User Settings
 */

  public isInstructionsSeen() {
    this.storage.get("instructionsSeen")
      .then((instructionsSeen) => {
        console.log(instructionsSeen);
        if (instructionsSeen === true) {
          console.log("TRUE");
          return "as";
        }
        console.log("FALSE");
        return "falsdasdae";
      })
      .catch(
      (err) => console.warn("ZYGI: ERROR in isInstructionsSeen() ", err),
    );
  }

/**
 * 1. Patients Management
 */

  public getPatients() {
    return this.storage.get("patients")
      .then(
        (patients: Patient[]) => {
          this.patients = (patients !== null || patients === undefined) ? patients : [];
        },
      ).catch(
      (err) => console.log("ZYGI: getPatients() ERROR:", err),
      );
  }

  public addPatient(id: number, name: string, avatar: string) {
    const patient = new Patient(id, name, avatar);
    this.patients.push(patient);
    this.storage.set("patients", this.patients);
  }

  public deletePatient(patient: Patient, index: number) {
    this.patients.splice(index, 1);
    this.storage.set("patients", this.patients);
    this.storage.remove(`p${patient.id}`);
  }

/**
 * 2. Environments Management
 */

  public getEnvironments(patientId: string) {
    return this.storage.get(patientId)
      .then(
        (environments: Environment[]) => {
          this.environments = environments != null ? environments : [];
        }
      ).catch(
        (err) => console.warn("ZYGI: getEnvironments() ERROR: ", err),
      );
  }

  public addEnvironment(patientId: string, name: string, imgUrl: string, items: any[]) {
    const environment = new Environment(name, imgUrl, items);
    this.environments.push(environment);
    this.storage.set(patientId, this.environments);
  }

  public deleteEnvironment(patientId: string, index: number) {
    this.environments.splice(index, 1);
    this.storage.set(patientId, this.environments);
  }

/**
 * 3. Mainframe Management
 */

  public addItemToEnvironment(
    index: number,
    id: number,
    category: string,
    imgUrl: string,
    x: number,
    y: number,
    rotationAngle: number) {

    const item = new Item(id, category, imgUrl, "", x, y, rotationAngle);
    this.environments[index].items.push(item);
  }

  public saveEnvironment(patientId: string) {
    this.storage.set(patientId, this.environments);
  }

  public deleteItemFromEnvironment(patientId: string, environmentIndex: number, itemIndex: number) {
    this.environments[environmentIndex].items.splice(itemIndex, 1);
    this.storage.set(patientId, this.environments);
  }

}
