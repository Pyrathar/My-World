import { Component } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';

import { database, Environment, Item, ItemPosition, Patient, Situation } from '../../database';
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
  environment: Environment;
  environmentList: Array<Environment>;
  popoverItems: Item[];
  showBackgrounds: boolean = true;

  constructor(
    private database: database,
    private navController: NavController,
    private navParams: NavParams
  ) {

    this.currentPatient = navParams.get('patient');
  }

  public onPageLoaded() {
    this.getSituationsForCurrentPatient();
    this.loadPopoverItems();
  }

  public getSituationsForCurrentPatient() {
    console.log(this.currentPatient);
    // this.database.getItems("background").then((data) => {
    this.database.getSituations(this.currentPatient).then((data) => {

      console.log("get situations");
      this.environmentList = [];
      if (data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let env = data.res.rows.item(i);
          this.environmentList.push(new Environment(
            env.S_id,
            env.P_id,
            env.name,
            env.imgUrl
          ));
        }
        console.log(this.environmentList);
        return this.environmentList;
      }

    }, (error) => {
      console.log(error);
    });
  }
  public toggleBackgrounds() {
    this.showBackgrounds = !this.showBackgrounds;
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

  deletesituation(situation: Environment) {

    this.database.deleteSituation(situation)
    let index = this.environmentList.indexOf(situation);

    if (index > -1) {
      this.environmentList.splice(index, 1);
    }
  }

  public loadPopoverItems() {
    this.database.getItems("background").then(
      data => {
        this.popoverItems = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.popoverItems.push(new Item(
              item.id,
              item.name,
              item.imgUrl,
              item.category
            ));
          }
          return this.popoverItems;
        }
      });
  }

  public addEnvironment(environment: Environment) {
    console.log(this.currentPatient);
    console.log(environment);
    // adds situation for current patient
    // this.database.addSituation(this.currentPatient);
    this.database.addSituation(this.currentPatient, environment);

    this.database.lastSituation().then(
      lastSituationIdData => {
        var lastSituation = lastSituationIdData.res.rows[0];

        console.log(lastSituationIdData.res);
        console.log(lastSituation);

        this.database.saveSceneItem(environment, lastSituation || 1);

        this.showBackgrounds = false;
        this.getSituationsForCurrentPatient();
        // open page with a newly created situation
        // this.navController.push(Page1, { lastSituation });

      });

    (error) => {
      console.log(error);
    }
  }

  openPage(environment: Environment) {
    this.navController.push( Page1, { environment });
  }

}
