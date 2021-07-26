import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,PopoverController,ToastController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { CommandePage } from '../commande/commande';
import {FavorisPage} from '../favoris/favoris';
import {RecherchePage} from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';
import { NoConnexionPage} from  '../no-connexion/no-connexion';



@IonicPage()
@Component({
  selector: 'page-panier',
  templateUrl: 'panier.html',
})
export class PanierPage {

	isLoadingDelete:boolean=false;
	isLoading:boolean=true;
	panierVide:boolean=false;
	arraySize=new Array();
	arrayPanier= new Array();
	panierSize:number=0;
	isLoadingUpdate:boolean=false;
	isLoadingConnection:boolean=false;
	user = {login:"",dateDeNaiss:"", plainPassword:"",password:"", loginIsEmail:true,id:"",type:"", pseudo:"", sexe:"",name:"",firstName:""
	,adresseLivraison:null};
	
	arrayFormatedPanier= new Array();
	login:any;
	loginFormSubmitted: boolean = false;
	isConnected:boolean=false;
	isLoginFailled:boolean=false;
	favoris=new Array();
	panierLocal=new Array();
	panierDb=new Array();
	panierDiff=new Array();
	produits= new Array();
	bestBoissons = new Array();
	bannieres = new Array();

    modifNumberData={login:"",idProduct:"",type:"detail",number:""};
	deletePanierData={login:"", idProduct:""};
	diffProductData={login:"",idProduct:"",type:"detail",number:0,};
	
	prixTotal:number=0;
	favorisSize:number=0;
	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
	i: number;
	j: number;
	testCommand:string;
	
