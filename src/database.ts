import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

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
  photo: string;
  constructor(P_id: number, name: string, photo: string) {
    this.P_id = P_id;
    this.photo = photo;
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
export class Database {

  public db: SQLite;

  constructor() {
    this.db = new SQLite();
  }


  // public methods

  openDatabase(){
    return this.db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // GENERATIONS

  // ITEM GENERATION ON THE SQL

  public generateitems(){

    let sql = `CREATE TABLE IF NOT EXISTS items (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                name      TEXT,
                imgUrl    TEXT,
                category  TEXT
              )`;
    return this.db.executeSql(sql, []);
  }


  // PATIENT GENERATION ON THE SQL

  public generatepatients(){

    let sql = `CREATE TABLE IF NOT EXISTS Patients (
                P_id  INTEGER PRIMARY KEY AUTOINCREMENT,
                name  TEXT,
                photo TEXT
              )`;
    return this.db.executeSql(sql, [])
  }


  // SITUATION MANAGEMENT ON THE SQL

  public generatesituations() {

    let sql = `CREATE TABLE IF NOT EXISTS Situations(
                S_id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                Situation   VARCHAR(255) NOT NULL,
                P_id        INTEGER,
                FOREIGN KEY (P_Id) REFERENCES Patients(P_Id)
              )`;
    return this.db.executeSql(sql, []).then((data) => {

    });
  }


  // ITEM POSITION MANAGEMENT ON THE SQL

  public generateitemposition() {

    let sql = `CREATE TABLE IF NOT EXISTS itemsPosition (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                S_id      INTEGER,
                itemId    INTEGER,
                category  TEXT,
                x         INTEGER,
                y         INTEGER
              )`;

    return this.db.executeSql(sql, [])
  }

  public populateDatabase() {
    let sql = `SELECT * FROM items`;
    return this.db.executeSql(sql, []).then((data) => {
      if (data.rows.length == 0) {
        this.preloadData();
      }
    });
  }


  // TEMPORARY function to delete unnecessary data from database
  public del() {
    //Check ID of user
    // let sql = `DELETE FROM items WHERE id>73`;
    let sql = `DROP table Patients`;
    return this.db.executeSql(sql, []);
  }

  public getDataFromDb() {
    let sql = `SELECT * FROM itemsPosition`;
    return this.db.executeSql(sql, []).then((data) => {
      console.log("get itemsPosition from DB data", data);
    });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // PATIENT MANAGEMENT

  public addpatient(patient: Patient) {
    //Add Patients
    let sql = `INSERT INTO Patients (name, photo) VALUES (?, ?)`;
    return this.db.executeSql(sql, [patient.name, patient.photo]);
  }

  public addpatientwithpicture(patient: Patient) {
    //Add Patients
    let sql = `INSERT INTO Patients (name, photo) VALUES (?, ?)`;
    return this.db.executeSql(sql, [patient.name, patient.photo]);
  }

  public getPatients() {
    //Get Patients
    let sql = "SELECT * FROM Patients ORDER BY name";
    return this.db.executeSql(sql, [])
    .then(response => {
      console.log("get patients: ", response);
      let patients = [];
      for (let i = 0; i < response.rows.length; i++) {
        patients.push( response.rows.item(i) );
      }
      return Promise.resolve( patients );
    });
  }

  public obliteratepatients(patient: Patient) {
    //OBLITERATE PATIENTS Cause erasing is for kids and obliterate sounds badass!
    let sql = `DELETE FROM Patients WHERE P_id = ? `;
    return this.db.executeSql(sql, [patient.P_id]);
  }

  public editPatient(patient: Patient) {
    let sql = `UPDATE Patients SET name = ? WHERE P_id = ? `;
    return this.db.executeSql(sql, [patient.name, patient.P_id]);
  }

  public lastPatientAdded() {
    let sql = `SELECT P_id FROM Patients
                ORDER BY P_id DESC LIMIT 1;`;
    return this.db.executeSql(sql, []).then(response => {
      let items = response.rows.item(0);
      return Promise.resolve( items );
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // SITUATION MANAGEMENT

  public addSituation(patient: Patient, environment: Environment) {
    let sql = `INSERT INTO Situations (P_id, Situation) VALUES (?,?);`;
    return this.db.executeSql(sql, [patient.P_id, environment.name]).then(response => {
      console.log("addSituation: ", response);
    });
  }

  public getSituations(currentPatient: Patient) {
    console.log("getSituations. currentPatient: ", currentPatient);
    let sql = `SELECT s.S_id, s.P_id, i.name, i.imgUrl
                FROM Situations AS s
                JOIN itemsPosition AS ip ON s.S_id = ip.S_id
                JOIN items AS i ON ip.itemId = i.id
                WHERE s.P_id = ? AND i.category = ?`;

    return this.db.executeSql(sql, [currentPatient.P_id, "background"]).then(response => {
      console.log("get situations: ", response);
      let situations = [];
      for (let i = 0; i < response.rows.length; i++) {
        situations.push( response.rows.item(i) );
      }
      console.log("get situations. situations: ", situations);

      return Promise.resolve( situations );
    });
  }

  public deleteSituation(situation: Environment) {
    let sql = `DELETE FROM Situations WHERE S_id = ? ;`;
    return this.db.executeSql(sql, [situation.S_id]);
  }

  public editSituation(situation: Situation) {
    let sql = `UPDATE Situations
                SET Situation = ?
                WHERE S_id = ? `;
    return this.db.executeSql(sql, [situation.Situation, situation.S_id]);
  }

  public lastSituation() {
    let sql = `SELECT S_id FROM Situations
                ORDER BY S_id DESC LIMIT 1;`;
    return this.db.executeSql(sql, []).then(response => {
      let items = response.rows.item(0);
      return Promise.resolve( items );
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //ITEMS  MANAGEMENT

  //Get items for menu
  public getItems(category) {
    let sql = `SELECT * FROM items WHERE category = ?`;
    return this.db.executeSql(sql, [category]).then(response => {
      let items = [];
      for (let i = 0; i < response.rows.length; i++) {
        items.push( response.rows.item(i) );
      }
      return Promise.resolve( items );
    });
  }

  public addItemToDatabase(name, imgUrl, category) {
    let sql = `INSERT INTO items (name, imgUrl, category) VALUES (?, ?, ?)`;
    return this.db.executeSql(sql, [name, imgUrl, category]);
  }

  public preloadData(): void {

    // Backgrounds
    this.addItemToDatabase("Classroom",           "assets/img/backgrounds/Classroom-shoebox.png",  "background");
    this.addItemToDatabase("At Home",             "assets/img/backgrounds/At-Home-shoebox.png",    "background");
    this.addItemToDatabase("The Great Outdoors",  "assets/img/backgrounds/The-Great-Outdoors.png", "background");
    this.addItemToDatabase("Station and Metro",   "assets/img/backgrounds/Station-and-Metro.png",  "background");

    // Persons
    this.addItemToDatabase("Afro Boy",        "assets/img/persons/afro_boy.png",       "person");
    this.addItemToDatabase("Afro Gril",       "assets/img/persons/afro_girl.png",      "person");
    this.addItemToDatabase("Afro Man",        "assets/img/persons/afro_man.png",       "person");
    this.addItemToDatabase("Afro Teen",       "assets/img/persons/afro_teen.png",      "person");
    this.addItemToDatabase("Asian Boy",       "assets/img/persons/asian_boy.png",      "person");
    this.addItemToDatabase("Asian Girl",      "assets/img/persons/asian_girl.png",     "person");
    this.addItemToDatabase("Asian Man",       "assets/img/persons/asian_man.png",      "person");
    this.addItemToDatabase("Asian Teen",      "assets/img/persons/asian_teen.png",     "person");
    this.addItemToDatabase("Baby",            "assets/img/persons/baby.png",           "person");
    this.addItemToDatabase("Causasis Boy",    "assets/img/persons/caucasis_boy.png",   "person");
    this.addItemToDatabase("Causasis Girl",   "assets/img/persons/caucasis_girl.png",  "person");
    this.addItemToDatabase("Causasis Woman",  "assets/img/persons/caucasis_woman.png", "person");
    this.addItemToDatabase("Ginger Boy",      "assets/img/persons/ginger_boy.png",     "person");
    this.addItemToDatabase("Ginger Teen",     "assets/img/persons/ginger_teen.png",    "person");
    this.addItemToDatabase("Mid East Boy",    "assets/img/persons/mid_east_boy.png",   "person");
    this.addItemToDatabase("Mid East Girl",   "assets/img/persons/mid_east_girl.png",  "person");
    this.addItemToDatabase("Mid East Teen",   "assets/img/persons/mid_east_teen.png",  "person");
    this.addItemToDatabase("Mid East Woman",  "assets/img/persons/mid_east_woman.png", "person");
    this.addItemToDatabase("Old Man",         "assets/img/persons/old_man.png",        "person");
    this.addItemToDatabase("Old Woman",       "assets/img/persons/old_woman.png",      "person");

    // Moods
    this.addItemToDatabase("Bange",           "assets/img/moods/bange.png",          "mood");
    this.addItemToDatabase("Forvirret",       "assets/img/moods/forvirret.png",      "mood");
    this.addItemToDatabase("Happy",           "assets/img/moods/happy.png",          "mood");
    this.addItemToDatabase("Ked af Det",      "assets/img/moods/ked_af_det.png",     "mood");
    this.addItemToDatabase("Overrasket",      "assets/img/moods/overrasket.png",     "mood");
    this.addItemToDatabase("Pinligt Berort",  "assets/img/moods/pinligt_berort.png", "mood");
    this.addItemToDatabase("Sad",             "assets/img/moods/sad.png",            "mood");
    this.addItemToDatabase("Vred",            "assets/img/moods/vred.png",           "mood");

    // Items
    this.addItemToDatabase("Action Man",            "assets/img/items/action_man.png",         "item");
    this.addItemToDatabase("Arm Chair",             "assets/img/items/arm_chair.png",          "item");
    this.addItemToDatabase("Baseball Mit",          "assets/img/items/baseball_mit.png",       "item");
    this.addItemToDatabase("Bed",                   "assets/img/items/bed.png",                "item");
    this.addItemToDatabase("Bike",                  "assets/img/items/bike.png",               "item");
    this.addItemToDatabase("Bird",                  "assets/img/items/bird.png",               "item");
    this.addItemToDatabase("Bookcase",              "assets/img/items/bookcase.png",           "item");
    this.addItemToDatabase("Bte",                   "assets/img/items/bte.png",                "item");
    this.addItemToDatabase("Bus",                   "assets/img/items/bus.png",                "item");
    this.addItemToDatabase("Car",                   "assets/img/items/car.png",                "item");
    this.addItemToDatabase("Cat",                   "assets/img/items/cat.png",                "item");
    this.addItemToDatabase("Chair",                 "assets/img/items/chair.png",              "item");
    this.addItemToDatabase("Cohlear implants",      "assets/img/items/cochlear_implants.png",  "item");
    this.addItemToDatabase("Consol",                "assets/img/items/consol.png",             "item");
    this.addItemToDatabase("Control",               "assets/img/items/control.png",            "item");
    this.addItemToDatabase("Dog",                   "assets/img/items/dog.png",                "item");
    this.addItemToDatabase("Doll",                  "assets/img/items/doll.png",               "item");
    this.addItemToDatabase("Electric Piano",        "assets/img/items/electric_piano.png",     "item");
    this.addItemToDatabase("Flatscreen",            "assets/img/items/flatscreen.png",         "item");
    this.addItemToDatabase("Fodbold",               "assets/img/items/fodbold.png",            "item");
    this.addItemToDatabase("Horse",                 "assets/img/items/horse.png",              "item");
    this.addItemToDatabase("Ite",                   "assets/img/items/ite.png",                "item");
    this.addItemToDatabase("Ketched",               "assets/img/items/ketched.png",            "item");
    this.addItemToDatabase("Kort",                  "assets/img/items/kort.png",               "item");
    this.addItemToDatabase("Laptop",                "assets/img/items/laptop.png",             "item");
    this.addItemToDatabase("Large table",           "assets/img/items/large_table.png",        "item");
    this.addItemToDatabase("Lego",                  "assets/img/items/lego.png",               "item");
    this.addItemToDatabase("Mask and Snorke",       "assets/img/items/mask_and_snorke.png",    "item");
    this.addItemToDatabase("Microphone Brown",      "assets/img/items/microphone_brown.png",   "item");
    this.addItemToDatabase("Microphone Grey",       "assets/img/items/microphone_grey.png",    "item");
    this.addItemToDatabase("Mobile",                "assets/img/items/mobile.png",             "item");
    this.addItemToDatabase("Mp3",                   "assets/img/items/mp3.png",                "item");
    this.addItemToDatabase("Radio Cd",              "assets/img/items/radio_cd.png",           "item");
    this.addItemToDatabase("Science Lab",           "assets/img/items/science_lab.png",        "item");
    this.addItemToDatabase("Skateboard",            "assets/img/items/skateboard.png",         "item");
    this.addItemToDatabase("Small Table",           "assets/img/items/small_table.png",        "item");
    this.addItemToDatabase("Sofa",                  "assets/img/items/sofa.png",               "item");
    this.addItemToDatabase("Table",                 "assets/img/items/table.png",              "item");
    this.addItemToDatabase("Terningsspil",          "assets/img/items/terningsspil.png",       "item");
    this.addItemToDatabase("Tortois",               "assets/img/items/tortois.png",            "item");
    this.addItemToDatabase("Train",                 "assets/img/items/train.png",              "item");
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
                WHERE p.S_id = ? `;
    return this.db.executeSql(sql, [currentSituation.S_id]).then(response => {
      let sceneItems = [];
      for (let i = 0; i < response.rows.length; i++) {
        sceneItems.push( response.rows.item(i) );
      }
      return Promise.resolve( sceneItems );
    });;
  }

  // Save a scene item to the DB
  // public saveSceneItem(item: ItemPosition, thisSituation: Situation) {
  public saveSceneItem(item, thisSituation) {
    console.log("saveSceneItem", item, thisSituation);
  // for (let i = 0; i < this.sceneItems.length; i++) {
  //   if (this.sceneItems[i].category && item.category == 'background') { //checks if there is already a background
  //     break;
  //   } else {
      let sql = `INSERT INTO itemsPosition (S_id, itemId, x, y)
                  VALUES (?, ?, ?, ?)`;
      // return this.db.executeSql(sql, [thisSituation.S_id, item.id, item.x || 0, item.y || 0]);
      return this.db.executeSql(sql, [thisSituation.S_id, item.id, item.x || 0, item.y || 0]).then((data) => {
        console.log("saveSceneItem: ", data);
      });
    // }
  // }
  }

  // Remove item with a given ID
  public removeSceneItem(item: ItemPosition) {
    let sql = `DELETE FROM itemsPosition WHERE id = ? `;
    return this.db.executeSql(sql, [item.id]);
  }

  public moveItem(item: ItemPosition) {
    let sql = `UPDATE itemsPosition SET x = ? , y = ? WHERE id = ? `;
    return this.db.executeSql(sql, [item.x, item.y, item.id]);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
