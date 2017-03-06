import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PatientsPage } from '../patients/patients';


@Component({
  selector: 'page-getting-started',
  templateUrl: 'getting-started.html'
})

export class GettingStartedPage {

  rootPage = PatientsPage;

  animationKids: any = {
    'animated': false,
    'fadeInRight': false,
    'invisible': true    
  };

  animationText: any = {
    'animated': false,
    'fadeInLeft': false,
    'invisible': true
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
     
    this.startAnimations();

  }

  public startAnimations() {
    setTimeout(() => { 
      this.animationKids.invisible = false;
      this.animationKids.animated = true;
      this.animationKids.fadeInRight = true;
      
      this.animationText.invisible = false;
      this.animationText.animated = true;
      this.animationText.fadeInLeft = true;
    }, 700);
  }

  public openPage() {
    // navigates to Patients page and sets it rootPage in nav
    this.navCtrl.parent.select(1);
  }

}
