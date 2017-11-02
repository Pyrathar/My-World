import { Component } from "@angular/core";
import { NavParams, PopoverController } from "ionic-angular";

import { DatabaseNoSQL } from "../../db-nosql";
import { Environment, Item } from "../../models";
import { QuestionsPopover } from "./questions-popover";

import { SlowFadingAnimation } from "./../../animations";

export enum Popup {
  person,
  mood,
  item,
}

export enum Action {
  empty,
  person,
  mood,
  item,
}

@Component({
  animations: [SlowFadingAnimation],
  selector: "page-mainframe",
  templateUrl: "mainframe.html",
})
export class MainframePage {

  private item: Item;
  private currentEnvironment: Environment;
  // actionTitle

  private popup: Popup = Popup.person;
  private action: Action = Action.empty;

  private togglePersons = false;
  private toggleMoods = false;
  private toggleItems = false;
  private pregenerateBtn;
  private allowScroll = "scroll";
  private index;
  private patientId;

  private isActive = false;
  private isPaused = false;
  private waitToDeleteTimer;
  // toolbarSize = 104;

  private itemX: number;
  private itemY: number;

  private moveStartX: number;
  private moveStartY: number;

  private bgScrolled = 104;

  private animationPopoverClasses: any = {
    popoverItems: true,
  };

  private animationDeleteClasses: any = {
    animated: true,
    infinite: true,
    pulse: true,
  };

  private itemPressedTimer = 0;

  constructor(private db: DatabaseNoSQL, private navParams: NavParams, private popoverCtrl: PopoverController) {
    this.patientId = navParams.get("patientId");
    this.index = navParams.get("index");
    this.currentEnvironment = navParams.get("environment");
  }

  public ionViewDidLoad() {

    this.getQuestions();

    console.log(this.currentEnvironment);
  }

  public ionViewDidLeave() {
    this.db.save(this.patientId, this.db.environments);
  }

  private getQuestions() {

    switch (this.db.environments[this.index].items[0].imgUrl) {

      case "/class.png":
        this.db.questions = this.db.C.QUESTIONS_CLASSROOM;
        break;

      case "/home.png":
        this.db.questions = this.db.C.QUESTIONS_HOME;
        break;

      case "/outdoors.png":
        this.db.questions = this.db.C.QUESTIONS_OUTDOORS;
        break;

      default:
        console.warn("Something went wrong. There is no questions for this item.");
        break;
    }
  }

  private togglePopover(category, e) {

    this.closePopup();

    switch (category) {

      case "Person":
        this.togglePersons = !this.togglePersons;
        this.popup = Popup.person;
        this.action = Action.person;
        break;

      case "Mood":
        this.toggleMoods = !this.toggleMoods;
        this.popup = Popup.mood;
        this.action = Action.mood;
        break;

      case "Item":
        this.toggleItems = !this.toggleItems;
        this.popup = Popup.item;
        this.action = Action.item;
        break;

      default:
        // this.toggleItems = !this.toggleItems;
        // this.popup = Popup.item
        this.action = Action.empty;
        break;
    }

  }

  // Save our item to the DB and display it in Mainframe Page
  private addToSituation(item: Item, e) {

    if (e.changedTouches["0"].clientY > 284) {  // 284 is the height of header + toolbar + popover bar

      const x = Math.round(e.changedTouches["0"].clientX);
      const y = Math.round(e.changedTouches["0"].clientY - 104); // 104 is the height of header + toolbar

      this.db.addItemToEnvironment(this.index, new Date().getTime(), item.category, item.imgUrl, x, y, 0);
      this.db.saveEnvironment(this.patientId);
      this.closePopup();

    } else {
      this.makeUnactive(e);
    }
  }

  private addToSituationToDefaultPosition(item: Item, e) {

    this.db.addItemToEnvironment(this.index, new Date().getTime(), item.category, item.imgUrl, 150, 300, 0);
    this.db.saveEnvironment(this.patientId);
    this.closePopup();

  }

