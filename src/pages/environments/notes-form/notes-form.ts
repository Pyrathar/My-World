import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IonicPage, NavParams, ViewController } from "ionic-angular";

import { Note } from "../../../models/note";
import { Patient } from "../../../models/patient";
import { DatabaseNoSQL } from "../../../providers/db-nosql";

@Component({
  selector: "page-notes-form",
  templateUrl: "notes-form.html",
})
export class NotesFormPage {

  private createNoteForm: FormGroup;
  private editMode = false;
  private note: Note;
  private currentPatient: Patient;
  private currentNote: Note;

  constructor(
    public db: DatabaseNoSQL,
    public navParams: NavParams,
    private viewCtrl: ViewController,
  ) {
    this.note = new Note(Date.now());
    this.currentNote = navParams.get("note");
    this.currentPatient = navParams.get("currentPatient");

    if (this.currentNote) {
      this.note = this.currentNote;
    }
  }

  private saveNote() {
    this.db.saveNote(this.note, this.currentPatient).subscribe((patientDB) => {
      this.viewCtrl.dismiss(patientDB);
    });
  }

  private closeModal() {
    this.viewCtrl.dismiss();
  }
}
