import { Component } from '@angular/core';
import { NavParams, PopoverController } from 'ionic-angular';
import { database, Item, ItemPosition, Patient, Situation } from '../../database';

import { IonicSelectPage } from '../page2/page2'; //page for popover
// ********************************//
//  CURRENT SITUATION PAGE
// ********************************//

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})

export class Page1 {

  item: ItemPosition = null;
  sceneItems: ItemPosition[];
  currentSituation: Situation;

  isActive: boolean;
  waitToDeleteTimer: number;

  itemX: number;
  itemY: number;

  moveStartX: number;
  moveStartY: number;

  constructor(
    public database: database, navParams: NavParams, public popoverCtrl: PopoverController) {
    this.currentSituation = navParams.get('situationObject');
    this.loadSceneItems();
    // console.log(this.sceneItems);

  }

  public ngOnChanges() {
    this.loadSceneItems();
    console.log(this.sceneItems);
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
        console.log(this.sceneItems);
        return this.sceneItems;
      }
    });
  }

  presentPopover() {
    let popover = this.popoverCtrl.create(IonicSelectPage, {thisSituation: this.currentSituation});
    popover.present();
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
    this.item = item;
    this.moveStartX = e.clientX;  // current cursor X position on screen
    this.moveStartY = e.clientY;  // current cursor Y position on screen

    this.itemX = e.offsetX === undefined ? e.layerX : e.offsetX; // X position of Item
    this.itemY = e.offsetY === undefined ? e.layerY : e.offsetY; // Y position of Item
  }

  moveDragOver(item: ItemPosition, e) {
    e.preventDefault();
    this.makeUnactive(e);
  }

  moveDrop(item: ItemPosition, sceneItems: ItemPosition[], e) {

    console.log(sceneItems);
    var imageWidth: number = e.srcElement.width;
    var imageHeight: number = e.srcElement.height;
    var screenWidth: number = e.view.innerWidth;
    var screenHeight: number = e.view.innerHeight;
    var availableScreenX: number;
    var availableScreenY: number;

    var deltaX: number;
    var deltaY: number;
    var updatedX: number;
    var updatedY: number;

    e.preventDefault();
    this.makeUnactive(e);

    deltaX = e.clientX - this.moveStartX; // how many pixels item moved on X axis
    deltaY = e.clientY - this.moveStartY; // how many pixels item moved on Y axis

    updatedX = e.pageX - this.itemX;
    updatedY = e.pageY - (this.itemY + 56);

    availableScreenX = screenWidth - imageWidth; // how many pixels left to move on X axis
    availableScreenY = screenHeight - imageHeight; // how many pixels left to move on Y axis

    if (item.category != 'background') {
      if (updatedY > 0) {  // check if item doesnt go over status bar (top of the screen)
        this.updateItemPositionOnScene(item, updatedX, updatedY);
      } else {
        this.removeItemFromScene(item);
      }

    } else {
      if ((updatedX < 0) && (updatedX > availableScreenX) &&  // checks if there is available space on X and Y axis to move background
        (updatedY < 0) && (updatedY > availableScreenY)) {  //update position to image size and 0 in DB

        for (let i = 0; i < this.sceneItems.length; i++) {
          this.updateItemPositionOnScene(this.sceneItems[i], this.sceneItems[i].x + deltaX, this.sceneItems[i].y + deltaY); // moves all scene items together with a background
        }

      } else {
        console.log("there is no available space to move");
      }
    }
  }

}
