import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { database, Patient } from '../../database';
import { ContactsPage } from '../enviroments/enviroments';;

// ********************************//
//  PATIENTS PAGE
// ********************************//

@Component({
  templateUrl: 'build/pages/patients/patients.html'
})

export class NotesPage {

  patient: Patient;
  patientsList: Array<Patient>;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private database: database) {
  }

  public onPageLoaded() {
    this.updatePatientList();
  }

  public updatePatientList() {
    this.database.getPatients().then((data) => {

      this.patientsList = [];
      if (data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let patient = data.res.rows.item(i);
          this.patientsList.push(new Patient(
            patient.P_id,
            patient.name));
        }
        return this.patientsList;
      }
    });
  }

  addPatient(patient: Patient) {

    let prompt = this.alertCtrl.create({
      title: 'Add Patient',
      inputs: [{
        name: 'name',
        placeholder: 'Enter patient\'s name'
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: data => {

            //Add to Database Patients table
            this.database.addpatient(data);
            (error) => {
              console.log(error);
            }
            this.updatePatientList();
          }
        }
      ]
    });

    prompt.present();
  }

  editPatient(patient: Patient) {

    let prompt = this.alertCtrl.create({
      title: 'Edit Patient',
      inputs: [{
        name: 'name',
        value: `${patient.name}`
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            patient.name = data.name;
            this.database.editPatient(patient);
            (error) => {
              console.log(error);
            }
            this.updatePatientList();
          }
        }
      ]
    });

    prompt.present();

  }

  deletePatient(patient: Patient) {

    this.database.obliteratepatients(patient)
    let index = this.patientsList.indexOf(patient);

    if (index > -1) {
      // console.log("deleting" + patient.P_id);
      this.patientsList.splice(index, 1);
    }
  }

  openPage(patient: Patient) {

    // console.log("Opening Patient ID number = " + patient.P_id);

    this.navCtrl.push(ContactsPage, {
      patientObject: patient
    });
  }


}
