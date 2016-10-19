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

@Injectable()
export class database {
  storage: Storage = null;
  scenesItems: Object[];

  constructor() {
    this.storage = new Storage(SqlStorage, { name: 'myWorld.db' });
    this.generateitems();
    this.generatepatients();
    this.generatesituations();
  }

  public generateitems() {
    let sql = "CREATE TABLE IF NOT EXISTS items ( " +
      "id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "name TEXT, " +
      "imgUrl TEXT, " +
      "category TEXT)";
    return this.storage.query(sql);

  }

  public generatepatients() {
    //Generate Patients Table
    let sql = "CREATE TABLE IF NOT EXISTS Patients ( " +
  //    "P_Id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "Firstname varchar(255) , " +
      "LastName varchar(255), " +
      "PatientID var char(255)) "

      return this.storage.query(sql);

    //Primary Key Will be P_Id
  }

  public addpatients(name: string) {
    //Add Patients
    console.log("Will Insert   " + name + "  this Guy");
    this.storage.query("INSERT INTO Patients (FirstName,LastName,PatientID) VALUES (?,?,?),[name,name,name]");
   }

  public getPatients() {
    //Get Patients
    let sql = "SELECT * FROM Patients";
    return this.storage.query(sql);
  }


  public generatesituations() {
    //Generate Patients Table
    let sql = "CREATE TABLE IF NOT EXISTS Situations(" +
    "P_Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
    "Situation varchar(255) NOT NULL, " +
    "FOREIGN KEY (P_Id) REFERENCES Patients(P_Id)" +
    ")";
    return this.storage.query(sql);
    //Primary Key Will be S_Id
  }





  public getItems() {
    let sql = "SELECT * FROM items";
    return this.storage.query(sql);
  }

  public addItemToDatabase(name: string, imgUrl: string, category: string) {
    let sql = "INSERT INTO items (name, imgUrl, category) " +
      "VALUES ('" + name + "', '" + imgUrl + "', '" + category + "')";
    this.storage.query(sql);
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

  public refresh() {
    let sql = "SELECT i.imgUrl AS Image, i.category AS Category, s.userId AS UserID, s.bgUrl AS BackgroundURL, p.id AS Id, p.sceneId AS SceneID, p.itemId AS ItemID, p.x AS X, p.y AS Y " +
      "FROM scenes AS s " +
      "JOIN itemsPosition AS p ON s.id = p.sceneId " +
      "JOIN items AS i ON p.itemId = i.id ;";

    this.storage.query(sql).then((data) => {
      this.scenesItems = [];
      if (data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          this.scenesItems.push({
            id: data.res.rows.item(i).Id,
            imgUrl: data.res.rows.item(i).Image,
            category: data.res.rows.item(i).Category,
            userId: data.res.rows.item(i).UserID,
            bgUrl: data.res.rows.item(i).BackgroundURL,
            sceneId: data.res.rows.item(i).SceneID,
            itemId: data.res.rows.item(i).ItemID,
            x: data.res.rows.item(i).X,
            y: data.res.rows.item(i).Y
          })
        }
      }
      console.log("refresh function");
    }, (error) => {
    });
  }
}
