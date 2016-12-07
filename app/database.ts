import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';

export class Item {
  id: number;
  name: string;
  imgUrl: string;
  category: string;
  constructor(id: number, name: string, imgUrl: string, category: string) {
    this.id = id;
    this.name = name;
    this.imgUrl = imgUrl;
    this.category = category;
  }
}

export class Patient {
  P_id: number;
  name: string;
  constructor(P_id: number, name: string) {
    this.P_id = P_id;
    this.name = name;
  }
}

export class ItemPosition {
  id: number;
  S_id: number;
  P_id: number;
  itemId: number;
  category: string;
  imgUrl: string;
  x: number;
  y: number;
  constructor(id: number, S_id: number, P_id: number, itemId: number, category: string, imgUrl: string, x: number, y: number) {
    this.id = id;
    this.S_id = S_id;
    this.P_id = P_id;
    this.itemId = itemId;
    this.category = category;
    this.imgUrl = imgUrl;
    this.x = x;
    this.y = y;
  }
}

export class Situation {
  S_id: number;
  Situation: string;
  P_id: number;
  constructor(S_id: number, Situation: string, P_id: number) {
    this.S_id = S_id;
    this.P_id = P_id;
    this.Situation = Situation;
  }
}

@Injectable()
export class database {
  storage: Storage = null;
  sceneItems: ItemPosition[];

  constructor() {
    this.storage = new Storage(SqlStorage, {
      name: 'myWorld10.db'
    });
    // this.del();
    this.lastSituation();
    this.generateitems();
    this.generatepatients();
    this.generatesituations();
    this.generateitemposition();
  }

  // TEMPORARY function to delete unnecessary data from database
  // public del() {
  //   //Check ID of user
  //   let sql = `DELETE FROM items WHERE id>19`;
  //   this.storage.query(sql);
  // }

