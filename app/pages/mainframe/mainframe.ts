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
    item.x = Math.round(e.changedTouches["0"].clientX);
    item.y = Math.round(e.changedTouches["0"].clientY - 104);
    this.database.saveSceneItem(item, this.currentSituation);
    this.togglePopover = false;
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

  personsPopover(myEvent) {
    this.togglePopover = true;
    this.popoverToShow = "person";
    this.loadPopoverItems();
  }

  moodsPopover(myEvent) {
    this.togglePopover = true;
    this.popoverToShow = "mood";
    this.loadPopoverItems();
  }

  itemsPopover(myEvent) {
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

    console.log(item);
    if (item.category == 'person' || 'mood' || 'item') {
      // console.log("move started");
      // console.log(e);
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
    // console.log(e);
    var updatedX: number;
    var updatedY: number;

    // e.preventDefault();

    // deltaX = e.clientX - this.moveStartX; // how many pixels item moved on X axis
    // deltaY = e.clientY - this.moveStartY; // how many pixels item moved on Y axis

    updatedX = e.changedTouches["0"].clientX - this.itemX;
    updatedY = e.changedTouches["0"].clientY - this.toolbarSize - this.itemY;
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

      updatedX = Math.round(e.changedTouches["0"].clientX - this.itemX);
      updatedY = Math.round(e.changedTouches["0"].clientY - this.toolbarSize - this.itemY);
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
          if (item.category != 'background') {
            this.removeItemFromScene(item);
          }
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


// ********************************//
//  POPOVER
// ********************************//
@Component({
  template: `
    <ion-list>
      <div class="menuItems" *ngFor="let item of popoverItems;">
        <img [class]="item.category" [src]="item.imgUrl" (touchend)="addToSituation(item, currentSituation, $event)" />
      </div>
    </ion-list>
  `
})

export class PopoverPage {

  popoverItems: Item[];
  thisSituation: Situation;
  popoverToShow;

  constructor(public database: database, public navParams: NavParams, public vc: ViewController) {
    this.thisSituation = navParams.data.curSituation;
    this.popoverToShow = navParams.data.popupToOpen;
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
          return this.popoverItems;
        }
      });
  }

  public ngOnInit() {
    this.loadPopoverItems();
  }

  // // Save our item to the DB and display it in Page1
  public addToSituation(item: ItemPosition, thisSituation, e) {
    item.x = Math.round(e.changedTouches["0"].clientX);
    item.y = Math.round(e.changedTouches["0"].clientY - 104);
    this.database.saveSceneItem(item, this.thisSituation);
    this.vc.dismiss();
  }
}
// Popover end
