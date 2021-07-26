import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage} from '@ionic/storage';
import { RestProvider} from '../../providers/rest/rest';




@IonicPage()
@Component({
  selector: 'page-command-succeed',
  templateUrl: 'command-succeed.html',
})


 export class CommandSucceedPage {
	 
	 nom:any; 
	 prenom:any;
	 telClient: any;
	 nomClient:any;
	 montant:any;
	 rMt:any;
	 rT:any;
	 rI:any;
	 rN: any;

	constructor(public navCtrl: NavController,public navParams: NavParams,private storage: Storage,public restProvider: RestProvider) {
	  
	  this.restProvider.setView1(); 
	  this.storage.get('user').then((val) =>{
		this.nom=val.name;
        this.prenom=val.firstName;		
	  });

	  this.rT = navParams.get('tel');
	  this.montant = navParams.get('montant');
	  this.rMt = navParams.get('montant');
	  this.rI = navParams.get('reference');
	  this.nomClient = this.prenom+" "+this.nom;
	  this.rN= this.nomClient; 
	  
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CommandSucceedPage');
	}
	
	gotTheRoot(){
		this.navCtrl.popToRoot();
	}
	
 }
