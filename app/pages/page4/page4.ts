import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { database, Item, ItemPosition, Situation } from '../../database';

// ********************************//
//  POPOVER PAGE - MOODS
// ********************************//
@Component({
  templateUrl: 'build/pages/page4/page4.html'
})
export class Page4 {

  moodsMenu: Item[];
  thisSituation: Situation;

  constructor(public database: database, private navParams: NavParams) {

    this.thisSituation = this.navParams.data.thisSituation;

  }

  public loadMoods() {
    this.database.getItems("mood").then(
      data => {
        this.moodsMenu = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.moodsMenu.push(new Item(item.id, item.name, item.imgUrl, item.category));
          }
          // console.log(this.moodsMenu);
          return this.moodsMenu;
        }
      });
  }

  public ngOnInit() {
    this.loadMoods();
    console.log(this.thisSituation, this.moodsMenu);
  }

  // // Save our item to the DB and display it in Page1
  private addToSituation(item: ItemPosition, thisSituation: Situation) {
    this.database.saveSceneItem(item, this.thisSituation);
  }

}
