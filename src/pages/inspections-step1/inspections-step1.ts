import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-inspections-step1',
  templateUrl: 'inspections-step1.html',
})
export class InspectionsStep1Page {
  lottieConfig:any;
  lottieConfig2 :any
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.lottieConfig = {
      path: 'assets/159-servishero-loading.json',
      autoplay:true,
      loop:false,
    }
    this.lottieConfig2 = {
      path: 'assets/47-gears.json',
      autoplay:true,
      loop:false,
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionsStep1Page');
  }
  confirm(type) {
    const confirm = this.alertCtrl.create({
      title: 'Disculpe!!',
      message: 'Este servicio no se encuentra disponible en estos momentos.',
      buttons: [
        {
          text: 'Okey',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.setMode('ios');
    confirm.present();
  }
}
