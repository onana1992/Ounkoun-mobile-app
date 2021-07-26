import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageProvider {

  constructor( private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }
  
  setUser(user){
	 this.storage.set('user',user);
  }
  
  getUser(user){ 
    //console.log(this.storage.get('user'));  
	//return this.storage.get('user');
	this.storage.get('user').then((val) => {
    console.log(val);
	 user= val;
    });
	
  }
  
  

}
