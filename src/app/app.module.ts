import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Database } from '../database';
import { AbsoluteDrag } from '../components/absolute-drag/absolute-drag';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { EnvironmentsPage } from '../pages/environments/environments';
import { GettingStartedPage } from '../pages/getting-started/getting-started';
import { MainframePage } from '../pages/mainframe/mainframe';
import { PatientsPage } from '../pages/patients/patients';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    EnvironmentsPage,
    GettingStartedPage,
    MainframePage,
    PatientsPage,
    TabsPage,
    AbsoluteDrag
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    EnvironmentsPage,
    GettingStartedPage,
    MainframePage,
    PatientsPage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    Database
]
})
export class AppModule {}
