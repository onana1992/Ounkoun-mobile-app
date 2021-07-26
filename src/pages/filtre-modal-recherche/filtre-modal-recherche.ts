import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {ProduitPage} from '../produit/produit';
import { NoConnexionPage} from  '../no-connexion/no-connexion';


@IonicPage()
@Component({
  selector: 'page-filtre-modal-recherche',
  templateUrl: 'filtre-modal-recherche.html',
})
export class FiltreModalRecherchePage {

    tab:any= "tab1";
	filterType:string;
	categorie: string;
	textSearch: string;
	filterMarque="null";
	filterMinPrice="null";
	filterMaxPrice= "null";
	categories: any;
	marques= new Array();
	allMarques=new Array();
	cat:string
	marque:string;
	isLoading:boolean= false;
	filterOption= "filter-by-most-rescent";
	page=1;
	filterPrice: any = {'lower':0, 'upper':100};
	minPrice:any;
	maxPrice:any;
	myRange= {"lower": "0", "upper": "20"};
	
	

    constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private restProvider: RestProvider) {
	  
	 // var foo = { foo: true };
      //history.pushState(foo, "Anything", " "); // Put something to history for back button
      this.isLoading= true;
	  this.categorie = navParams.get('categorieName'); 
	  this.textSearch = navParams.get('textSearch');
	  if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	  }
	  
	  this.restProvider.getResultatRecherche(this.textSearch,this.categorie,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
        data => {

			
			this.allMarques = data.data.marques;
			this.marques[0]=data.data.marques[0].name;
			for(var i=0; i<this.allMarques.length; i++){
				if(this.marques.indexOf(this.allMarques[i].name)==-1 ){
					this.marques.push(this.allMarques[i].name);
				}
			}

			this.marque = this.marques[0];
			this.categories = data.data.categories;
			this.cat = this.categories[0].name;
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
 

	dismiss(){
		this.viewCtrl.dismiss();
	}
 
	launchFiltre(){

	
		if (this.tab=="tab1"){
			this.viewCtrl.dismiss({'filter':'categorie', 'categorie':this.cat}); 
		}
		 
		else if (this.tab=="tab2"){
			this.viewCtrl.dismiss({'filter':'marque', 'marque': this.marque}); 

		}
		 
		else if (this.tab=="tab3"){
			this.viewCtrl.dismiss({'filter':'prix', 'valeur': this.filterPrice}); 
		}
	}
 
 
	changeTab(tab){
		  
		if (tab === "tab1") {
				this.tab="tab1";
		} 
		
		else if (tab === 'tab2'){
			this.tab="tab2";
		}
		
		else if (tab === "tab3") {
			this.tab="tab3";
		}
	}
 
}

