import { Component, OnInit, ViewChild } from "@angular/core";
import { Tabs } from "ionic-angular";

import { AboutPage } from "../about/about";
import { GettingStartedPage } from "../getting-started/getting-started";
import { InstructionsPage } from "../instructions/instructions";
import { PatientsPage } from "../patients/patients";

import { DatabaseNoSQL } from "../../db-nosql";

@Component({
  templateUrl: "tabs.html",
})
export class TabsPage implements OnInit {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  public tab1Root: any = GettingStartedPage;
  public tab2Root: any = PatientsPage;
  public tab3Root: any = AboutPage;
  public tab4Root: any = InstructionsPage;

  public selectedTab;

  constructor(private db: DatabaseNoSQL) {}

  public ngOnInit() {
    this.selectedTab = this.db.isInstructionsSeen() ? 0 : 1;
    // console.log(this.selectedTab, this.db.isInstructionsSeen());
  }

}
