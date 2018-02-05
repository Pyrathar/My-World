import { Component, ViewChild } from "@angular/core";
import { AlertController, ModalController, Navbar, NavController, NavParams } from "ionic-angular";

import { DatabaseNoSQL } from "../../providers/db-nosql";
import { MainframePage } from "../mainframe/mainframe";

import { Environment } from "../../models/environment";
import { Note } from "../../models/note";
import { Patient } from "../../models/patient";
import { SlowFadingAnimation } from "./../../providers/animations";
import { NotesFormPage } from "./notes-form/notes-form";

@Component({
  animations: [SlowFadingAnimation],
  selector: "page-environments",
  templateUrl: "environments.html",
})
export class EnvironmentsPage {
  @ViewChild(Navbar) navBar: Navbar;

  private currentPatient: Patient;
  private isPopup = false;
  private patientId;
  private environments: Environment[];

  constructor(
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private db: DatabaseNoSQL,
  ) {
    this.currentPatient = navParams.get("patient");
  }

  ionViewDidLoad() {
    this.setBackButtonAction()
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
          handler: () => { },
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

  private openNote(note: Note) {
    const notesModal = this.modalCtrl.create(NotesFormPage, { note, currentPatient: this.currentPatient });

    notesModal.onDidDismiss((currentPatientDB) => {
      if (currentPatientDB) { this.currentPatient = currentPatientDB; }
    });

    notesModal.present();
  }

  private deleteNote(note: Note, ev: Event) {
    ev.stopPropagation();

    const alert = this.alertCtrl.create({
      title: "Delete note",
      message: "Are you sure you want to delete this note?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => { },
        },
        {
          text: "Delete",
          handler: () => {

            this.db.deleteNote(note, this.currentPatient.id).subscribe((patientDB) => {
              this.currentPatient = patientDB;
            });

          },
        },
      ],
    });

    alert.present();
  }

  private openPage(environment: Environment) {
    this.db.openEnvironment(this.patientId, environment).subscribe((data) => {

      const currentPatient = this.currentPatient;
      const patientId = this.patientId;

      this.navCtrl.push(MainframePage, { environment, patientId, currentPatient });
    });
  }

  //Method to override the default back button action
  setBackButtonAction() {
    this.navBar.backButtonClick = () => {
      //Write here wherever you wanna do
      this.navCtrl.pop(
        { animate: false, duration: 100 }
        // { direction: 'forward', duration: 4000, easing: 'ease-out', animation: 'SlowFadingAnimation' }
      )
    }
  }
}
