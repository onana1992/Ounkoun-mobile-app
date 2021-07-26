import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {Storage} from '@ionic/storage';
import { NgForm } from "@angular/forms";
import { NoConnexionPage } from  '../no-connexion/no-connexion';

/**
 * Generated class for the RatingModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rating-modal',
  templateUrl: 'rating-modal.html',
})
export class RatingModalPage {

  produitName: string;
  produit :	any;
  isLoading: boolean= true;
  baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
  rate : any = 1;
  user :any;
  avis={'value':""};


  constructor(public navCtrl: NavController, public navParams: NavParams,private restProvider: RestProvider,
      	public viewCtrl: ViewController,private storage: Storage) {

    if(!navigator.onLine) { 
          this.navCtrl.push(NoConnexionPage);  
    }
  	this.produitName = navParams.get('produit');
  	this.isLoading= true;
    if(!navigator.onLine) { 
          this.navCtrl.push(NoConnexionPage);  
    } 
  	this.restProvider.getProduit(this.produitName ).subscribe(
        data => {
			this.produit = data.data.product;
			this.isLoading = false;
  
        },
        err => {
            console.log(err);
        },
        () => console.log('Complete')
	);

	this.storage.get('user').then((val) => {

		this.user=val;
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingModalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

   onModelChange(event){
  	this.rate = event;
  }


  objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
  }


  submitNotation() {
	  this.isLoading=true;
  	var myobject = {'idModel':  this.produit.id,'note': this.rate};
    if(!navigator.onLine) { 
          this.navCtrl.push(NoConnexionPage);  
    }
  	this.restProvider.postNotation(this.objecttoParams(myobject)).subscribe(
  		data => {
  			this.isLoading=false;
      		this.viewCtrl.dismiss();
  	    },
  		err => {
  					console.log(err);
  					},
  						() => console.log('Complete')
  	);			
  }

submitComment(form: NgForm) {

	this.isLoading=true;
  	var myobject = {'idModel': this.produit.id,'login': this.user.login,
            'name':this.user.name, 'firstName':this.user.firstName, 'valeur':this.avis.value};
  if(!navigator.onLine) { 
          this.navCtrl.push(NoConnexionPage);  
  }
	this.restProvider.postAvis(this.objecttoParams(myobject)).subscribe(
		data => {
			this.isLoading=false;
    		this.viewCtrl.dismiss();

	    },
		err => {
					console.log(err);
					},
						() => console.log('Complete')
	);			
}



}
