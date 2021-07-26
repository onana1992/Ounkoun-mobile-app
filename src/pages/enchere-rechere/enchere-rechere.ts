import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProduitEncherePage } from '../produit-enchere/produit-enchere';
import { RestProvider } from '../../providers/rest/rest';
import { NgForm } from "@angular/forms";
/**
 * Generated class for the EnchereRecherePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enchere-rechere',
  templateUrl: 'enchere-rechere.html',
})
export class EnchereRecherePage {

	numEnchere:string;
	produit:any;
	encheres= new Array();
	page:number=1;
	totalPage:number;
	isLoading1: boolean=false;
	text:string;
	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';

  constructor(public navCtrl: NavController, private restProvider: RestProvider) {
  }

  ionViewDidLoad() {
   	 console.log('ionViewDidLoad EnchereRecherePage');
  }
    
search(form: NgForm){
    if (form.valid){
	    this.isLoading1=true;
	    this.restProvider.getEnchere(this.numEnchere).subscribe(
	        	data => {
					this.produit = data.response;
						this.isLoading1=false;
	        	},
	        	err => { 
	            	console.log(err);
	     },
	        	() => console.log('Complete')
			);
	}
}

searchText(text,page){
    if(text.length!=0){

    	this.restProvider.getEncheresPerText(text,page).subscribe(
	        	data => {
					this.encheres = data.data;
					this.totalPage= Math.ceil(parseInt(data.taille)/5);
	        	},
	        	err => { 
	            	console.log(err);
	     },
	        	() => console.log('Complete')
		);

    }
}

doInfinite(infiniteScroll) {
	  this.page = this.page+1;
	  setTimeout(() => {
	  	this.restProvider.getEncheresPerText(this.text,this.page).subscribe(
			data => {
			    //this.produits = data.data;
			    console.log(data);
			    for(let i=0; i< data.data.length; i++) {
	             			this.encheres.push(data.data[i]);
	            }

			},
			        err => {
			            console.log(err);
			        },
			        () => console.log('Complete')
		);
	    console.log('Async operation has ended');
	    infiniteScroll.complete();
	  }, 1000);
}

gotoProduct(numEncher){
	this.navCtrl.push(ProduitEncherePage, {numEnchere: numEncher });  
}

gotoProduct1(numEncher , event: Event){
  	event.stopPropagation(); //THIS DOES THE MAGIC
	this.navCtrl.push(ProduitEncherePage, {numEnchere: numEncher });  
}


  	

}
