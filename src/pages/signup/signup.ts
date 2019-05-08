import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { user_ } from '../../models/inspections.model';
import { ServicesProvider } from '../../providers/services/services';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 user:any = {};

  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public service: ServicesProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private loadingCtrl: LoadingController) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    let loading = this.loadingCtrl.create({
      content: 'Registrando...'
    });
    loading.present();
    this.service.register(this.user).subscribe((resp) => {
      this.navCtrl.push(LoginPage);
      let toast = this.toastCtrl.create({
        message: 'Registro Exitoso!!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      loading.dismiss();
      console.log(resp);
    }, (err) => {
      console.log(err);
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err.error.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
