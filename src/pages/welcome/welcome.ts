import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { IngencerProvider } from '../../providers/ingencer/ingencer';
import { SignupPage } from '../signup/signup';


@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private ingencer: IngencerProvider, private loadingCtrl: LoadingController) { }

  login() {
    this.navCtrl.push(LoginPage);
  }
  register(){
    this.navCtrl.push(SignupPage);
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
  ionViewDidLoad(){
   /*  this.message(); */
  }
message() { 
  let loading = this.loadingCtrl.create({content:'Cargando...'});
  loading.present();
this.ingencer.getMessage()
  .subscribe(response => {
    let message = [];
    message = response;
    this.confirm(message[1], message[0]);
    loading.dismiss();
  });
}
confirm(header:string, body:string) {
const confirm = this.alertCtrl.create({
  title: header,
  message:  body,
  buttons: [
    {
      text: 'Entiendo',
      handler: () => {
      }
    }
  ]
});
confirm.setMode('ios');
confirm.present();
}
}
