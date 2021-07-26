import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,PopoverController,AlertController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { NgForm } from "@angular/forms";
import { FavorisPage } from '../favoris/favoris';
import { HomePage } from '../home/home';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';
import { NoConnexionPage } from  '../no-connexion/no-connexion';


@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
	
  isLoading:boolean=false;
  hasSucceed:boolean=true;
  hasNotSucceed:boolean=true;
  isConnected:boolean=false;
  user = {login:"", oldPassword:"", newPassword:"", rePassword:"" };
  registrationFormSubmitted:boolean=false;
  panierSize:number=0;
  favorisSize:number=0;
  tab:any= "tab1";
  login="";
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,
  private storage: Storage,private toastCtrl: ToastController,public popoverCtrl: PopoverController,public alertCtrl: AlertController) {
	
	if(screen.width>=800){
           window.location.href = 'https://www.ounkoun.com/password.php';
    }

	this.restProvider.setView1();
	this.storage.get('user').then((val) => {
				this.isConnected= (val == null)? false:true;
				if(this.isConnected){
					this.login= val.login;
				}
	});

	this.storage.get('user').then((val) => {	 
		 this.user.login= val.login; 
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
    console.log('ionViewDidLoad PasswordPage');
  }
  
   presentToast() {
	  let toast = this.toastCtrl.create({
		message: 'Mot de passe modifié avec succès',
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
  
    submitForm(form: NgForm)  {
		this.registrationFormSubmitted = true;
		this.hasSucceed= true;
		if (form.valid && (this.user.rePassword == this.user.newPassword)) {
			this.isLoading=true;
			if(!navigator.onLine) { 
	  				this.navCtrl.push(NoConnexionPage);	
	  	    }
			this.restProvider.updatePassword(this.objecttoParams(this.user)).subscribe(
			data => {
				this.isLoading=false;
				if (data.statut=="200"){
					this.hasSucceed=true;
					this.presentToast();
				}else{
					this.hasSucceed=false;
				}
			},
			err => {
				console.log(err);
				},
					() => console.log('Complete')
			);
		}else{
		
		}
    }
  
	openPanier(){
		this.navCtrl.push(HomePage,{ page :"tab3" });  
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
				this.restProvider.setView2();   
			  }
			  
			  else if(data=="4"){
				this.navCtrl.push(MescmdPage);    
			  }
	         
	      	}
	    })
  }

}
