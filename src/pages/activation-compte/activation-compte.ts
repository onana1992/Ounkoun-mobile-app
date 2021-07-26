import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { FavorisPage } from '../favoris/favoris';
import {HomePage} from '../home/home';
import { InscriptionPage } from '../inscription/inscription';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { NoConnexionPage} from  '../no-connexion/no-connexion'; 



@IonicPage()
@Component({
  selector: 'page-activation-compte',
  templateUrl: 'activation-compte.html',
})
export class ActivationComptePage {

	isLoading:boolean=false;
	login:any;
	code:any;
	credential:{login:'',code:''};
	isIncorrectCode:boolean=false;
	user = {name:"", firstName:"", pseudo:"", sexe:"", email:"", login:"",dateDeNaiss:""};
	counter:number = 180;
    stopped=0;
	tick: number;
    subscription: Subscription;
	
	
	objecttoParams(obj) {
		var p = [];
		for (var key in obj) {
		p.push(key + '=' + encodeURIComponent(obj[key]));
		}
		return p.join('&');
	}
	
   
	
     ngOnInit() {
		let timer = TimerObservable.create(1000, 2000);
		this.subscription = timer.subscribe(t => {
		  this.tick = t;
		  this.counter--;
		  if(this.counter==0){
			 this.subscription.unsubscribe(); 
			 this.navCtrl.push(InscriptionPage);
		  }
		});
     }

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
  
	
	
	sendCoundown(loginUser){
		var credential={login:loginUser};
		this.restProvider.launchCountDown(this.objecttoParams(credential)).subscribe(
			data => {
				if(data.statut=="200"){
					
				}
				//this.response=data.data;
				console.log(data);
			},
			err => {
				console.log(err);
				},
					() => console.log('Complete')
			 );
	}
	
	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,public restProvider: RestProvider){
		this.login = navParams.get('login');
        
		if(!navigator.onLine) { 

	  		this.navCtrl.push(NoConnexionPage);	
		}

		this.sendCoundown(this.login );
		//this.countdown();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ActivationComptePage');
	}
	
	activate(){
		var credential={login:this.login,code:this.code};
		this.isLoading=true;
		this.isIncorrectCode=false;
		if(!navigator.onLine) { 

	  		this.navCtrl.push(NoConnexionPage);	
		}
		this.restProvider.activiteUser(this.objecttoParams(credential)).subscribe(
			data => {
				this.isLoading=false;
				if(data.statut=="200"){
					this.user.pseudo= data.response.pseudo;
					this.user.login=data.response.login;
					this.user.name=data.response.name;
					this.user.firstName=data.response.firstName;
					this.user.dateDeNaiss=data.response.dateDeNaiss.date;
					this.user.sexe = data.response.sex;
					this.storage.set('user',this.user);
					this.navCtrl.popToRoot();
					this.restProvider.setView1();
				}
				else{
					this.isIncorrectCode=true;
				}
			},
			err => {
				console.log(err);
				},
					() => console.log('Complete')
			 );
	}

	openPanier(){
	this.navCtrl.push(HomePage,{ page :"tab3" });  
	}
  
	openFavoris(){
	this.navCtrl.push(FavorisPage);  
	}

}
