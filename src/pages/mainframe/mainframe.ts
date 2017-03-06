import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Database, Environment, ItemPosition } from '../../database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-mainframe',
  templateUrl: 'mainframe.html'
})
export class MainframePage {

  item: ItemPosition;
  sceneItems: any;
  sceneItemsObserver: any;
  currentSituation: Environment;
  togglePersons: boolean = false;
  toggleMoods: boolean = false;
  toggleItems: boolean = false;
  pregenerateBtn: boolean;
  allowScroll: string = "scroll";

  isActive: boolean = false;
  waitToDeleteTimer: number;
  toolbarSize: number = 104;

  itemX: number;
  itemY: number;

  moveStartX: number;
  moveStartY: number;
    
  animationClasses: any = {
    'popoverItems': true,
    'animated': true,
    'fadeIn': true
  };

  itemPressedTimer: number = 0;


  constructor(public db: Database, navParams: NavParams) {
    this.currentSituation = navParams.get('environment');
  }

  public ionViewDidLoad() {
    // this.loadSceneItems();

    this.sceneItemsObserver = Observable.create(observer => {

      console.log("observable");
      this.loadSceneItems();
      // myObservable = observer;
      // console.log(myObservable);
    });

    this.sceneItemsObserver.subscribe((data) => {
      console.log("subscribe");
      console.log(data);
    })
  }

  public loadSceneItems() {
    this.db.getSceneItems(this.currentSituation).then( data => {
      this.sceneItems = data;
      this.checkPregenerateBtn();
    });
  }

  public checkPregenerateBtn() {
    console.log("checkPregenerateBtn scene items ", this.sceneItems);

    this.pregenerateBtn = (this.sceneItems.length == 1) ? true : false;
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

  // Save our item to the DB and display it in Page1
  public addToSituation(item: ItemPosition, thisSituation, e) {
    if (e.changedTouches["0"].clientY > 284) {  // 284 is the height of header + toolbar + popover bar
      item.x = Math.round(e.changedTouches["0"].clientX);
      item.y = Math.round(e.changedTouches["0"].clientY - 104); // 104 is the height of header + toolbar
      this.closePopup();
      this.db.saveSceneItem(item, this.currentSituation);
      this.sceneItems.push(item);
      //this.loadSceneItems();
      this.sceneItemsObserver.next(true);
    }
  }

  public addToSituationToDefaultPosition(item: ItemPosition, thisSituation, e) {
      item.x = 0;
      item.y = 0;
      this.closePopup();
      this.db.saveSceneItem(item, this.currentSituation);
      this.sceneItems.push(item);
      // this.loadSceneItems();
      this.sceneItemsObserver.next(true);
  }

  public pregenerateItems() {
    for (let i = 0; i < this.sceneItems.length; i++) {

      // Pregenerate items for CLASSROOM Situation
      if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/Classroom-shoebox.png") {

        let chair1 = new ItemPosition(44, null, null, null, null, null, 188, 143);
        this.db.saveSceneItem(chair1, this.currentSituation);

        let chair2 = new ItemPosition(44, null, null, null, null, null, 400, 143);
        this.db.saveSceneItem(chair2, this.currentSituation);

        let chair3 = new ItemPosition(44, null, null, null, null, null, 605, 143);
        this.db.saveSceneItem(chair3, this.currentSituation);

        let largeTable1 = new ItemPosition(58, null, null, null, null, null, 153, 200);
        this.db.saveSceneItem(largeTable1, this.currentSituation);

        let largeTable2 = new ItemPosition(58, null, null, null, null, null, 371, 200);
        this.db.saveSceneItem(largeTable2, this.currentSituation);

        let largeTable3 = new ItemPosition(58, null, null, null, null, null, 571, 200);
        this.db.saveSceneItem(largeTable3, this.currentSituation);

        // this.loadSceneItems();
        this.sceneItemsObserver.next(true);
        console.log(this.sceneItems);


        // Pregenerate items for HOME Situation
      } else if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/At-Home-shoebox.png") {

        let chair1 = new ItemPosition(44, null, null, null, null, null, 590, 575);
        this.db.saveSceneItem(chair1, this.currentSituation);

        let chair2 = new ItemPosition(44, null, null, null, null, null, 662, 570);
        this.db.saveSceneItem(chair2, this.currentSituation);

        let armChair = new ItemPosition(34, null, null, null, null, null, 842, 595);
        this.db.saveSceneItem(armChair, this.currentSituation);

        let bed = new ItemPosition(36, null, null, null, null, null, 302, 204);
        this.db.saveSceneItem(bed, this.currentSituation);

        let bookcase = new ItemPosition(39, null, null, null, null, null, 313, 445);
        this.db.saveSceneItem(bookcase, this.currentSituation);

        let flatscreen = new ItemPosition(51, null, null, null, null, null, 958, 730);
        this.db.saveSceneItem(flatscreen, this.currentSituation);

        let sofa = new ItemPosition(69, null, null, null, null, null, 948, 467);
        this.db.saveSceneItem(sofa, this.currentSituation);

        let table = new ItemPosition(70, null, null, null, null, null, 597, 629);
        this.db.saveSceneItem(table, this.currentSituation);

        // this.loadSceneItems();
        this.sceneItemsObserver.next(true);
        console.log(this.sceneItems);


        // Pregenerate items for GREAT OUTDOORS Situation
      } else if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/The-Great-Outdoors.png") {

        let bike = new ItemPosition(37, null, null, null, null, null, 542, 469);
        this.db.saveSceneItem(bike, this.currentSituation);

        let football = new ItemPosition(52, null, null, null, null, null, 715, 637);
        this.db.saveSceneItem(football, this.currentSituation);

        let car = new ItemPosition(42, null, null, null, null, null, 471, 309);
        this.db.saveSceneItem(car, this.currentSituation);

        // this.loadSceneItems();
        this.sceneItemsObserver.next(true);
        console.log(this.sceneItems);


        // Pregenerate items for STATION Situation
      } else if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/Station-and-Metro.png") {