   	constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,private restProvider: RestProvider,public alertCtrl: AlertController,
   		public popoverCtrl: PopoverController,public toastController: ToastController) {
	  
   		
   		
        if(!navigator.onLine) { 
	  				this.navCtrl.push(NoConnexionPage);	
	  	}


   		this.storage.get('panier').then((val) => {	
				if(val!= undefined ){
					this.arrayPanier=val;
					this.panierSize=0;
					for(this.i=0;this.i<this.arrayPanier.length;this.i++){
							this.panierSize+=  parseInt(this.arrayPanier[this.i].number);
					}
				}
		});


		this.storage.get('user').then((val) => {	
			this.isConnected= (val == undefined)? false:true;
			if(this.isConnected){
				this.isLoading=true;
				this.login= val.login;
				this.user.pseudo= val.pseudo;
				this.restProvider.getPanier(this.login).subscribe(
					data => {
						if(data.statut=="200"){	
							this.arrayPanier=data.data.products;
							this.panierVide=this.arrayPanier.length==0? true:false;
							this.arrayFormatedPanier=[];
							for (this.i = 0; this.i < this.arrayPanier.length; this.i++) {
									this.arrayFormatedPanier.push({
									productId: this.arrayPanier[this.i].product.id,
									name:this.arrayPanier[this.i].product.name,
									number: this.arrayPanier[this.i].number,
									type:this.arrayPanier[this.i].type
									});
								this.arraySize[this.i]= new Array();
								for( this.j=0;this.j<this.arrayPanier[this.i].product.quantity;this.j++){
								  this.arraySize[this.i][this.j]=this.j+1;
								}
							}
							this.storage.remove("panier");
							this.storage.set("panier",this.arrayFormatedPanier);
							this.prixTotal= this.totalPanier();
							this.panierSize=0;
							for(this.i=0;this.i<this.arrayPanier.length;this.i++){
								this.panierSize+= this.arrayPanier[this.i].number;
							}
							
							this.isLoading=false;
						}
						else{
							
						}

					},
					err => {
						console.log(err);
					},
					() => console.log('Movie Search Complete')
				);
				
				
				
				this.storage.get('favoris').then((val) => {	
					if(val!= undefined ){
						this.favorisSize= val.length;
					}
				});
			}
		
			else
			{
				this.storage.get('panier').then((val) => {	
					this.panierVide=true;
						if(val!= null ){

							this.arrayPanier=val;
							this.panierVide=this.arrayPanier.length==0? true:false;
							this.panierSize=0;
							this.prixTotal= this.totalPanier();
							for(this.i=0;this.i<this.arrayPanier.length;this.i++){

								this.panierSize+= this.arrayPanier[this.i].number;
								this.arraySize[this.i]= new Array();
								for( this.j=0;this.j<this.arrayPanier[this.i].product.quantity;this.j++){
											  this.arraySize[this.i][this.j]=this.j+1;
								}
							}
						}
							
							this.isLoading=false;
						});
			}
		});


   	}



   	objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad PanierPage');
  	}

  	totalPanier(){
		var total=0;
		for(this.i=0;this.i<this.arrayPanier.length;this.i++){
			if(this.arrayPanier[this.i].number <= this.arrayPanier[this.i].product.quantity){
				if(this.arrayPanier[this.i].product.retailSale.isInPromotion){
				total+= this.arrayPanier[this.i].number *  this.arrayPanier[this.i].product.retailSale.promotionalPrice;
				}
				else{
					total+= this.arrayPanier[this.i].number *  this.arrayPanier[this.i].product.retailSale.price;
				}
			} 
		} 
		return total;
  	}

  	changeNumber(number,produitId){
		this.modifNumberData.login=this.login;
		this.modifNumberData.idProduct=produitId;
		this.modifNumberData.number=number;
		this.prixTotal= this.totalPanier();
		if(this.isConnected){
			if(!navigator.onLine) { 
	  				this.navCtrl.push(NoConnexionPage);	
	  		}
			this.restProvider.modifyPanier(this.objecttoParams(this.modifNumberData)).subscribe(
				data => {
							
					this.restProvider.getPanier(this.login).subscribe(
						data => {
							if(data.statut=="200"){	
								this.isLoading=false;
								this.arrayPanier=data.data.products;
								this.panierVide=this.arrayPanier.length==0? true:false;
								this.arrayFormatedPanier=[];
								for (this.i = 0; this.i < this.arrayPanier.length; this.i++) {
										this.arrayFormatedPanier.push({
										productId: this.arrayPanier[this.i].product.id,
										name:this.arrayPanier[this.i].product.name,
										number: this.arrayPanier[this.i].number,
										type:this.arrayPanier[this.i].type
										});
									this.arraySize[this.i]= new Array();
									for( this.j=0;this.j<this.arrayPanier[this.i].product.quantity;this.j++){
									  this.arraySize[this.i][this.j]=this.j+1;
									}
								}
								this.storage.remove("panier");
								this.storage.set("panier",this.arrayFormatedPanier);
								this.prixTotal= this.totalPanier();
								this.panierSize=0;
								for(this.i=0;this.i<this.arrayPanier.length;this.i++){
									this.panierSize+= this.arrayPanier[this.i].number;
								}
								
							}
							else{
								
							}
						},
						err => {
							console.log(err);
						},
						() => console.log('Movie Search Complete')
					);		
				},
				err => {
							console.log(err);
						},
				() => console.log('Complete')
			);
		}
		else
		{
			this.isLoading=false;
			this.prixTotal= this.totalPanier();
			this.panierSize=0;
			for(this.i=0;this.i<this.arrayPanier.length;this.i++){
				this.arrayPanier[this.i].number= parseInt(this.arrayPanier[this.i].number);
			}
			for(this.i=0;this.i<this.arrayPanier.length;this.i++){
				this.panierSize+= parseInt(this.arrayPanier[this.i].number);
			}
			this.storage.remove("panier");
			this.storage.set("panier",this.arrayPanier);
			
		}
	}
	
	confirmDelete(produit:any, event: Event){ 
		let alert = this.alertCtrl.create();
		alert.setTitle('Suppression');
		alert.setMessage(" voulez-vous vraiment retirer le produits du panier ? ");
		alert.addButton('Annuler');
		this.deletePanierData.login= this.login;
		this.deletePanierData.idProduct= produit.id;
		alert.addButton({
			text: 'Supprimer',
			handler: data => {
				this.isLoadingDelete=true;
				//supression dans la memoire locale
				this.storage.get('panier').then((val) => {	
					
					this.panierLocal= val;
					for(this.i=0 ; this.i<this.panierLocal.length; this.i++){
						if(produit.id == this.panierLocal[this.i].productId && this.panierLocal[this.i].type=="detail"){
							this.panierLocal.splice(this.i,1);
						}
					}
					
					
					for(this.j=0 ; this.j<this.arrayPanier.length; this.j++){
						if(produit.id == this.arrayPanier[this.j].product.id){
							this.arrayPanier.splice(this.j,1);
						}
					}
					
					this.panierSize=0;
					for(this.i=0;this.i<this.arrayPanier.length;this.i++){
						this.panierSize+= this.arrayPanier[this.i].number;
					}
					
					this.prixTotal= this.totalPanier();
					this.storage.remove("panier");
					this.storage.set("panier",this.panierLocal);
					
					//supression dans la bd
					if(this.isConnected){
						if(!navigator.onLine) { 
	  						this.navCtrl.push(NoConnexionPage);	
	  					}
						this.restProvider.deletePanier(this.objecttoParams(this.deletePanierData)).subscribe(
							data => {
								if(data.statut=="200"){
									this.isLoadingDelete=false;
									this.panierVide=this.arrayPanier.length==0? true:false;
									this.restProvider.getPanier(this.login).subscribe(
										data => {
											if(data.statut=="200"){	
												this.isLoading=false;
												this.arrayPanier=data.data.products;
												this.panierVide=this.arrayPanier.length==0? true:false;
												this.arrayFormatedPanier=[];
												for (this.i = 0; this.i< this.arrayPanier.length; this.i++) {
														this.arrayFormatedPanier.push({
														productId: this.arrayPanier[this.i].product.id,
														name:this.arrayPanier[this.i].product.name,
														number: this.arrayPanier[this.i].number,
														type:this.arrayPanier[this.i].type
														});
													this.arraySize[this.i]= new Array();
													for( this.j=0;this.j<this.arrayPanier[this.i].product.quantity;this.j++){
													  this.arraySize[this.i][this.j]=this.j+1;
													}
												}
												this.storage.remove("panier");
												this.storage.set("panier",this.arrayFormatedPanier);
												this.prixTotal= this.totalPanier();
												this.panierSize=0;
												for(var k=0;k<this.arrayPanier.length;k++){
													this.panierSize+= this.arrayPanier[k].number;
												}
												
											}
											else{
											}
										},
										err => {
											console.log(err);
										},
										() => console.log('Movie Search Complete')
									);
								}
								else{
									this.isLoadingDelete=false;				
								}
							},
							err => {
										console.log(err);
									},
							() => console.log('Complete')
						);
					}
					else{
						this.isLoadingDelete=false;
						this.panierVide=this.arrayPanier.length==0? true:false;
					}
						
				});
			}
		});
		 alert.present(); 
    }

    openCommande(){
	 
	  if(this.isConnected){
		this.navCtrl.push(CommandePage); 
	  }
	  else{
	  	this.restProvider.setView2(); 
		this.navCtrl.popToRoot();
	       
	  }
    }

    goTorecheche(){
		this.navCtrl.push(RecherchePage);
    }

     openFavoris(){
	  if(this.isConnected){
		this.navCtrl.push(FavorisPage);
	  }
	  else{

	  	const toast =  this.toastController.create({
      		message: 'Veuillez vous connecter, pour avoir accès aux favoris',
      		showCloseButton: true,
      		position: 'bottom',
      		duration: 5000
    	});
    	toast.present();
		this.navCtrl.popToRoot();
	    this.restProvider.setView2();		
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
			//this.tab="tab2" ;
			this.navCtrl.popToRoot();
			this.restProvider.setView2();   
		  }
		  else if(data=="3"){
			this.navCtrl.push(InscriptionPage);    
		  }
		  
		  else if(data=="4"){
			this.navCtrl.push(MescmdPage);    
		  }
         
      }
    })
}


  	sendByWhatsApp(){

	  	let nameArticle;
	  	let prixArticle;
	  	let 
	  	numberArticle;
	  	this.testCommand="*OUNKOUN* - Je sohaiterais acheter le ";

		for(this.i=0;this.i<this.arrayPanier.length;this.i++){

	  		nameArticle= this.arrayPanier[this.i].product.name;
			numberArticle= this.arrayPanier[this.i].number;

			if(this.arrayPanier[this.i].product.retailSale.isInPromotion){
				prixArticle = this.arrayPanier[this.i].product.retailSale.promotionalPrice;
			}
			else{
					prixArticle=  this.arrayPanier[this.i].product.retailSale.price;
			}

			if( this.i !=this.arrayPanier.length-1){
				this.testCommand += nameArticle +"["+numberArticle+"] , le " ;
			}
			else{
				this.testCommand += nameArticle +"[" +numberArticle+ "]" ;
			}
		}
			
		window.open("https://api.whatsapp.com/send?phone=23799494380&text="+this.testCommand);
 	}

 
}
