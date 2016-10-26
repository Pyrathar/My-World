import { Component } from '@angular/core';
import { NavController, AlertController, SqlStorage, Storage} from 'ionic-angular';
import { database } from '../../database';
/*
  Generated class for the NotesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/notes/notes.html',

})
export class NotesPage {


  public personList: Array<Object>

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private database: database) {
  this.refresh();
  }


  public onPageLoaded() {
    this.refresh();
  }

  public refresh() {
    this.database.getPatients().then((data) => {
      if (data.res.rows.length > 0) {
        this.personList = [];
        for (let i = 0; i < data.res.rows.length; i++) {
          this.personList.push({
                "firstname": data.res.rows.item(i).name,
        });
        }
      }
    }, (error) => {
      console.log(error);
    });
  }

  addNote() {

    let prompt = this.alertCtrl.create({
      title: 'Add Patient',
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

          this.database.addpatients(data.title);
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

  editPerson(person) {

    let prompt = this.alertCtrl.create({
      title: 'Edit Note',
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
            let index = this.personList.indexOf(person);

            if (index > -1) {
              this.database.obliteratepatients(person.firstname)
              this.database.addpatients(data.title);
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

  deletePerson(person) {

    let index = this.personList.indexOf(person);

    if (index > -1) {

      this.database.obliteratepatients(person.firstname)
      this.refresh();
    }
  }

  openPage(person) {

    let index = this.personList.indexOf(person);

    if (index > -1) {

      this.database.obliteratepatients(person.firstname)
      this.refresh();
    }
  }

}
