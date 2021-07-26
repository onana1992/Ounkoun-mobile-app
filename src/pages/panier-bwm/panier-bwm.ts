import { Component} from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-panier-bwm',
  templateUrl: 'panier-bwm.html',
})
export class PanierBwmPage {
	
	isLoading:boolean=false;
	isLoadingDelete:boolean=false;
	isLoadingUpdate:boolean=false;
	user = {login:"",dateDeNaiss:"", plainPassword:"",password:"", loginIsEmail:true,id:"",type:"", pseudo:"", sexe:"",name:"",firstName:"",adresseLivraison:null};
	arrayPanier= new Array();
	arrayFormatedPanier= new Array();
	login:string;
	loginFormSubmitted: boolean = false;
	isConnected:boolean= false;
	isLoginFailled:boolean=false;
	favoris=new Array();
	arraySize=new Array();
	panierLocal=new Array();
	panierDb=new Array();
	panierDiff=new Array();
	produits= new Array();
    panierVide:boolean=false;
	prixTotal = 0;
	
  constructor() {
	  
  }
	  
	  
	/* this.storage.get('user').then((val) => {	
		this.isConnected= (val == undefined)? false:true;
		if(this.isConnected){
			this.login=val.login;
			this.restProvider.getPanier(this.login).subscribe(
				data => {
					if(data.statut=="200"){	
						this.isLoading=false;
						
						this.arrayPanier=data.data.products;
						this.panierVide=this.arrayPanier.length==0? true:false;
						this.arrayFormatedPanier=[];
						for (var i = 0; i < this.arrayPanier.length; i++) {
								this.arrayFormatedPanier.push({
								productId: this.arrayPanier[i].product.id,
								name:this.arrayPanier[i].product.name,
								number: this.arrayPanier[i].number,
								type:this.arrayPanier[i].type
								});
							this.arraySize[i]= new Array();
							for( var j=0;j<this.arrayPanier[i].product.quantity;j++){
							  this.arraySize[i][j]=j+1;
							}
						}
						this.storage.remove("panier");
						this.storage.set("panier",this.arrayFormatedPanier);
						this.prixTotal= this.totalPanier();
						this.panierSize=0;
						for(var i=0;i<this.arrayPanier.length;i++){
							this.panierSize+= this.arrayPanier[i].number;
						}
						
						
					}
					else{
						
					}

				},
				err => {
					console.log(err);
				},
				() => console.log('Movie Search Complete')
			);
			
			
			
			this.storage.get('favoris').then((val) => {	
				if(val!= undefined ){
					this.favorisSize= val.length;
				}
			});
			
			 
			
		}
		else
		{
			this.storage.get('panier').then((val) => {	
				if(val!= undefined ){
					this.arrayPanier=val;
					this.panierSize=0;
					for(var i=0;i<this.arrayPanier.length;i++){
							this.panierSize+= this.arrayPanier[i].number;
					}
				}
			});

			this.storage.get('favoris').then((val) => {	
				if(val!= undefined ){
					this.favorisSize= val.length;

				}
			});	
			
			this.parmPage = navParams.get('page');
			if(this.parmPage!=undefined){
					this.tab=this.parmPage;  
			}
		}
	});  
  } */

 /*  ionViewDidLoad() {
    console.log('ionViewDidLoad PanierBwmPage');
  } */

}
