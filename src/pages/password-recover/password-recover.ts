import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {RecoverPasswordConfirmPage} from '../recover-password-confirm/recover-password-confirm';
import {NoConnexionPage } from  '../no-connexion/no-connexion';
import {NgForm } from "@angular/forms";
import {Output, EventEmitter  } from '@angular/core';



@IonicPage()
@Component({
  selector: 'page-password-recover',
  templateUrl: 'password-recover.html',
})
export class PasswordRecoverPage {
	
	isLoading:boolean=false;
	isAccountExist:boolean=true;
	registrationFormSubmitted:boolean=false;
	login= "";
	data = {login:""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
  
  }
  
 		 
   objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
	}

    send(){
		this.isLoading=true;
		if(!navigator.onLine) { 
	  		this.navCtrl.push(NoConnexionPage);	
	  	}
		this.restProvider.sendPasswordRecover(this.objecttoParams(this.data)).subscribe(
			data => {
					this.isLoading=false;
					if(data.statut=="200"){
						this.isAccountExist=true;
						this.navCtrl.push(RecoverPasswordConfirmPage,{login: this.data.login});
					}
					else{
						this.isAccountExist=false;	
					}
			},
			err => {
					
					console.log(err);
					},
						() => console.log('Complete')
				);
			//form.reset();
		this.registrationFormSubmitted = false;
    } 

	ionViewDidLoad() {
		console.log('ionViewDidLoad PasswordRecoverPage');
	}
}