  public lastSituation() {
    // let sql = `SELECT LAST(S_id) FROM Situations`;
    let sql = `SELECT S_id FROM Situations
                ORDER BY S_id DESC LIMIT 1;`;
    return this.storage.query(sql);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GENERATIONS
  // ITEM GENERATION ON THE SQL

  public generateitems() {
    let sql = `CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      imgUrl TEXT,
      category TEXT)`;
    return this.storage.query(sql).then((data) => {
      if (data.res.insertId == 0) {
        console.log('-- SQL: items Table: Already Exists');
      } else {
        console.log('-- SQL: items Table: Created New');
        this.preloadData();
      }
    });

  }

  // PATIENT GENERATION ON THE SQL

  public generatepatients() {
    //Generate Patients Table
    let sql = `CREATE TABLE IF NOT EXISTS Patients (
      P_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT)`;
    this.storage.query(sql)
    //Primary Key Will be P_Id
  }

  // SITUATION MANAGEMENT ON THE SQL

  public generatesituations() {
    //Generate Patients Table

    let sql = `CREATE TABLE IF NOT EXISTS Situations(
      S_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      Situation varchar(255) NOT NULL,
      P_id INTEGER NOT NULL,
      FOREIGN KEY (P_Id) REFERENCES Patients(P_Id))`;
    this.storage.query(sql);
    //Primary Key Will be S_Id

  }

  // ITEM POSITION MANAGEMENT ON THE SQL

  public generateitemposition() {
    //Generate Patients Table

    let sql = `CREATE TABLE IF NOT EXISTS itemsPosition (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      S_id INTEGER,
      itemId INTEGER,
      category TEXT,
      x INTEGER,
      y INTEGER)`;

    this.storage.query(sql);
    //Primary Key Will be S_Id

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //PATIENT MANAGEMENT

  public addpatient(patient: Patient) {
    //Add Patients
    console.log("Adding:  " + patient);
    let sql = `INSERT INTO Patients (name) VALUES ("${patient.name}")`;
    this.storage.query(sql)
  }

  public getPatients() {
    //Get Patients
    let sql = "SELECT * FROM Patients";
    return this.storage.query(sql);
  }

  public obliteratepatients(patient: Patient) {
    //OBLITERATE PATIENTS Cause erasing is for kids and obliterate sounds badass!
    let sql = `DELETE FROM Patients WHERE P_id = ${patient.P_id}`;
    this.storage.query(sql);
  }

  public editPatient(patient: Patient) {
    let sql = `UPDATE Patients SET name = "${patient.name}" WHERE P_id=${patient.P_id}`;
    this.storage.query(sql);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //SITUATION MANAGEMENT

  //Add situations
  public addSituation(situation: Situation) {
    let sql = `INSERT INTO Situations (P_id, Situation) VALUES (${situation.P_id}, "${situation.Situation}");`;
    this.storage.query(sql);
  }

  //Get situations
  public getSituations(currentPatient: Patient) {
    let sql = `SELECT * FROM Situations WHERE P_id = ${currentPatient.P_id}`;
    return this.storage.query(sql)
  }

  //Delete situations
  public deleteSituation(situation: Situation) {
    let sql = `DELETE FROM Situations WHERE S_id = ${situation.S_id};`;
    this.storage.query(sql);
  }

  public editSituation(situation: Situation) {
    //Check ID of user
    let sql = `UPDATE Situations SET Situation = "${situation.Situation}" WHERE S_id=${situation.S_id}`;
    this.storage.query(sql);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //ITEMS  MANAGEMENT

  //Get items for menu
  public getItems(category) {
    let sql = `SELECT * FROM items WHERE category = "${category}"`;
    return this.storage.query(sql);
  }

  public addItemToDatabase(name, imgUrl, category) {
    let sql = `INSERT INTO items (name, imgUrl, category) VALUES (?, ?, ?)`;
    return this.storage.query(sql, [name, imgUrl, category]);
  }

  public preloadData(): void {
    this.addItemToDatabase("Room1", "img/backgrounds/e1.jpg", "background");
    this.addItemToDatabase("Room2", "img/backgrounds/e2.jpg", "background");
    this.addItemToDatabase("Room3", "img/backgrounds/e3.jpg", "background");
    this.addItemToDatabase("Room4", "img/backgrounds/e4.jpg", "background");
    this.addItemToDatabase("DarkGirl", "img/persons/dark_girl.png", "person");
    this.addItemToDatabase("Grandfather", "img/persons/grandfather.png", "person");
    this.addItemToDatabase("Grandmother", "img/persons/grandmother.png", "person");
    this.addItemToDatabase("Baby", "img/persons/p1.png", "person");
    this.addItemToDatabase("BoyGingerHair", "img/persons/p2.png", "person");
    this.addItemToDatabase("BoyBlackHair", "img/persons/p3.png", "person");
    this.addItemToDatabase("GirlDarkHair", "img/persons/p4.png", "person");
    this.addItemToDatabase("Angry", "img/items/angry.png", "mood");
    this.addItemToDatabase("Confused", "img/items/confused.png", "mood");
    this.addItemToDatabase("Crying", "img/items/crying.png", "mood");
    this.addItemToDatabase("Happy", "img/items/happy.png", "mood");
    this.addItemToDatabase("Sad", "img/items/sad.png", "mood");
    this.addItemToDatabase("Sad2", "img/items/sad_2.png", "mood");
    this.addItemToDatabase("Shy", "img/items/shy.png", "mood");
    this.addItemToDatabase("Surprised", "img/items/surprised.png", "mood");
    console.log("preload data completed");
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //ITEM POSITION MANAGEMENT

  public getSceneItems(currentSituation: Situation) {
    let sql = `SELECT i.imgUrl AS imgUrl, i.category AS category, s.P_id AS P_id, p.id AS id, p.S_id AS S_id, p.itemId AS itemId, p.x AS x, p.y AS y
      FROM Situations AS s
      JOIN itemsPosition AS p ON s.S_id = p.S_id
      JOIN items AS i ON p.itemId = i.id
      WHERE p.S_id = ${currentSituation.S_id}`; // change p.S_id to the value of scene passed
    // console.log(sql);
    return this.storage.query(sql);
  }

  // Save a scene item to the DB
  public saveSceneItem(item: ItemPosition, thisSituation: Situation) {
  // for (let i = 0; i < this.sceneItems.length; i++) {
  //   if (this.sceneItems[i].category && item.category == 'background') { //checks if there is already a background
  //     break;
  //   } else {
      let sql = `INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${thisSituation.S_id}, ${item.id}, 100, 100)`;
      console.log(sql);
      return this.storage.query(sql);
    // }
  // }
}

  // Remove item with a given ID
  public removeSceneItem(item: ItemPosition) {
  let sql = `DELETE FROM itemsPosition WHERE id = ${item.id}`;
  this.storage.query(sql);
}

  public moveItem(item: ItemPosition) {
  let sql = `UPDATE itemsPosition SET x = ${item.x}, y = ${item.y} WHERE id = ${item.id}`;
  this.storage.query(sql);
}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
