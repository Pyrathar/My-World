import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";

import { DatabaseNoSQL } from "../../providers/db-nosql";
import { MainframePage } from "../mainframe/mainframe";

import { Environment } from "../../models/environment";
import { Patient } from "../../models/patient";
import { SlowFadingAnimation } from "./../../providers/animations";

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

  private deleteEnvironment(environmentId: number) {
    this.db.deleteEnvironment(this.patientId, environmentId).subscribe((filteredEnvironments) => {
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

  private toBack() {
    this.navCtrl.pop({ animate: false });
  }
}
