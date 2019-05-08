import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { IngencerProvider } from '../providers/ingencer/ingencer';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginPage } from '../pages/login/login';
import { InspectionsStep1Page } from '../pages/inspections-step1/inspections-step1';
import { LottieAnimationViewModule } from 'ng-lottie';
import { ServicesProvider } from '../providers/services/services';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { Step2formPage } from '../pages/step2form/step2form';
import { ListMasterPage } from '../pages/list-master/list-master';
import { InspectionsPage } from '../pages/inspections/inspections';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {

}
export const fireconfig = {
  apiKey: "AIzaSyCo5IEYnc6XsKirYOyj78js6FVnnlyuMkw",
  authDomain: "inspecdb.firebaseapp.com",
  databaseURL: "https://inspecdb.firebaseio.com",
  projectId: "inspecdb",
  storageBucket: "inspecdb.appspot.com",
  messagingSenderId: "134068650153"
};
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    InspectionsStep1Page,
    SignupPage,
    HomePage,
    Step2formPage,
    ListMasterPage,
    InspectionsPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(fireconfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LottieAnimationViewModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    InspectionsStep1Page,
    SignupPage,
    HomePage,
    Step2formPage,
    ListMasterPage,
    InspectionsPage
  ],
  providers: [
    Camera,
    SplashScreen,
    StatusBar,
    AngularFireDatabase,
    { provide: 'Settings', useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    IngencerProvider,
    ServicesProvider
  ]
})
export class AppModule { }
