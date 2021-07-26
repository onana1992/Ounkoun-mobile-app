import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,NavParams,PopoverController,ToastController,ActionSheetController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { ProduitPage } from '../produit/produit';
import { PanierPage } from '../panier/panier';
import { RecherchePage } from '../recherche/recherche';
import { FavorisPage } from '../favoris/favoris';
import { PopoverPage } from '../popover/popover';
import { InscriptionPage } from '../inscription/inscription';
import { MescmdPage } from '../mescmd/mescmd';
import { MesEncheresPage} from '../mes-encheres/mes-encheres';

/**
 * Generated class for the BestProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-best-products',
  templateUrl: 'best-products.html',
})
export class BestProductsPage {
	produits= new Array();
	isLoading:boolean=true;
	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
	response:any;
	categorie:any;
	nbProduits:number;
	isFilterActivated = false;
	favoryArray= new Array();
	panierArray= new Array();
	arrayPanier= new Array();
	localFavoryArray= new Array();
	showMessageAjoutFavori:boolean=false;
	showMessageAjoutPanier:boolean=false;
	favorisData={login:"",idProduct:""};
	panierData={login:"",idProduct:"",type:"detail",number:1};
	login="";
	panierSize:number=0;
	totalPage:number;
	favorisSize:number=0;
	isConnected:boolean=false;


	
	otherModels= new Array();

  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, private storage: Storage, public navParams: NavParams,public restProvider: RestProvider,public toastController: ToastController) {

  	

  	this.storage.get('user').then((val) => {
			this.isConnected= (val == null)? false:true;
			if(this.isConnected){
					this.login= val.login;
			}
	});

  	this.restProvider.getBestProduct().subscribe(
	        data => {
				this.produits = data.data;
				this.isLoading=false;
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
	);

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad BestProductsPage');
  }

   gotoProduct(productName){
	this.navCtrl.push(ProduitPage, {ProduitName: productName});  
  }

  objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
  }

  addFavorite(produit:any, event: Event){
	event.stopPropagation(); //THIS DOES THE MAGIC
	if(this.isConnected){
		 this.storage.get('favoris').then((val) => {
			if(val!=null){
				this.localFavoryArray= val;
				for(var i=0; i< val.length;i++){
					if(produit.name == val[i].name){
						return;
					}
				}
				this.localFavoryArray.push({name:produit.name});
				this.storage.set("favoris",this.localFavoryArray);
				this.showMessageAjoutFavori=true;
				this.favorisSize +=1;
				setTimeout(() => {
					this.showMessageAjoutFavori=false;
				}, 2000);
				this.favorisData.login= this.login;
				this.favorisData.idProduct= produit.id;
				this.restProvider.postFavori(this.objecttoParams(this.favorisData)).subscribe(
					data => {
					},
					err => {
						console.log(err);
					},
				() => console.log('Complete'));
			
			}else{
				this.localFavoryArray.push({name:produit});
				this.storage.set("favoris",this.localFavoryArray);
				this.favorisSize+=1;
			}
				
		});
	}
	else{
		const toast =  this.toastController.create({
      		message: 'Veuillez vous connecter, pour pouvoir ajouter dans vos favoris',
      		showCloseButton: true,
      		position: 'bottom',
      		duration: 5000
    	});
    	toast.present();
		this.navCtrl.popToRoot();
	    this.restProvider.setView2();
	}
	
  }

  presentActionSheet(produitName,modelName) {
    this.isLoading = true;
  	this.restProvider.getModels(produitName).subscribe(
		    data => {

					//this.response = data.data;
				this.otherModels=[];		
				this.otherModels = data.data.product;
				this.isLoading = false;
					//this.isLoading = false;
		        for( var i=0;i< this.otherModels.length;i++){
					if( this.otherModels[i].name == modelName){
							this.otherModels.splice(i,1);
					}
				}

				let buttons = [];
    			for (let i=0;i< this.otherModels.length;i++) {
	      			let button = {
		        		text: this.otherModels[i].taille,
				        handler: () => {
				         this.addPanier1(this.otherModels[i])
				        }
	      			}

      				buttons.push(button);
            	}
    

				const actionSheet = this.actionSheetCtrl.create({
      				title: 'Choisir la Taille du produit',
      				buttons: buttons
    			});

    		   actionSheet.present();
		    },
		    err => {
		        console.log(err);
		     },
		     () => console.log('Complete')
	);
  }
  

  addPanier(produit:any, event: Event){ 
		event.stopPropagation(); //THIS DOES THE MAGIC
		var number=0;

		if(produit.isVirtual){
			this.presentActionSheet(produit.productName, produit.name);
		}
		else{

          
			this.storage.get('panier').then((val) => {
			
			if(val!=null){
				this.panierArray=val;	
			}
			
			 
			for(var i=0;i< this.panierArray.length;i++){
				if(this.panierArray[i].productId == produit.id){
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
  	}

  	addPanier1(produit){

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
	//this.navCtrl.popToRoot();
	//this.restProvider.setView3();
	this.navCtrl.push(PanierPage);
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


    disconnect() {  
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
  

}
