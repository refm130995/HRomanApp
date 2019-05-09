import { Component } from '@angular/core';
import {
  NavController,
  LoadingController,
  AlertController
} from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { Storage } from '@ionic/storage';
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
  choferes: any;
  form: any = {
    elemntos_de_desgaste_cambiados: [
      {
        descripcion: 'Cuchillas',
        cantidad: 0
      },
      {
        descripcion: 'Punteras',
        cantidad: 0
      },
      {
        descripcion: 'Bronces',
        cantidad: 0
      },
      {
        descripcion: 'Fenólicas',
        cantidad: 0
      },
      {
        descripcion: 'Insertos',
        cantidad: 0
      },
      {
        descripcion: 'Calzas',
        cantidad: 0
      }
    ],
    aceites: [],
    filtros: []
  };
  exist: boolean;
  constructor(
    public navCtrl: NavController,
    public service: ServicesProvider,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
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
    this.storage.get('User').then(result => {
      let role = result.role;
      loading.dismiss();
      if (role != 'Empleado') {
        loading.dismiss();
        this.role = result['role'];
        this.service.ListByRol(result.token).subscribe(
          resp => {
            this.users = resp['users'];
            console.log(this.users);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        var user;
        this.storage.get('User').then(data => {
          this.form.nombre_del_ejecutor = data.firstname + ' ' + data.lastname;
          this.form.mantencion_dentro_mm50h = 0;
          this.service.ListChofer(data.token).subscribe(
            resp => {
              loading.dismiss();
              this.choferes = resp['choferes'];
            },
            error => {
              loading.dismiss();
              console.log(error);
            }
          );
        });
        this.role = 'Empleado';
      }
    });
  }

  calculate_mantencion() {
    this.form.mantencion_dentro_mm50h =
      this.form.horometro_programado - this.form.horometro_real;
  }

  next() {
    this.navCtrl.push(Step2formPage, {
      form: this.form
    });
  }

  check_(data: string) {
    this.exist = false;
    let index = this.form.aceites.indexOf(data);
    if (index >= 0) {
      this.form.aceites.splice(index, 1);
    } else {
      this.form.aceites.push(data);
    }
  }
  check_2(data: string) {
    this.exist = false;
    let index = this.form.filtros.indexOf(data);
    if (index >= 0) {
      this.form.filtros.splice(index, 1);
    } else {
      this.form.filtros.push(data);
    }
  }

  showInform(user_: any) {
    this.navCtrl.push(ListMasterPage, {
      user: user_
    });
  }

  deleteUser(user: any) {
    let loading = this.loadingCtrl.create({
      content: 'Eliminando...'
    });
    loading.present();
    this.storage.get('User').then(result => {
      this.service.DeleteUser(user, result.token).subscribe(
        resp => {
          loading.dismiss();
          this.GetUsers();
        },
        error => {
          loading.dismiss();
          console.log(error);
        }
      );
    });
  }

  AlertDelete(user_) {
    console.log(user_);
    let alert = this.alertCtrl.create({
      title: 'Alerta!!',
      message:
        '¿Seguro que desea eliminar a ' +
        user_.firstname +
        ' ' +
        user_.lastname +
        ' ?',
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
