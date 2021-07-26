import { Component} from '@angular/core';
import {NavController,IonicPage,NavParams,ModalController,Platform,PopoverController,AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { RestProvider} from '../../providers/rest/rest';
import {StorageProvider} from '../../providers/storage/storage';
import {SampleModalPage} from '../sample-modal/sample-modal';
import {RelaisModalPage} from '../relais-modal/relais-modal';
import {CommandSucceedPage} from '../command-succeed/command-succeed';
import {MescmdPage} from '../mescmd/mescmd';
import {PopoverPage} from '../popover/popover';
import {NoConnexionPage} from  '../no-connexion/no-connexion';
import {CommandSucceed2Page} from  '../command-succeed2/command-succeed2';


@IonicPage()
@Component({
  selector: 'page-commande',
  templateUrl: 'commande.html',
})
export class CommandePage {
	
	arrayPanier= new Array();
	produits= new Array();
	livraisonADomicile:boolean=false;
	login:any;
	prixTotal:number;
	nombreTotal:number;
	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
	isLoading:boolean=true;
	hasConfirmAdress:boolean =false;
	hasConfirmLivraisonMode:boolean =false;
	hasConfirmCommand:boolean =false;
	hasPaided:boolean =false;
	hasAddress:boolean=true;
	user:any;
	livraisonType:any="domicile";
	paiementType:any= "livraison";
	adresseLivraison:any;
	tab:any= "tab1";
	today = new Date();
	panierSize:number=0;
	favorisSize:number=0;
    creationDate = new Date().toISOString().slice(0,10);
	isConnected:boolean=false;
    livraison={ "type":1,
                "price":700,
                "delais":"2019-09-18",
    };

    reference:any;
    shippingTown: string[];
    maville: string;
    canHomeShipping:boolean=false;
    hasRelais:boolean=false;
    relais:any;
    mostHeavyProduct:any;
    montantLivraisonDomicile=0;
    montantLivraisonRelais=0;
    montantLivraison=0;
    delaiRelais:string;


    constructor(public navCtrl: NavController,public popoverCtrl: PopoverController,public navParams: NavParams, public restProvider: RestProvider,
    public storageProvider:StorageProvider, public plt: Platform, private storage: Storage,public alertCtrl: AlertController, public modalCtrl: ModalController) {
	   
	  if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	  }

      this.shippingTown=['Yaoundé'];

      this.maville =  this.shippingTown[0];
	  this.restProvider.setView1();
	  this.storage.get('user').then((val) => {
				this.isConnected= (val == null)? false:true;
				if(this.isConnected){
					this.login= val.login;
				}
	  });

	  this.today = new  Date(this.today.getFullYear()+"-"+this.pad(this.today.getMonth()+1)+"-"+this.pad(this.today.getDate()));
	  //add a day to the date
      this.today.setDate(this.today.getDate() + 2);
	 
	  var y = this.today.getFullYear();
      var m = this.today.getMonth() + 1 ; // january is month 0 in javascript
      var d = this.today.getDate();
      var livraisonDate = [y, this.pad(m), this.pad(d)].join("-");
	  this.livraison.delais= livraisonDate;

	  
	  this.restProvider.setView1();
	  this.storage.get('user').then((val) => {
		this.user=val;
		this.adresseLivraison= val.adresseLivraison;
		this.login=val.login;
		
		this.hasAddress= val.adresseLivraison==null? false:true;
		
		if(this.adresseLivraison!='null'){
			
		}
		
		this.restProvider.getPanier(this.login).subscribe(
				data => {
					if(data.statut=="200"){	
						this.arrayPanier=data.data.products;
						this.isLoading=false;
						this.prixTotal= this.totalPanier();
						this.nombreTotal= this.totalArticle();
						this.mostHeavyProduct = this.arrayPanier[0];
						for (var i = 1; i < this.arrayPanier.length; i++) {
								if (this.mostHeavyProduct.product.weight < this.arrayPanier[i].product.weight) {
									this.mostHeavyProduct= this.arrayPanier[i];
								}
						}
						this.fraisLivraison();
						this.montantLivraison = this.montantLivraisonDomicile;
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
    console.log(' ionViewDidLoad CommandePage');
	}

	
	pad (val) {
		var str = val.toString(); 
		return (str.length < 2) ? "0" + str : str;
	}
	
	 

	initCanHomeShipping(){
	 	for (var i=0 ; i < this.shippingTown.length; i++) {

	 			if (this.shippingTown[i] == this.adresseLivraison.town){
	 				this.canHomeShipping= true;
	 				this.livraisonType="domicile";
	 				this.montantLivraison = this.montantLivraisonDomicile;
	 				return true
	 			}
	 	}
	 		this.canHomeShipping= false; 
	 		this.livraisonType="relais";
	 		this.paiementType="mobile";
	 		return true;
	}


	showAdressModal(){
		 let myModal = this.modalCtrl.create(SampleModalPage);
		myModal.present();
		myModal.onDidDismiss((data) => {
			this.isLoading=true;
			this.storage.get('user').then((val) => {
				this.adresseLivraison= val.adresseLivraison;
				this.hasAddress= val.adresseLivraison==null? false:true;
				this.login=val.login;
				this.isLoading=false;
			});
		});
	}

	showRelaisModal(){
		let myModal = this.modalCtrl.create(RelaisModalPage);
		myModal.present();
		myModal.onDidDismiss((data) => {
			if(data!= undefined){
				this.relais= data.relais;
				this.hasRelais=true;
				this.montantLivraisonRelais = this.relais.montant ;	
				this.montantLivraison = this.montantLivraisonRelais;
				this.delaiRelais= data.delai.delai;
			}
		});
	}

	validateLivraisonMode(){

		if(this.livraisonType=="domicile"){
			this.livraison.type=1;
			this.montantLivraison=this.montantLivraisonDomicile;
			this.livraison.price= this.montantLivraisonDomicile;
			this.paiementType="livraison";	
		}else{
			this.livraison.type=2;
			this.livraison.price= this.montantLivraisonRelais;
			this.montantLivraison=this.montantLivraisonRelais;
			this.paiementType="mobile";
		}
	}

	totalPanier(){
		var total=0;
		for(var i=0;i<this.arrayPanier.length;i++){
			if(this.arrayPanier[i].number <= this.arrayPanier[i].product.quantity){
				if(this.arrayPanier[i].product.retailSale.isInPromotion){
					total+= this.arrayPanier[i].number *  this.arrayPanier[i].product.retailSale.promotionalPrice;
					this.produits.push({'name':this.arrayPanier[i].product.name,'quantity':this.arrayPanier[i].number,'price':this.arrayPanier[i].product.retailSale.promotionalPrice});
				}
				else{
					total+= this.arrayPanier[i].number *  this.arrayPanier[i].product.retailSale.price;
					this.produits.push({'name':this.arrayPanier[i].product.name,'quantity':this.arrayPanier[i].number,'price':this.arrayPanier[i].product.retailSale.price});

				}
			} 
		} 
		return total;
	}


	
	totalArticle(){
		var total=0;
		for(var i=0;i<this.arrayPanier.length;i++){
			if(this.arrayPanier[i].number <= this.arrayPanier[i].product.quantity){
				total++;
			} 
		} 
		return total;
	}
	
	 
	objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
	} 
	
	sendCommand(){

		this.isLoading=true;
		if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	    }
		var myobject = {login:this.login,commandDate: this.creationDate, adressL:JSON.stringify(this.adresseLivraison),
		livraison:JSON.stringify(this.livraison),products:JSON.stringify(this.produits),relais:JSON.stringify(this.relais)};
		
		this.restProvider.postCommand(this.objecttoParams(myobject)).subscribe(
				data => {
					if(data.statut=="200"){	
						//this.navCtrl.pop();
						//this.navCtrl.push(CommandSucceedPage);
						this.storage.remove('panier');
						this.isLoading=false;
						this.reference = data.data.reference;
						this.navCtrl.pop();
						this.navCtrl.push(CommandSucceedPage, { tel:this.adresseLivraison.tel1, montant:this.prixTotal +this.montantLivraison, reference:this.reference});
					}
				},
					err => {
						console.log(err);
					},
					() => console.log('Movie Search Complete')
	    ); 

	   // this.navCtrl.push(CommandSucceed2Page, { tel:this.adresseLivraison.tel1, montant:300, reference:"4574gh5"});
	   
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

   /* fraisLivraison(){
 
    	// calcul du montant de la livraison
    	if(this.mostHeavyProduct.product.weight ==1){

    		for(var i=0; i<this.mostHeavyProduct.number;i++){
    			if(i==0){
    				this.montantLivraisonDomicile = 1500;
    			}
    			else if(i<6){
    				this.montantLivraisonDomicile += 750;
    			}
    		}

    		

    		let tour:number= 0;
    		for (var i = 0; i < this.arrayPanier.length; i++) {
				if (this.mostHeavyProduct.product.name != this.arrayPanier[i].product.name && tour < 6) {
					this.montantLivraisonDomicile += Math.ceil(1500/2) * this.arrayPanier[i].number ;
				}
					tour++;
			}
    	}

    	else if(this.mostHeavyProduct.product.weight ==2){

    		for(var i=0; i<this.mostHeavyProduct.number;i++){
    			if(i==0){
    				this.montantLivraisonDomicile = 2000;
    			}
    			else if(i<6){
    				this.montantLivraisonDomicile += 1000;
    			}
    		}

    		let tour:number= 0;
    		for (var i = 0; i < this.arrayPanier.length; i++) {
				if (this.mostHeavyProduct.product.name != this.arrayPanier[i].product.name && tour < 6) {
					this.montantLivraisonDomicile += Math.ceil(2000/2) * this.arrayPanier[i].number ;
				}
					tour++;
			}
    	}

    	else if(this.mostHeavyProduct.product.weight ==3){

    		for(var i=0; i<this.mostHeavyProduct.number;i++){
    			if(i==0){
    				this.montantLivraisonDomicile = 2500;
    			}
    			else if(i<6){
    				this.montantLivraisonDomicile += 1250;
    			}
    		}

    		this.montantLivraisonDomicile = 2500 * this.mostHeavyProduct.number;
    		let tour:number= 0;
    		for (var i = 0; i < this.arrayPanier.length; i++) {
				if (this.mostHeavyProduct.product.name != this.arrayPanier[i].product.name && tour < 6) {
					this.montantLivraisonDomicile += Math.ceil(2500/2) * this.arrayPanier[i].number ;
				}
					tour++;
			}
    	}
    	
    }*/

    fraisLivraison(){

    	var  smallPrice=0;
    	var mediumPrice=0;
    	var bigPrice=0;
    	var smallQuantity=0;
    	var mediumQuantity=0;
    	var bigQuantity=0;
    	var total=0;


    	//price of small product
    	for (var i = 0; i < this.arrayPanier.length; i++) {	
    		if(this.arrayPanier[i].product.weight ==1 ){
				smallQuantity += this.arrayPanier[i].number ;	
    		}
	    }
	    smallPrice= 1500  * Math.ceil(smallQuantity * 1/5);

	    //price of medium product
    	for (var i = 0; i < this.arrayPanier.length; i++) {	
    		if(this.arrayPanier[i].product.weight ==2 ){
				mediumQuantity += this.arrayPanier[i].number ;	
    		}			
	    }
	    mediumPrice= 2000  * Math.ceil(mediumQuantity * 1/2);

	    //price of big product
    	for (var i = 0; i < this.arrayPanier.length; i++) {	
			if(this.arrayPanier[i].product.weight ==3 ){
					bigQuantity += this.arrayPanier[i].number;	
    		}		
	    }
	    bigPrice= 2500 * bigQuantity ;

	    if(smallQuantity!=0 && mediumQuantity==0 && bigQuantity==0 ){
	    	total= smallPrice;
	    }
	    else if (smallQuantity==0 && mediumQuantity!=0 && bigQuantity==0 ) {
	    	total=  mediumPrice;
	    }
	    else if (smallQuantity==0 && mediumQuantity==0 && bigQuantity!=0 ) {
	    	total=  bigPrice;
	    }
	    else if (smallQuantity!=0 && mediumQuantity!=0 && bigQuantity==0 ) {
	    	total= 1/2 * smallPrice + mediumPrice ;
	    }

	    else if (smallQuantity!=0 && mediumQuantity==0 && bigQuantity!=0 ) {
	    	total= 1/2 * smallPrice + bigPrice ;
	    }

	    else if (smallQuantity==0 && mediumQuantity!=0 && bigQuantity!=0 ) {
	    	total=  1/2 * mediumPrice + bigPrice ;
	    }

	    else if (smallQuantity!=0 && mediumQuantity!=0 && bigQuantity!=0 ) {
	    	total=  bigPrice + 1/2 * mediumPrice  + 1/4 * smallPrice ;
	    }

	    this.montantLivraisonDomicile = total;
    }
	
}
