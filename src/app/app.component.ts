import { Component } from "@angular/core";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Platform } from "ionic-angular";

import { DatabaseNoSQL } from "../providers/db-nosql";

import { TabsPage } from "../pages/tabs/tabs";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  private rootPage = TabsPage;

  constructor(
    platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private db: DatabaseNoSQL,
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }
}
