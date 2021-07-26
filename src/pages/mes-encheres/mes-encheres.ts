import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { ProduitEncherePage } from '../produit-enchere/produit-enchere';


@IonicPage()
@Component({
  selector: 'page-mes-encheres',
  templateUrl: 'mes-encheres.html',
})
export class MesEncheresPage {

  login:any;
  isLoading:boolean=true;
  isConnected:boolean=false;
  encheres = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,public restProvider: RestProvider) {

  	    this.restProvider.setView1();
        
        this.storage.get('user').then((val) => {  
        this.login=val.login;
        this.restProvider.getUsersEncheres(this.login).subscribe(
            data => {
              if(data.statut=="200"){  
                 this.encheres= data.response.enchere;
                 this.isLoading= false;
              }
        },
        err => {
          console.log(err);
        },
        () => console.log('Movie Search Complete')
          );   
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MesEncheresPage');
  }

  gotoProduct(numEncher){
    this.navCtrl.push(ProduitEncherePage, {numEnchere: numEncher });  
  }

}
