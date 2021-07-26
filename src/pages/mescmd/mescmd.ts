import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,PopoverController,AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { FavorisPage } from '../favoris/favoris';
import { HomePage} from '../home/home';
import { CommandModalPage} from '../command-modal/command-modal';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { NoConnexionPage} from  '../no-connexion/no-connexion';




@IonicPage()
@Component({
  selector: 'page-mescmd',
  templateUrl: 'mescmd.html',
})
export class MescmdPage {
	
	panierSize:number=0;
	favorisSize:number=0;
	login:any;
	isLoading:boolean=true;
	arrayCommands= new Array();
	arrayFormatedCommands= new Array();
	total:number=0;
	nbProduits:number=0;
	isConnected:boolean=false;
	tab:any= "tab1";
	number:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
  public restProvider: RestProvider,public modalCtrl: ModalController,public popoverCtrl: PopoverController,public alertCtrl: AlertController) {
	  
	if(!navigator.onLine) { 
	  	this.navCtrl.push(NoConnexionPage);	
	}

	this.restProvider.setView1();
	this.storage.get('user').then((val) => {
				this.isConnected= (val == null)? false:true;
				if(this.isConnected){
					this.login= val.login;
				}
	});
	
	this.storage.get('panier').then((val) => {	
		if(val!= undefined ){
			this.panierSize=0;
			for(var i=0;i<val.length;i++){
				this.panierSize+= val[i].number;
			}
		}
	});	
	
	this.storage.get('favoris').then((val) => {	
		if(val!= undefined ){
			this.favorisSize= val.length;

		}
	});	
	
	this.storage.get('user').then((val) => {	
		this.login=val.login;
		this.restProvider.getCommande(this.login).subscribe(
		data => {
					if(data.statut=="200"){	
						this.isLoading=false;
						this.number = data.number;
						this.arrayCommands=data.data;
						this.arrayFormatedCommands=[];
						for (var i = 0; i < this.arrayCommands.length; i++) {
								this.arrayFormatedCommands.push({
								reference: this.arrayCommands[i].reference,
								dateCreation: this.arrayCommands[i].dateCreation,
								isPaided: this.arrayCommands[i].isPaided,
								isShipped: this.arrayCommands[i].isShipped,
								livraisonAdress: this.arrayCommands[i].livraisonAdress,
								livraison: this.arrayCommands[i].livraison,
								relais:this.arrayCommands[i].relaisAdress,
								products:this.arrayCommands[i].products
								});
						}
						this.storage.remove("commande");
						this.storage.set("commande",this.arrayFormatedCommands);	
					}
					else{
						
					}
				},
				err => {
					console.log(err);
				},
				() => console.log('Movie Search Complete')
	    ); 	
	});
	
	
  }
  
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MescmdPage');
  }
  
   getNumber(commande:any){
	  var n=0;
	  for(var i=0; i< commande.products.length; i++){
		  n+= commande.products[i].quantity ;
	  }
	  return n; 
  }
  
	getTotal(commande:any){
		  var t=0;
		  for(var i=0; i< commande.products.length; i++){
			  t+= commande.products[i].quantity * commande.products[i].price;
		  }
		  return t;
	}
  
	showAdressModal(commande){
		   let obj = {reference:commande.reference};
		   let myModal = this.modalCtrl.create(CommandModalPage,obj);
		    myModal.present();
			myModal.onDidDismiss((data) => {
			});
	 }
  
  	openPanier(){
		this.navCtrl.push(HomePage,{ page :"tab3" });  
	}
  
	openFavoris(){
		this.navCtrl.push(FavorisPage);  
	}
	
	goTorecheche(){
	this.navCtrl.push(RecherchePage);
    }
	
	disconnect(){  
	  let alert = this.alertCtrl.create();
      alert.setTitle('Confirmation de la deconnexion');
	  alert.setMessage("Voulez-vous vous deconnecter ?");
      alert.addButton('Non');
	
	  alert.addButton({
		text: 'Oui',
		handler: data => {
			this.storage.remove('user');
			this.storage.remove('favoris');
			this.storage.remove('panier');
			this.panierSize=0;
			this.favorisSize=0;
			this.isConnected=false;
			this.navCtrl.popToRoot();
			this.restProvider.setView1();
		}
	  });

     alert.present();  
  	}
  
  
	presentPopover(event){ 
		let data = {isConnected:true}
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
				this.restProvider.setView1();   
			  }
			  
			  else if(data=="4"){
				this.navCtrl.push(MescmdPage);    
			  }
	         
	      }
	    })
	}
 

}
