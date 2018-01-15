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
        image: "assets/img/tutorial/IMG_0050.PNG",
        title: "Create profile. Type in your name and choose avatar that looks most like you.",
      },
      {
        image: "assets/img/tutorial/IMG_0051.PNG",
        title: "Add environment and rename it if you like",
      },
      {
        image: "assets/img/tutorial/IMG_0052.PNG",
        title: "Add people and items to make it look like yours",
      },
      {
        image: "assets/img/tutorial/IMG_0053.PNG",
        title: "Use moods to describe a situation",
      },
      {
        image: "assets/img/tutorial/IMG_0054.PNG",
        title: "Rotate or delete items from situation",
      },
      {
        image: "assets/img/tutorial/IMG_0055.PNG",
        title: "Open conversation starter for example of questions you may want to ask ",
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
