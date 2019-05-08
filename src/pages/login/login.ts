import {
  Component
} from '@angular/core';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  IonicPage,
  NavController,
  ToastController,
  AlertController,
  LoadingController
} from 'ionic-angular';

import { ServicesProvider } from '../../providers/services/services';
import { user_ } from '../../models/inspections.model';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
user:any = {};
  loginErrorString: any;
  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public translateService: TranslateService,
              private service: ServicesProvider,
              private alertCtrl: AlertController,
              private storage: Storage,
              public loadingCtrl: LoadingController) {
                this.translateService.get('LOGIN_ERROR').subscribe((value) => {
                  this.loginErrorString = value;
                })
  }
  // Attempt to login in through our User service
  doLogin() {
    let loading = this.loadingCtrl.create({
      content: 'Consultando...'
    });
    loading.present();
    this.service.login(this.user).subscribe((resp) => {
      console.log(resp);
      this.service.CheckUser(resp['token']).subscribe((response) => {
      console.log(response);
      this.user = response['user'];
      this.user.token = resp['token'];
      console.log(this.user);
      this.storage.set('User', this.user);
      this.navCtrl.setRoot(HomePage);
      loading.dismiss();
    })
  },
  err => {
    console.log(err);
    loading.dismiss();
    let toast = this.toastCtrl.create({
      message: err.error.message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  })
  }
}
