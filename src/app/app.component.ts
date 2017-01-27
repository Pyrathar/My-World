import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { Database } from '../database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, public db: Database) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      db.openDatabase().then(() => {
        console.log("loading app v2");


        this.db.generatepatients()
        console.log("patients table generated");
        this.db.generatesituations()
        console.log("situations table generated");
        this.db.generateitemposition()
        console.log("positions table generated");
        this.db.generateitems()
        this.db.del()
        console.log("items table generated");
      })

    });
  }
}
