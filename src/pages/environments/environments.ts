import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { Database, Environment, Item, Patient } from '../../database';
import { MainframePage } from '../mainframe/mainframe';

@Component({
  selector: 'page-environments',
  templateUrl: 'environments.html'
})
export class EnvironmentsPage {

  currentPatient: Patient;
  environment: Environment;
  environmentList: Array<Environment>;
  popoverItems: Array<Item>;
  showBackgrounds: boolean = false;

  constructor(
    private database: Database,
    private navController: NavController,
    private navParams: NavParams
  ) {

    this.currentPatient = navParams.get('patient');
    console.log(this.currentPatient);
  }

  public ionViewDidLoad() {
    this.getSituationsForCurrentPatient();
    this.loadPopoverItems();
    console.log("popover items loaded");
  }

  public getSituationsForCurrentPatient() {
    this.database.getSituations(this.currentPatient).then( data => {
      console.log("getSituationsForCurrentPatient");
      console.log(this.currentPatient);
      console.log(data);
      this.environmentList = data;
    })
  }

  public addEnvironment(environment: Environment) {
    // adds situation for current patient
    console.log(environment);
    console.log(this.currentPatient);
    this.database.addSituation(this.currentPatient, environment);
    console.log("addSituation done");

    this.database.lastSituation().then(
      lastSituationIdData => {
        console.log("lastSituation entered");

        console.log(lastSituationIdData);

        var lastSituation = lastSituationIdData.rows[0];
        if (lastSituation === undefined) {
            lastSituation = 1;
        }
        console.log("lastSituation");
        console.log(lastSituation);

        this.database.saveSceneItem(environment, lastSituation || 1);
        console.log(environment);

        this.showBackgrounds = false;
        console.log("to start getSituationsForCurrentPatient");

        this.getSituationsForCurrentPatient();

      });
    (error) => {
      console.log(error);
    }
  }
// let sql = `INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 1, 0, 0)`;
// // console.log(sql);
//
// this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 1, 0, 0)`);
// this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 5, 100, 100)`);
// this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 7, 240, 300)`);
// this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 11, 700, 400)`);
//
//
// // this.database.saveSceneItem(item1, data);

  public deletesituation(situation: Environment) {

    this.database.deleteSituation(situation)
    let index = this.environmentList.indexOf(situation);

    if (index > -1) {
      this.environmentList.splice(index, 1);
    }
  }

  public loadPopoverItems() {
    this.database.getItems("background").then( data => {
      console.log("data in popoverItems");
      console.log(data);
      this.popoverItems = data;
      console.log("popoverItems" );
      console.log( this.popoverItems );
    });
  }

  public toggleBackgrounds() {
    this.showBackgrounds = !this.showBackgrounds;
  }

  public closePopup() {
    this.showBackgrounds = false;
  }

  openPage(environment: Environment) {
    this.navController.push( MainframePage, { environment });
  }

}
