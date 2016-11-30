import { Component, ViewChild, Renderer  } from '@angular/core';
import { NavParams, NavController, PopoverController } from 'ionic-angular';
import { database, Item, ItemPosition, Patient, Situation } from '../../database';

import { IonicSelectPage } from '../popups/popups'; //page for backgrounds popover
import { Page3 } from '../page3/page3'; //page for people popover
import { Page4 } from '../page4/page4'; //page for moods popover
import { Page5 } from '../page5/page5'; //page for items popover

// ********************************//
//  CURRENT COMMUNICATION SITUATION PAGE
// ********************************//
declare var jQuery:any;

@Component({
  template: `
    <ion-list>
      <div class="menuItems" *ngFor="let item of personsMenu;">
      <img [class]="item.category" [src]="item.imgUrl" (click)="addToSituation(item, currentSituation)" />
    </div>
    </ion-list>
  `
})

export class PopoverPage {

  personsMenu: Item[];
  thisSituation: Situation;

  constructor(public database: database, public navParams: NavParams, public navController: NavController) {

    this.thisSituation = this.navParams.get('AAAA');
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
    let persss = this.loadPersons();
    console.log(this.thisSituation, this.personsMenu, persss);
  }

  // // Save our item to the DB and display it in Page1
  public addToSituation(item: ItemPosition, thisSituation) {
    this.database.saveSceneItem(item, this.thisSituation);
    console.log( thisSituation);

    thisSituation.push(item);

    console.log( thisSituation);
    // this.navController.push(Page1, {
    //   thisSituation: item
    // });
  }
}



@Component({
  templateUrl: 'build/pages/mainframe/mainframe.html'
})

export class Page1 {
  // @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  // @ViewChild("input") input;




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

  // ngAfterContentInit() {
  //   this.input.nativeElement.focus();
  // }

  public ngOnChanges() {
    this.loadSceneItems();
    console.log(this.sceneItems);
  }

  public ionViewDidLoad() {
    console.log("ionViewDidLoad");
  }

  public ionViewWillEnter() {
    console.log("ionViewWillEnter");
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

  presentPopover1(myEvent) {
    let popover = this.popoverCtrl.create(IonicSelectPage, {thisSituation: this.currentSituation});
    popover.present({
      ev: myEvent
    });
  }

  presentPopover2(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage, {AAAA: this.sceneItems});
    popover.present({
      ev: myEvent
    });
  }

  presentPopover3(myEvent) {
    let popover = this.popoverCtrl.create(Page4, {thisSituation: this.currentSituation});
    popover.present({
      ev: myEvent
    });
  }

// change it to items when we get those
  presentPopover4(myEvent) {
    let popover = this.popoverCtrl.create(Page5, {thisSituation: this.currentSituation});
    popover.present({
      ev: myEvent
    });
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

    if (!null) {
      // console.log("move started");
      // console.log(e);
      this.item = item;
      this.moveStartX = e.targetTouches["0"].clientX;  // current cursor X position on screen
      this.moveStartY = e.targetTouches["0"].clientY - 104;  // current cursor Y position on screen minus toolbars in the top
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
    // console.log(e);

    // e.preventDefault();
    this.makeUnactive(e);
  }

  moveDrop(item: ItemPosition,  e) {

    if (!null) {
      // console.log("move drop");
      // console.log(e);

      // console.log(sceneItems);
      // var imageWidth: number = e.srcElement.width;
      // var imageHeight: number = e.srcElement.height;
      // var screenWidth: number = e.view.innerWidth;
      // var screenHeight: number = e.view.innerHeight;
      // var availableScreenX: number;
      // var availableScreenY: number;
      //
      // var deltaX: number;
      // var deltaY: number;
      var updatedX: number;
      var updatedY: number;

      // e.preventDefault();
      this.makeUnactive(e);

      // deltaX = e.clientX - this.moveStartX; // how many pixels item moved on X axis
      // deltaY = e.clientY - this.moveStartY; // how many pixels item moved on Y axis

      updatedX = e.changedTouches["0"].clientX - this.itemX;
      updatedY = e.changedTouches["0"].clientY - 104 - this.itemY;
      // console.log(e.changedTouches["0"].clientX, e.changedTouches["0"].clientY-104);
      // console.log(updatedX, updatedY);

      // e.changedTouches["0"].clientX = this.itemX;
      // e.changedTouches["0"].clientY = this.itemY;

      // console.log(updatedX, updatedY);
      // updatedX = e.pageX - this.itemX;
      // updatedY = e.pageY - (this.itemY + 56);

      // availableScreenX = screenWidth - imageWidth; // how many pixels left to move on X axis
      // availableScreenY = screenHeight - imageHeight; // how many pixels left to move on Y axis

      if (item.category == 'person' || 'mood' || 'item') {
        if (updatedY > 0) {  // check if item doesnt go over status bar (top of the screen)
          this.updateItemPositionOnScene(item, updatedX, updatedY);
        } else {
          // this.removeItemFromScene(item);
        }

      } else {
        // if ((updatedX < 0) && (updatedX > availableScreenX) &&  // checks if there is available space on X and Y axis to move background
        //   (updatedY < 0) && (updatedY > availableScreenY)) {  //update position to image size and 0 in DB
        //
        //   for (let i = 0; i < this.sceneItems.length; i++) {
        //     this.updateItemPositionOnScene(this.sceneItems[i], this.sceneItems[i].x + deltaX, this.sceneItems[i].y + deltaY); // moves all scene items together with a background
        //   }
        //
        // } else {
        //   console.log("there is no available space to move");
        // }
      }
    }

  }

}
