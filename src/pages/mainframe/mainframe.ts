import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Database, Environment, ItemPosition } from '../../database';

@Component({
  selector: 'page-mainframe',
  templateUrl: 'mainframe.html'
})
export class MainframePage {

  item: ItemPosition;
  sceneItems: any;
  currentSituation: Environment;
  togglePersons: boolean = false;
  toggleMoods: boolean = false;
  toggleItems: boolean = false;
  pregenerateBtn: boolean;
  allowScroll: string = "scroll";

  isActive: boolean = false;
  isPaused: boolean = false;
  waitToDeleteTimer: number;
  toolbarSize: number = 104;

  itemX: number;
  itemY: number;

  moveStartX: number;
  moveStartY: number;
    
  animationPopoverClasses: any = {
    'popoverItems': true,
    'animated': true,
    'fadeIn': true
  };

  animationDeleteClasses: any = {
    'animated': true,
    'pulse': true,
    'infinite': true
  };

  itemPressedTimer: number = 0;


  constructor(public db: Database, navParams: NavParams) {
    this.currentSituation = navParams.get('environment');
  }

  public ionViewDidLoad() {
    this.loadSceneItems();
  }

  public loadSceneItems() {

    this.db.getSceneItems(this.currentSituation).then( data => {
      this.sceneItems = data;
      this.checkPregenerateBtn();
    });

  }

  public checkPregenerateBtn() {
    this.pregenerateBtn = (this.sceneItems.length == 1) ? true : false;
  }

  public togglePopover(category, e) {

    this.closePopup();

    switch (category) {

      case "persons":
        this.togglePersons = !this.togglePersons;
        break;

      case "moods":
        this.toggleMoods = !this.toggleMoods;
        break;
    
      default:
        this.toggleItems = !this.toggleItems;
        break;
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

    } else {

      this.makeUnactive(e);

    }
  }

  public addToSituationToDefaultPosition(item: ItemPosition, thisSituation, e) {

      item.x = 150;
      item.y = 150;
      this.closePopup();
      this.db.saveSceneItem(item, this.currentSituation);
      this.sceneItems.push(item);

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

        this.loadSceneItems();


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

        this.loadSceneItems();


        // Pregenerate items for GREAT OUTDOORS Situation
      } else if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/The-Great-Outdoors.png") {

        let bike = new ItemPosition(37, null, null, null, null, null, 542, 469);
        this.db.saveSceneItem(bike, this.currentSituation);

        let football = new ItemPosition(52, null, null, null, null, null, 715, 637);
        this.db.saveSceneItem(football, this.currentSituation);

        let car = new ItemPosition(42, null, null, null, null, null, 471, 309);
        this.db.saveSceneItem(car, this.currentSituation);

        this.loadSceneItems();


        // Pregenerate items for STATION Situation
      } else if (this.sceneItems[i].imgUrl == "assets/img/backgrounds/Station-and-Metro.png") {

        let bike = new ItemPosition(37, null, null, null, null, null, 200, 700);
        this.db.saveSceneItem(bike, this.currentSituation);

        let train = new ItemPosition(73, null, null, null, null, null, 708, 340);
        this.db.saveSceneItem(train, this.currentSituation);

        this.loadSceneItems();

      }
    }
  }

  closePopup() {
    this.togglePersons = false;
    this.toggleMoods = false;
    this.toggleItems = false;
  }

  // Remove the item from the DB and our current this.sceneItems
  public removeItemFromScene(item: ItemPosition, e) {

    this.db.removeSceneItem(item);

    let index = this.sceneItems.indexOf(item);

    if (index > -1) {
      this.sceneItems.splice(index, 1);
    }

    this.isActive = true;
    this.isPaused = true;
    this.checkPregenerateBtn();

  }

  makeActive(e) {

    this.itemPressedTimer = e.timeStamp;

    if (!this.isActive) {
      
      this.waitToDeleteTimer = setTimeout(() => { 
        this.isActive = true;
        this.isPaused = true;
      }, 1200);
    } 

  }

  makeUnactive(e) {
    e.stopPropagation();
    this.isActive = false;
    clearTimeout(this.waitToDeleteTimer);
  }

  updateItemPositionOnScene(item: ItemPosition, newX, newY) {
    item.x = newX;
    item.y = newY;
    this.db.moveItem(item);
  }

  moveStart(item: ItemPosition, e) {

    if (e.target.className === 'background') {

      this.allowScroll = "scroll";

    } else {
    
      this.allowScroll = 'no-scroll';
      
      this.makeActive(e);

      this.item = item;
      this.moveStartX = e.targetTouches["0"].clientX;  // current cursor X position on screen
      this.moveStartY = e.targetTouches["0"].clientY - this.toolbarSize;  // current cursor Y position on screen minus toolbars in the top

      this.itemX = this.moveStartX - item.x; // item position X center
      this.itemY = this.moveStartY - item.y; // item position Y center
    }

  }

  moveDragOver(item: ItemPosition, e) {

      this.makeUnactive(e);
      this.isPaused = false;
      
      item.x = Math.round(e.changedTouches["0"].clientX - this.itemX);
      item.y = Math.round(e.changedTouches["0"].clientY - this.toolbarSize - this.itemY);
      
  }

  moveDrop(item: ItemPosition,  e) {

      if (e.target.className !== 'background') {

        (e.timeStamp - this.itemPressedTimer > 1200 && this.isPaused) ? this.isActive = true : this.makeUnactive(e) ;

        this.updateItemPositionOnScene(item, item.x, item.y);

      } 
  }

}
