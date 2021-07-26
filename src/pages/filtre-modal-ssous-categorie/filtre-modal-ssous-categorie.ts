import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NoConnexionPage} from  '../no-connexion/no-connexion';


@IonicPage()
@Component({
  selector: 'page-filtre-modal-ssous-categorie',
  templateUrl: 'filtre-modal-ssous-categorie.html',
})
export class FiltreModalSsousCategoriePage {
	
	tab:any= "tab2";
	filterType:string;
	filterOption= "filter-by-most-rescent";
	filterMarque="null";
	filterMinPrice="null";
	filterMaxPrice= "null";
	ssousCat: string;
	categories: any;
	marques: any;
	sousCat:string
	marque:string;
	isLoading: boolean=false;
	page=1;
	filterPrice: any = {'lower':0, 'upper':100};
	minPrice:any;
	maxPrice:any;
	myRange= {"lower": "0", "upper": "20"};
	sousSCategorieName:any;

    constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private restProvider: RestProvider) {
	  
	  // var foo = { foo: true };
      // history.pushState(foo, "Anything", " "); // Put something to history for back button
	  this.sousSCategorieName= navParams.get('ssCat'); 
	  if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	  }
	  this.restProvider.getProduitPerSSousCat(this.sousSCategorieName,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
        data => {
                this.marques = data.data.marque;
				this.marque = this.marques[0].name;
				this.minPrice= data.data.plusPetitPrix;
				this.maxPrice= data.data.plusGrandPrix;
				this.filterPrice.lower = data.data.plusPetitPrix;
				this.filterPrice.upper = data.data.plusGrandPrix;
				this.myRange.lower = data.data.plusPetitPrix;
				this.myRange.upper = data.data.plusGrandPrix;
				this.isLoading=false;
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
