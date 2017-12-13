import { ErrorHandler, Injectable, Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Pro } from "@ionic/pro";
import { IonicStorageModule } from "@ionic/storage";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";

import { AboutPage } from "../pages/about/about";
import { EnvironmentsPage } from "../pages/environments/environments";
import { NotesFormPage } from "../pages/environments/notes-form/notes-form";
import { GettingStartedPage } from "../pages/getting-started/getting-started";
import { InstructionsPage } from "../pages/instructions/instructions";
import { MainframePage } from "../pages/mainframe/mainframe";
import { QuestionsPopover } from "../pages/mainframe/questions-popover";
import { CreateUserModal } from "../pages/patients/create-user-modal";
import { PatientsPage } from "../pages/patients/patients";
import { TabsPage } from "../pages/tabs/tabs";

// Service
import { Constants } from "../providers/constants";
import { DatabaseNoSQL } from "../providers/db-nosql";

// Plugins
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { NgArrayPipesModule } from "ngx-pipes";

const IonicPro = Pro.init("55010440", {
  appVersion: "0.0.2",
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  public ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  public handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

// tslint:disable-next-line:max-classes-per-file
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
    NotesFormPage,
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
    NotesFormPage,
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
    // {provide: ErrorHandler, useClass: IonicErrorHandler},
    IonicErrorHandler,
    [{ provide: ErrorHandler, useClass: MyErrorHandler }],
    Constants,
    DatabaseNoSQL,
    SplashScreen,
    StatusBar,
  ],
})
export class AppModule {}
