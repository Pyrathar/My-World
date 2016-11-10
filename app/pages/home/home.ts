import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GroceriesPage} from '../introduction/introduction';
import {ContactsPage} from '../enviroments/enviroments';
import {LadderPage} from '../about/about';
import {NotesPage} from '../patients/patients';



@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

 tab1Root: any = GroceriesPage;
 tab2Root: any = NotesPage;
 tab3Root: any = ContactsPage;
 tab4Root: any = LadderPage;
  constructor(public navCtrl: NavController) {

  }
}
