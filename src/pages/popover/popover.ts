import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { MesEncheresPage} from '../mes-encheres/mes-encheres';


@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
	

  inputData:any;
  isConnected:boolean=false;

	constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
	 
	 this.inputData = this.navParams.get('data');
	  this.isConnected = this.inputData.isConnected;
	}

    ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
    }
  
  
    disconnect() {
		let data = "1";
		this.viewCtrl.dismiss(data);
    }
	
	connect() {
		let data = "2";
		this.viewCtrl.dismiss(data);
    }
	
	register() {
		let data = "3";
		this.viewCtrl.dismiss(data);
    }
	
	goTogoCommand() {
		let data = "4";
		this.viewCtrl.dismiss(data);
    }

    goTogoEnchere() {
		let data = "5";
		this.viewCtrl.dismiss(data);
    }
	
}
