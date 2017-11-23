import { Component, Input } from "@angular/core";
import { NavParams } from "ionic-angular";

import { DatabaseNoSQL } from "../../db-nosql";

@Component({
  selector: "questions-popover",
  templateUrl: "questions-popover.html",
})
export class QuestionsPopover {

  private questions: string[];
  private questionsForPage: string;

  constructor(private db: DatabaseNoSQL, private navParams: NavParams) {
    this.questionsForPage = navParams.get("questions");
  }

  public ionViewDidLoad() {
    this.getQuestions();
  }

  // select questions
  private getQuestions() {
    switch (this.questionsForPage) {

      case "/class.png":
        this.questions = this.db.C.QUESTIONS_CLASSROOM;
        break;

      case "/home.png":
        this.questions = this.db.C.QUESTIONS_HOME;
        break;

      case "/outdoors.png":
        this.questions = this.db.C.QUESTIONS_OUTDOORS;
        break;

      default:
        console.warn("Something went wrong. There is no questions for this item.");
        break;
    }
  }
}
