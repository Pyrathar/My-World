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
  togglePersons: boolean = false;
  toggleMoods: boolean = false;
  toggleItems: boolean = false;
  popoverItems: Item[];
  popoverToShow: string;
  pregenerateBtn: boolean;
  allowScroll: string = "scroll";

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
      this.checkPregenerateBtn();
    });
  }

  public checkPregenerateBtn() {
    console.log("checkPregenerateBtn scene items ", this.sceneItems);
    if (this.sceneItems.length == 1) {
      this.pregenerateBtn = true;
    } else {
      this.pregenerateBtn = false;
    }
  }

  public loadPopoverItems() {
    this.database.getItems(this.popoverToShow).then( data => {
      this.popoverItems = data;
    });
  }

  public togglePopover(category) {
    this.closePopup();
    if (category == "persons") {
      this.togglePersons = !this.togglePersons;
    } else if (category == "moods") {
      this.toggleMoods = !this.toggleMoods;
    }  else if (category == "items") {
      this.toggleItems = !this.toggleItems;
    }
  }

  // // Save our item to the DB and display it in Page1
  public addToSituation(item: ItemPosition, thisSituation, e) {
    if (e.changedTouches["0"].clientY > 230) {
      item.x = Math.round(e.changedTouches["0"].clientX);
      item.y = Math.round(e.changedTouches["0"].clientY - 104);
      this.closePopup();
      this.database.saveSceneItem(item, this.currentSituation);
      this.sceneItems.push(item);
      this.loadSceneItems();
    }
  }

  public pregenerateItems() {
    for (let i = 0; i < this.sceneItems.length; i++) {

      // Pregenerate items for CLASSROOM Situation
      if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/Classroom-shoebox.png") {

        let item1 = new ItemPosition(44, null, null, null, null, null, 188, 143);
        this.database.saveSceneItem(item1, this.currentSituation);

        let item2 = new ItemPosition(44, null, null, null, null, null, 400, 143);
        this.database.saveSceneItem(item2, this.currentSituation);

        let item3 = new ItemPosition(44, null, null, null, null, null, 605, 143);
        this.database.saveSceneItem(item3, this.currentSituation);

        let item4 = new ItemPosition(58, null, null, null, null, null, 153, 200);
        this.database.saveSceneItem(item4, this.currentSituation);

        let item5 = new ItemPosition(58, null, null, null, null, null, 371, 200);
        this.database.saveSceneItem(item5, this.currentSituation);

        let item6 = new ItemPosition(58, null, null, null, null, null, 571, 200);
        this.database.saveSceneItem(item6, this.currentSituation);

        this.loadSceneItems();
        console.log(this.sceneItems);

        // Pregenerate items for HOME Situation
      } else if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/At-Home-shoebox.png") {
        console.log(this.sceneItems[i].imgUrl);

        // Pregenerate items for GREAT OUTDOORS Situation
      } else if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/The-Great-Outdoors.png") {
        console.log(this.sceneItems[i].imgUrl);

        // Pregenerate items for STATION Situation
      } else if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/Station-and-Metro.png") {
        console.log(this.sceneItems[i].imgUrl);
      }
    }
  }

  closePopup() {
    this.togglePersons = false;
    this.toggleMoods = false;
    this.toggleItems = false;
  }

  // Remove the item from the DB and our current this.sceneItems
  public removeItemFromScene(item: ItemPosition) {
    this.database.removeSceneItem(item);
    let index = this.sceneItems.indexOf(item);

    if (index > -1) {
      this.sceneItems.splice(index, 1);
    }
    this.checkPregenerateBtn();
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
      this.isActive = true;
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

    if (item.category !== 'background') {
      this.allowScroll = "no-scroll";
    }
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
        this.allowScroll = "scroll";
      } else {

      }
    }

  }

}
