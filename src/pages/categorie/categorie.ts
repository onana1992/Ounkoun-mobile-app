import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController,PopoverController, NavParams,ModalController,AlertController,Content,ActionSheetController,ToastController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProduitPage} from '../produit/produit';
import { HomePage} from '../home/home';
import { Storage} from '@ionic/storage';
import { FavorisPage} from '../favoris/favoris';
import { RecherchePage} from '../recherche/recherche';
import { FiltreModalCatPage} from '../filtre-modal-cat/filtre-modal-cat';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { PanierPage } from '../panier/panier';
import { InscriptionPage } from '../inscription/inscription';
import { NoConnexionPage} from  '../no-connexion/no-connexion'; 
import { MesEncheresPage} from '../mes-encheres/mes-encheres';


@IonicPage()
@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html',
})
	

export class CategoriePage {	view:String = "view2";
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
	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
	otherModels= new Array();
	
    @ViewChild(Content) content: Content;
   
    constructor(public navCtrl: NavController, public navParams: NavParams,private restProvider: RestProvider,
     public modalCtrl : ModalController,public alertCtrl: AlertController,public popoverCtrl: PopoverController,
     private storage: Storage,public actionSheetCtrl: ActionSheetController,public toastController: ToastController) {
	  
		

    	if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
		}
		

