import { Note } from "./note";

export class Patient {
  // id is a timestamp, which will be used as well as date/time when user was created
  constructor(
    public id: number,
    public name: string,
    public avatar: string,
    public notes: Note[],
  ) { }
}
