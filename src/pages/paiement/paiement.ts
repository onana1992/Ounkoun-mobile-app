import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { RestProvider } from '../../providers/rest/rest';
import {   Output, EventEmitter  } from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-paiement',
  templateUrl: 'paiement.html',
})
export class PaiementPage {

	numero:string;
	paiement = {numero:"",code:""};
	confirmation = {code:""};
	next:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider) {

  }

	ionViewDidLoad() {
	    console.log('ionViewDidLoad PaiementPage');
	}

	submitOrange(form: NgForm){

	  	this.restProvider.sendPaiementOrange("onana","500","2",this.paiement.numero,"ED155M321925",this.paiement.code).subscribe(
				data => {
					alert(data);
					if(data =="OK start : en attente de confirmation SMS."){
						this.next= true;
					}
					//OK start : en attente de confirmation SMS.
				},
				err => {
					console.log(err);
					},
						() => console.log('Complete')
		);
	}


	submitCode(form: NgForm){
	  	this.restProvider.sendConfirmationPaiement(this.paiement.numero,this.confirmation.code).subscribe(
				data => {
					alert(data);
					//OK start : en attente de confirmation SMS.
				},
				err => {
					console.log(err);
					},
						() => console.log('Complete')
		);
	}

}
