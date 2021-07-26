import { Component,} from '@angular/core';
import { NavController,PopoverController,AlertController,NavParams,ModalController,Content,ToastController} from 'ionic-angular';
import { ViewChild} from '@angular/core';
import { Slides } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { FavorisPage } from '../favoris/favoris';
import { PanierPage } from '../panier/panier';
import { RecherchePage } from '../recherche/recherche';
import { ConnexionPage } from '../connexion/connexion';
import { InscriptionPage } from '../inscription/inscription';
import { PopoverPage } from '../popover/popover';
import { CategoriePage  } from '../categorie/categorie';
import { ProduitPage  } from '../produit/produit';
import { ProfilPage } from '../profil/profil';
import { StorageProvider } from '../../providers/storage/storage';
import { PasswordPage } from '../password/password';
import { AdressePage } from '../adresse/adresse';
import { ProduitParMarquePage } from '../produit-par-marque/produit-par-marque';
import { CommandePage } from '../commande/commande';
import { RestProvider } from '../../providers/rest/rest';
import { MescmdPage } from '../mescmd/mescmd';
import { PasswordRecoverPage } from '../password-recover/password-recover';
import { AboutPage } from '../about/about';
import { AidePage } from '../aide/aide';
import { ContactPage } from '../contact/contact';
import { NoConnexionPage } from  '../no-connexion/no-connexion';
import { MesEncheresPage} from '../mes-encheres/mes-encheres';
import { EncheresPage } from  '../encheres/encheres';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	@ViewChild(Slides) slides: Slides;
	mySlideOptions = {
		pager:true
	};
	

	tab:any= "tab1";
	isLoading:boolean=false;
	isLoadingMarques:boolean=true;
	isLoadingCategories:boolean=true;
	isLoadingProduits:boolean=true;
	isLoadingBannieres:boolean=true;
	isLoadingDelete:boolean=false;
	isLoadingUpdate:boolean=false;
	isLoadingConnection:boolean=false;
	user = {login:"",dateDeNaiss:"", plainPassword:"",password:"", loginIsEmail:true,id:"",type:"", pseudo:"", sexe:"",name:"",firstName:""
	,adresseLivraison:null};
	arrayPanier= new Array();
	arrayFormatedPanier= new Array();
	login:any;
	loginFormSubmitted: boolean = false;
	isConnected:boolean=false;
	isLoginFailled:boolean=false;
	favoris=new Array();
	arraySize=new Array();
	panierLocal=new Array();
	panierDb=new Array();
	panierDiff=new Array();
	produits= new Array();
	bestBoissons = new Array();
	bestTelephones = new Array();
	bestbeautes = new Array();
	bestTvs = new Array();
	bestBb = new Array();
	bestMode = new Array();
	bannieres = new Array();
    modifNumberData={login:"",idProduct:"",type:"detail",number:""};
	deletePanierData={login:"", idProduct:""};
	diffProductData={login:"",idProduct:"",type:"detail",number:0,};
	panierVide:boolean=false;
	prixTotal:number=0;
	panierSize:number=0;
	favorisSize:number=0;
	prix:number=0;
	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
	parmPage:string;
	marques= new Array();
	informatiques = new Array();
	i: number;
	j: number;
	connected:boolean;
	cotation:string;
	testCommand:string;

	

  constructor(public navCtrl: NavController,public popoverCtrl: PopoverController,public navParams: NavParams, public restProvider: RestProvider,
  public storageProvider:StorageProvider,private storage: Storage,
  public alertCtrl: AlertController, public modalCtrl: ModalController,public toastController: ToastController) {
	  

	  	if(navigator.onLine) { 
	  		this.init();
		}
		else{
			this.navCtrl.push(NoConnexionPage);
		}

		this.restProvider.getCotation("2000","1").subscribe(
	        data => {
				this.cotation = data;
				//alert(this.cotation);	
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);

			
    }

    openEnchere(){
    	this.navCtrl.push(EncheresPage );
    }
  

    init(){

    	this.restProvider.getBestMarque("ppp").subscribe(
				data => {
					this.marques = data.data;
					this.isLoadingMarques= false;
				},
				err => {
					console.log(err);
				},
				() => console.log('Complete')
		); 

		this.restProvider.getBannieres().subscribe(
				data => {
					this.bannieres = data.data;
					this.isLoadingBannieres= false;
				},
				err => {
					console.log(err);
				},
				() => console.log('Complete')
		); 
	
		this.storage.get('panier').then((val) => {	
				if(val!= undefined ){
					this.arrayPanier=val;
					this.panierSize=0;
					for(this.i=0;this.i<this.arrayPanier.length;this.i++){
							this.panierSize+=  parseInt(this.arrayPanier[this.i].number);
					}
				}
		});

		

		// get the best of boissons
		this.restProvider.getBestProduitPerCat("Boissons").subscribe(
	        data => {
				this.bestBoissons = data.data;
				
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);  

		this.restProvider.getBestProduitPerCat("Telephonie et accessoires").subscribe(
	        data => {
				this.bestTelephones = data.data;
				
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);

		this.restProvider.getBestProduitPerCat("Tv, audio et photo").subscribe(
	        data => {
				this.bestTvs = data.data;
				
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);

		this.restProvider.getBestProduitPerCat("Beauté et santé").subscribe(
	        data => {
				this.bestbeautes = data.data;
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);

		this.restProvider.getBestProduitPerCat("Informatique").subscribe(
	        data => {
				this.informatiques = data.data;
				
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);

		this.restProvider.getBestProduct().subscribe(
	        data => {
				this.produits = data.data;
				this.isLoadingProduits=false;
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);
	  
	
		this.restProvider.getBestMarque("ppp").subscribe(
				data => {
					this.marques = data.data;
					this.isLoadingMarques= false;
				},
				err => {
					console.log(err);
				},
				() => console.log('Complete')
		); 

		this.restProvider.getBannieres().subscribe(
				data => {
					this.bannieres = data.data;
					this.isLoadingBannieres= false;
				},
				err => {
					console.log(err);
				},
				() => console.log('Complete')
		); 
	
		this.storage.get('panier').then((val) => {	
				if(val!= undefined ){
					this.arrayPanier=val;
					this.panierSize=0;
					for(this.i=0;this.i<this.arrayPanier.length;this.i++){
							this.panierSize+=  parseInt(this.arrayPanier[this.i].number);
					}
				}
		});

		

		// get the best of boissons
		this.restProvider.getBestProduitPerCat("Boissons").subscribe(
	        data => {
				this.bestBoissons = data.data;
				
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);   

		this.restProvider.getBestProduitPerCat("Telephonie et accessoires").subscribe(
	        data => {
				this.bestTelephones = data.data;
				
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);

		this.restProvider.getBestProduitPerCat("Tv, audio et photo").subscribe(
	        data => {
				this.bestTvs = data.data;
				
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);

		this.restProvider.getBestProduitPerCat("Informatique").subscribe(
	        data => {
				this.informatiques = data.data;
				
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);

		this.restProvider.getBestProduitPerCat("Bébés, enfants et jouets").subscribe(
	        data => {
				this.bestBb = data.data;
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);

		this.restProvider.getBestProduitPerCat("Mode").subscribe(
	        data => {
				this.bestMode = data.data;	
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);



		this.restProvider.getBestProduct().subscribe(
	        data => {
				this.produits = data.data;
				this.isLoadingProduits=false;
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);
	  
	
		this.storage.get('user').then((val) => {	
			this.isConnected= (val == undefined)? false:true;
			if(this.isConnected){
				this.login= val.login;
				this.user.pseudo= val.pseudo;
				this.parmPage = this.navParams.get('page');
				
				if(this.parmPage!=undefined){			
					this.tab=this.parmPage; 
					this.isLoading=true;
					this.getPanier();
				}
				
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
				
				
				
				this.storage.get('favoris').then((val) => {	
					if(val!= undefined ){
						this.favorisSize= val.length;
					}
				});
				
				 
				
			}
			else
			{
				this.storage.get('panier').then((val) => {	
					if(val!= undefined ){
						this.arrayPanier=val;
						this.panierSize=0;
						for(this.i=0;this.i<this.arrayPanier.length;this.i++){
								this.panierSize+= this.arrayPanier[this.i].number;
						}
					}
				});

				this.storage.get('favoris').then((val) => {	
					if(val!= undefined ){
						this.favorisSize= val.length;
					}
				});	
				
				this.parmPage = this.navParams.get('page');
				if(this.parmPage!=undefined){
						this.tab=this.parmPage;  
				}
			}
		});

    }

	ionViewDidEnter() { 

           
		this.isLoading=true;
		this.arrayPanier=[];
		this.parmPage = this.navParams.get('page');
		if(this.restProvider.view == "reload" ){
			this.isLoadingMarques=true;
			this.isLoadingCategories=true;
			this.isLoadingProduits=true;
			this.isLoadingBannieres=true;
			this.init();
		}

		else if(this.restProvider.view == "tab1" ){
			this.tab="tab1";
			this.isLoading=false;
			this.storage.get('user').then((val) => {	
				this.isConnected = (val == undefined)? false:true;
			    if(this.isConnected){
			    	this.user= val;
					this.login=val.login;
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
							
								
						},
							err => {
								console.log(err);
							},
							() => console.log('Movie Search Complete')
					);
				}
				else{

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
		else if(this.restProvider.view == "tab3"  )
		{
			this.storage.get('user').then((val) => {	
				this.isConnected = (val == undefined)? false:true;
			    if(this.isConnected){

					this.login=val.login;
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
								this.tab = "tab3";
								this.isLoading=false;
							}
							
								
						},
							err => {
								console.log(err);
							},
							() => console.log('Movie Search Complete')
					);
				}
				else{

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
							this.tab = "tab3";
							this.isLoading=false;
						});						
		        } 
			});
		}
		else{
			this.tab = "tab2";
		}
		
		this.storage.get('panier').then((val) => {	
			this.panierSize=0;
			if(val!= undefined ){
				this.arrayPanier=val;
				this.panierSize=0;
				for(this.i=0;this.i<this.arrayPanier.length;this.i++){
						this.panierSize+=  parseInt(this.arrayPanier[this.i].number);
				}
			}
		});

		
		this.storage.get('favoris').then((val) => {	
				if(val!= undefined ){
					this.favorisSize= val.length;
				}
	    });
	}
	

	


  changeTab(tab){
	  
	if (tab === "tab1") {
		this.tab= "tab1"
	} 
	
	else if (tab === 'tab2'){
		this.tab="tab2";
	}
	
	else if (tab === "tab3"){
		this.tab="tab3";
		this.isLoading=true;
		this.panierVide= false;
		if(this.isConnected){
			if(!navigator.onLine) { 
	  			this.navCtrl.push(NoConnexionPage);	
			}
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
					

				},
					err => {
						console.log(err);
					},
					() => console.log('Movie Search Complete')
			);
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
			});	
			this.isLoading=false;
		}
	}
	
	
	
  }
  
  getPanier(){
	if(this.isConnected){
			if(!navigator.onLine) { 
	  			this.navCtrl.push(NoConnexionPage);	
			}
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
					

				},
					err => {
						console.log(err);
					},
					() => console.log('Movie Search Complete')
			);
		}
		else
		{
			this.isLoading= false;
			this.isLoadingDelete= false;
			this.panierVide=false;
			this.storage.get('panier').then((val) => {	
				if(val!= undefined ){
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
			});		
		}
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
			this.navCtrl.push(InscriptionPage);    
		  }
		  
		  else if(data=="4"){
			this.navCtrl.push(MescmdPage);    
		  }

		  else if(data=="5"){
			this.navCtrl.push(MesEncheresPage);    
		  }
         
      }
    })
  } 
  
  
  
  search:string;
  //slides:any[];
  
  
  openMarque(nom){
	this.navCtrl.push(ProduitParMarquePage, { nomMarque:nom });  
  }

  openCategorie(cat){
	this.navCtrl.push(CategoriePage, {nomCategorie :cat });  
  }
  
   openCommande(){
	 
	if(this.isConnected){
		this.navCtrl.push(CommandePage); 
	  }
	  else{
		this.tab = "tab2" ;    
	  }
  }

   gotoProduct(productName){
	this.navCtrl.push(ProduitPage, {ProduitName: productName});  
   }
  
  goTo(page) {
	if (page === 'favoris') {
		if(this.isConnected){
			this.navCtrl.push(FavorisPage);
		}
		else{

			const toast =  this.toastController.create({
      		message: 'Veuillez vous connecter, pour pouvoir ajouter dans vos favoris',
      		showCloseButton: true,
      		position: 'bottom',
      		duration: 5000
    		});
    		toast.present();
			this.tab="tab2";
		}
	} 
	else if (page === 'panier') {
		this.navCtrl.push(PanierPage);
	}
	
	else if (page === 'recherche') {
		this.navCtrl.push(RecherchePage);
	}
	
	else if (page === 'connexion') {
		this.navCtrl.push(ConnexionPage);
	}
	
	else if (page === 'categorie') {
		this.navCtrl.push(CategoriePage);
	}
	
	else if (page === 'produit') {
		this.navCtrl.push(ProduitPage);
	}
	
	if (page === 'inscription') {
		this.navCtrl.push(InscriptionPage);
	}
	
	if (page === 'profil') {
		this.navCtrl.push(ProfilPage);
	}
	
	if (page === 'password') {
		this.navCtrl.push(PasswordPage);
	}
	
	if (page === 'adresse') {
		this.navCtrl.push(AdressePage);
	}
	
	if (page === 'commande') {
		this.navCtrl.push(MescmdPage);
	}
	
	if (page === 'recover') {
		this.navCtrl.push(PasswordRecoverPage);
	}
	
	if (page === 'aide') {
		this.navCtrl.push(AidePage);
	}
	
	if (page === 'contact') {
		this.navCtrl.push(ContactPage);
	}
	
	if (page === 'about') {
		this.navCtrl.push(AboutPage);
	}
	
	if (page === 'mesEncheres') {
		this.navCtrl.push(MesEncheresPage);
	}
	
	
	
}

	back() {
		if (this.navCtrl.length() >= 2) {
		this.navCtrl.pop();
		}
	}
	
	objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
	}
	
	submitForm(form: NgForm) {
		this.loginFormSubmitted = true;
		
		if (form.valid) {
			this.isLoadingConnection=true;
			
			this.restProvider.connecter(this.user.login,this.user.password).subscribe(
				data => {
					this.isLoginFailled=false;
					this.isLoadingConnection=false;
					if(data.statut=="200"){
						this.user.type="standart";
						this.user.login= data.response.login;
						this.user.name= data.response.name;
						this.user.firstName= data.response.firstName;
						this.user.id=data.response.id;
						this.user.dateDeNaiss=data.response.dateDeNaiss.date;
						this.user.sexe= data.response.sex;
						this.user.pseudo= data.response.pseudo;
						if(data.response.livraisonAddress!="null"){
							this.user.adresseLivraison=data.response.livraisonAddress;
						}
						
						for(this.i=0;this.i<data.response.favorites.length;this.i++){
							this.favoris.push({name:data.response.favorites[this.i].product.name});
						}
						
						this.storage.set("user",this.user);
						this.storage.set("favoris",this.favoris);
						this.isConnected=true;
						this.login= this.user.login;
						
						// gestion du panier
						this.arrayPanier= data.response.panier;
						this.panierSize=0;
						for(this.i=0;this.i<this.arrayPanier.length;this.i++){
							this.panierSize+= this.arrayPanier[this.i].number;
						}
						
						this.panierDb=[];
						for(this.i=0; this.i< this.arrayPanier.length; this.i++){
							this.panierDb.push({
								productId: this.arrayPanier[this.i].product.id,
								name: this.arrayPanier[this.i].name,
								number: this.arrayPanier[this.i].number,
								type: this.arrayPanier[this.i].type,
								product:this.arrayPanier
							});
						}
						
						this.panierLocal=Array();
						this.panierDiff=[];
						this.storage.get('panier').then((val) => {	
							if(val!= undefined ){
								
								this.panierLocal=val;
								var trouver= false;
								for(this.i=0; this.i<val.length; this.i++){
									 trouver= false;
									for(this.j=0; this.j< this.panierDb.length;this.j++){
									
										if(this.panierDb[this.j].productId==this.panierLocal[this.i].productId && this.panierDb[this.j].type==this.panierLocal[this.i].type){
											this.panierDb[this.j].number+= this.panierLocal[this.i].number;
											this.panierDiff.push(this.panierLocal[this.i]);
											trouver= true;
										}
									}
									
									if(trouver==false){
										this.panierDb.push(this.panierLocal[this.i]);
										this.panierDiff.push(this.panierLocal[this.i]);
									}
								}
								
								this.panierSize=0;
								for(this.i=0;this.i<this.panierDb.length;this.i++){
									this.panierSize+= this.panierDb[this.i].number;
								}
								 
								
								//enregistrement des article additifs
								for(this.i=0;this.i<this.panierDiff.length;this.i++){
									this.diffProductData.login=this.login;
									this.diffProductData.idProduct=this.panierDiff[this.i].productId;
									this.diffProductData.type= "detail";
									this.diffProductData.number=this.panierDiff[this.i].number;
									if(!navigator.onLine) { 
	  										this.navCtrl.push(NoConnexionPage);	
									}
									this.restProvider.postPanier(this.objecttoParams(this.diffProductData)).subscribe(
										data => {
							
										},
									err => {
										console.log(err);
									},
										() => console.log('Complete'));
								}
				
							}else{
								
							}
							this.storage.set("panier",this.panierDb);
						});
						
						
					}
					else{
						this.isLoginFailled=true;
					}

				},
				err => {
					console.log(err);
				},
				() => console.log('Movie Search Complete')
			);
			

			this.loginFormSubmitted = false;
		}
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
					if(!navigator.onLine) { 
	  					this.navCtrl.push(NoConnexionPage);	
					}	
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
