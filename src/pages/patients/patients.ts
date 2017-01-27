import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Database, Patient } from '../../database';
import { EnvironmentsPage } from '../environments/environments';

@Component({
  selector: 'page-patients',
  templateUrl: 'patients.html'
})

export class PatientsPage {

  patient: Patient;
  patientsList: Array<Patient>;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    public database: Database
  ) {}

  public ionViewDidLoad() {
    this.updatePatientList();
  }

  public updatePatientList() {
    this.database.getPatients().then( data => {
      console.log("patients list updated");
      this.patientsList = data;
      console.log(data);
    })
  }

  public addPatient(patient: Patient) {

    let prompt = this.alertCtrl.create({
      title: 'Add Patient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter patient\'s name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: data => {

            //Add to Database Patients table
            this.database.addpatient(data)
            .then(response => {
              this.patientsList.push( data );
            })
            .catch( error => {
              console.error( error );
            });
            console.log("aa");
            this.database.lastPatientAdded().then(
              lastPatientIdData => {
                lastPatientIdData.res.rows[0].P_id;
                console.log("bb");

                var lastSituationId = lastPatientIdData.res.rows[0].P_id;
                console.log(lastSituationId);
// ??????? why not add patient               this.database.addSituation(lastSituationId);


                // let sql = `INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 1, 0, 0)`;
                // console.log(sql);

                // this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 1, 0, 0)`);
                // this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 5, 100, 100)`);
                // this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 7, 240, 300)`);
                // this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 11, 700, 400)`);
                //

                // this.database.saveSceneItem(item1, data);

              });




            (error) => {
              console.log(error);
            }
            //this.updatePatientList();
          }
        }
      ]
    });

    prompt.present();
  }

  public editPatient(patient: Patient) {

    let prompt = this.alertCtrl.create({
      title: 'Edit Patient',
      inputs: [
        {
          name: 'name',
          value: `${patient.name}`
        }
      ],
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

  public deletePatient(patient: Patient) {

    this.database.obliteratepatients(patient)

    let index = this.patientsList.indexOf(patient);

    if (index > -1) {
      this.patientsList.splice(index, 1);
    }
  }

  public openPage(patient: Patient) {

    this.navCtrl.push( EnvironmentsPage, { patient } );
  }
}
