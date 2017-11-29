import { Component } from "@angular/core";
import { ModalController, NavParams, PopoverController } from "ionic-angular";

import { DatabaseNoSQL } from "../../db-nosql";
import { NotesFormPage } from "./notes-form/notes-form";
import { QuestionsPopover } from "./questions-popover";

import { Environment } from "../../models/environment";
import { Item } from "../../models/item";
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

  // private item: Item;
  private environments: Environment[];
  private currentEnvironment: Environment;
  private currentPatient;
  // actionTitle

  private popup: Popup = Popup.person;
  private action: Action = Action.empty;

  private togglePersons = false;
  private toggleMoods = false;
  private toggleItems = false;
  private pregenerateBtn;
  private index;
  private patientId;

  private toolbarSize = 104;

  private itemX: number;
  private itemY: number;

  private moveStartX: number;
  private moveStartY: number;

  private allowScroll: string;
  private allowRotation = false;
  private allowDeletion = false;

  private animationPopoverClasses: any = {
    popoverItems: true,
  };

  private animationDeleteClasses: any = {
    animated: true,
    infinite: true,
    pulse: true,
  };

  private itemPressedTimer = 0;

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

  public ionViewDidLoad() {}

  private togglePopover(category, e) {

    switch (category) {

      case "Person":
        this.toggleItems = false;
        this.toggleMoods = false;
        this.togglePersons = (this.togglePersons) ? false : !this.togglePersons;
        this.popup = Popup.person;
        this.action = Action.person;
        break;

      case "Mood":
        this.toggleItems = false;
        this.togglePersons = false;
        this.toggleMoods = (this.toggleMoods) ? false : !this.toggleMoods;
        this.popup = Popup.mood;
        this.action = Action.mood;
        break;

      case "Item":
        this.togglePersons = false;
        this.togglePersons = false;
        this.toggleItems = (this.toggleItems) ? false : !this.toggleItems;
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

      item.x = Math.round(e.changedTouches["0"].clientX);
      item.y = Math.round(e.changedTouches["0"].clientY - this.toolbarSize); // 104 is the height of header + toolbar
      this.db.addItemToEnvironment(this.patientId, this.currentEnvironment, item).subscribe((currentEnvironmentDB) => {
        this.currentEnvironment = currentEnvironmentDB;
      });
      this.closePopup();
    }
  }

  private addToSituationToDefaultPosition(item: Item, e) {

    // this.db.addItemToEnvironment(this.index, Date.now(), item.category, item.imgUrl, 150, 300, 0);
    this.db.addItemToEnvironment(this.patientId, this.currentEnvironment, item).subscribe((currentEnvironmentDB) => {
      this.currentEnvironment = currentEnvironmentDB;
    });
    this.closePopup();
  }

  private pregenerateItems() {

    switch (this.currentEnvironment.backgroundUrl) {
      case "/class.png":
        this.db.pregenerateEnvironment(this.patientId, this.currentEnvironment, this.db.C.PREGENERATED_CLASSROOM)
          .subscribe((itemsAdded) => {
            this.currentEnvironment = itemsAdded;
          });
        break;

      case "/home.png":
        this.db.pregenerateEnvironment(this.patientId, this.currentEnvironment, this.db.C.PREGENERATED_HOME)
          .subscribe((itemsAdded) => {
            this.currentEnvironment = itemsAdded;
          });
        break;

      case "/outdoors.png":
        this.db.pregenerateEnvironment(this.patientId, this.currentEnvironment, this.db.C.PREGENERATED_OUTDOOR)
          .subscribe((itemsAdded) => {
            this.currentEnvironment = itemsAdded;
          });
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
    this.allowScroll = "scroll";
  }

  private removeItemFromScene(item: Item) {
    this.db.deleteItemFromEnvironment(this.patientId, this.currentEnvironment, item).subscribe((environmentDB) => {
      this.currentEnvironment = environmentDB;
    });
  }

  private rotateItem(item: Item) {
    item.rotationAngle = item.rotationAngle + 90;
    this.db.updateEnvironment(this.patientId, this.currentEnvironment, item).subscribe((environmentDB) => {
      this.currentEnvironment = environmentDB;
    });
  }

  private updateItemOnScene(item: Item, newX, newY) {
    item.x = newX;
    item.y = newY;
    this.db.updateEnvironment(this.patientId, this.currentEnvironment, item).subscribe((environmentDB) => {
      this.currentEnvironment = environmentDB;
    });
  }

  private moveStart(item: Item, e) {
    console.log(item);

    this.allowScroll = "no-scroll";
    // this.item = item;

    // current cursor X position on screen
    this.moveStartX = e.touches["0"].pageX;
    // current cursor Y position on screen minus toolbars in the top
    this.moveStartY = e.touches["0"].pageY - this.toolbarSize;

    this.itemX = this.moveStartX - item.x; // item position X center
    this.itemY = this.moveStartY - item.y; // item position Y center
  }

  private moveDragOver(item: Item, e) {
    this.allowDeletion = false;
    this.allowRotation = false;

    item.x = Math.round(e.touches["0"].pageX - this.itemX);
    item.y = Math.round(e.touches["0"].pageY - this.toolbarSize - this.itemY);
  }

  private moveDrop(item: Item,  e) {

    this.updateItemOnScene(item, item.x, item.y);
    this.allowScroll = "scroll";
  }

  private prompQuestions(myEvent) {

    const popover = this.popoverCtrl.create(QuestionsPopover, { questions: this.currentEnvironment.backgroundUrl });
    popover.present({ ev: myEvent });
  }

  private presentNotesModal() {
    const notesModal = this.modalCtrl.create(NotesFormPage, { currentPatient: this.currentPatient });

    notesModal.onDidDismiss((currentPatientDB) => {
      if (currentPatientDB) { this.currentPatient = currentPatientDB; }
    });

    notesModal.present();
  }

  private enableDeletion() {
    this.allowRotation = false;
    this.allowDeletion = true;
  }

  private enableRotation() {
    this.allowDeletion = false;
    this.allowRotation = true;
  }

}
