import { Component } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { Database, Environment, Item, ItemPosition } from '../../database';

@Component({
  selector: 'page-mainframe',
  templateUrl: 'mainframe.html'
})
export class MainframePage {

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

  constructor(
    public database: Database, navParams: NavParams, public popoverCtrl: PopoverController) {
    this.currentSituation = navParams.get('environment');
    this.loadSceneItems();

  }

  public loadSceneItems() {
    this.database.getSceneItems(this.currentSituation).then( data => {
      this.sceneItems = data;
    });
  }

  public loadPopoverItems() {
    this.database.getItems(this.popoverToShow).then( data => {
      this.popoverItems = data;
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
    // console.log(item.x, item.y);
  }

  moveDrop(item: ItemPosition,  e) {

    if (!null) {
      // console.log("move drop");

      this.makeUnactive(e);

      if (item.category == 'person' || 'mood' || 'item') {
        if (item.y > 0) {  // check if item doesnt go over status bar (top of the screen)
          this.updateItemPositionOnScene(item, item.x, item.y);
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
