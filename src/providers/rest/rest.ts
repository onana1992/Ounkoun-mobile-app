import { Injectable,  Output, EventEmitter  } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RestProvider {
	
	
 baseUrl= "https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/";
 view = "tab1";
 @Output() change: EventEmitter<string> = new EventEmitter();
 
 
 
  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }
  
	  
  searchMovies(movieName) {
		 var url =  this.baseUrl+'category/all';
     var response = this.http.get(url).map(res => res.json());
     return response;
  } 
   
  getCategories() {
	 var url =  this.baseUrl+'category/all';
     var response = this.http.get(url).map(res => res.json());
     return response;
  }

  getEnchereCategories() {
   var url =  this.baseUrl+'enchere/all_categories';
     var response = this.http.get(url).map(res => res.json());
     return response;
  }


  getBannieres() {
     var url =  this.baseUrl+'baniere/all';
     var response = this.http.get(url).map(res => res.json());
     return response;
  }

  getSeller(boutique){
    var url =  this.baseUrl+'boutique/one/'+boutique;
     var response = this.http.get(url).map(res => res.json());
     return response;
  }

   
  setView3(){ 
     this.view="tab3";
	 this.change.emit(this.view);
  }
   
  setView2(){ 
     this.view="tab2";
	   this.change.emit(this.view);
  }
   
  setView1(){ 
     this.view ="tab1";
	   this.change.emit(this.view);
  }

  setView0(){ 
     this.view ="reload";
     this.change.emit(this.view);
  }
   
  getAllMarque(parn){
	  var url =  this.baseUrl+'marque/all'; 
    var response = this.http.get(url).map(res => res.json());
    return response;     
  }

  getAllLocation(){
    var url =  this.baseUrl+'localite/all'; 
    var response = this.http.get(url).map(res => res.json());
    return response;     
  }

  getAllRelais(){
    var url =  this.baseUrl+'relais/all'; 
    var response = this.http.get(url).map(res => res.json());
    return response;     
  }

  getBestMarque(parn){
   var url =  this.baseUrl+'marque/best'; 
     var response = this.http.get(url).map(res => res.json());
     return response;     
  }

  getBestProduct(){
   var url =  this.baseUrl+'products/best'; 
     var response = this.http.get(url).map(res => res.json());
     return response;     
  }

  getBestProduitPerCat(nomCat){
     var url =  this.baseUrl+'product/model/category/best/'+encodeURI(nomCat); 
     var response = this.http.get(url).map(res => res.json());
     return response;     
  }

  getModels(nomProduct){
     var url =  this.baseUrl+'product/models/'+encodeURI(nomProduct); 
     var response = this.http.get(url).map(res => res.json());
     return response;     
  }

  getEncheres(category,page) {
     var url =  this.baseUrl+'enchere/'+encodeURI(category)+'/'+encodeURI(page);
     var response = this.http.get(url).map(res => res.json());
     return response;
  }

  getEncheresPerText(text,page) {
     var url =  this.baseUrl+'enchere_search/'+encodeURI(text)+'/'+encodeURI(page);
     var response = this.http.get(url).map(res => res.json());
     return response;
  }

  getUsersEncheres(login) {
     var url =  this.baseUrl+'enchere_user/'+encodeURI(login);
     var response = this.http.get(url).map(res => res.json());
     return response;
  }


  getVersion() {
     var url =  this.baseUrl+'ounkoun/version';
     var response = this.http.get(url).map(res => res.json());
     return response;
  }


  getProduitPerCat(nomCat,page,filterOption){
	 var url =  this.baseUrl+'product/model/category/'+encodeURI(nomCat)+'/'+encodeURI(page)+'/'+encodeURI(filterOption)+'/null/null/null'; 
     var response = this.http.get(url).map(res => res.json());
     return response;     
  }
   
  getProduitPerCat1(nomCat,page,filterOption,filterMinPrice,filterMaxPrice,filterMarque){
	   var url =  this.baseUrl+'product/model/category/'+encodeURI(nomCat)+'/'+encodeURI(page)+'/'+encodeURI(filterOption)+'/'+encodeURI(filterMinPrice)+'/'+encodeURI(filterMaxPrice)+'/'+encodeURI(filterMarque); 
     var response = this.http.get(url).map(res => res.json());
     return response;     
  }
   
  getProduitPerMarque(nomMarque,page,filterOption){
	 var url =  this.baseUrl+'product/model/marque/'+encodeURI(nomMarque)+'/'+encodeURI(page)+'/'+encodeURI(filterOption)+'/null/null'; 
     var response = this.http.get(url).map(res => res.json());
     return response;     
  }

   getProduitPerSeller(idSeller,page,filterOption,filterMinPrice,filterMaxPrice,filterMarque){
     var url =  this.baseUrl+'product/model/seller/'+encodeURI(idSeller)+'/'+encodeURI(page)+'/'+encodeURI(filterOption)+'/'+encodeURI(filterMinPrice)+'/'+encodeURI(filterMaxPrice)+'/'+encodeURI(filterMarque); 
     var response = this.http.get(url).map(res => res.json());
     return response;     
   }
   
   getProduitPerSousCat(nomSousCat,page,filterOption,filterMinPrice,filterMaxPrice,filterMarque){
	 var url =  this.baseUrl+'product/model/scategory/'+ encodeURI(nomSousCat)+'/'+encodeURI(page)+'/'+encodeURI(filterOption)+'/'+encodeURI(filterMinPrice)+'/'+encodeURI(filterMaxPrice)+'/'+encodeURI(filterMarque); 
     var response = this.http.get(url).map(res => res.json());
     return response;     
   }
   
   getProduitPerSSousCat(nomSSousCat,page,filterOption,filterMinPrice,filterMaxPrice,filterMarque){
	 var url =  this.baseUrl+'product/model/sscategory/'+encodeURI(nomSSousCat)+'/'+encodeURI(page)+'/'+encodeURI(filterOption)+'/'+encodeURI(filterMinPrice)+'/'+encodeURI(filterMaxPrice)+'/'+encodeURI(filterMarque); 
     var response = this.http.get(url).map(res => res.json());
     return response;     
   }
   
   getCategorie(nomCat){
	 var url =  this.baseUrl+'category/'+encodeURI(nomCat); 
     var response = this.http.get(url).map(res => res.json());
     return response;     
   }
   
   getSousCategorie(nomCat,nomSCat){
		var url =  this.baseUrl+'category/'+encodeURI(nomCat)+'/'+encodeURI(nomSCat); 
		var response = this.http.get(url).map(res => res.json());
		return response;     
   }
   
   getProduit(nomProduit){
	 var url =  this.baseUrl+'product/model/'+encodeURI(nomProduit); 
     var response = this.http.get(url).map(res => res.json());
     return response;     
   }

   getEnchere(numEnchere){
   var url =  this.baseUrl+'enchere_one/'+encodeURI(numEnchere); 
     var response = this.http.get(url).map(res => res.json());
     return response;     
   }
   
   getProduitbuytextSearch(text){
	 var url =  this.baseUrl+'product/model/search/'+encodeURI(text)+'/1/filter-by-most-rescent/null/null/null/null'; 
     var response = this.http.get(url).map(res => res.json());
     return response;   
   }
   
   getResultatRecherche(searchtext,categorieName,page,filterOption,filterMinPrice,filterMaxPrice,filterMarque){
	 var url =  this.baseUrl+'product/model/search/'+encodeURI(searchtext)+'/'+encodeURI(page)+'/'+encodeURI(filterOption)+'/'+encodeURI(filterMinPrice)+'/'+encodeURI(filterMaxPrice)+'/'+encodeURI(filterMarque)+'/'+encodeURI(categorieName); 
     var response = this.http.get(url).map(res => res.json());
     return response;   
   }
   
    
   connecter(login,password){
	var url =  this.baseUrl+'user/log/'+encodeURI(login)+'/'+encodeURI(password); 
	var response = this.http.get(url).map(res => res.json());
    return response;
   }
   
  
	postUser (user:any){
		var url =  this.baseUrl+'user/registration';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url,user,options
		) // ...using post request
                         .map((res:Response) => res.json());
    }
	
	updateUser (user:any){
		var url =  this.baseUrl+'user/update';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url,user,options
		) // ...using post request
                         .map((res:Response) => res.json());
  }
	
	updatePassword (user:any){
		var url =  this.baseUrl+'user/modifyPassword';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url,user,options
		) // ...using post request
                         .map((res:Response) => res.json());
  }
	
	
	activiteUser(credential:any){
		var url =  this.baseUrl+'user/validation';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(url,credential,options
		) // ...using post request
                         .map((res:Response) => res.json());
	}
	
	postAdresse (user:any){
		var url =  this.baseUrl+'user/adresseLivraison';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,user,options
		) // ...using post request
                         .map((res:Response) => res.json());
  }
	
	
	
	postFavori(data:any){
		var url =  this.baseUrl+'user/favorite';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
                         .map((res:Response) => res.json());	
	}
	
	getFavorite(userLogin:string){
	 var url =  this.baseUrl+'user/favorite/'+encodeURI(userLogin); 
     var response = this.http.get(url).map(res => res.json());
     return response;   
    }
	
	deleteFavori(data:any){
		var url =  this.baseUrl+'user/favorite/delete';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
                         .map((res:Response) => res.json());	
	}
	
	postPanier(data:any){
		var url = this. baseUrl+'user/panier/detail';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
                         .map((res:Response) => res.json());	
	}
	
	postPanierBWM(data:any){
		var url = this. baseUrl+'user/panier/BWM';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
                         .map((res:Response) => res.json());	
	}
	
	getPanier(userLogin:string){
	 var url =  this.baseUrl+'user/panier/detail/'+encodeURI(userLogin); 
     var response = this.http.get(url).map(res => res.json());
     return response;   
    }
	
	getPanierBWM(userLogin:string){
	 var url =  this.baseUrl+'user/panier/BWM/'+encodeURI(userLogin); 
     var response = this.http.get(url).map(res => res.json());
     return response;   
    }
	
	modifyPanier(data:any){
	 var url =  this.baseUrl+'user/panier/detail/modifNumber';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
        .map((res:Response) => res.json());   
    }
	
	deletePanier(data:any){
	var url =  this.baseUrl+'user/panier/delete/detail';
    
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
		.map((res:Response) => res.json());   
    }
	
	getCommande(userLogin:string){
	 var url =  this.baseUrl+'user/command/'+encodeURI(userLogin); 
     var response = this.http.get(url).map(res => res.json());
     return response;   
    }
	
	launchCountDown(data:any){
	 var url =  this.baseUrl+'user/timer';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
        .map((res:Response) => res.json());   
    }
	
	sendPasswordRecover(data:any){
		var url =  this.baseUrl+'user/passRecover/code';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
        .map((res:Response) => res.json());
	}
	
	confirmPasswordRecover(data:any){
		var url =  this.baseUrl+'user/passRecover/confirm';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
        .map((res:Response) => res.json());
	}
	
	postCommand(data:any){
		var url = this. baseUrl+'command';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
		) // ...using post request
                         .map((res:Response) => res.json());	
	}

  postNotation(data:any){
    var url = this. baseUrl+'product/model/note';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
    ) // ...using post request
                         .map((res:Response) => res.json());  
  }

  postAvis(data:any){
    var url = this. baseUrl+'product/model/comment';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options
    ) // ...using post request
                         .map((res:Response) => res.json());  
  }

  postEnchere(data:any){
    var url = this. baseUrl+'enchere/historique';
        let headers      = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'}); // ... Set content type to JSON
        let options      = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url,data,options) // ...using post request
          .map((res:Response) => res.json());  
  }

  getCotation(montant:string,type:string){
     var url = "https://www.my-dohone.com/dohone/pay?cmd=cotation&rDvs=XAF&rMt="+montant+"&rMo="+type+"&levelFeeds=0"; 
     var response = this.http.get(url).map(res => res.text());
     return response;   
  }

  sendPaiement(nom:string,montant:string,type:string,numero:string,codeMarchand:string){
     var url = "https://www.my-dohone.com/dohone/pay?cmd=start&rN="+nom+"&rDvs=XAF&rMt="+montant+"&rMo="+type+"&rT="+numero+"&rH="+codeMarchand+"&source=OUNKOUN";
     var response = this.http.get(url).map(res => res.text());
     return response;   
  }

  sendPaiementOrange(nom:string,montant:string,type:string,numero:string,codeMarchand:string,orangeOTP:string){
    var url = "https://www.my-dohone.com/dohone/pay?cmd=start&rN="+nom+"&rDvs=XAF&rMt="+montant+"&rMo="+type+"&rT="+numero+"&rH="+codeMarchand+"&source=OUNKOUN&rOTP="+orangeOTP;
     var response = this.http.get(url).map(res => res.text());
     return response;    
  }

  sendConfirmationPaiement(numero:string,code:string){
    var url = "https://www.my-dohone.com/dohone/pay?cmd=cfrmsms&rCS="+code+"&rT="+numero;
     var response = this.http.get(url).map(res => res.text());
     return response;    
  }



}
