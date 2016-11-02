import { Component } from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import { database } from '../../database';
/*
  Generated class for the ContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/contacts/contacts.html',
})
export class ContactsPage {

  public user;
  public situationList: Array<Object>

  constructor(private navController: NavController, private navParams: NavParams, private alertCtrl: AlertController,private database: database) {
    //Name from the first page
    this.user = navParams.get('param1');
    this.refresh();
  }
  public onPageLoaded() {
   this.refresh();
  }

//STILL HAVE TO ALTER SOME STUFF

  public refresh() {
   this.database.getsituation(this.user).then((data) => {
     if (data.res.rows.length > 0) {
       this.situationList = [];
       for (let i = 0; i < data.res.rows.length; i++) {
         this.situationList.push({
               "situation": data.res.rows.item(i).Situation,
               "S_id": data.res.rows.item(i).S_id,
       });
       }
     }
   }, (error) => {
     console.log(error);
   });
 }

 addsituation() {

   let prompt = this.alertCtrl.create({
     title: 'Add Situation',
     inputs: [{
       name: 'title',
         }],
     buttons: [
       {
         text: 'Cancel'
       },
       {
         text: 'Add',
         handler: data => {
           //Add to notes

         this.database.addsituation(data.title,this.user);
           (error) => {
           console.log(error);
         }
         this.refresh();
         }
       }
     ]
   });

   prompt.present();
 }

 editPerson(Situation) {


   let prompt = this.alertCtrl.create({
     title: 'Edit Situation',
     inputs: [{
       name: 'title'
     }],
     buttons: [
       {
         text: 'Cancel'
       },
       {
         text: 'Save',
         handler: data => {
            let index = this.situationList.indexOf(Situation);

           if (index > -1) {
              //HAS TO BE SAME ID
             this.database.replacepatients(Situation.P_id,data.title);
           //  this.database.obliteratepatients(person.P_id)
           //  this.database.addpatients(data.title);


               (error) => {
               console.log(error);
             }
             this.refresh();
           }
         }
       }
     ]
   });

   prompt.present();

 }


 deletesituation(Situation) {

      console.log("deleting"+ Situation.S_id)
   let index = this.situationList.indexOf(Situation);

   if (index > -1) {

     this.database.obliteratesituation(Situation.S_id)

     this.refresh();
   }
 }

 openPage(Situation) {

   let index = this.situationList.indexOf(Situation);

   if (index > -1) {


      console.log("Opening Patient ID number = " + Situation.P_id);

     this.navController.push(ContactsPage, {
     param1: Situation.P_id
     });
     this.refresh();
   }
 }



}
