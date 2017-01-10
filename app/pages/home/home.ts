import { Component } from '@angular/core';

import {GroceriesPage} from '../introduction/introduction';
import {LadderPage} from '../about/about';
import {NotesPage} from '../patients/patients';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

  tab1Root: any = GroceriesPage;
  tab2Root: any = NotesPage;
  tab4Root: any = LadderPage;

  constructor() {
  }


}
