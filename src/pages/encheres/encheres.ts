import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams,Content,PopoverController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProduitEncherePage } from '../produit-enchere/produit-enchere';
import { PopoverPage } from '../popover/popover';
import { MesEncheresPage} from '../mes-encheres/mes-encheres';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';
import { EnchereRecherePage } from '../enchere-rechere/enchere-rechere';


import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-encheres',
  templateUrl: 'encheres.html',
})
export class EncheresPage {

	produits = new Array();
	categories = new Array();
	isLoading: boolean = true;
	categorie: string= "all";
	tab:any= "tab1";
	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
	page:number=1;
	totalPage:number;
	taille:string;
	isConnected:boolean=false;
	panierVide:boolean=false;
	prixTotal:number=0;
	panierSize:number=0;
	favorisSize:number=0;
	arrayPanier= new Array();
	@ViewChild(Content) content: Content;
	view:String = "view2";
	statut:string;



   constructor(public navCtrl: NavController,public alertCtrl: AlertController,private storage: Storage,public popoverCtrl: PopoverController, public navParams: NavParams,private restProvider: RestProvider) {
  	
  	this.isLoading=true;
  	this.restProvider.getEnchereCategories().subscribe(
	    data => {
	  	    this.categories = data.data.categories;
	        console.log(this.totalPage);
	    },
	    err => {
	        console.log(err);
	     },
	        () => console.log('Complete')
	);


  	this.restProvider.getEncheres(this.categorie,this.page).subscribe(

	        data => {
	            this.produits = data.data;
	            this.taille= data.taille;
	            this.totalPage= Math.ceil(parseInt(data.taille)/20);
	            this.isLoading=false;
	            console.log(data);
	        },
	        err => {
	            console.log(err);
	        },
	        () => console.log('Complete')
	);

	this.storage.get('user').then((val) => {	
			this.isConnected= (val == undefined)? false:true;
	});

  }

  gotoProduct(numEncher){
		this.navCtrl.push(ProduitEncherePage, {numEnchere: numEncher });  
  }

  gotoProduct1(numEncher , event: Event){
  	event.stopPropagation(); //THIS DOES THE MAGIC
	this.navCtrl.push(ProduitEncherePage, {numEnchere: numEncher });  
  }

  gotoRecherche(){
	this.navCtrl.push(EnchereRecherePage);  
  }

	 	

  ionViewDidLoad() {
    console.log('ionViewDidLoad EncheresPage');
  }

  changeOption(){
  	
		this.isLoading=true;
		this.restProvider.getEncheres(this.categorie,this.page).subscribe(

			        data => {
			            this.produits = data.data;
			            this.isLoading=false;
			            console.log(data);
			        },
			        err => {
			            console.log(err);
			        },
			        () => console.log('Complete')
		);
   }

	scrollToTop() {
			// Scrolls to the top, ie 0px to top.
			this.content.scrollToTop();
	}

	doInfinite(infiniteScroll) {
	  this.page = this.page+1;
	  setTimeout(() => {
	  	this.restProvider.getEncheres(this.categorie,this.page).subscribe(
			data => {
			    //this.produits = data.data;
			    console.log(data);
			    for(let i=0; i< data.data.length; i++) {
	             			this.produits.push(data.data[i]);
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

openCategorie(category){

	this.isLoading=true;
	this.categorie = category;
	this.page=1;
	this.restProvider.getEncheres(category,this.page).subscribe(

	    data => {
	            this.produits = data.data;
	             this.taille= data.taille;
	             this.totalPage= Math.ceil(parseInt(data.taille)/5);
	            this.isLoading=false;
	            console.log(data);
	    },
	        err => {
	            console.log(err);
	     },
	        () => console.log('Complete')
	);
}





}
