import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { Database, Environment, Patient } from '../../database';
import { MainframePage } from '../mainframe/mainframe';

@Component({
  selector: 'page-environments',
  templateUrl: 'environments.html'
})
export class EnvironmentsPage {

  currentPatient: Patient;
  environment: Environment;
  environmentList: Array<Environment>;
  showBackgrounds: boolean = false;

  animationClasses: any = {
    'toggleBackgrounds': true,
    'animated': true,
    'fadeInDown': true
  };

  constructor(
    private database: Database,
    private navController: NavController,
    private navParams: NavParams
  ) {

    this.currentPatient = navParams.get('patient');
  }

  public ionViewDidLoad() {
    this.getSituationsForCurrentPatient();
  }

  public getSituationsForCurrentPatient() {
    this.database.getSituations(this.currentPatient).then( data => {
      this.environmentList = data;
    })
  }

  public addEnvironment(environment: Environment) {
    // adds situation for current patient
    // console.log("addEnvironment. env: ", environment);
    this.database.addSituation(this.currentPatient, environment);


    this.database.lastSituation().then(
      lastSituationIdData => {
        // console.log("lastSituation entered. data: ", lastSituationIdData);

        let lastSituation = lastSituationIdData;

        // console.log("lastSituation: ", lastSituation);

        this.database.saveSceneItem(environment, lastSituation || 1);

        this.showBackgrounds = false;

        this.getSituationsForCurrentPatient();

      });
    (error) => {
      console.log(error);
    }
  }

  public deletesituation(situation: Environment) {

    this.database.deleteSituation(situation)
    let index = this.environmentList.indexOf(situation);

    if (index > -1) {
      this.environmentList.splice(index, 1);
    }
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
