import { Component } from '@angular/core';
import { AlertController, NavParams, NavController, PopoverController, ViewController } from 'ionic-angular';

import { database, Patient, Situation, Item, ItemPosition } from '../../database';
import { Page1 } from '../mainframe/mainframe';
import { LadderPage } from '../about/about';

// ********************************//
//  PATIENT Enviroment PAGE
// ********************************//

// ********************************//
//  POPOVER
// ********************************//
@Component({
  template: `
    <h2>Select new environment</h2>
    <ion-list class="popoverImg" *ngFor="let item of popoverItems;"  (click)="goToMainframe(item)">
      <img  [class]="item.category" [src]="item.imgUrl" />
      <p>{{item.name}}</p>
    </ion-list>
  `
})

export class PopoverPageBackgrounds {

  popoverItems: Item[];
  cPatient: Patient;
  popoverToShow;

  constructor(public database: database, private navController: NavController, public navParams: NavParams, public vc: ViewController) {
    this.cPatient = navParams.data.patient;
    this.popoverToShow = navParams.data.popupToOpen;
  }

  public loadPopoverItems() {
    this.database.getItems(this.popoverToShow).then(
      data => {
        this.popoverItems = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.popoverItems.push(new Item(item.id, item.name, item.imgUrl, item.category));
          }
          return this.popoverItems;
        }
      });
  }

  public ngOnInit() {
    this.loadPopoverItems();
  }

  public goToMainframe(item) {
    // console.log(this.cPatient);
    // console.log(item);
    // adds situation for current patient
    // this.database.addSituation(this.cPatient);
    // close popover
    this.vc.dismiss();

    this.database.lastSituation().then(
      lastSituationIdData => {
        var lastSituation = lastSituationIdData.res.rows[0];

        // console.log(lastSituation);

        // this.database.saveSceneItem(item, lastSituation);

        // open page
        this.navController.push(Page1, {
          situationObject: lastSituation
        });

      });

    (error) => {
      console.log(error);
    }
  }
}
// Popover end

@Component({
  templateUrl: 'build/pages/enviroments/enviroments.html'
})

export class ContactsPage {

  currentPatient: Patient;
  situation: Situation = null;
  situationList: Array<Situation>;
  bgList: Array<Item>;

  constructor(
    private alertCtrl: AlertController,
    private navController: NavController,
    private navParams: NavParams,
    private database: database,
    public popoverCtrl: PopoverController) {

    this.currentPatient = navParams.get('patientObject');
  }

  public onPageLoaded() {
    this.getSituationsForCurrentPatient();
  }

  //STILL HAVE TO ALTER SOME STUFF

  // this was refresh()
  public getSituationsForCurrentPatient() {
    // this.database.getItems("background").then((data) => {
    this.database.getSituations(this.currentPatient).then((data) => {

      this.bgList = [];
      if (data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let item = data.res.rows.item(i);
          this.bgList.push(new Item(
            item.id,
            item.name,
            item.imgUrl,
            item.category));
        }
        console.log(this.bgList.length);
        return this.bgList;
      }

    }, (error) => {
      console.log(error);
    });
  }

  presentPopover1(myEvent) {
    let openPopup = "background";
    let popover = this.popoverCtrl.create(PopoverPageBackgrounds, { popupToOpen: openPopup, patient: this.currentPatient});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((item) => {
        this.getSituationsForCurrentPatient();
    });
  }

  addsituation(situation: Situation) {

    let prompt = this.alertCtrl.create({
      title: 'Add Enviroment',
      inputs: [{
        name: 'Situation',
        placeholder: 'Enter situation\'s title'
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add Blank',
          handler: data => {

            //Add to Database Situations table
            data.P_id = this.currentPatient.P_id;
            this.database.addSituation(data);
            (error) => {
              console.log(error);
            }
            this.getSituationsForCurrentPatient();
          }
        },
        {
          text: 'Add Generated',
          handler: data => {

            //Add to Database Situations table
            data.P_id = this.currentPatient.P_id;
            this.database.addSituation(data);

            this.database.lastSituation().then(
              lastSituationIdData => {
                lastSituationIdData.res.rows[0].S_id;

                var lastSituationId = lastSituationIdData.res.rows[0].S_id;
                console.log(lastSituationId);


                // let sql = `INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 1, 0, 0)`;
                // console.log(sql);

                this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 1, 0, 0)`);
                this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 5, 100, 100)`);
                this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 7, 240, 300)`);
                this.database.storage.query(`INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${lastSituationId}, 11, 700, 400)`);


                // this.database.saveSceneItem(item1, data);

              });

            (error) => {
              console.log(error);
            }
            this.getSituationsForCurrentPatient();
          }
        }
      ]
    });

    prompt.present();
  }

  editSituation(situation: Situation) {


    let prompt = this.alertCtrl.create({
      title: 'Edit Situation',
      inputs: [{
        name: 'Situation',
        value: `${situation.Situation}`
      }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {

            situation.Situation = data.Situation;
            this.database.editSituation(situation);
            (error) => {
              console.log(error);
            }
          }
        }
      ]
    });

    prompt.present();

  }


  deletesituation(situation: Situation) {

    this.database.deleteSituation(situation)
    let index = this.situationList.indexOf(situation);

    if (index > -1) {
      // console.log("deleting" + situation.S_id);
      this.situationList.splice(index, 1);
    }
  }

  openPage(situation: Situation) {

    // console.log("Opening Patient ID = " + situation.P_id);
    // console.log("Opening Situation ID = " + situation.S_id);
      this.navController.push(Page1, {
        situationObject: situation
      });

  }



}