  private pregenerateItems() {

    switch (this.db.environments[this.index].items[0].imgUrl) {
      case "/class.png":

        this.db.addItemToEnvironment(this.index, 1, "item", "/chair.png",       294, 356, 270);
        this.db.addItemToEnvironment(this.index, 2, "item", "/chair.png",       460, 358, 270);
        this.db.addItemToEnvironment(this.index, 3, "item", "/chair.png",       467, 520, 270);
        this.db.addItemToEnvironment(this.index, 4, "item", "/chair.png",       310, 521, 270);
        this.db.addItemToEnvironment(this.index, 5, "item", "/small_table.png", 358, 539, 270);
        this.db.addItemToEnvironment(this.index, 6, "item", "/small_table.png", 350, 388, 270);
        this.db.addItemToEnvironment(this.index, 7, "item", "/small_table.png", 520, 538, 270);
        this.db.addItemToEnvironment(this.index, 8, "item", "/small_table.png", 525, 387, 270);
        this.db.addItemToEnvironment(this.index, 9, "item", "/chair.png",       842, 235,  90);
        this.db.addItemToEnvironment(this.index, 10, "item", "/large_table.png", 677, 380, 270);
        this.db.save(this.patientId, this.db.environments);
        break;

      case "/home.png":

        // Bedroom
        this.db.addItemToEnvironment(this.index, 1, "item", "/chair.png",           142,  289,  180);
        this.db.addItemToEnvironment(this.index, 2, "item", "/small_table.png",     62,   181,  0);
        this.db.addItemToEnvironment(this.index, 3, "item", "/doll.png",            229,  372,  0);
        this.db.addItemToEnvironment(this.index, 4, "item", "/baseball_mit.png",    302,  386,  0);
        this.db.addItemToEnvironment(this.index, 5, "item", "/bed.png",             392,  168,  90);
        this.db.addItemToEnvironment(this.index, 6, "item", "/electric_piano.png",  75,   394,  270);

        // Living room
        this.db.addItemToEnvironment(this.index, 7, "item", "/flatscreen.png",    13, 710, 270);
        this.db.addItemToEnvironment(this.index, 8, "item", "/sofa.png",         360, 570, 90);

        this.db.addItemToEnvironment(this.index,  9, "item", "/chair.png",       527, 510, 0);
        this.db.addItemToEnvironment(this.index, 10, "item", "/chair.png",       454, 510, 0);
        this.db.addItemToEnvironment(this.index, 11, "item", "/chair.png",       589, 690, 180);
        this.db.addItemToEnvironment(this.index, 12, "item", "/chair.png",       522, 690, 180);
        this.db.addItemToEnvironment(this.index, 13, "item", "/table.png",       453, 554, 0);

        this.db.addItemToEnvironment(this.index, 14, "item", "/bookcase.png",    781, 432, 0);
        this.db.addItemToEnvironment(this.index, 15, "item", "/arm_chair.png",   939, 587, 90);
        this.db.save(this.patientId, this.db.environments);
        break;

      case "/outdoors.png":
        // this.db.addItemToEnvironment(this.index, 1, "item", "/bike.png",        524, 469, 0);
        // this.db.addItemToEnvironment(this.index, 2, "item", "/fodbold.png",     715, 637, 0);
        // this.db.addItemToEnvironment(this.index, 3, "item", "/car.png",         471, 309, 0);
        this.db.save(this.patientId, this.db.environments);
        break;

      default:
        console.log("pregenerateItems(). default switch: something went wrong.");
        break;
    }
  }

  private getPopup(): string {
    switch (this.popup) {
      case Popup.person:  return "db.C.PERSONS";
      case Popup.mood:    return "db.C.MOODS";
      case Popup.item:    return "db.C.ITEMS";
    }
  }

  // Display action text in title bar
  private getAction(): string {
    switch (this.action) {
      case Action.person: return "Drag the person that fits the situation";
      case Action.mood:   return "Drag the mood that fits the situation";
      case Action.item:   return "Drag the item that fits the situation";
      case Action.empty:  return "";
    }
  }

  private closePopup() {
    this.togglePersons = false;
    this.toggleMoods = false;
    this.toggleItems = false;
    this.action = Action.empty;
  }

  private removeItemFromScene(item: Item, i: number) {

    console.log("item to remove: ", item + " i: ", i);
    console.log("item to remove: this.index: ", this.index + " i: ", i);

    this.db.deleteItemFromEnvironment(this.patientId, this.index, i);
    console.log("was deleted? ");
    this.isActive = true;
    this.isPaused = true;
  }

  private rotateItem(item: Item, i: number, rotationAngle: number) {
    console.log("rotate clicked ");
    // console.log('item to rotate: ', item + ' i: ', i);
    item.rotationAngle = item.rotationAngle + rotationAngle;
    console.log(item);
    // this.db.deleteItemFromEnvironment(this.patientId, this.index, i);
    this.isActive = true;
    this.isPaused = true;
  }

  private makeActive(e) {

    this.itemPressedTimer = e.timeStamp;

    if (!this.isActive) {

      this.waitToDeleteTimer = setTimeout(() => {
        this.isActive = true;
        this.isPaused = true;
      }, 900);
    }

  }

  private makeUnactive(e) {
    e.stopPropagation();
    this.isActive = false;
    clearTimeout(this.waitToDeleteTimer);
  }

  private updateItemOnScene(item: Item, newX, newY) {
    item.x = newX;
    item.y = newY;
  }

  private moveStart(item: Item, e) {

    if (e.target.className === "background") {

      this.allowScroll = "scroll";

    } else {

      this.allowScroll = "no-scroll";

      this.makeActive(e);

      this.item = item;
      this.item.id = new Date().getTime();

      // current cursor X position on screen
      this.moveStartX = e.targetTouches["0"].clientX;
      // current cursor Y position on screen minus toolbars in the top
      this.moveStartY = e.targetTouches["0"].clientY - 104;

      this.itemX = this.moveStartX - item.x; // item position X center
      this.itemY = this.moveStartY - item.y; // item position Y center
    }

  }

  private moveDragOver(item: Item, e) {

      this.makeUnactive(e);
      this.isPaused = false;

      item.x = Math.round(e.changedTouches["0"].clientX - this.itemX);
      item.y = Math.round(e.changedTouches["0"].clientY - 104 - this.itemY);
      // this.db.save(this.patientId, this.db.environments);

      // console.log('clientY,  bgScrolled,   itemY:   ', e.changedTouches["0"].clientY, this.bgScrolled, this.itemY);

  }

  private moveDrop(item: Item,  e) {

      if (e.target.className !== "background") {

        (e.timeStamp - this.itemPressedTimer > 900 && this.isPaused) ? this.isActive = true : this.makeUnactive(e) ;

        this.updateItemOnScene(item, item.x, item.y);
        // this.db.save(this.patientId, this.db.environments);

      } else {

        // FIXME: find out how to move correctly when backgound scrolled down
        // console.log('item Y: ', e.target.y);
        this.bgScrolled = e.target.y;

      }
  }

  private prompQuestions(myEvent) {
    console.log("prompQuestions()", myEvent);
    const popover = this.popoverCtrl.create(QuestionsPopover);
    popover.present({
      ev: myEvent,
    });
  }

}
