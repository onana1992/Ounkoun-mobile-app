import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	if(screen.width>=800){
           window.location.href = 'https://www.ounkoun.com/contacts.php';
        }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
