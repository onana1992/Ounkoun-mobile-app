import { Component ,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,Content} from 'ionic-angular';

/**
 * Generated class for the AideCommandePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aide-commande',
  templateUrl: 'aide-commande.html',
})
export class AideCommandePage {

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	if(screen.width>=800){
           window.location.href = 'https://www.ounkoun.com';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AideCommandePage');
  }

  scrollTo(element:string) {
    let yOffset = document.getElementById(element).offsetTop;
    this.content.scrollTo(0, yOffset, 4000)
  }

  

}
