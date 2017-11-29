import { Component, OnInit, ViewChild } from "@angular/core";
import { Tabs } from "ionic-angular";

import { AboutPage } from "../about/about";
import { GettingStartedPage } from "../getting-started/getting-started";
import { InstructionsPage } from "../instructions/instructions";
import { PatientsPage } from "../patients/patients";

import { DatabaseNoSQL } from "../../providers/db-nosql";

@Component({
  templateUrl: "tabs.html",
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  public tab1Root: any = GettingStartedPage;
  public tab2Root: any = PatientsPage;
  public tab3Root: any = AboutPage;
  public tab4Root: any = InstructionsPage;

  @ViewChild("myTabs") private tabRef: Tabs;

  constructor(private db: DatabaseNoSQL) {
    // this.getIndex();
  }

  private getIndex() {
    this.db.getInstructionStatus().subscribe((instructionSeen) => {
      const selectedTab = (instructionSeen) ? 1 : 3; // TODO: Change to 0 before testing
      this.tabRef.select(selectedTab);
    });
  }

}
