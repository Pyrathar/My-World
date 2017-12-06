import { animate, Component } from "@angular/core";
import { AlertController, ModalController, NavController } from "ionic-angular";
import { OrderByPipe } from "ngx-pipes";

import { Patient } from "../../models/patient";

import { EnvironmentsPage } from "../environments/environments";
import { NotesFormPage } from "../mainframe/notes-form/notes-form";
import { CreateUserModal } from "./create-user-modal";

import { DatabaseNoSQL } from "../../providers/db-nosql";

import { SlowFadingAnimation } from "./../../providers/animations";
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
  private searchText: string;

  constructor(
    private alertCtrl: AlertController,
    private db: DatabaseNoSQL,
    private navCtrl: NavController,
    private orderBy: OrderByPipe,
    private modalCtrl: ModalController,
  ) {
  }

  public ionViewWillEnter() {
    this.getPatients();
  }

  private getPatients() {
    this.db.getFilteredPatients(this.searchText).subscribe((patientsDB) => {
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

    modal.onDidDismiss( () => this.getPatients() );

    modal.present();
  }

  private openEditPatientModal(patient: Patient) {

    this.isOptionsOpen = false;
    const modal = this.modalCtrl.create(CreateUserModal, { patient });
    modal.present();
  }

  // tslint:disable:object-literal-sort-keys
  private deletePatient(patient: Patient, index: number) {

    const alert = this.alertCtrl.create({
      title: "Delete profile",
      message: "Are you sure you want to delete profile?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            this.isOptionsOpen = false;
          },
        },
        {
          text: "Delete",
          handler: () => {

            this.db.deletePatient(patient, index).subscribe((patientsDB) => {
              this.isOptionsOpen = false;
              this.patients = patientsDB;
            });

          },
        },
      ],
    });
    alert.present();
  }

  private openNotes(patient: Patient) {
    const notesModal = this.modalCtrl.create(NotesFormPage, { currentPatient: patient });

    notesModal.onDidDismiss((currentPatientDB) => {
      // if (currentPatientDB) { this.currentPatient = currentPatientDB; }
      this.getPatients();
    });

    notesModal.present();
  }

  // FIXME: sort both ways
  private sortBy(sortingOption: string) {

    this.isOptionsOpen = false;
    this.patients = this.orderBy.transform(this.patients, sortingOption);
  }

  private searchPatients() {

    this.db.getFilteredPatients(this.searchText).subscribe((filteredPatients) => {
      this.patients = filteredPatients;
    });
  }

  private openPage(patient: Patient) {

    this.isOptionsOpen = false;
    this.navCtrl.push(EnvironmentsPage, { patient });
  }
}
