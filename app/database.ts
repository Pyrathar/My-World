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

export class Environment {
  S_id: number;
  P_id: number;
  name: string;
  imgUrl: string;
  constructor(S_id: number, P_id: number, name: string, imgUrl: string) {
    this.S_id = S_id;
    this.P_id = P_id;
    this.name = name;
    this.imgUrl = imgUrl;
  }
}

@Injectable()
export class database {
  storage: Storage = null;
  sceneItems: ItemPosition[];

  constructor() {
    this.storage = new Storage(SqlStorage, {
      name: 'myWorld11.db'
    });
    // this.del();
    this.lastSituation();
    this.generateitems();
    this.generatepatients();
    this.generatesituations();
    this.generateitemposition();
  }

  // TEMPORARY function to delete unnecessary data from database
  public del() {
    //Check ID of user
    // let sql = `DELETE FROM items WHERE id>73`;
    let sql = `DROP table items`;
    this.storage.query(sql);
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
      P_id INTEGER,
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
    let sql = `INSERT INTO Patients (name) VALUES ("${patient.name}")`;
    this.storage.query(sql)
  }

  public getPatients() {
    //Get Patients
    let sql = "SELECT * FROM Patients ORDER BY name";
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

  public lastPatientAdded() {
    // let sql = `SELECT LAST(S_id) FROM Situations`;
    let sql = `SELECT P_id FROM Patients
                ORDER BY P_id DESC LIMIT 1;`;
    return this.storage.query(sql);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //SITUATION MANAGEMENT

  //Add situations
  public addSituation1(AAAA) {
    let sql = `INSERT INTO Situations (Situation, P_id)
                SELECT name
                 FROM items
                WHERE category = 'background';`;
    console.log(this.storage.query(sql));
    return this.storage.query(sql);
  }

  public addSituation(patient: Patient, environment: Environment) {
    let sql = `INSERT INTO Situations (P_id, Situation) VALUES (${patient.P_id}, "${environment.name}");`;
    this.storage.query(sql);
  }

  //Get situations
  public getSituations(currentPatient: Patient) {
    let sql = `SELECT s.S_id, s.P_id, i.name, i.imgUrl
                FROM Situations AS s
                JOIN itemsPosition AS ip ON s.S_id = ip.S_id
                JOIN items AS i ON ip.itemId = i.id
                WHERE s.P_id = ${currentPatient.P_id} AND i.category="background"`;
    return this.storage.query(sql);
  }

  //Delete situations
  public deleteSituation(situation: Environment) {
    let sql = `DELETE FROM Situations WHERE S_id = ${situation.S_id};`;
    this.storage.query(sql);
  }

  public editSituation(situation: Situation) {
    //Check ID of user
    let sql = `UPDATE Situations SET Situation = "${situation.Situation}" WHERE S_id=${situation.S_id}`;
    this.storage.query(sql);
  }

  public lastSituation() {
    // let sql = `SELECT LAST(S_id) FROM Situations`;
    let sql = `SELECT S_id FROM Situations
                ORDER BY S_id DESC LIMIT 1;`;
    return this.storage.query(sql);
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

    // Backgrounds
    this.addItemToDatabase("Classroom", "img/backgrounds/Classroom-shoebox.png", "background");
    this.addItemToDatabase("At Home", "img/backgrounds/At-Home-shoebox.png", "background");
    this.addItemToDatabase("The Great Outdoors", "img/backgrounds/The-Great-Outdoors.png", "background");
    this.addItemToDatabase("Station and Metro", "img/backgrounds/Station-and-Metro.png", "background");

    // Persons
    this.addItemToDatabase("Afro Boy", "img/persons/afro_boy.png", "person");
    this.addItemToDatabase("Afro Gril", "img/persons/afro_girl.png", "person");
    this.addItemToDatabase("Afro Man", "img/persons/afro_man.png", "person");
    this.addItemToDatabase("Afro Teen", "img/persons/afro_teen.png", "person");
    this.addItemToDatabase("Asian Boy", "img/persons/asian_boy.png", "person");
    this.addItemToDatabase("Asian Girl", "img/persons/asian_girl.png", "person");
    this.addItemToDatabase("Asian Man", "img/persons/asian_man.png", "person");
    this.addItemToDatabase("Asian Teen", "img/persons/asian_teen.png", "person");
    this.addItemToDatabase("Baby", "img/persons/baby.png", "person");
    this.addItemToDatabase("Causasis Boy", "img/persons/caucasis_boy.png", "person");
    this.addItemToDatabase("Causasis Girl", "img/persons/caucasis_girl.png", "person");
    this.addItemToDatabase("Causasis Woman", "img/persons/caucasis_woman.png", "person");
    this.addItemToDatabase("Ginger Boy", "img/persons/ginger_boy.png", "person");
    this.addItemToDatabase("Ginger Teen", "img/persons/ginger_teen.png", "person");
    this.addItemToDatabase("Mid East Boy", "img/persons/mid_east_boy.png", "person");
    this.addItemToDatabase("Mid East Girl", "img/persons/mid_east_girl.png", "person");
    this.addItemToDatabase("Mid East Teen", "img/persons/mid_east_teen.png", "person");
    this.addItemToDatabase("Mid East Woman", "img/persons/mid_east_woman.png", "person");
    this.addItemToDatabase("Old Man", "img/persons/old_man.svg", "person");
    this.addItemToDatabase("Old Woman", "img/persons/old_woman.png", "person");

    // Moods
    this.addItemToDatabase("Bange", "img/moods/bange.png", "mood");
    this.addItemToDatabase("Forvirret", "img/moods/forvirret.png", "mood");
    this.addItemToDatabase("Happy", "img/moods/happy.png", "mood");
    this.addItemToDatabase("Ked af Det", "img/moods/ked_af_det.png", "mood");
    this.addItemToDatabase("Overrasket", "img/moods/overrasket.png", "mood");
    this.addItemToDatabase("Pinligt Berort", "img/moods/pinligt_berort.png", "mood");
    this.addItemToDatabase("Sad", "img/moods/sad.png", "mood");
    this.addItemToDatabase("Vred", "img/moods/vred.png", "mood");

    // Items
    this.addItemToDatabase("Action Man", "img/items/action_man.png", "item");
    this.addItemToDatabase("Arm Chair", "img/items/arm_chair.png", "item");
    this.addItemToDatabase("Baseball Mit", "img/items/baseball_mit.png", "item");
    this.addItemToDatabase("Bed", "img/items/bed.png", "item");
    this.addItemToDatabase("Bike", "img/items/bike.png", "item");
    this.addItemToDatabase("Bird", "img/items/bird.png", "item");
    this.addItemToDatabase("Bookcase", "img/items/bookcase.png", "item");
    this.addItemToDatabase("Bte", "img/items/bte.png", "item");
    this.addItemToDatabase("Bus", "img/items/bus.png", "item");
    this.addItemToDatabase("Car", "img/items/car.png", "item");
    this.addItemToDatabase("Cat", "img/items/cat.png", "item");
    this.addItemToDatabase("Chair", "img/items/chair.png", "item");
    this.addItemToDatabase("Cohlear implants", "img/items/cochlear_implants.png", "item");
    this.addItemToDatabase("Consol", "img/items/consol.png", "item");
    this.addItemToDatabase("Control", "img/items/control.png", "item");
    this.addItemToDatabase("Dog", "img/items/dog.png", "item");
    this.addItemToDatabase("Doll", "img/items/doll.png", "item");
    this.addItemToDatabase("Electric Piano", "img/items/electric_piano.png", "item");
    this.addItemToDatabase("Flatscreen", "img/items/flatscreen.png", "item");
    this.addItemToDatabase("Fodbold", "img/items/fodbold.png", "item");
    this.addItemToDatabase("Horse", "img/items/horse.png", "item");
    this.addItemToDatabase("Ite", "img/items/ite.png", "item");
    this.addItemToDatabase("Ketched", "img/items/ketched.png", "item");
    this.addItemToDatabase("Kort", "img/items/kort.png", "item");
    this.addItemToDatabase("Laptop", "img/items/laptop.png", "item");
    this.addItemToDatabase("Large table", "img/items/large_table.png", "item");
    this.addItemToDatabase("Lego", "img/items/lego.png", "item");
    this.addItemToDatabase("Mask and Snorke", "img/items/mask_and_snorke.png", "item");
    this.addItemToDatabase("Microphone Brown", "img/items/microphone_brown.png", "item");
    this.addItemToDatabase("Microphone Grey", "img/items/microphone_grey.png", "item");
    this.addItemToDatabase("Mobile", "img/items/mobile.png", "item");
    this.addItemToDatabase("Mp3", "img/items/mp3.png", "item");
    this.addItemToDatabase("Radio Cd", "img/items/radio_cd.png", "item");
    this.addItemToDatabase("Science Lab", "img/items/science_lab.png", "item");
    this.addItemToDatabase("Skateboard", "img/items/skateboard.png", "item");
    this.addItemToDatabase("Small Table", "img/items/small_table.png", "item");
    this.addItemToDatabase("Sofa", "img/items/sofa.png", "item");
    this.addItemToDatabase("Table", "img/items/table.png", "item");
    this.addItemToDatabase("Terningsspil", "img/items/terningsspil.png", "item");
    this.addItemToDatabase("Tortois", "img/items/tortois.png", "item");
    this.addItemToDatabase("Train", "img/items/train.png", "item");
    console.log("preload data completed");
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //ITEM POSITION MANAGEMENT

  public getSceneItems(currentSituation: Environment) {
    let sql = `SELECT i.imgUrl AS imgUrl, i.category AS category, s.P_id AS P_id, p.id AS id, p.S_id AS S_id, p.itemId AS itemId, p.x AS x, p.y AS y
      FROM Situations AS s
      JOIN itemsPosition AS p ON s.S_id = p.S_id
      JOIN items AS i ON p.itemId = i.id
      WHERE p.S_id = ${currentSituation.S_id}`;
    return this.storage.query(sql);
  }

  // Save a scene item to the DB
  // public saveSceneItem(item: ItemPosition, thisSituation: Situation) {
  public saveSceneItem(item, thisSituation) {
  // for (let i = 0; i < this.sceneItems.length; i++) {
  //   if (this.sceneItems[i].category && item.category == 'background') { //checks if there is already a background
  //     break;
  //   } else {
      let sql = `INSERT INTO itemsPosition (S_id, itemId, x, y) VALUES (${thisSituation.S_id}, ${item.id}, ${item.x || 0}, ${item.y || 0})`;
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
