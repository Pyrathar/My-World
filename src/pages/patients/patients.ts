import { animate, Component } from "@angular/core";
import { ModalController, NavController } from "ionic-angular";
import { OrderByPipe } from "ngx-pipes/src/app/pipes/array/order-by";

import { DatabaseNoSQL } from "../../db-nosql";
import { Patient } from "../../models";
import { EnvironmentsPage } from "../environments/environments";
import { NotesFormPage } from "../mainframe/notes-form/notes-form";
import { SlowFadingAnimation } from "./../../animations";
import { CreateUserModal } from "./create-user-modal";

// import { DomSanitizer } from '@angular/platform-browser';
// DomSanitizer helps preventing Cross Site Scripting Security bugs (XSS)
// by sanitizing values to be safe to use in the different DOM contexts.

@Component({
  animations: [SlowFadingAnimation],
  providers: [OrderByPipe],
  selector: "page-patients",
  templateUrl: "patients.html",
})

export class PatientsPage {

  private patients: Patient[] = [];
  private isOptionsOpen = false;
  private selectedPatient: Patient;

  constructor(
    private db: DatabaseNoSQL,
    private navCtrl: NavController,
    private orderBy: OrderByPipe,
    private modalCtrl: ModalController,
  ) {
    this.getPatients();
  }

  public ionViewDidLoad() {
  }

  private getPatients() {
    this.db.getPatients().subscribe((patientsDB) => {
      this.patients = patientsDB;
    });
  }

  private openOptions(patient: Patient) {

    this.isOptionsOpen = (this.selectedPatient !== patient)
      ? true
      : !this.isOptionsOpen;

    this.selectedPatient = patient;
  }

  private openAddPatienModal() {

    this.isOptionsOpen = false;

    const modal = this.modalCtrl.create(CreateUserModal);

    modal.onDidDismiss((patient) => {

      if (patient) {

        this.db.addPatient(patient).subscribe((patientsDB) => {
          this.patients = patientsDB;
        });

      }
    });

    modal.present();
  }

  private openEditPatientModal(patient: Patient) {

    this.isOptionsOpen = false;
    const modal = this.modalCtrl.create(CreateUserModal, { patient });
    // modal.onDidDismiss((data) => {
    //   console.log(data, this.selectedPatient);

    // });
    modal.present();
  }

  private deletePatient(patient: Patient, index: number) {
    this.db.deletePatient(patient, index).subscribe((patientDeleted) => {
      this.isOptionsOpen = false;
      this.patients = patientDeleted;
    });
  }

  private openNotes(patient: Patient) {
    const notesModal = this.modalCtrl.create(NotesFormPage, { currentPatient: patient });

    notesModal.onDidDismiss((currentPatientDB) => {
      // if (currentPatientDB) { this.currentPatient = currentPatientDB; }
    });

    notesModal.present();
  }

  private sortBy(sortingOption: string) {

    this.isOptionsOpen = false;
    this.patients = this.orderBy.transform(this.patients, sortingOption);
  }

  private searchPatients(ev: any) {

    // Reset patients back to all of the patients
    this.getPatients();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the patients
    if (val && val.trim() !== "") {
      this.patients = this.patients.filter((patient) => {
        if (patient.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          // console.log(patient);
          return patient;
        }
      });
    }
  }

  private openPage(patient: Patient) {

    this.isOptionsOpen = false;
    this.navCtrl.push(EnvironmentsPage, { patient });
  }
}
