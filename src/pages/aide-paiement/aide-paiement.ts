import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AidePaiementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aide-paiement',
  templateUrl: 'aide-paiement.html',
})
export class AidePaiementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

	  	if(screen.width>=800){
	           window.location.href = 'https://www.ounkoun.com';
	    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AidePaiementPage');
  }

}
