import { Component } from '@angular/core';
import { IonicPage, NavController,PopoverController, NavParams,ModalController,AlertController} from 'ionic-angular';
import {FavorisPage} from '../favoris/favoris';
import {RecherchePage} from '../recherche/recherche';
import {HomePage} from '../home/home';
import {Storage} from '@ionic/storage';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';
import { RestProvider } from '../../providers/rest/rest';
import { AideLivraisonPage} from   '../aide-livraison/aide-livraison';
import { AidePaiementPage} from   '../aide-paiement/aide-paiement';
import { AideRetourPage} from   '../aide-retour/aide-retour';
import { AideCommandePage} from   '../aide-commande/aide-commande';
import { AideFraisPage} from   '../aide-frais/aide-frais'; 
import { AideConditionPage}  from  '../aide-condition/aide-condition';  


@IonicPage()
@Component({
  selector: 'page-aide',
  templateUrl: 'aide.html',
})
export class AidePage {

	view:String = "view1";
	tab:any= "tab1";
	categorieName:any;
	filterOption= "filter-by-popularity";
	filterMarque="null";
	filterMinPrice="null";
	filterMaxPrice= "null";
	filterLabel= "Popularité";
	page=1;
	response:any;
	produits:any;
	categorie:any;
	nbProduits:number;
	isLoading = true;
	isFilterActivated = false;
	favoryArray = new Array();
	panierArray = new Array();
	arrayPanier = new Array();
	localFavoryArray= new Array();
	isConnected:boolean=false;
	panierSize:number=0;
	favorisSize:number=0;
	

	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';

	  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController,public alertCtrl: AlertController,public popoverCtrl: PopoverController,
   					private storage: Storage,private restProvider: RestProvider,) {

	  	if(screen.width>=800){
           window.location.href = 'https://www.ounkoun.com';
        }
	  }

	  ionViewDidLoad() {
	    console.log('ionViewDidLoad AidePage');
	  }

	  ionViewDidEnter() {

			this.storage.get('panier').then((val) => {	
				if(val!= undefined ){
					this.arrayPanier=val;
					this.panierSize=0;
					for(var i=0;i<this.arrayPanier.length;i++){
							this.panierSize+=  parseInt(this.arrayPanier[i].number);
					}
				}
			});
	
	
		    this.storage.get('favoris').then((val) => {	
						if(val!= undefined ){
							this.favorisSize= val.length;
						}
					});
		}

  
	  openPanier(){ 
		this.navCtrl.popToRoot();
		this.restProvider.setView3();
  	 }
  
	  goTorecheche(){
		this.navCtrl.push(RecherchePage);
	  }

	  goToPaiement(){
		this.navCtrl.push(AidePaiementPage);
	  }

	  goToLivraison(){
		this.navCtrl.push(AideLivraisonPage);
	  }

	  goToRetour(){
		this.navCtrl.push(AideRetourPage);
	  }

	  goToCommande(){
		this.navCtrl.push(AideCommandePage);
	  }


	  goToFrais(){
		this.navCtrl.push(AideFraisPage);
	  }

	  goToCondition(){
		this.navCtrl.push(AideConditionPage);
	  }
	  
	  openFavoris(){
			  if(this.isConnected){
				this.navCtrl.push(FavorisPage);
			  }
			  else{
				this.navCtrl.push(HomePage,{ page :"tab2" });
				this.navCtrl.popToRoot();	
			  }  
		}

	disconnect(){  

		let alert = this.alertCtrl.create();
	    alert.setTitle('Confirmation de la deconnexion');
		alert.setMessage(" voulez-vous deconnecter");
	    alert.addButton('Non');
		
		alert.addButton({
			text: 'Oui',
			handler: data => {
				this.storage.remove('user');
				this.storage.remove('favoris');
				this.storage.remove('panier');
				this.panierSize=0;
				this.arrayPanier=[];
				this.favorisSize=0;
				this.isConnected=false;
				this.navCtrl.popToRoot();
				this.restProvider.setView1();
			}
		  });

	      alert.present();  
	    }


	   	presentPopover(event){ 
			let data = {isConnected:this.isConnected}
			let popover = this.popoverCtrl.create(PopoverPage,{data});
			popover.present({ ev: event }); 
			
			popover.onDidDismiss(data => {
		      if(data!=null){
				  
				  if(data=="1"){
				    this.disconnect();   
				  }
				  else if(data=="2"){
					this.tab="tab2" ;   
				  }
				  else if(data=="3"){
					this.navCtrl.popToRoot();
					this.restProvider.setView2();   
				  }
				  
				  else if(data=="4"){
					this.navCtrl.push(MescmdPage);    
				  }
		         
		      }
		    })
	    }


	    

}
