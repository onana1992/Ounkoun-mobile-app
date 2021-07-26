import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';



@IonicPage()
@Component({
  selector: 'page-no-connexion',
  templateUrl: 'no-connexion.html',
})
export class NoConnexionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private restProvider: RestProvider) {

  		this.restProvider.setView0();
  }

  ionViewDidLoad() {
    
  }

  actualiser(){
  	if(navigator.onLine) { 
	  		this.navCtrl.popToRoot();
	}
  }

}
