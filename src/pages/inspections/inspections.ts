import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-inspections',
  templateUrl: 'inspections.html',
})
export class InspectionsPage {
form:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.form = this.navParams.get('inform');
    
  }

  ionViewDidLoad() {
    console.log(this.form);
    
  }

}
