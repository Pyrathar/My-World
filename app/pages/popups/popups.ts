import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { database, Item, ItemPosition, Patient, Situation } from '../../database';
import { Page1 } from '../mainframe/mainframe';


// ********************************//
//  POPOVER PAGE
// ********************************//
@Component({
  templateUrl: 'build/pages/popups/popups.html'
})
export class IonicSelectPage {

  item: Item;
  backgroundsMenu: Item[];
  personsMenu: Item[];
  moodsMenu: Item[];

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

  // Initialise the MenuItems by loading data from our DB
  public loadMenuItems() {
    this.loadBackgrounds();
    this.loadPersons();
    this.loadMoods();
  }

  public ngOnInit() {
    this.loadMenuItems();
    console.log(this.thisSituation, this.backgroundsMenu, this.personsMenu, this.moodsMenu);
  }

  // // Save our item to the DB and display it in Page1
  private addToSituation(item: ItemPosition, thisSituation: Situation) {
    this.database.saveSceneItem(item, this.thisSituation);
    // this.page1.loadSceneItems();
  }

}
