import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";

import { AboutPage } from "../pages/about/about";
import { EnvironmentsPage } from "../pages/environments/environments";
import { GettingStartedPage } from "../pages/getting-started/getting-started";
import { InstructionsPage } from "../pages/instructions/instructions";
import { MainframePage } from "../pages/mainframe/mainframe";
import { QuestionsPopover } from "../pages/mainframe/questions-popover";
import { CreateUserModal } from "../pages/patients/create-user-modal";
import { PatientsPage } from "../pages/patients/patients";
import { TabsPage } from "../pages/tabs/tabs";

// Service
import { Constants } from "../constants";
import { DatabaseNoSQL } from "../db-nosql";
// import { SQLiteDB } from '../providers/sqliteDB';

// Plugins
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

// import { NgPipesModule } from 'ngx-pipes';
import { NgArrayPipesModule } from "ngx-pipes/src/app/pipes/array";

@NgModule({
  bootstrap: [IonicApp],
  declarations: [
    MyApp,
    AboutPage,
    EnvironmentsPage,
    GettingStartedPage,
    MainframePage,
    PatientsPage,
    TabsPage,
    QuestionsPopover,
    CreateUserModal,
    InstructionsPage,
  ],
  entryComponents: [
    MyApp,
    AboutPage,
    EnvironmentsPage,
    GettingStartedPage,
    MainframePage,
    PatientsPage,
    TabsPage,
    QuestionsPopover,
    CreateUserModal,
    InstructionsPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      driverOrder: ["indexeddb", "websql", "sqlite"],
      name: "__MyWorldDB",
    }),
    NgArrayPipesModule,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Constants,
    DatabaseNoSQL,
    SplashScreen,
    StatusBar,
  ],
})
export class AppModule {}
