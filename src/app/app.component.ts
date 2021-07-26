import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, Platform ,IonicApp,App,MenuController,AlertController} from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FavorisPage } from '../pages/favoris/favoris';
import { RestProvider } from '../providers/rest/rest';
import { CategoriePage } from '../pages/categorie/categorie';
import { SousCategoriePage } from '../pages/sous-categorie/sous-categorie';
import { SousSCategoriePage } from '../pages/sous-s-categorie/sous-s-categorie';
import { StatusBar } from '@ionic-native/status-bar';
import { EncheresPage } from  '../pages/encheres/encheres';
import { BestProductsPage}  from  '../pages/best-products/best-products';
import { DownloadPage } from  '../pages/download/download';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  showLevel1 = null;
  showLevel2 = null;
  categories:any;
  baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
  actualVersion:string='1';
  version:string;


 
  // pages: any;
  toggleLevel1(idx) {
  	if (this.isLevel1Shown(idx)) {
  		this.showLevel1 = null;
  	} else {
  		this.showLevel1 = idx;
  	}
  };

  toggleLevel2(idx) {
  	if (this.isLevel2Shown(idx)) {
  		this.showLevel2 = null;
  	} else {
  		this.showLevel2 = idx;
  	}
  };

  isLevel1Shown(idx) {
      return this.showLevel1 === idx;
  };

 isLevel2Shown(idx) {
  return this.showLevel2 === idx;
 };
 
  response:any;
  
  backButtonListener(): void {

     var foo = { foo: true };
     history.pushState(foo, "Anything", " "); // Put something to history for back button

     window.onpopstate = (evt) => {
      // Close any active modals or overlays
      let activePortal = this.ionicApp._loadingPortal.getActive() ||
        this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() ||
        this.ionicApp._overlayPortal.getActive();
        if (activePortal) {
          activePortal.dismiss();
          return;
        }
     }

  }

  /*private setupBackButtonBehavior () {

    // If on web version (browser)
    if (window.location.protocol !== "file:") {

    // Register browser back button action(s)
    window.onpopstate = (evt) => {

        // Close menu if open
        if (this._menu.isOpen()) {
          this._menu.close ();
          return;
        }

        // Close any active modals or overlays
        let activePortal = this.ionicApp._loadingPortal.getActive() ||
          this.ionicApp._modalPortal.getActive() ||
          this.ionicApp._toastPortal.getActive() ||
          this.ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
          return;
        }

        // Navigate back
        if (this.app.getRootNav().canGoBack()) this.app.getRootNav().pop();

      };

      // Fake browser history on each view enter
      this.app.viewDidEnter.subscribe((app) => {
        history.pushState (null, null, "");
      });
    }
  }
*/
  constructor(public platform: Platform, private restProvider: RestProvider,
    private ionicApp: IonicApp, private app:App, private splashScreen:SplashScreen, statusBar: StatusBar,  public alertCtrl: AlertController,private _menu: MenuController) {
    

      this.restProvider.getVersion().subscribe(
      data => {
          this.version = data.version;
          if(this.version > this.actualVersion){
            this.nav.setRoot(DownloadPage);
          }
      },
      err => {
          console.log(err);
       },
          () => console.log('Complete')
    );

    this.initializeApp();

   // this.backButtonListener()

    // used for an example of ngFor and navigation


    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];
	
	// this.backButtonListener();
  //this.setupBackButtonBehavior ();
	
  	this.restProvider.getCategories().subscribe(
          data => {
              this.categories = data.data;
              console.log(data);
          },
          err => {
              console.log(err);
          },
          () => console.log('Complete')
      );

    }

    configureBkBtnprocess () {

    // If you are on chrome (browser)
    if (window.location.protocol !== "file:") {

      // Register browser back button action and you can perform
      // your own actions like as follows
      window.onpopstate = (evt) => {

        // Close menu if open
        if (this._menu.isOpen())  {
          this._menu.close ();
          return;
        }

        // Close any active modals or overlays
        let activePortal = this.ionicApp._loadingPortal.getActive() ||
          this.ionicApp._modalPortal.getActive() ||
          this.ionicApp._toastPortal.getActive() ||
          this.ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
          return;
        }
     
        // Navigate back
        //if (this.app.getRootNav().canGoBack()) 
        //this.app.getRootNav().pop();
       

        
      }
    }  
    else{
        // you are in the app

      };

    
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.configureBkBtnprocess ();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
     // this.splashScreen.hide();
    }); 
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openEnchere(){
    this.nav.push(EncheresPage);
  }
  
  openCategorie(cat){
	  this.nav.push(CategoriePage, {nomCategorie :cat });  
  }
  
  openHome(){
	this.nav.push(HomePage);  
  }
  
  openMonCompte(){
	this.nav.push(HomePage, { page :"tab2" });  
  }
  
  openMonPanier(){
	this.nav.push(HomePage, { page :"tab3" });  
  }
  
  openMesFavoris(){
	this.nav.push(FavorisPage);  
  }
  
  openSousCategorie(cat,sCat){
	this.nav.push(SousCategoriePage, {nomCategorie :cat,nomSousCategorie :sCat});  
  }
  
  openSSousCategorie(ssCat){
	this.nav.push(SousSCategoriePage, { nomSousCategorie :ssCat });  
  }

  openBest(){
    this.nav.push(BestProductsPage);
  }

  openDownload(){
    this.nav.push(DownloadPage);
  }


  
}
