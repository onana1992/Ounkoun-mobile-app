import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { NoConnexionPage } from  '../no-connexion/no-connexion';


/**
 * Generated class for the RelaisModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relais-modal',
  templateUrl: 'relais-modal.html',
})
export class RelaisModalPage {

	relais: Array <{ville: string, relais: Array <string>}> ;
	ville= {ville:"", delai:"", relais :[] };
	point:any;
	points: Array <string> ;  
	isDisabled: boolean=true;
	isLoading: boolean=true;
	isConnected:boolean=false;
	arrayPanier= new Array();
	login:any;
	mostHeavyProduct:any;
	montantLivraison:any;

  	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private storage: Storage, public restProvider: RestProvider) {
  	
  		this.relais=[];

  		this.storage.get('user').then((val) => {
				this.isConnected= (val == null)? false:true;
				if(this.isConnected){
					this.login= val.login;
					this.getRelais();
					this.getPanier();
				}
	    });
  	}
     

    getRelais(){
      if(!navigator.onLine) { 
          this.navCtrl.push(NoConnexionPage);  
      }

    	this.restProvider.getAllRelais().subscribe(
				data => {
					this.relais = data.data;
				},
				err => {
					console.log(err);
				},
				() => console.log('Complete')
		);
    } 

  	getPanier(){
        if(!navigator.onLine) { 
          this.navCtrl.push(NoConnexionPage);  
        }
  			this.restProvider.getPanier(this.login).subscribe(
				data => {
					if(data.statut=="200"){	
						this.arrayPanier=data.data.products;
						this.isLoading=false;
						this.mostHeavyProduct = this.arrayPanier[0];
						for (var i = 1; i < this.arrayPanier.length; i++) {
								if (this.mostHeavyProduct.product.weight < this.arrayPanier[i].product.weight) {
									this.mostHeavyProduct= this.arrayPanier[i];
								}
						}
					}

				},
					err => {
						console.log(err);
					},
					() => console.log('Movie Search Complete')
		  );      	
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad RelaisModalPage');
  	}

  	close() {
  	  this.point.montant = this.montantLivraison;
      this.viewCtrl.dismiss({'relais' : this.point,'delai': this.ville});
    }

    /*changeRelais(){
       
    	// calcul du montant de la livraison
    	if(this.mostHeavyProduct.product.weight ==1){

    		for(var i=0; i<this.mostHeavyProduct.number;i++){
    			if(i==0){
    				this.montantLivraison = this.point.prix_small;
    			}
    			else if(i<6){
    				this.montantLivraison += this.point.prix_small/2;
    			}
    		}


    		let tour:number= 0;
    		for (var i = 0; i < this.arrayPanier.length; i++) {
  				if (this.mostHeavyProduct.product.name != this.arrayPanier[i].product.name && tour < 6) {
  					this.montantLivraison += Math.ceil(this.point.prix_small/2) * this.arrayPanier[i].number;
  				}
  					tour++;
  			}
    	}

    	else if(this.mostHeavyProduct.product.weight ==2){

    		for(var i=0; i<this.mostHeavyProduct.number;i++){
    			if(i==0){
    				this.montantLivraison = this.point.prix_medium;
    			}
    			else if(i<6){
    				this.montantLivraison += this.point.prix_medium/2;
    			}
    		}
    		

    		let tour:number= 0;
    		for (var i = 0; i < this.arrayPanier.length; i++) {
  				if (this.mostHeavyProduct.product.name != this.arrayPanier[i].product.name && tour < 6) {
  					this.montantLivraison += Math.ceil(this.point.prix_medium/2) * this.arrayPanier[i].number;
  				}
  					tour++;
			  }
    	}

    	else if(this.mostHeavyProduct.product.weight ==3){

    		for(var i=0; i<this.mostHeavyProduct.number;i++){
    			if(i==0){
    				this.montantLivraison = this.point.prix_big;
    			}
    			else if(i<6){
    				this.montantLivraison += this.point.prix_big/2;
    			}
    		}

    		let tour:number= 0;
    		for (var i = 0; i < this.arrayPanier.length; i++) {
  				if (this.mostHeavyProduct.product.name != this.arrayPanier[i].product.name && tour < 6) {
  					this.montantLivraison += Math.ceil(this.point.prix_big/2) * this.arrayPanier[i].number;
  				}
					tour++;
			  }
    	}
    	
    }*/

    changeRelais(){

      var  smallPrice=0;
      var mediumPrice=0;
      var bigPrice=0;
      var smallQuantity=0;
      var mediumQuantity=0;
      var bigQuantity=0;
      var total=0;


      //price of small product
      for (var i = 0; i < this.arrayPanier.length; i++) {  
        if(this.arrayPanier[i].product.weight ==1 ){
        smallQuantity += this.arrayPanier[i].number ;  
        }
      }
      smallPrice= this.point.prix_small  * Math.ceil(smallQuantity * 1/5);

      //price of medium product
      for (var i = 0; i < this.arrayPanier.length; i++) {  
        if(this.arrayPanier[i].product.weight ==2 ){
        mediumQuantity += this.arrayPanier[i].number ;  
        }      
      }
      mediumPrice= this.point.prix_medium  * Math.ceil(mediumQuantity * 1/2);

      //price of big product
      for (var i = 0; i < this.arrayPanier.length; i++) {  
      if(this.arrayPanier[i].product.weight ==3 ){
          bigQuantity += this.arrayPanier[i].number;  
        }    
      }
      bigPrice= this.point.prix_big * bigQuantity ;

      if(smallQuantity!=0 && mediumQuantity==0 && bigQuantity==0 ){
        total= smallPrice;
      }
      else if (smallQuantity==0 && mediumQuantity!=0 && bigQuantity==0 ) {
        total=  mediumPrice;
      }
      else if (smallQuantity==0 && mediumQuantity==0 && bigQuantity!=0 ) {
        total=  bigPrice;
      }
      else if (smallQuantity!=0 && mediumQuantity!=0 && bigQuantity==0 ) {
        total= 1/2 * smallPrice + mediumPrice ;
      }

      else if (smallQuantity!=0 && mediumQuantity==0 && bigQuantity!=0 ) {
        total= 1/2 * smallPrice + bigPrice ;
      }

      else if (smallQuantity==0 && mediumQuantity!=0 && bigQuantity!=0 ) {
        total=  1/2 * mediumPrice + bigPrice ;
      }

      else if (smallQuantity!=0 && mediumQuantity!=0 && bigQuantity!=0 ) {
        total=  bigPrice + 1/2 * mediumPrice  + 1/4 * smallPrice ;
      }

      this.montantLivraison = total;
    }
}