		this.restProvider.setView1();
		this.categorieName = navParams.get('nomCategorie');

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
		
	
		this.restProvider.getProduitPerCat1(this.categorieName,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
	        data => {
	            this.response = data.data;
				this.produits = data.data.products;
				this.nbProduits= data.data.size;
				this.totalPage= Math.ceil(parseInt(data.data.size)/40);
	            console.log(data);
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);
	
		this.restProvider.getCategorie(this.categorieName).subscribe(
	        data => {
	            this.response = data.data;
				this.categorie = data.data;
				this.isLoading = false;
	            console.log(data);
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
		);  
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
	
	scrollToTop() {
		// Scrolls to the top, ie 0px to top.
		this.content.scrollToTop();
	}
	
	cancelFilter(){

	    this.filterMinPrice="null";
		this.filterMaxPrice="null";
		this.filterMarque="null";
		this.isLoading= true;

		if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
		}
		
	    this.restProvider.getProduitPerCat1(this.categorieName,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
			data => {
				this.response = data.data;
				this.produits = data.data.products;
				this.nbProduits = data.data.size;
				this.totalPage= Math.ceil(parseInt(data.data.size)/40);
				this.isLoading= false;
				this.isFilterActivated= false;
				console.log(data);
			},
			err => {
				console.log(err);
			},
			() => console.log('Complete')
	    );

	}

	showFiltreModal(){ 
		let myModal = this.modalCtrl.create(FiltreModalCatPage, { categorie: this.categorieName });
		myModal.present();
		myModal.onDidDismiss((data) => {
			if(data != undefined ){
				if(data.filter == "marque"){

					if(!navigator.onLine) { 
	  					this.navCtrl.push(NoConnexionPage);	
					}
					
					this.isLoading= true;
					this.isFilterActivated = true;
					this.filterMarque= data.marque;
					this.restProvider.getProduitPerCat1(this.categorieName,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
					data => {
						this.isLoading= false;
						this.response = data.data;
						this.produits = data.data.products;
						this.nbProduits= data.data.size;
						console.log(data);
					},
					err => {
						console.log(err);
					},
					() => console.log('Complete')
	                );
				}
				else if(data.filter == "prix"){

					if(!navigator.onLine) { 
	  					this.navCtrl.push(NoConnexionPage);	
					}

					this.isLoading= true;
					this.filterMinPrice = data.valeur.lower;
					this.filterMaxPrice = data.valeur.upper;
					this.isFilterActivated= true;
					this.restProvider.getProduitPerCat1(this.categorieName,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
					data => {
						this.isLoading= false;
						this.response = data.data;
						this.produits = data.data.products;
						this.nbProduits= data.data.size;
						console.log(data);
					},
					err => {
						console.log(err);
					},
					() => console.log('Complete')
	                ); 
				}
			}
			
		});
	}

	changeView(view){

		if (view == "view1") {
			this.view="view2"
		} 
		else if (view == 'view2') {
			this.view="view3";
		}
		
		else if (view == "view3") {
			this.view="view2";
		}
	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad CategoriePage');
	 }
  
  
	
  
 
  showTriChoix(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Trier par:');
	
	 alert.addInput(
		{
			type: 'radio',
			label: 'popularité',
			value: 'filter-by-popularity',
			checked: this.filterOption == 'filter-by-popularity'? true:false,
		}
	);

    alert.addInput(
		{
			type: 'radio',
			label: 'plus rescent',
			value: 'filter-by-most-rescent',
			checked: this.filterOption == 'filter-by-most-rescent'? true:false,
		}
	);
	
	alert.addInput(
		{
			type: 'radio',
			label: 'prix decroissant',
			value: 'filter-by-price-desc',
			checked: this.filterOption == 'filter-by-price-desc'? true:false,
			
		}
	);
	
	alert.addInput(
		{
			type: 'radio',
			label: 'prix croisant',
			value: 'filter-by-price-asc',
			checked: this.filterOption == 'fliter-by-price-asc'? true:false,
		}
	);

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
 
		this.filterOption=data;
		if(this.filterOption=="filter-by-most-rescent"){
			this.filterLabel="Plus rescent";
		}
		else if(this.filterOption=="filter-by-price-desc"){
			this.filterLabel="Prix desc.";
		}
		else if(this.filterOption=="filter-by-price-asc"){
			this.filterLabel="Prix asc.";
		}
		
		console.log('Radio data:', data);
		this.isLoading = true;
		this.filterOption= data;
		if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
		}
		
		this.restProvider.getProduitPerCat1(this.categorieName,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
			data => {
				this.response = data.data;
				this.produits = data.data.products;
				this.isLoading = false;
				console.log(data);
			},
			err => {
				console.log(err);
			},
			() => console.log('Complete')
	    );
	   
      }
    });
		alert.present();
  }
  
  
  showPageChoix(){
	var modulo = 0;
	var nbPage = 0;
	 
    let alert = this.alertCtrl.create();
    alert.setTitle('Aller a la page:');
	
	modulo = this.nbProduits % 40;
	nbPage= (modulo==0)? (this.nbProduits/40) : Math.ceil(this.nbProduits/40);

	for(var i=0; i<nbPage; i++){
		alert.addInput(
			{
				type: 'radio',
				label: ''+(i+1)+'',
				value: (i+1).toString(),
				checked: (this.page== i+1)? true:false,
			}
		);
	}
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
		  this.page=data;
		console.log('Radio data:', data);
		this.isLoading = true;
		if(!navigator.onLine) { 
	  					this.navCtrl.push(NoConnexionPage);	
		}
		this.restProvider.getProduitPerCat1(this.categorieName,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
        data => {
            this.response = data.data;
			this.produits = data.data.products;
			this.isLoading = false;
            console.log(data);
        },
        err => {
            console.log(err);
        },
        () => console.log('Complete')
	   );
	   
      } 
    });
    alert.present();
  }
  
  goSuivant(){
	var modulo=0;
	var nbPage=0;
	modulo = this.nbProduits % 40;
	nbPage = (modulo==0)? (this.nbProduits/40) : Math.ceil(this.nbProduits/40);
	if(nbPage > this.page){
		
		this.page++;
		if(!navigator.onLine) { 
	  					this.navCtrl.push(NoConnexionPage);	
		}
		this.isLoading = true;
		this.restProvider.getProduitPerCat1(this.categorieName,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
		data => {
			this.response = data.data;
			this.produits = data.data.products;
			this.isLoading = false;
			console.log(data);
		},
		err => {
            console.log(err);
		},
		() => console.log('Complete'));	
	}
	  
  } 
  
  goPrecedant(){
	if(this.page > 1){
		this.isLoading = true;
		this.page--;
		if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
		}
		this.restProvider.getProduitPerCat1(this.categorieName, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque ).subscribe(
		data => {
			this.response = data.data;
			this.produits = data.data.products;
			this.isLoading = false;
			console.log(data);
		},
		err => {
            console.log(err);
		},
		() => console.log('Complete'));	
	}  
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

		  else if(data=="5"){
			this.navCtrl.push(MesEncheresPage);    
		  }
         
      }
    })
  }

  stopPropagation(x, event: Event){
	event.stopPropagation(); 
  }

doInfinite(infiniteScroll) {
	this.page = this.page+1;
		setTimeout(() => {
		  	this.restProvider.getProduitPerCat1(this.categorieName,this.page,this.filterOption,this.filterMinPrice,this.filterMaxPrice,this.filterMarque).subscribe(
				data => {
				    
				    for(let i=0; i< data.data. products.length; i++) {
		             	this.produits.push(data.data.products[i]);
		            }

				},
				        err => {
				            console.log(err);
				        },
				        () => console.log('Complete')
			);
		    console.log('Async operation has ended');
		    infiniteScroll.complete();
		}, 1000);
}

}



