import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ConnexionPage } from '../connexion/connexion';
import { ActivationComptePage } from '../activation-compte/activation-compte';
import { NoConnexionPage} from  '../no-connexion/no-connexion';
import { NgForm } from "@angular/forms";
import { RestProvider } from '../../providers/rest/rest';
import {   Output, EventEmitter  } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {
	
 user = {nom:"",prenom:"",dateDeNaiss:"",sex:"",email:"",password:"",rePassword:"",login:"",name:"",firstName:"",
 loginIsEmail:true,plainPassword:"",};	
 registrationFormSubmitted: boolean = false;
 isLoading:boolean=false;
 accountExist:boolean=false;
 data:any;
 passwordType: string = 'password';
 passwordIcon: string = 'eye-off';
 rePasswordType: string = 'password';
 rePasswordIcon: string = 'eye-off';

 

  @Output() change: EventEmitter<string> = new EventEmitter();
 

	constructor(public navCtrl: NavController,public http: Http, public navParams: NavParams,public restProvider: RestProvider) {
	
		/*if(screen.width>=800){
           window.location.href = 'https://www.ounkoun.com/inscription.php';
        }*/
	}

    goTo(page) {
		if (page === 'connexion') {
			this.navCtrl.push(ConnexionPage);
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
		this.accountExist=false;
		this.registrationFormSubmitted = true;

		if (form.valid && (this.user.rePassword== this.user.password)) {
			this.isLoading=true;
			this.user.name= this.user.nom;
			this.user.firstName= this.user.prenom;
			this.user.login=this.user.login;
			this.user.loginIsEmail=true;
			this.user.plainPassword=this.user.password;
			this.user.dateDeNaiss= this.user.dateDeNaiss;
			this.user.sex =this.user.sex;
			if(!navigator.onLine) { 
	  				this.navCtrl.push(NoConnexionPage);	
	  		}
			this.restProvider.postUser(this.objecttoParams(this.user)).subscribe(
			data => {
				this.isLoading=false;
				if(data.statut=="200"){
					this.accountExist=false;
					this.navCtrl.push(ActivationComptePage,{login: this.user.login});
				}
				else{
					this.accountExist=true;				
				}
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


  	hideShowPassword() {
     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
    

    hideShowRePassword() {
     this.rePasswordType = this.rePasswordType === 'text' ? 'password' : 'text';
     this.rePasswordIcon = this.rePasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }


}
