import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IonicPage, NavParams, ViewController } from "ionic-angular";

import { DatabaseNoSQL } from "../../../db-nosql";
import { Note } from "../../../models/note";
import { Patient } from "../../../models/patient";

@Component({
  selector: "page-notes-form",
  templateUrl: "notes-form.html",
})
export class NotesFormPage {

  private createNoteForm: FormGroup;
  private editMode = false;
  private note: Note;
  private currentPatient: Patient;

  constructor(
    public db: DatabaseNoSQL,
    public navParams: NavParams,
    private viewCtrl: ViewController,
  ) {
    this.note = new Note();
    this.currentPatient = navParams.get("currentPatient");
    if (this.currentPatient.note) {
      this.note = this.currentPatient.note;
    }
  }

  private saveNote() {
    this.db.addNote(this.note, this.currentPatient).subscribe( (patientDB) => {
      this.viewCtrl.dismiss(patientDB);
    });
  }

  private editNote() {
    console.log("Note edited and saved");
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }
}
