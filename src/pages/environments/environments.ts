import { Component } from "@angular/core";
import { AlertController, ItemSliding, NavController, NavParams } from "ionic-angular";

import { DatabaseNoSQL } from "../../db-nosql";
import { Environment, Patient } from "../../models";
import { MainframePage } from "../mainframe/mainframe";

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

  private animationClasses: any = {
    toggleBackgrounds: true,
  };

  constructor(
    private alertCtrl: AlertController,
    private navController: NavController,
    private navParams: NavParams,
    private db: DatabaseNoSQL,
  ) {
    this.currentPatient = navParams.get("patient");
  }

  public ionViewDidLoad() {

    this.patientId = `p${this.currentPatient.id}`;
    this.db.getEnvironments(this.patientId);
  }

  private addEnvironment(environment: Environment, i) {
    const items = [];
    items.push(this.db.C.BACKGROUNDS[i]);

    this.db.C.AVATARS.map((avatar) => {
      if (avatar.imgUrl === this.currentPatient.avatar) {
        items.push(avatar);
      }
    });
    // FIXME: find out how to use only BACKGROUNDS instead BACKGROUNDTHUMBS array

    this.db.addEnvironment(this.patientId, environment.name, environment.imgUrl, items);
    this.isPopup = false;
    this.openPage(environment, this.patientId, this.db.environments.length - 1);
  }

  private editEnvironment(environment: Environment, itemSliding: ItemSliding) {

    const prompt = this.alertCtrl.create({
      buttons: [
        {
          handler: (data) => {
            itemSliding.close();
          },
          role: "cancel",
          text: "Cancel",
        },
        {
          handler: (data) => {
            environment.name = data.name;
            this.db.save(this.patientId, this.db.environments);
            itemSliding.close();
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

  private deleteEnvironment(environment: Environment, index: number) {
    this.db.deleteEnvironment(this.patientId, index);
  }

  private togglePopup() {
    this.isPopup = !this.isPopup;
  }

  private closePopup() {
    if (this.isPopup) {
      this.isPopup = false;
    }
  }

  private openPage(environment: Environment, patientId: string, index: number) {
    patientId = this.patientId;
    this.db.envIndex = index;
    this.navController.push(MainframePage, { environment, index, patientId });
  }

}
