import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { FadeInLeftAnimation, FadeInRightAnimation } from "./../../animations";

import { DatabaseNoSQL } from "../../db-nosql";

@Component({
  animations: [FadeInLeftAnimation, FadeInRightAnimation],
  selector: "page-getting-started",
  templateUrl: "getting-started.html",
})

export class GettingStartedPage {

  private status: boolean;

  constructor(private navCtrl: NavController, public db: DatabaseNoSQL) {}

  public ionViewDidLoad() {}

  public openPage(pageNumber: number) {
    // navigates to page and sets it rootPage in nav
    this.navCtrl.parent.select(pageNumber);
  }

  private getStatus() {
    this.db.getInstructionStatus().subscribe((statusDB) => {
      this.status = statusDB;
    });
  }

  private setStatus() {
    this.status = !this.status;
    this.db.setInstructionStatus(this.status).subscribe(() => {});
  }

}
