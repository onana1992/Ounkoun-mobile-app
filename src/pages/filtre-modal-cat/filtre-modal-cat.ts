import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SousCategoriePage } from '../sous-categorie/sous-categorie';
import { NoConnexionPage} from  '../no-connexion/no-connexion';


@IonicPage()
@Component({
  selector: 'page-filtre-modal-cat',
  templateUrl: 'filtre-modal-cat.html',
})
export class FiltreModalCatPage {
	
	tab:any= "tab1";
	filterType:string;
	categorie: string;
	categories: any;
	marques: any;
	sousCat:string
	marque:string;
	isLoading:boolean= false;
	filterOption= "filter-by-most-rescent";
	page=1;
	filterPrice: any = {'lower':0, 'upper':100};
	minPrice:any;
	maxPrice:any;
	myRange= {"lower": "0", "upper": "20"};

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private restProvider: RestProvider) {
	  
	  
	this.categorie = navParams.get('categorie'); 
	  this.isLoading= true;
	  if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	    }

	  this.restProvider.getCategorie(this.categorie).subscribe(
        data => {
			this.categories = data.data.category;
			this.sousCat = this.categories[0].name;
			this.marque = this.categories[0].name;
            console.log(data);
        },
        err => {
            console.log(err);
        },
        () => console.log('Complete')
	); 

	  
	  
	this.restProvider.getProduitPerCat(this.categorie,this.page,this.filterOption).subscribe(
        data => {
			this.marques = data.data.marque;
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
		 
		if (this.tab=="tab1"){
			this.navCtrl.push(SousCategoriePage, { nomSousCategorie : this.sousCat }); 
			this.viewCtrl.dismiss(); 
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
