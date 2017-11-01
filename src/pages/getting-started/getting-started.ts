import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

// import { PatientsPage } from "../patients/patients";
import { FadeInLeftAnimation, FadeInRightAnimation } from "./../../animations";

@Component({
  animations: [FadeInLeftAnimation, FadeInRightAnimation],
  selector: "page-getting-started",
  templateUrl: "getting-started.html",
})

export class GettingStartedPage {

  // private rootPage = PatientsPage;

  constructor(private navCtrl: NavController) {}

  public ionViewDidLoad() {}

  public openPage() {
    // navigates to Patients page and sets it rootPage in nav
    this.navCtrl.parent.select(3); // Open Patients page
  }

}
