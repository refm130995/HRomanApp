import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ServicesProvider } from '../../providers/services/services';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-step2form',
  templateUrl: 'step2form.html'
})
export class Step2formPage {
  base64Image: string;
  form: any = [];
  users: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private camera: Camera,
    private service: ServicesProvider,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.form = this.navParams.get('form');
  }

  ionViewDidLoad() {
    this.alert();
  }
  alert() {
    let alert = this.alertCtrl.create({
      message: '¿Desea sacar fotografia?',
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
            this.pickPhoto();
          }
        }
      ]
    });
    alert.present();
  }
  pickPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      },
      err => {}
    );
  }

  save() {
    let loading = this.loadingCtrl.create({
      content: 'Enviando informe...'
    });
    loading.present();
    this.form.codigo = 'R-SGM-46';
    this.form.version = '5';
    this.form.tabla_final = [
      {
        version: '1',
        descripcion: 'incorporación al sistema documentado',
        fecha_aprobacion: '03/06/2013',
        elabora_aprueba: 'Mauricio Mendez/Héctor Román'
      },
      {
        version: '2',
        descripcion: 'incorporación al sistema documentado',
        fecha_aprobacion: '03/06/2013',
        elabora_aprueba: 'Mauricio Mendez/Héctor Román'
      }
    ];
    this.form.saca_fotografia = 'No';
    this.form.fecha_revision = '13/03/2019';
    this.form.elaborado_por = 'Mauricio Mendez';
    this.form.revisado_por = 'Millaray Rovira';
    this.form.aprobado_por = 'Héctor Román';
    this.storage
      .get('User')
      .then(result => {
        this.form.user = result['_id'];
        if (this.form.sin_personal_disp) {
          this.form.sin_personal_disp = 'Si';
        } else {
          this.form.sin_personal_disp = 'No';
        }
        this.service.SaveInform(this.form, result.token).subscribe(
          resp => {
            loading.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Informe enviado Exitosamente!!',
              duration: 3000,
              position: 'top'
            });
            toast.present();
            this.navCtrl.setRoot(HomePage);
          },
          error => {
            console.log(error);
            loading.dismiss();
          }
        );
      })
      .catch(err => {});
  }
  AlertDelete(user_) {
    console.log(user_);
    let alert = this.alertCtrl.create({
      title: 'Alerta!!',
      message: '¿Seguro que desea enviar este informe?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: () => {
            this.save();
          }
        }
      ]
    });
    alert.present();
  }

  calculate() {
    var ht = this.toDate(this.form.hora_termino || '00:00');
    var hi = this.toDate(this.form.hora_icinio || '00:00');
    if (this.form.hora_termino !== '' && this.form.hora_icinio !== '') {
      this.form.total_horas = this.parseMillisecondsIntoReadableTime(
        ht.getTime() - hi.getTime()
      );
    }
  }
  toDate(dStr) {
    var now = new Date();
    now.setHours(dStr.substr(0, dStr.indexOf(':')));
    now.setMinutes(dStr.substr(dStr.indexOf(':') + 1));
    now.setSeconds(0);
    return now;
  }
  parseMillisecondsIntoReadableTime(milliseconds) {
    //Get hours from milliseconds
    var hours = milliseconds / (1000 * 60 * 60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

    return h + ':' + m;
  }
}
