import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController,AlertController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { NgForm } from "@angular/forms";
import { FavorisPage } from '../favoris/favoris';
import { HomePage } from '../home/home';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';
import { NoConnexionPage} from  '../no-connexion/no-connexion'; 
		


@IonicPage()
@Component({
  selector: 'page-adresse',
  templateUrl: 'adresse.html',
})
export class AdressePage {
	
  isLoading:boolean=true;
  
  user={login:"", name:"",firstName:"",tel1:"",tel2:"",region:"",town:"",address:"", adresseLivraison:""};
  localUser={login:"", name:"",firstName:"",tel1:"",tel2:"",region:"",town:"",address:"", adresseLivraison:""};
  login="";
  registrationFormSubmitted:boolean;
  hasAddress:boolean=false;
  panierSize:number=0;
  favorisSize:number=0;
  pages: Array<{title: string, component: any}>;
  localites: Array <{region: string, villes: Array <string>}> ;
  villes:Array<string>;

  isConnected:boolean=false;
  tab:any= "tab1";
  arrayPanier= new Array();
  objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
  }
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, public restProvider: RestProvider,
    public popoverCtrl: PopoverController, public alertCtrl: AlertController) {
	  
	  	this.localites=[];

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

		this.restProvider.getAllLocation().subscribe(
				data => {
					this.localites = data.data;
					this.user.region= this.localites[0].region;
					this.villes= this.localites[0].villes;
	    			this.isLoading= false;
	    			this.storage.get('user').then((val) => {	
					this.login= val.login;
					this.user.login= val.login	;
					this.localUser= val;
					this.hasAddress= val.adresseLivraison==null? false:true;
		    		if(this.hasAddress){
						this.user.name= val.adresseLivraison.name;
						this.user.firstName= val.adresseLivraison.firstName;
						this.user.tel1= val.adresseLivraison.tel1;
						this.user.tel2= val.adresseLivraison.tel2;
						this.user.region= val.adresseLivraison.region;
						this.user.town= val.adresseLivraison.town;
						this.user.address= val.adresseLivraison.adresse;
						for( var i=0; i < this.localites.length; i++){
							 if(this.localites[i].region == this.user.region){
								this.villes = this.localites[i].villes;
								 return;
							 }
					}
			  }
		});
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

  	changeNumber(){ 
		this.villes=[]; 
        //console.log(this.user.region);
		for( var i=0; i < this.localites.length; i++){
			 if(this.localites[i].region == this.user.region){
			 	this.villes = [];
				this.villes = this.localites[i].villes;
				 i=this.localites.length;
			 }
		}
  	} 
    
	
  ionViewDidLoad() {
   // this.user.region= this.localites[0].region;
    console.log('ionViewDidLoad AdressePage');
  }
  
	submitForm(form: NgForm) {
		
		this.registrationFormSubmitted = true;
		
		if (form.valid) {
			this.isLoading=true;
			if(!navigator.onLine) { 
	  				this.navCtrl.push(NoConnexionPage);	
			}
			this.restProvider.postAdresse(this.objecttoParams(this.user)).subscribe(
			data => {
				if(data.statut=="200"){
					this.localUser.adresseLivraison = data.livraisonadresse;
					this.storage.set('user',this.localUser);
					this. hasAddress=true;
				}else{
					
				}
				this.isLoading=false;
			},
			err => {
				console.log(err);
				},
					() => console.log('Complete')
			);
			//form.reset();
			this.registrationFormSubmitted = false;
		}else{
			
		}
	}
	
	openPanier(){
		this.navCtrl.popToRoot();
	    this.restProvider.setView3();  
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
	
}
