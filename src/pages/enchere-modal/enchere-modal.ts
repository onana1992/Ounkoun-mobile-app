import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the EnchereModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enchere-modal',
  templateUrl: 'enchere-modal.html',
})
export class EnchereModalPage {

  enchereNum: string;
  isLoading = true;
  produit:any;
  historique= new Array();
  enchereGagnant= { price:"",idUser:"","date":{} };

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private restProvider: RestProvider) {
  	this.enchereNum = navParams.get('numEnchere'); 
  	this.isLoading = true;
  		this.restProvider.getEnchere(this.enchereNum).subscribe(
        	data => {
				this.produit = data.response;
				this.historique = this.produit.historique;
				if(this.historique.length >0){
					this.enchereGagnant = this.historique[0];
					for (var i = 0; i < this.historique.length; ++i) {
						if(this.enchereGagnant.price < this.historique[i].price){
							 this.enchereGagnant = this.historique[i];
						}
					}	
				}
				
				this.isLoading= false;
        	},
        	err => { 
            	console.log(err);
        },
        	() => console.log('Complete')
		);
    }

	ionViewDidLoad() {
	    console.log('ionViewDidLoad EnchereModalPage');
	}

	close() {
		this.viewCtrl.dismiss();
	}
 

	dismiss(){
		this.viewCtrl.dismiss();
	}

}
