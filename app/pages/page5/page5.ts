import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { database, Item, ItemPosition, Patient, Situation } from '../../database';

// ********************************//
//  POPOVER PAGE - ITEMS
// ********************************//
@Component({
  templateUrl: 'build/pages/page5/page5.html'
})
export class Page5 {

  itemsMenu: Item[];
  thisSituation: Situation;

  constructor(public database: database, private navParams: NavParams) {

    this.thisSituation = this.navParams.data.thisSituation;

  }

  public loadMoods() {
    this.database.getItems("item").then(
      data => {
        this.itemsMenu = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.itemsMenu.push(new Item(item.id, item.name, item.imgUrl, item.category));
          }
          // console.log(this.itemsMenu);
          return this.itemsMenu;
        }
      });
  }

  public ngOnInit() {
    this.loadMoods();
    console.log(this.thisSituation, this.itemsMenu);
  }

  // // Save our item to the DB and display it in Page1
  private addToSituation(item: ItemPosition, thisSituation: Situation) {
    this.database.saveSceneItem(item, this.thisSituation);
    // this.page1.loadSceneItems();
  }

}
