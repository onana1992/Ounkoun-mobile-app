import { Component} from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams,ModalController,AlertController,ActionSheetController,ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { FavorisPage } from '../favoris/favoris';
import { RecherchePage } from '../recherche/recherche';
import { PanierBwmPage } from '../panier-bwm/panier-bwm';
import { RatingModalPage } from '../rating-modal/rating-modal';
import { ProduitParVendeurPage } from '../produit-par-vendeur/produit-par-vendeur';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';
import { ProduitParMarquePage } from '../produit-par-marque/produit-par-marque';
import { NoConnexionPage } from  '../no-connexion/no-connexion';


@IonicPage()
@Component({
  selector: 'page-produit',
  templateUrl: 'produit.html',
})
export class ProduitPage { 
  tab:any = "tab1";
  isLoading = true;
  produitName:any;
  produit:any;
  name:any;
  selectedProduit:any;
  panierSize:number=0;
  arrayPanier= new Array();
  panierBWMSize:number=0;
  favorisSize:number=0;
  isConnected:boolean=false;
  baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
  arraySize=new Array();
  favoryArray= new Array();
  panierArray= new Array();
  panierBWMArray= new Array();
  localFavoryArray= new Array();
  otherModels= new Array();
  showMessageAjoutFavori:boolean=false;
  showMessageAjoutPanier:boolean=false;
  showMessageAjoutBWMPanier:boolean=false;
  favorisData={login:"",idProduct:""};
  panierData={login:"",idProduct:"",type:"detail",number:1};
  panierBWMData={login:"",idProduct:"",type:"BWM",number:1};
  login="";
  FB:any;
  shareUrl:string;
  message:string;
  message1:string;
  testCommand:string;
  i: number;
  j: number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private restProvider: RestProvider,
   public modalCtrl : ModalController,public alertCtrl: AlertController,private storage: Storage,public popoverCtrl: PopoverController,
   public actionSheetCtrl: ActionSheetController,public toastController: ToastController) {
	 
	
	
   

	if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	}

	this.produitName = navParams.get('ProduitName');
    this.shareUrl="https://www.ounkoun.com/produit.php?nom="+this.produitName;
    this.message = encodeURI("Je voudrais commander le "+ this.produitName);

	/*if(screen.width>=800){
           window.location.href = 'https://www.ounkoun.com/produit.php?nom='+this.produitName ;
    }*/

	this.restProvider.setView1();

	this.storage.get('user').then((val) => {
			this.isConnected= (val == undefined)? false:true;
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

	this.restProvider.getProduit(this.produitName).subscribe(
        data => {
			
			this.produit = data.data.product;
		
            for( var i=0;i< this.produit.quantity;i++){
				this.arraySize[i] = i+1;
				this.produit.number=1;
			}

			this.getOtherModel(this.produit.productName);
        },
        err => {
            console.log(err);
        },
        () => console.log('Complete')
	);

}

    getOtherModel(produitName){
    	if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	  	}
		this.restProvider.getModels(produitName).subscribe(
		    data => {

					//this.response = data.data;
					this.otherModels=[];		
					this.otherModels = data.data.product;
					this.isLoading = false;
					//this.isLoading = false;
		            for( var i=0;i< this.otherModels.length;i++){
						if( this.otherModels[i].name == this.produitName){
							this.otherModels.splice(i,1);
						}
					}
		    },
		    err => {
		        console.log(err);
		     },
		     () => console.log('Complete')
		);
    }

  	changeModel(newModelName){
        this.isLoading = true;
        this.produitName=newModelName;
        if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	  	}
  		this.restProvider.getProduit(newModelName).subscribe(
	        data => {
				//this.response = data.data;
				this.produit = data.data.product;
			
	            for( var i=0;i< this.produit.quantity;i++){
					this.arraySize[i] = i+1;
					this.produit.number=1;
				}

				this.getOtherModel(this.produit.productName);
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
	    );
    }
	
  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ProduitPage');
    }
  
  	objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
  	}

  	presentActionSheet(produitName,modelName) {
    this.isLoading = true;
    if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	}
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
  
  
  	addPanier(produit:any){ 
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
					if(this.panierArray[i].productId == produit.id && this.panierArray[i].type=="detail" ){
					 number= this.panierArray[i].number;
					 this.panierArray.splice(i,1);
					}	
				} 
		
				if(number+1<=produit.quantity){
					this.showMessageAjoutPanier=true;
					this.panierArray.push({productId:produit.id,name:produit.name, number: number + parseInt(produit.number), type:"detail", product:produit});
					this.storage.set("panier",this.panierArray);
					this.panierSize += parseInt(produit.number);
					
					setTimeout(() => {
							this.showMessageAjoutPanier=false;
					}, 2000);
					if(this.isConnected){
						this.panierData.login= this.login;
						this.panierData.idProduct= produit.id;
						this.panierData.number = produit.number;
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

  	}

  	addPanier1(produit:any){
  		var number=0;
  		this.storage.get('panier').then((val) => {
				if(val!=null){
					this.panierArray=val;	
				}
		
		 
				for(var i=0;i< this.panierArray.length;i++){
					if(this.panierArray[i].productId == produit.id && this.panierArray[i].type=="detail" ){
					 number= this.panierArray[i].number;
					 this.panierArray.splice(i,1);
					}	;
				} 
		
				if(number+1<=produit.quantity){
					this.showMessageAjoutPanier=true;
					this.panierArray.push({productId:produit.id,name:produit.name, number: number + parseInt(this.produit.number), type:"detail", product:produit});
					this.storage.set("panier",this.panierArray);
					this.panierSize += parseInt(this.produit.number);
					
					setTimeout(() => {
							this.showMessageAjoutPanier=false;
					}, 2000);
					if(this.isConnected){
						this.panierData.login= this.login;
						this.panierData.idProduct= produit.id;
						this.panierData.number = this.produit.number;
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
  
  
  
  
addFavorite(produit:any){
	if(this.isConnected){
		if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	  	}
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
				if(!navigator.onLine) { 
	  				this.navCtrl.push(NoConnexionPage);	
				}
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
  
  
  changeTab(tab){
	  if (tab === "tab1") {
		this.tab= "tab1"
	} 
	else if (tab === 'tab2') {
		this.tab="tab2";
	}
	
	else if (tab === "tab3") {
		this.tab="tab3";
	}
  }
  
   openPanier(){ 
	this.navCtrl.popToRoot();
	this.restProvider.setView3();
   }
   
  
  openPanierBWM(){
	this.navCtrl.push(PanierBwmPage);  
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
  
  goTorecheche(){
	this.navCtrl.push(RecherchePage);
  }


  openVendeur(vendeur){
	this.navCtrl.push(ProduitParVendeurPage, {seller:vendeur.nom});  
  }
 
  showRatingModal(){

	let myModal = this.modalCtrl.create(RatingModalPage,{produit: this.produitName });
	myModal.present();

	myModal.onDidDismiss((data) => {

		this.isLoading = true;

		this.restProvider.getProduit(this.produitName ).subscribe(
        	data => {
			this.produit = data.data.product;
			this.isLoading = false;
        },
        err => {
            console.log(err);
        },
        () => console.log('Complete')
	);
				
			});
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

  openMarque(nom){
	this.navCtrl.push(ProduitParMarquePage, { nomMarque:nom });  
  }
   

  shareTwitter(e) {
  	e.preventDefault();
  	var twitterWindow = window.open('https://twitter.com/share?url=' + this.shareUrl, 'twitter-popup', 'height=350,width=600');
  	if(twitterWindow.focus) { twitterWindow.focus(); }
    return false;
  }

  shareFacebook(e) {
	  e.preventDefault();
	  var facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u='+ this.shareUrl, 'facebook-popup', 'height=350,width=600');
	  if(facebookWindow.focus) { facebookWindow.focus(); }
	    return false;
  }

 
 shareLinkedIn(e) {
  var url =  document.URL
  var title = "titre";
  var text = document.URL;
  window.open('http://www.linkedin.com/shareArticle?mini=true&url='+this.shareUrl+'&title=partage', 'sharer', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
 }

 sendByWhatsApp(){
	window.open("https://api.whatsapp.com/send?phone=23799494380&text=*OUNKOUN* - Je sohaiterais acheter le "+this.produit.productName);
 }

}
