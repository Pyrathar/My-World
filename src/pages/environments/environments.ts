import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";

import { DatabaseNoSQL } from "../../db-nosql";
import { MainframePage } from "../mainframe/mainframe";

import { Environment } from "../../models/environment";
import { Patient } from "../../models/patient";
import { SlowFadingAnimation } from "./../../animations";

@Component({
  animations: [SlowFadingAnimation],
  selector: "page-environments",
  templateUrl: "environments.html",
})
export class EnvironmentsPage {

  private currentPatient: Patient;
  private isPopup = false;
  private patientId;
  private environments: Environment[];

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private db: DatabaseNoSQL,
  ) {
    this.currentPatient = navParams.get("patient");
  }

  public ionViewWillEnter() {

    this.patientId = `p${this.currentPatient.id}`;
    this.db.getEnvironments(this.patientId).subscribe((environmentsDB) => {
      this.environments = environmentsDB;
    });
  }

  // TODO: put background and avatar outside environment items, as separate properties
  private addEnvironment(environment: Environment, i) {
    environment.id = Date.now();
    // FIXME: find out how to use only BACKGROUNDS instead BACKGROUNDTHUMBS array
    environment.backgroundUrl = this.db.C.BACKGROUNDS[i].imgUrl;
    environment.items = [];

    this.db.C.AVATARS.map((avatar) => {
      if (avatar.imgUrl === this.currentPatient.avatar) {
        environment.items.push(avatar);
      }
    });

    this.db.addEnvironment(this.patientId, environment).subscribe((environmentsDB) => {
      this.environments = environmentsDB;
      this.isPopup = false;
      this.openPage(environment);
    });
  }

  private editEnvironment(environment: Environment) {

    const prompt = this.alertCtrl.create({
      buttons: [
        {
          handler: () => {},
          role: "cancel",
          text: "Cancel",
        },
        {
          handler: (data) => {
            environment.name = data.name;
            this.db.setEnvironments(this.patientId, this.environments).subscribe(() => { });
          },
          text: "Save",
        },
      ],
      inputs: [
        {
          name: "name",
          value: `${environment.name}`,
        },
      ],
      title: "Rename environment",
    });
    prompt.present();

  }

  private deleteEnvironment(environment: Environment) {
    this.db.deleteEnvironment(this.patientId, environment).subscribe((filteredEnvironments) => {
      this.environments = filteredEnvironments;
    });
  }

  private togglePopup() {
    this.isPopup = !this.isPopup;
  }

  private closePopup() {
    if (this.isPopup) {
      this.isPopup = false;
    }
  }

  private openPage(environment: Environment) {
    this.db.openEnvironment(this.patientId, environment).subscribe((data) => {

      const currentPatient = this.currentPatient;
      const patientId = this.patientId;

      this.navCtrl.push(MainframePage, { environment, patientId, currentPatient });
    });
  }

  // private openPage(environment: Environment, patientId: string, index: number, currentPatient: Patient) {
  //   patientId = this.patientId;
  //   currentPatient = this.currentPatient;
  //   // TODO: give id instead index
  //   this.db.envIndex = index;
  //   console.log(environment, index, patientId, currentPatient);
  //   this.navCtrl.push(MainframePage, { environment, index, patientId, currentPatient });
  // }

  private toBack() {
    this.navCtrl.pop({ animate: false });
  }
}
