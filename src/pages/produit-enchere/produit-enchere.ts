import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { NgForm } from "@angular/forms";
import {EnchereModalPage} from '../enchere-modal/enchere-modal';


@IonicPage()
@Component({
  selector: 'page-produit-enchere',
  templateUrl: 'produit-enchere.html',
})
export class ProduitEncherePage {

	isLoading = true;
	baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
	enchereNum:any;
  	produit:any;
  	login:any;
  	prix:number;
  	isConnected:boolean=false;
  	registrationFormSubmitted :boolean=false;
  	historique= new Array();
  	enchere = { prix:"",idUser:"" };
  	enchereGagnant= { price:"",idUser:"" };
  	isLoadingEnchere:boolean;
  	shareUrl:string;
  	statut:string;

  	constructor(public navCtrl: NavController, public navParams: NavParams,
  	private restProvider: RestProvider,public toastController: ToastController,private storage: Storage,public modalCtrl: ModalController) {
    
    	this.enchereNum = navParams.get('numEnchere');
    	this.isLoading = true;
    	this.shareUrl="https://www.ounkoun.com/produit-enchere.php?numEnchere="+this.enchereNum;
    	
  		this.restProvider.getEnchere(this.enchereNum).subscribe(
        	data => {
        		this.statut=data.statut;
        		if (this.statut=="200") {
        			this.produit = data.response;
					this.historique = this.produit.historique;
					if(this.historique.length >0){
						this.enchereGagnant = this.historique[0];
						for (var i = 0; i < this.historique.length; ++i) {
							if(this.enchereGagnant.price < this.historique[i].price){
							 this.enchereGagnant = this.historique[i];
							}
						}	
					}
        		}
				
				this.isLoading= false;
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
				this.enchere.idUser=this.login;
			}

  		});
  	}


	ionViewDidLoad() {
	    console.log('ionViewDidLoad ProduitEncherePage');
	}


	objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
	}

	encherir(form: NgForm){

		if(this.isConnected){ 
			this.registrationFormSubmitted = true;
			if (form.valid){
				if(parseInt(this.enchere.prix) <= this.produit.initPrice){
					
					const toast1 =  this.toastController.create({
	      				message: 'Votre enchère doit absolument êtes superieur à la mise à prix.Veillez ressayer',
	      				showCloseButton: true,
	      				position: 'bottom',
	      				duration: 5000
	    			});
	    			toast1.present();
				}
				else{
					this.isLoadingEnchere=true;
					var myobject = {numEnchere:this.enchereNum,historique:JSON.stringify(this.enchere)};
					this.restProvider. postEnchere(this.objecttoParams(myobject)).subscribe(
						data => {
							if(data.statut=="200"){	
								this.isLoadingEnchere=false;
								this.enchere.prix="";
								const toast3 =  this.toastController.create({
	      								message: 'Votre enchère  a été enregistré avec succès.Vous serez contacté  si etes vous êtes le gagnant à la fin cette vente',
	      								showCloseButton: true,
	      								position: 'bottom',
	      								duration: 5000
	    							});
	    						toast3.present();
								this.restProvider.getEnchere(this.enchereNum).subscribe(
        								data => {
											this.produit = data.response;
											this.historique = this.produit.historique;
											this.enchereGagnant = this.historique[0];
											for (var i = 0; i < this.historique.length; ++i) {
												if(this.enchereGagnant.price < this.historique[i].price){
													this.enchereGagnant = this.historique[i];
												}
											}
        								},
        								err => { 
            								console.log(err);
        								},
        								() => console.log('Complete')
								);
							}
						},
							err => {
								console.log(err);
						},
						() => console.log('')
					); 
				}
			}
			
		}
		else{

			const toast2 =  this.toastController.create({
	      	message: 'Veuillez vous connecter, pour pouvoir encherir',
	      	showCloseButton: true,
	      	position: 'bottom',
	      	duration: 5000
	    	});
	    	toast2.present();
	    	this.navCtrl.popToRoot();
	    	this.restProvider.setView2();
		}
	}

	showEnchereModal(){
		let myModal = this.modalCtrl.create(EnchereModalPage,{ numEnchere: this.enchereNum });
		myModal.present();
		myModal.onDidDismiss((data) => {
			if(data!= undefined){
			}
		});
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

 
 /*shareLinkedIn(e) {
  e.preventDefault();
  window.open('http://www.linkedin.com/shareArticle?mini=true&url='+this.shareUrl+'&title=partage', 'sharer', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
 }*/


}
