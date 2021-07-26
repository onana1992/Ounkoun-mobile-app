import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,ToastController,PopoverController,AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { NgForm } from "@angular/forms";
import { FavorisPage } from '../favoris/favoris';
import {HomePage} from '../home/home';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';


@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
	
	localUser:any;
	loginFormSubmitted: boolean = false;
	isConnected:boolean;
	isLoading:boolean=false;
	user={nom:"",prenom:"",dateDeNaiss:"",sex:"",login:"",pseudo:"",id:""};
	updateUser={name:"",firstName:"",dateDeNaiss:"",sex:"",login:""};
	updateStorageUser={id:"", name:"",firstName:"",dateDeNaiss:"",sexe:"",login:"",adresseLivraison:"",pseudo:"",type:"" };
	panierSize:number=0;
	favorisSize:number=0;
	tab:any= "tab1";
	login="";

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
  public restProvider: RestProvider, private toastCtrl: ToastController,public popoverCtrl: PopoverController,
  public alertCtrl: AlertController) {
	  
	if(screen.width>=800){
           window.location.href = 'https://www.ounkoun.com/profil.php';
     }

  	this.restProvider.setView1();
	this.storage.get('user').then((val) => {
				this.isConnected= (val == null)? false:true;
				if(this.isConnected){
					this.login= val.login;
				}
	 });

	this.storage.get('user').then((val) => {
		
		 this.updateStorageUser = val;
		 this.user.nom = val.name;
		 this.user.prenom = val.firstName;
		 this.user.dateDeNaiss= val.dateDeNaiss.split(" ")[0];
		 this.user.sex= val.sexe;
		 this.user.login= val.login;
		 this.user.pseudo= val.pseudo;
		 
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }
  
  presentToast() {
	  let toast = this.toastCtrl.create({
		message: 'Informations personelles modifier avec succès',
		duration: 3000,
		position: 'bottom'
	  });

	  toast.onDidDismiss(() => {
		console.log('Dismissed toast');
	  });

	toast.present();
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
		
		this.isLoading=true;
		this.updateUser.name=this.user.nom;
		this.updateUser.firstName = this.user.prenom ;
		this.updateUser.dateDeNaiss = this.user.dateDeNaiss.split(" ")[0];
		this.updateUser.sex=this.user.sex;
		this.updateUser.login= this.user.login;
		
		this.restProvider.updateUser(this.objecttoParams(this.updateUser)).subscribe(
			data => {	
				this.user.login= data.response.login;
				this.user.nom= data.response.name;
				this.user.prenom = data.response.firstName;
				this.user.id=data.response.id;
				this.user.dateDeNaiss = data.response.birthDate;
				this.user.sex= data.response.sex;
				this.user.pseudo= data.response.pseudo;
				this.isLoading=false;
				
				
				this.updateStorageUser.login= data.response.login;
				this.updateStorageUser.name= data.response.name;
				this.updateStorageUser.firstName= data.response.firstName;
				this.updateStorageUser.id=data.response.id;
				this.updateStorageUser.dateDeNaiss=data.response.birthDate;
				this.updateStorageUser.sexe= data.response.sex;
				this.updateStorageUser.pseudo= data.response.pseudo;
				
				this.storage.set('user',this.updateStorageUser);
				this.presentToast();
			},
			err => {
				console.log(err);
				},
					() => console.log('Complete')
			);
			

			this.loginFormSubmitted = false;
		}
	}

  openPanier(){
	this.navCtrl.popToRoot();
	this.restProvider.setView3(); 
  }
  
  openFavoris(){
	if(this.isConnected){
		this.navCtrl.push(FavorisPage);
	  }
	  else{
		const toast =  this.toastCtrl.create({
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
