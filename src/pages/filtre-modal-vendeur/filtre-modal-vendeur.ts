import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SousCategoriePage } from '../sous-categorie/sous-categorie';
import { NoConnexionPage} from  '../no-connexion/no-connexion';

/**
 * Generated class for the FiltreModalVendeurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtre-modal-vendeur',
  templateUrl: 'filtre-modal-vendeur.html',
})
export class FiltreModalVendeurPage {

  tab:any= "tab2";
	filterType:string;
	categorie: string;
	categories: any;
	marques: any;
	sellerName:string
	marque:string;
	isLoading:boolean= false;
	filterOption= "filter-by-most-rescent";
	page=1;
	filterPrice: any = {'lower':0, 'upper':100};
	minPrice:any;
	maxPrice:any;
	myRange= {"lower": "0", "upper": "20"};

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private restProvider: RestProvider) {
	  
	  //var foo = { foo: true };
      //history.pushState(foo, "Anything", " "); // Put something to history for back button
	  this.sellerName = navParams.get('vendeur'); 
	  this.isLoading= true;
	  if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	  }

	  
	  
	  this.restProvider.getProduitPerSeller(this.sellerName,this.page,this.filterOption,"null","null","null").subscribe(
        data => {
			this.marques = data.data.marques;
			this.marque = this.marques[0].name;
			this.minPrice= data.data.plusPetitPrix;
			this.maxPrice= data.data.plusGrandPrix;
			this.filterPrice.lower = data.data.plusPetitPrix;
			this.filterPrice.upper = data.data.plusGrandPrix;
			this.myRange.lower = data.data.plusPetitPrix;
			this.myRange.upper = data.data.plusGrandPrix;
			this.isLoading = false;
        },
        err => {
            console.log(err);
        },
        () => console.log('Complete')
	 );
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltreModalCatPage');
  }
  
  
  
	 close() {
		this.viewCtrl.dismiss();
	 }
 

	dismiss() {
	    this.viewCtrl.dismiss();
	}
 
	launchFiltre(){

		if (this.tab=="tab2"){
			this.viewCtrl.dismiss({'filter':'marque', 'marque': this.marque}); 
		}
		 
		else if (this.tab=="tab3"){
			this.viewCtrl.dismiss({'filter':'prix', 'valeur': this.filterPrice}); 
	    }	 
    }
 
 
	changeTab(tab){
		  
	    if (tab === 'tab2'){
			this.tab="tab2";
		}
		
		else if (tab === "tab3") {
			this.tab="tab3";
		}
	}

}
