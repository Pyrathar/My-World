import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { database, Patient, Situation } from '../../database';
import { Page1 } from '../mainframe/mainframe';
import { LadderPage } from '../about/about';

// ********************************//
//  PATIENT Enviroment PAGE
// ********************************//

@Component({
  templateUrl: 'build/pages/enviroments/enviroments.html'
})

export class ContactsPage {

  currentPatient: Patient;
  situation: Situation = null;
  situationList: Array<Situation>;

  constructor(
    private alertCtrl: AlertController,
    private navController: NavController,
    private navParams: NavParams,
    private database: database) {

    this.currentPatient = navParams.get('patientObject');
  }

  public onPageLoaded() {
    this.getSituationsForCurrentPatient(this.currentPatient);
  }

  //STILL HAVE TO ALTER SOME STUFF

  // this was refresh()
  public getSituationsForCurrentPatient(currentPatient: Patient) {
    this.database.getSituations(this.currentPatient).then((data) => {

      this.situationList = [];
      if (data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let situation = data.res.rows.item(i);
          this.situationList.push(new Situation(
            situation.S_id,
            situation.Situation,
            situation.P_id));
        }
        return this.situationList;
      }

    }, (error) => {
      console.log(error);
    });
  }

  addsituation(situation: Situation) {

    let prompt = this.alertCtrl.create({
      title: 'Add Enviroment',
      inputs: [{
        name: 'Situation',
        placeholder: 'Enter situation\'s title'
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add Blank',
          handler: data => {

            //Add to Database Situations table
            data.P_id = this.currentPatient.P_id;
            this.database.addSituation(data);
            (error) => {
              console.log(error);
            }
            this.getSituationsForCurrentPatient(this.currentPatient);
          }
        },
        {
          text: 'Add Generated',
          handler: data => {

            //Add to Database Situations table
            data.P_id = this.currentPatient.P_id;
            this.database.addSituation(data);

            this.database.lastSituation().then(
              lastSituationIdData => {
                lastSituationIdData.res.rows[0].S_id;

                var lastSituationId = lastSituationIdData.res.rows[0].S_id;
                console.log(lastSituationId);


                // let sql = `INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 1, 0, 0)`;
                // console.log(sql);

                this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 1, 0, 0)`);
                this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 5, 100, 100)`);
                this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 7, 240, 300)`);
                this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 11, 700, 400)`);


                // this.database.saveSceneItem(item1, data);

              });

            (error) => {
              console.log(error);
            }
            this.getSituationsForCurrentPatient(this.currentPatient);
          }
        }
      ]
    });

    prompt.present();
  }

  editSituation(situation: Situation) {


    let prompt = this.alertCtrl.create({
      title: 'Edit Situation',
      inputs: [{
        name: 'Situation',
        value: `${situation.Situation}`
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {

            situation.Situation = data.Situation;
            this.database.editSituation(situation);
            (error) => {
              console.log(error);
            }
          }
        }
      ]
    });

    prompt.present();

  }


  deletesituation(situation: Situation) {

    this.database.deleteSituation(situation)
    let index = this.situationList.indexOf(situation);

    if (index > -1) {
      // console.log("deleting" + situation.S_id);
      this.situationList.splice(index, 1);
    }
  }

  openPage(situation: Situation) {

    // console.log("Opening Patient ID = " + situation.P_id);
    // console.log("Opening Situation ID = " + situation.S_id);

    this.navController.push(Page1, {
      situationObject: situation
    });
  }



}
