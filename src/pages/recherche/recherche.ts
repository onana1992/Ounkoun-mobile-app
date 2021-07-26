import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {ProduitPage} from '../produit/produit';
import { ResultatRecherchePage } from '../resultat-recherche/resultat-recherche';
import { FavorisPage } from '../favoris/favoris';
import {HomePage} from '../home/home';
import { NoConnexionPage } from  '../no-connexion/no-connexion';

@IonicPage()
@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html',
})
export class RecherchePage {
  
  textSearch:string;
  produits= new Array();
  searchCategories:number;
  size:number;
  @ViewChild('input') myInput ;
  baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
 
  constructor(public navCtrl: NavController, public navParams: NavParams,private restProvider: RestProvider,public actionSheetCtrl: ActionSheetController) {
	  
    
  }
  
 
  ionViewDidLoad() {
	  setTimeout(() => {
      this.myInput.setFocus();
    },600);
  }
  
  search(item:String){ 
	  if(!navigator.onLine) { 
          this.navCtrl.push(NoConnexionPage);  
    }
	  this.restProvider. getProduitbuytextSearch(item).subscribe(
        data => {
			this.produits = data.data.products;
			this.searchCategories= data.data.categories;
			this.size= data.data.size
            console.log(data);
        },
        err => {
            console.log(err);
        },
        () => console.log('Complete')
	  );
  }
  
  gotoProduct(productName){
	  this.navCtrl.push(ProduitPage, {ProduitName: productName});  
  }
  
  gotoResultat(searchText,categorieName){
	  this.navCtrl.push( ResultatRecherchePage, {SearchText: searchText,CategorieName:categorieName});  
  }
  
  openPanier(){
	    this.navCtrl.push(HomePage,{ page :"tab3" });  
  }
  
  openFavoris(){
	  this.navCtrl.push(FavorisPage);  
  }

}
