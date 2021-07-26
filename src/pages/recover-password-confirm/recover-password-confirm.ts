import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';
import { NoConnexionPage } from  '../no-connexion/no-connexion';
import { NgForm } from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-recover-password-confirm',
  templateUrl: 'recover-password-confirm.html',
})
export class RecoverPasswordConfirmPage {

	login="";
	data={login:"", code:"", password:""};
	isCorrectCode:boolean=true;
	isLoading:boolean;
	registrationFormSubmitted:boolean;
	passwordType: string = 'password';
 	passwordIcon: string = 'eye-off';
 	rePasswordType: string = 'password';
 	rePasswordIcon: string = 'eye-off';

  
	constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) { 
		  this.login = navParams.get('login');
		  this.data.login= this.login;
	}
  
	objecttoParams(obj) {
			var p = [];
			for (var key in obj) {
			p.push(key + '=' + encodeURIComponent(obj[key]));
			}
			return p.join('&');
	}

    send(form: NgForm){

    	this.registrationFormSubmitted = true;
    	if(form.valid){

    		this.isLoading=true;
	    	if(!navigator.onLine) { 
	          this.navCtrl.push(NoConnexionPage);  
	    	}

			this.isCorrectCode=true;
			this.restProvider.confirmPasswordRecover(this.objecttoParams(this.data)).subscribe(
			data => {
					this.isLoading=false;
					if(data.statut=="200"){
						this.isCorrectCode=true;
						this.navCtrl.popToRoot();
					}
					else{
						this.isCorrectCode=false;	
					}
			},
			err => {
					
					console.log(err);
					},
						() => console.log('Complete')
				);
			this.registrationFormSubmitted = false;

    	}
    	
	}
	

	ionViewDidLoad() {
		console.log('ionViewDidLoad RecoverPasswordConfirmPage');
	}

	hideShowPassword() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
    

    hideShowRePassword() {
     this.rePasswordType = this.rePasswordType === 'text' ? 'password' : 'text';
     this.rePasswordIcon = this.rePasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

}
