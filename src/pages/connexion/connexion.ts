import { Component } from '@angular/core';
import { InscriptionPage } from '../inscription/inscription';
import { NavController,NavParams,IonicPage} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

   goTo(page) {
	
	 if (page === 'inscription') {
		this.navCtrl.push(InscriptionPage);
	}
	
  }

}
