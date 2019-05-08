import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  LoadingController,
  NavParams,
  AlertController,
  ToastController
} from 'ionic-angular';

import {
  ServicesProvider
} from '../../providers/services/services';
import {
  Storage
} from '@ionic/storage';
import { InspectionsPage } from '../inspections/inspections';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  form: any = [];
  user: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: ServicesProvider, private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
    this.user = this.navParams.get('user');
    console.log(this.user);
    this.GetInform();
  }

  ionViewDidLoad() {

  }
  GetInform() {
    this.form = [];
    let loading = this.loadingCtrl.create({
      content: 'Consultando...'
    });
    loading.present();
    this.storage.get('User').then((result) => {
      this.service.ListInformByUser(this.user['_id'], result.token).subscribe((resp) => {
         this.form = resp['informes'];
         loading.dismiss();
         if(this.form.length == 0){
           this.alert();
           this.navCtrl.pop();
         }
         
        },
        (error) => {
          console.log(error);
          loading.dismiss();
        })
    }).catch((err) => {

    });
  }

  showInform(inform:any){
    this.navCtrl.push(InspectionsPage,{
      inform: inform
    })
  }
  alert(){
    let alert = this.alertCtrl.create({
      title:'Disculpe',
      message: 'El empleado no posee contratos registrados.',
      buttons: [
        {
          text: 'Entendido',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
  AlertDelete(inform_){
    console.log(inform_)
    let alert = this.alertCtrl.create({
      title: 'Alerta!!',
      message: '¿Seguro que desea eliminar este informe?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
           this.deleteInform(inform_);
          }
        }
      ]
    });
    alert.present();
  } 
  deleteInform(inform){
    let loading = this.loadingCtrl.create({
      content: 'Eliminando...'
    });
    loading.present();
    this.storage.get('User').then((result) => {
    this.service.DeleteInformById(inform, result.token).subscribe((resp) => {
      loading.dismiss();
      console.log(resp);
      let toast = this.toastCtrl.create({
        message: 'Informe eliminado exitosamente!!',
        duration: 1500,
        position: 'top'
      });
      toast.present();
      toast.onDidDismiss(() => {
        this.GetInform();
        });
    },
    (error) => {
      loading.dismiss();
      console.log(error);
    })
  })
  }
}
