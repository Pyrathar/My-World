import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { database, Item, ItemPosition, Situation } from '../../database';

import { Page1 } from '../mainframe/mainframe';


// ********************************//
//  POPOVER PAGE - PERSONS
// ********************************//
@Component({
  templateUrl: 'build/pages/page3/page3.html'
})
export class Page3 {

  personsMenu: Item[];
  thisSituation: Situation;

  constructor(public database: database, private navParams: NavParams, private navController: NavController) {

    this.thisSituation = this.navParams.get('thisSituation');
    console.log(this.thisSituation);

  }

  public loadPersons() {
    this.database.getItems("person").then(
      data => {
        this.personsMenu = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.personsMenu.push(new Item(item.id, item.name, item.imgUrl, item.category));
          }
          // console.log(this.personsMenu);
          return this.personsMenu;
        }
      });
  }


  public ngOnInit() {
    this.loadPersons();
    console.log(this.thisSituation, this.personsMenu);
  }

  // // Save our item to the DB and display it in Page1
  public addToSituation(item: ItemPosition, thisSituation) {
    this.database.saveSceneItem(item, this.thisSituation);
    console.log(item, this.thisSituation);
    // this.navController.pop();
  }

}
