import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {SqlStorage, Storage} from 'ionic-angular';
import { HomePage } from './pages/home/home';
import { database } from './database';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;
  private database: Storage;
  public personList: Array<Object>;


  constructor(public platform: Platform) {
    platform.ready().then(() => {






      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [database]);
