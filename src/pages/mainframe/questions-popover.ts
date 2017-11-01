import { Component, Input } from "@angular/core";

import { DatabaseNoSQL } from "../../db-nosql";

@Component({
  selector: "questions-popover",
  templateUrl: "questions-popover.html",
})
export class QuestionsPopover {

  constructor(private db: DatabaseNoSQL) {
    console.log("popover opened");
  }

  // select questions
}
