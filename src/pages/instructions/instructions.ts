import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DatabaseNoSQL } from "../../providers/db-nosql";

@IonicPage()
@Component({
  selector: "page-instructions",
  templateUrl: "instructions.html",
})
export class InstructionsPage {

  private slides;

  constructor(private db: DatabaseNoSQL, private navCtrl: NavController, private navParams: NavParams) {
    this.slides = [
      {
        image: "assets/img/background/class_tn.png",
        title: "Create profile. Type in your name and choose avatar that looks most like you.",
      },
      {
        image: "assets/img/background/home_tn.png",
        title: "Add environment and make it look like yours",
      },
      {
        image: "assets/img/background/outdoors_tn.png",
        title: "Add people you know and use moods to describe a situation",
      },
    ];
  }

  public ionViewDidLoad() {
  }

  private skipTutorial() {
    this.db.setInstructionStatus(true).subscribe(() => { });
    this.navCtrl.parent.select(1); // Open Patients page
  }

}
