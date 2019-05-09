import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-inspections',
  templateUrl: 'inspections.html'
})
export class InspectionsPage {
  form: any = [];
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams
  ) {
    this.form = this.navParams.get('inform');
    const nombre = this.storage.get('User');
    console.log(nombre);
  }

  ionViewDidLoad() {
    console.log(this.form);
  }
}
