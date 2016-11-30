import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { database, Item, ItemPosition, Patient, Situation } from '../../database';
import { Page1 } from '../mainframe/mainframe';


// ********************************//
//  POPOVER PAGE - BACKGROUNDS
// ********************************//
@Component({
  templateUrl: 'build/pages/popups/popups.html'
})
export class IonicSelectPage {

  backgroundsMenu: Item[];
  thisSituation: Situation;

  constructor(public database: database, private navParams: NavParams) {

    this.thisSituation = this.navParams.data.thisSituation;

  }

  public loadBackgrounds() {
    this.database.getItems("background").then(
      data => {
        this.backgroundsMenu = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.backgroundsMenu.push(new Item(item.id, item.name, item.imgUrl, item.category));
          }
          // console.log(this.backgroundsMenu);
          return this.backgroundsMenu;
        }
      });
  }

  public ngOnInit() {
    this.loadBackgrounds();
    console.log(this.thisSituation, this.backgroundsMenu);
  }

  // // Save our item to the DB and display it in Page1
  public addToSituation(item: ItemPosition, thisSituation: Situation) {
    this.database.saveSceneItem(item, this.thisSituation);
  }

}
