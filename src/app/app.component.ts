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
        //this.db.del()
        this.db.generatepatients()
        this.db.generatesituations()
        this.db.generateitemposition()
        this.db.generateitems()

        this.db.populateDatabase()
      })

    });
  }
}
