import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Content,PopoverController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import {ProduitPage} from '../produit/produit';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';
import { NoConnexionPage} from  '../no-connexion/no-connexion';



@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})
export class FavorisPage {
	
	isLoading:boolean=false;
	userLogin:string;
	favorites= new Array();
	localFavorites= new Array();
	baseUrl = 'http://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
	favorisVide:boolean=false;
	favorisData={login:"",idProduct:""};
	panierData={login:"",idProduct:"",type:"detail",number:1};
	login="";
	panierSize:number=0;
	favorisSize:number=0;
	showMessageAjoutPanier:boolean=false;
	isConnected:boolean=true;
	arrayPanier= new Array();
	panierArray= new Array();
	@ViewChild(Content) content: Content;
	tab:any= "tab1";
	
	

constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
	public restProvider: RestProvider,public alertCtrl: AlertController,public popoverCtrl: PopoverController) {
	    
	    if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	    }

	    this.isLoading=true;
		this.restProvider.setView1();
		this.storage.get('user').then((val) => {
			this.isConnected= (val == null)? false:true;
			if(this.isConnected){
				this.login= val.login;
			}
		});
		
		this.storage.get('user').then((val) => {
		this.userLogin= val.login;
		this.restProvider.getFavorite(this.userLogin).subscribe(
			data => {
				this.isLoading=false;
				if(data.statut=="200"){
					this.favorites=data.data.favorites;
					this.favorisVide=this.favorites.length==0?true:false;
					for(var i=0; i<this.favorites.length;i++){
						this.localFavorites.push({
							name:this.favorites[i].product.name,
							idPhoto:this.favorites[i].product.idImage,
							retailSale: this.favorites[i].product.retailSale})	
					}
					this.storage.set("favoris",this.localFavorites);
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
	
	
  }
  
  scrollToTop() {
	// Scrolls to the top, ie 0px to top.
	this.content.scrollToTop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavorisPage');
  }
  
  gotoProduct(productName){
	this.navCtrl.push(ProduitPage, {ProduitName: productName});  
  }
  
  goTorecheche(){
	this.navCtrl.push(RecherchePage);
  }
  
  objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
   }
   
  confirmDelete(produit:any, event: Event){ 
	event.stopPropagation(); //THIS DOES THE MAGIC
    let alert = this.alertCtrl.create();
    alert.setTitle('Suppression');
	alert.setMessage(" voulez-vous vraiment supprimer le produits ");
    alert.addButton('Annuler');
	this.favorisData.login= this.userLogin;
	this.favorisData.idProduct= produit.id;
    alert.addButton({
      text: 'Supprimer',
      handler: data => {
		this.isLoading=true;
		if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	    }
	    this.restProvider.deleteFavori(this.objecttoParams(this.favorisData)).subscribe(
			data => {
				if(data.statut=="200"){
					this.isLoading=false;
					this.storage.get('user').then((val) => {
						this.userLogin= val.login;
						this.restProvider.getFavorite(this.userLogin).subscribe(
							data => {
								this.isLoading=false;
								if(data.statut=="200"){
									this.favorites=[];
									this.localFavorites=[];
									this.favorites=data.data.favorites;
									this.favorisVide=this.favorites.length==0?true:false;
									for(var i=0; i<this.favorites.length;i++){
										this.localFavorites.push({
											name:this.favorites[i].product.name,
											idPhoto:this.favorites[i].product.idImage,
											retailSale: this.favorites[i].product.retailSale})	
									}
									this.favorisSize-=1;
									this.storage.set("favoris",this.localFavorites);
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
				else{
					
					
				}
			},
			err => {
						console.log(err);
					},
			() => console.log('Complete'))
	  }
	});

     alert.present();
  }
  
  
  addPanier(produit:any, event: Event){ 
  	

	event.stopPropagation(); //THIS DOES THE MAGIC
	var number=0;
	this.storage.get('panier').then((val) => {
		
		if(val!=null){
			this.panierArray=val;	
		}
		
		 
		for(var i=0;i< this.panierArray.length;i++){
			if(this.panierArray[i].productId == produit.id && this.panierArray[i].type=="detail" ){
			 number= this.panierArray[i].number;
			 this.panierArray.splice(i,1);
			}	
		} 
		
		if(number+1<=produit.quantity){
			
			this.panierArray.push({productId:produit.id,name:produit.name,number:number+1,type:"detail",product:produit});
			this.storage.set("panier",this.panierArray);
			this.panierSize+=1;
			this.showMessageAjoutPanier=true;
			setTimeout(() => {
					this.showMessageAjoutPanier=false;
			}, 2000);
			if(this.isConnected){
				this.panierData.login= this.login;
				this.panierData.idProduct= produit.id;
				if(!navigator.onLine) { 
	  				this.navCtrl.push(NoConnexionPage);	
	    		}
				this.restProvider.postPanier(this.objecttoParams(this.panierData)).subscribe(
						data => {
							
						},
						err => {
							console.log(err);
						},
				() => console.log('Complete'));
			}
		}
		else{
			
		} 
		
	});  
  }

  openPanier(){ 
	this.navCtrl.popToRoot();
	this.restProvider.setView3();
  }
  
  openFavoris(){
	this.navCtrl.push(FavorisPage);  
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
			this.restProvider.setView2();   
		  }
		  
		  else if(data=="4"){
			this.navCtrl.push(MescmdPage);    
		  }
         
      }
    })
  }
  
 

}
