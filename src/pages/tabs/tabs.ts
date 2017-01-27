import { Component } from '@angular/core';

import { GettingStartedPage } from '../getting-started/getting-started';
import { PatientsPage } from '../patients/patients';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = GettingStartedPage;
  tab2Root: any = PatientsPage;
  tab3Root: any = AboutPage;

  constructor() {

  }
}
