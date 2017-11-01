import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DatabaseNoSQL } from "../../db-nosql";

@IonicPage()
@Component({
  selector: "page-instructions",
  templateUrl: "instructions.html",
})
export class InstructionsPage {

  slides = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "/assets/img/background/class_tn.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "/assets/img/background/home_tn.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "/assets/img/background/outdoors_tn.png",
    }
  ];

  constructor(private db: DatabaseNoSQL, private navCtrl: NavController, private navParams: NavParams) {
  }

  public ionViewDidLoad() {
    console.log("ionViewDidLoad InstructionsPage");
  }

  private skipTutorial() {
    this.db.save("instructionsSeen", true);
    this.navCtrl.parent.select(1); // Open Patients page
  }

}
