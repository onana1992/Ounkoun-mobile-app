import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { NoConnexionPage } from  '../no-connexion/no-connexion';



@IonicPage()
@Component({
  selector: 'page-sample-modal',
  templateUrl: 'sample-modal.html',
})
export class SampleModalPage {
	
	adressLivraison= new Object();
	user= {login:"",name:"",firstName:"",tel1:"",tel2:"",region:"",town:"",address:"",adresseLivraison:""};
	localUser={login:"", name:"",firstName:"",tel1:"",tel2:"",region:"",town:"",address:"", adresseLivraison:""};
	registrationFormSubmitted:boolean;
	isLoading:boolean=true;
	hasAddress:boolean=false;
	login:any;
	ville:any;
	localites: Array <{region: string, villes: Array <string>}> ;
    villes:Array<string>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private storage: Storage, public restProvider: RestProvider) {
	  
	this.localites=[];
    if(!navigator.onLine) { 
          this.navCtrl.push(NoConnexionPage);  
    }

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
  	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SampleModalPage');
	}
  
	objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
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
				this.viewCtrl.dismiss({'random' : 'data'});
			},
			err => {
				console.log(err);
				},
					() => console.log('Complete')
			);
			
			this.registrationFormSubmitted = false;
		}else{
			
		}
	}
  
    close() {
     this.viewCtrl.dismiss({'random' : 'data'});
    }

}
