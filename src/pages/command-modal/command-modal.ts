import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { NoConnexionPage} from  '../no-connexion/no-connexion'; 


@IonicPage()
@Component({
  selector: 'page-command-modal',
  templateUrl: 'command-modal.html',
})
export class CommandModalPage {
	
	
	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
	reference:any;
	commandeArray= new Array();
	maCommande:any={};
	isLoading:boolean=true;
	mareference:any;
    ref:any;
	mesProduits:any;
	maDate:any;
	adressLivraison:any;
	total:any;
	quantity:number;
	isPaided:boolean = false;
	isShipped:boolean= false;
	adress:any={name:"",firstName:"",tel1:"",tel2:"",region:"", town:"",adress:""};
	

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private storage: Storage) {
	
  	if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	}
	
	this.ref = "";
	this.reference = this.navParams.get('reference');
	this.storage.get('commande').then((val) => {	
			this.commandeArray= val;
			this.ref= this.commandeArray[0].reference;
			for(var i=0; i< this.commandeArray.length; i++){
				if(this.commandeArray[i].reference == this.reference){
					this.maCommande =  this.commandeArray[i];
					this.maDate = this.commandeArray[i].dateCreation.date;
					this.mareference = this.commandeArray[i].reference;
					this.isPaided= this.commandeArray[i].isPaided;
					this.isShipped= this.commandeArray[i].isShipped;
					this.adress.name= this.commandeArray[i].livraisonAdress.name;
					this.adress.firstName = this.commandeArray[i].livraisonAdress.firstName;
					this.adress.region = this.commandeArray[i].livraisonAdress.region;
					this.adress.town = this.commandeArray[i].livraisonAdress.town;
					this.adress.adress = this.commandeArray[i].livraisonAdress.adresse;
					this.adress.tel1 = this.commandeArray[i].livraisonAdress.tel1;
					this.adress.tel2 = this.commandeArray[i].livraisonAdress.tel2;
					this.mesProduits = this.commandeArray[i].products;
					this.isLoading=false;
				}
			}
			this.total=0;
			this.quantity=0;
			for( var j=0; j < this.maCommande.products.length; j++ ){
				this.total+= this.maCommande.products[j].quantity *this.maCommande.products[j].price;
				this.quantity+= this.maCommande.products[j].quantity;
	        }
	        this.isLoading=false;
	});	
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommandModalPage');
  }

}
