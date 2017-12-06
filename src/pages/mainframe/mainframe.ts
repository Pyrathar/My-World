import { Component } from "@angular/core";
import { ModalController, NavParams, PopoverController } from "ionic-angular";

import { DatabaseNoSQL } from "../../providers/db-nosql";
import { NotesFormPage } from "./notes-form/notes-form";
import { QuestionsPopover } from "./questions-popover";

import { Environment } from "../../models/environment";
import { Item } from "../../models/item";
import { SlowFadingAnimation } from "./../../providers/animations";

export enum Popup {
  person,
  mood,
  item,
  closed,
}

export enum Action {
  empty,
  person,
  mood,
  item,
}

export enum Pregenerated {
  class,
  home,
  outdoor,
}

@Component({
  animations: [SlowFadingAnimation],
  selector: "page-mainframe",
  templateUrl: "mainframe.html",
})
export class MainframePage {

  private environments: Environment[];
  private currentEnvironment: Environment;
  private currentPatient;
  private patientId;

  private popup: Popup = Popup.closed;
  private action: Action = Action.empty;
  private pregenerated: Pregenerated = Pregenerated.class;

  private togglePersons = false;
  private toggleMoods = false;
  private toggleItems = false;
  private togglePopup = false;
  private popupImages = "person";

  private toolbarSize = 104;

  private itemX: number;
  private itemY: number;

  private moveStartX: number;
  private moveStartY: number;

  private allowScroll: string;
  private allowRotation = false;
  private allowDeletion = false;

  constructor(
    private db: DatabaseNoSQL,
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private popoverCtrl: PopoverController,
  ) {
    this.currentPatient = navParams.get("currentPatient");
    this.patientId = navParams.get("patientId");
    this.currentEnvironment = navParams.get("environment");
  }

  public ionViewDidLoad() { }

  private togglePopover(category, e) {

    this.disableEditMode();

    switch (category) {

      case "person":
        this.popupImages = "person";
        this.popup = Popup.person;
        this.action = Action.person;
        this.togglePopup = (this.togglePopup) ? true : !this.togglePopup;
        break;

      case "mood":
        this.popupImages = "mood";
        this.popup = Popup.mood;
        this.action = Action.mood;
        this.togglePopup = (this.togglePopup) ? true : !this.togglePopup;
        break;

      case "item":
        this.popupImages = "item";
        this.popup = Popup.item;
        this.action = Action.item;
        this.togglePopup = (this.togglePopup) ? true : !this.togglePopup;
        break;

      default:
        // this.toggleItems = !this.toggleItems;
        this.popup = Popup.closed;
        this.action = Action.empty;
        break;
    }

  }

  // Save our item to the DB and display it in Mainframe Page
  private addToSituation(item: Item, e) {

    if (e.changedTouches["0"].clientY > 284) {  // 284 is the height of header + toolbar + popover bar

      item.x = Math.round(e.changedTouches["0"].clientX);
      item.y = Math.round(e.changedTouches["0"].clientY - this.toolbarSize); // 104 is the height of header + toolbar

      this.db.addItemToEnvironment(this.patientId, this.currentEnvironment, item).subscribe();
      this.closePopup();
    }
  }

  private addToSituationToDefaultPosition(item: Item, e) {

    this.db.addItemToEnvironment(this.patientId, this.currentEnvironment, item).subscribe();
    this.closePopup();
  }

  private pregenerateItems(environmentUrl) {

    switch (this.currentEnvironment.backgroundUrl) {

      case "/class.png":
        this.pregenerated = Pregenerated.class;
        break;

      case "/home.png":
        this.pregenerated = Pregenerated.home;
        break;

      case "/outdoors.png":
        this.pregenerated = Pregenerated.outdoor;
        break;
    }

    this.db.pregenerateEnvironment(this.patientId, this.currentEnvironment, this.getPregeneratedItems())
      .subscribe((itemsAdded) => {
        this.currentEnvironment = itemsAdded;
      });
  }

  private getPopup() {
    switch (this.popup) {
      case Popup.person:  return this.db.C.PERSONS;
      case Popup.mood:    return this.db.C.MOODS;
      case Popup.item:    return this.db.C.ITEMS;
      case Popup.closed:  return [];
    }
  }

  private getPregeneratedItems() {
    switch (this.pregenerated) {
      case Pregenerated.class:    return this.db.C.PREGENERATED_CLASSROOM;
      case Pregenerated.home:     return this.db.C.PREGENERATED_HOME;
      case Pregenerated.outdoor:  return this.db.C.PREGENERATED_OUTDOOR;
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
    this.popup = Popup.closed;
    this.allowScroll = "scroll";
  }

  private removeItemFromScene(item: Item) {
    this.db.deleteItemFromEnvironment(this.patientId, this.currentEnvironment, item).subscribe((environmentDB) => {
      this.currentEnvironment = environmentDB;
    });
  }

  private rotateItem(item: Item) {
    item.rotationAngle = item.rotationAngle + 90;
    this.db.updateEnvironment(this.patientId, this.currentEnvironment, item).subscribe();
  }

  private updateItemOnScene(item: Item, newX, newY) {
    item.x = newX;
    item.y = newY;
    this.db.updateEnvironment(this.patientId, this.currentEnvironment, item).subscribe();
  }

  private moveStart(item: Item, e) {

    this.allowScroll = "no-scroll";

    // current cursor X position on screen
    this.moveStartX = e.touches["0"].pageX;
    // current cursor Y position on screen minus toolbars in the top
    this.moveStartY = e.touches["0"].pageY - this.toolbarSize;

    this.itemX = this.moveStartX - item.x; // item position X center
    this.itemY = this.moveStartY - item.y; // item position Y center
  }

  private moveDragOver(item: Item, e) {
    this.disableEditMode();

    item.x = Math.round(e.touches["0"].pageX - this.itemX);
    item.y = Math.round(e.touches["0"].pageY - this.toolbarSize - this.itemY);
  }

  private moveDrop(item: Item,  e) {

    this.updateItemOnScene(item, item.x, item.y);
    this.allowScroll = "scroll";
  }

  private prompQuestions(myEvent) {
    this.disableEditMode();

    const popover = this.popoverCtrl.create(QuestionsPopover, { questions: this.currentEnvironment.backgroundUrl });
    popover.present({ ev: myEvent });
  }

  private presentNotesModal() {
    this.disableEditMode();
    const notesModal = this.modalCtrl.create(NotesFormPage, { currentPatient: this.currentPatient });

    notesModal.onDidDismiss((currentPatientDB) => {
      if (currentPatientDB) { this.currentPatient = currentPatientDB; }
    });

    notesModal.present();
  }

  private enableDeletion() {
    this.allowRotation = false;
    this.allowDeletion = (this.allowDeletion) ? false : !this.allowDeletion;
  }

  private enableRotation() {
    this.allowDeletion = false;
    this.allowRotation = (this.allowRotation) ? false : !this.allowRotation;
  }

  private disableEditMode() {
    this.allowDeletion = false;
    this.allowRotation = false;
  }

}
