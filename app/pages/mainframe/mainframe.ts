import { Component } from '@angular/core';
import { NavParams, PopoverController, ViewController } from 'ionic-angular';
import { database, Environment, Item, ItemPosition, Situation } from '../../database';

// ********************************//
//  CURRENT COMMUNICATION SITUATION PAGE
// ********************************//

@Component({
  templateUrl: 'build/pages/mainframe/mainframe.html'
})

export class Page1 {

  item: ItemPosition;
  sceneItems: ItemPosition[];
  currentSituation: Environment;
  togglePopover: boolean = true;
  popoverItems: Item[];
  popoverToShow;

  isActive: boolean = false;
  waitToDeleteTimer: number;
  toolbarSize: number = 104;

  itemX: number;
  itemY: number;

  moveStartX: number;
  moveStartY: number;

  updatedX: number;
  updatedY: number;

  constructor(
    public database: database, navParams: NavParams, public popoverCtrl: PopoverController) {
    this.currentSituation = navParams.get('environment');
    this.loadSceneItems();

  }

  public loadSceneItems() {
    this.database.getSceneItems(this.currentSituation).then((data) => {

      this.sceneItems = [];
      if (data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let item = data.res.rows.item(i);
          this.sceneItems.push(new ItemPosition(
            item.id,
            item.S_id,
            item.P_id,
            item.itemId,
            item.category,
            item.imgUrl,
            item.x,
            item.y));
        }
        return this.sceneItems;
      }
    });
  }

  public loadPopoverItems() {
    this.database.getItems(this.popoverToShow).then(
      data => {
        this.popoverItems = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.popoverItems.push(new Item(
              item.id,
              item.name,
              item.imgUrl,
              item.category
            ));
          }
          console.log(this.popoverItems);
          return this.popoverItems;
        }
      });
  }

  // // Save our item to the DB and display it in Page1
  public addToSituation(item: ItemPosition, thisSituation, e) {
    if (e.changedTouches["0"].clientY > 230) {
      item.x = Math.round(e.changedTouches["0"].clientX);
      item.y = Math.round(e.changedTouches["0"].clientY - 104);
      this.togglePopover = false;
      this.database.saveSceneItem(item, this.currentSituation);
      console.log(this.sceneItems);
      this.sceneItems.push(item);
      console.log(this.sceneItems);
      this.loadSceneItems();
    }
  }

  backgroundsPopover() {
    this.togglePopover = true;
    this.popoverToShow = "background";
    this.loadPopoverItems();
    // let popover = this.popoverCtrl.create(PopoverPage, {curSituation: this.currentSituation, popupToOpen: openPopup});
    // popover.present({
    //   ev: myEvent
    // });
    // popover.onDidDismiss((item) => {
    //     this.loadSceneItems();
    // });
  }

  closePopup() {
    this.togglePopover = false;
  }

  personsPopover() {
    this.togglePopover = true;
    this.popoverToShow = "person";
    this.loadPopoverItems();
  }

  moodsPopover() {
    this.togglePopover = true;
    this.popoverToShow = "mood";
    this.loadPopoverItems();
  }

  itemsPopover() {
    this.togglePopover = true;
    this.popoverToShow = "item";
    this.loadPopoverItems();
  }

  // Remove the item from the DB and our current array
  public removeItemFromScene(item: ItemPosition) {
    this.database.removeSceneItem(item);
    let index = this.sceneItems.indexOf(item);

    if (index > -1) {
      this.sceneItems.splice(index, 1);
    }
  }

  makeActive(e) {
    // e.stopPropagation();
    e.preventDefault;
    this.waitToDeleteTimer = setTimeout(() => { this.isActive = true; }, 500);
  }

  makeUnactive(e) {
    // e.stopPropagation();
    this.isActive = false;
    clearTimeout(this.waitToDeleteTimer);
  }

  updateItemPositionOnScene(item: ItemPosition, newX, newY) {
    item.x = newX;
    item.y = newY;
    this.database.moveItem(item);
  }

  moveStart(item: ItemPosition, e) {

    if (item.category == 'person' || 'mood' || 'item') {
      // console.log("move started");
      this.item = item;
      this.moveStartX = e.targetTouches["0"].clientX;  // current cursor X position on screen
      this.moveStartY = e.targetTouches["0"].clientY - this.toolbarSize;  // current cursor Y position on screen minus toolbars in the top
      // console.log( this.moveStartX,  this.moveStartY);

      this.itemX = this.moveStartX - item.x; // item position X center
      this.itemY = this.moveStartY - item.y; // item position Y center
      // console.log(this.itemX, this.itemY);

      // this.itemX = e.offsetX === undefined ? e.layerX : e.offsetX; // X position of Item
      // this.itemY = e.offsetY === undefined ? e.layerY : e.offsetY; // Y position of Item

    }


  }

  moveDragOver(item: ItemPosition, e) {
    // console.log("move over event");

    item.x = Math.round(e.changedTouches["0"].clientX - this.itemX);
    item.y = Math.round(e.changedTouches["0"].clientY - this.toolbarSize - this.itemY);

    this.updatedX = item.x;
    this.updatedY = item.y;
  }

  moveDrop(item: ItemPosition,  e) {

    if (!null) {
      console.log("move drop");

      this.makeUnactive(e);

      if (item.category == 'person' || 'mood' || 'item') {
        if (this.updatedY > 0) {  // check if item doesnt go over status bar (top of the screen)
          this.updateItemPositionOnScene(item, this.updatedX, this.updatedY);
        } else {
          if (item.category != 'background') {
            this.removeItemFromScene(item);
          }
        }

      } else {

      }
    }

  }

}
