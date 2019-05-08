import {
  Component
} from '@angular/core';
import {
  NavController, LoadingController, AlertController
} from 'ionic-angular';
import {
  ServicesProvider
} from '../../providers/services/services';
import {
  Storage
} from '@ionic/storage';
import { Step2formPage } from '../step2form/step2form';
import { ListMasterPage } from '../list-master/list-master';
import { User } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any = [];
  role: any;
  form: any = {
    elemntos_de_desgaste_cambiados : [
      {
        'descripcion': '',
        'cantidad' : 0
      },
      {
        'descripcion': '',
        'cantidad' : 0
      },
      {
        'descripcion': '',
        'cantidad' : 0
      },
      {
        'descripcion': '',
        'cantidad' : 0
      },
      {
        'descripcion': '',
        'cantidad' : 0
      }
    ],
    aceites: [],
    filtros:[]
  };
  exist: boolean;
  constructor(public navCtrl: NavController, public service: ServicesProvider, private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    console.log(this.form);
    
  }

  ionViewDidLoad() {
    this.GetUsers();
  }
  GetUsers() {
    this.users = [];
    let loading = this.loadingCtrl.create({
      content: 'Consultando Rol...'
    });
    loading.present();
    this.storage.get('User').then((result) => {
      let role = result.role;
      loading.dismiss();
      if (role != 'Empleado') {
        loading.dismiss();
        this.role = result['role'];
        this.service.ListByRol(result.token).subscribe((resp) => {
            this.users = resp['users'];
            console.log(this.users);
            
          },
          (error) => {
            console.log(error);
          })
      } else {
        loading.dismiss();
        this.role = 'Empleado';
      }
    })
  }

  next(){
    this.navCtrl.push(Step2formPage,{
      form:this.form
    })
  }

  check_(data:string){
    this.exist = false;
  let index = this.form.aceites.indexOf(data);
      if(index >= 0){
        this.form.aceites.splice(index, 1);
      }else{
        this.form.aceites.push(data);
      }

  }
  check_2(data:string){
    this.exist = false;
    let index = this.form.filtros.indexOf(data);
      if(index >= 0){
        this.form.filtros.splice(index, 1);
      }else{
        this.form.filtros.push(data);
      }
  
  }

  showInform(user_:any){
    this.navCtrl.push(ListMasterPage, {
      user: user_
    });
  }
  
  deleteUser(user:any){
    let loading = this.loadingCtrl.create({
      content: 'Eliminando...'
    });
    loading.present();
    this.storage.get('User').then((result) => {
    this.service.DeleteUser(user, result.token).subscribe((resp) => {
      loading.dismiss();
      this.GetUsers();
    },
    (error) => {
      loading.dismiss();
      console.log(error);
    })
  })
  }

  AlertDelete(user_){
    console.log(user_)
    let alert = this.alertCtrl.create({
      title: 'Alerta!!',
      message: '¿Seguro que desea eliminar a '+ user_.firstname + ' ' +user_.lastname+ ' ?',
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
           this.deleteUser(user_);
          }
        }
      ]
    });
    alert.present();
  }
}