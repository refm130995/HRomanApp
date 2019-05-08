import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Nav, Platform, Config, LoadingController, MenuController, AlertController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ServicesProvider } from '../providers/services/services';
import { Storage } from '@ionic/storage';
import { WelcomePage } from '../pages/welcome/welcome';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: HomePage, icon:'search' },
 /*    { title: 'Historial', component: 'HistoryinspectionsPage', icon:'bookmarks' }, */
    { title: 'Cerrar Sesion', component: 'LogOut', icon:'contact' }
  ]
  rootPage:any = 'WelcomePage';
  user: any;

  constructor(private translate: TranslateService, platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, private service: ServicesProvider, private storage: Storage, private loadingCtrl: LoadingController, private menuCtrl: MenuController, private alertCtrl: AlertController) {
    platform.ready().then(() => {
     
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
 
    this.checkUser();
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', '');
    });
  }

  openPage(page) {
    if(page.component ==='LogOut'){
     this.alert();
    }else{
      this.nav.setRoot(page.component);
    }
  }
  checkUser(){
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();

    this.storage.get('User').then((result) => {
      if(result){
        this.service.CheckUser(result.token).subscribe((resp) => {
        this.user = resp['user'];
        this.user.token = result.token;
        this.storage.set('User', this.user);
        this.nav.setRoot(HomePage);
        this.user = result;
        loading.dismiss();
  
          this.menuCtrl.enable(true, 'authenticated');
          this.menuCtrl.enable(false, 'unauthenticated');
        },
        (error)=> {
          console.log(error);
          
          loading.dismiss();
        })
        
      }else{
        loading.dismiss();
      }
   
  })
  }
  alert(){
    let alert = this.alertCtrl.create({
      message: '¿Desea cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.storage.remove('User')
            this.nav.setRoot('WelcomePage');
          }
        }
      ]
    });
    alert.present();
  }
}