        let bike = new ItemPosition(37, null, null, null, null, null, 200, 700);
        this.db.saveSceneItem(bike, this.currentSituation);

        let train = new ItemPosition(73, null, null, null, null, null, 708, 340);
        this.db.saveSceneItem(train, this.currentSituation);

        // this.loadSceneItems();
        this.sceneItemsObserver.next(true);
        console.log(this.sceneItems);

      }
    }
  }

  closePopup() {
    this.togglePersons = false;
    this.toggleMoods = false;
    this.toggleItems = false;

    this.isActive = false;
  }

  // Remove the item from the DB and our current this.sceneItems
  public removeItemFromScene(item: ItemPosition) {
    console.log("delete me");
    this.db.removeSceneItem(item);
    let index = this.sceneItems.indexOf(item);

    if (index > -1) {
      this.sceneItems.splice(index, 1);
    }
    this.checkPregenerateBtn();
    this.sceneItemsObserver.next(true);
  }

  makeActive(e) {
    // e.stopPropagation();
    e.preventDefault;
    this.itemPressedTimer = e.timeStamp;
    console.log(e.timeStamp, this.itemPressedTimer);


    if (!this.isActive) {
      
      this.waitToDeleteTimer = setTimeout(() => { 
        this.isActive = true;
      }, 1200); //1200

    }
  }

  makeUnactive(e) {
    // e.stopPropagation();
    this.isActive = false;
    clearTimeout(this.waitToDeleteTimer);

    // console.log(e.timeStamp, this.itemPressedTimer);
    // this.itemPressedTimer = 0; // reset after each release
  }

  updateItemPositionOnScene(item: ItemPosition, newX, newY) {
    item.x = newX;
    item.y = newY;
    this.db.moveItem(item);
  }

  moveStart(item: ItemPosition, e) {
      // console.log("moveStart category",item.category);



    if (item.category == 'person' || 'mood' || 'item') {
      // console.log("move started");
      console.log("moveStart IF TRUE. item is ",item.category, this.allowScroll);
      
      this.makeActive(e);

      this.item = item;
      this.moveStartX = e.targetTouches["0"].clientX;  // current cursor X position on screen
      this.moveStartY = e.targetTouches["0"].clientY - this.toolbarSize;  // current cursor Y position on screen minus toolbars in the top

      this.itemX = this.moveStartX - item.x; // item position X center
      this.itemY = this.moveStartY - item.y; // item position Y center

    } else {
      this.allowScroll = "scroll";      
      console.log("moveStart ELSE. item is ",item.category, this.allowScroll);
    }


  }

  moveDragOver(item: ItemPosition, e) {
    console.log("move over event");

    // if (item.x ==  Math.round(e.changedTouches["0"].clientX - this.itemX) && item.y ==  Math.round(e.changedTouches["0"].clientY - this.toolbarSize - this.itemY)) {
    //   console.log(item.x, item.y);
    //   console.log("YES");
    // } else {

    //   console.log("NO");
    //   console.log(item.x, Math.round(e.changedTouches["0"].clientX - this.itemX));
    // }
      this.makeUnactive(e);
    
    item.x = Math.round(e.changedTouches["0"].clientX - this.itemX);
    item.y = Math.round(e.changedTouches["0"].clientY - this.toolbarSize - this.itemY);

    this.allowScroll = (item.category !== 'background') ? 'no-scroll' : 'scroll';
  }

  moveDrop(item: ItemPosition,  e) {


    if (e.timeStamp - this.itemPressedTimer > 3000 && this.isActive == true) {
      console.log('Hooray! They held for 3 seconds')
      this.isActive = true;
    } else {
      this.makeUnactive(e);
    }


    if (!undefined) {
      console.log("move drop");
      console.log(item.category);

      // this.makeUnactive(e);

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
