import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "ionic-angular";
import { OrderByPipe } from "ngx-pipes/src/app/pipes/array/order-by";

import { DatabaseNoSQL } from "../../db-nosql";
import { Patient } from "../../models";
import { EnvironmentsPage } from "../environments/environments";
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

export class PatientsPage implements OnInit {

  public patients;
  public DBpatients;
  private patient: Patient;
  private addPatientBtn = false;
  private orderCategory = "name";
  private searchQuery: string = "";
  private isOptionsOpen = false;
  private selected: Patient;

  constructor(
    private db: DatabaseNoSQL,
    private navCtrl: NavController,
    private orderBy: OrderByPipe,
    private modalCtrl: ModalController,
  ) {

    // this.db.getPatients().then(
    //   (p) => {

    //     console.log(p);
    //     this.patients = p;
    //     this.DBpatients = p;
    //   });

    // this.db.patients.on("value", (countryList) => {
    //   const countries = [];
    //   countryList.forEach((country) => {
    //     countries.push(country.val());
    //     return false;
    //   });

    //   // this.DBpatients = this.db.patients;
    //   // this.patients = this.db.patients;
    // });

  }

  public ngOnInit() {

    // this.db.getPatients();
    // console.log(this.patients);
    // this.initializePatients();
    // console.log(this.patients);
    // this.patients = this.db.patients;

  }

  private initializePatients() {
    this.patients = this.DBpatients;
    // this.patients = this.db.getPatients();
    this.patients = this.db.patients;
    console.log(this.patients);
  }

  private openOptions(patient: Patient) {
    this.isOptionsOpen = !this.isOptionsOpen;
    this.selected = patient;
  }

  private openAddPatienModal() {

    this.isOptionsOpen = false;
    const modal = this.modalCtrl.create(CreateUserModal);
    modal.present();
  }

  private openEditPatientModal(patient: Patient) {

    this.isOptionsOpen = false;
    const modal = this.modalCtrl.create(CreateUserModal, { patient });
    modal.present();
  }

  private deletePatient(patient: Patient, index: number) {

    this.isOptionsOpen = false;
    this.db.deletePatient(patient, index);
  }

  private sortBy(sortingOption: string) {

    this.isOptionsOpen = false;
    this.db.patients = this.orderBy.transform(this.db.patients, sortingOption);
  }

  // private searchPatients(ev: any) {

  //   // Reset patients back to all of the patients
  //   this.initializePatients();

  //   // set val to the value of the searchbar
  //   const val = ev.target.value;

  //   // if the value is an empty string don't filter the patients
  //   if (val && val.trim() !== "") {
  //     this.patients = this.patients.filter((patient) => {
  //       if (patient.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
  //         console.log(patient);
  //         return patient;
  //       }
  //     });
  //   }
  // }

  private openPage(patient: Patient) {

    this.isOptionsOpen = false;
    this.navCtrl.push(EnvironmentsPage, { patient });
  }
}
