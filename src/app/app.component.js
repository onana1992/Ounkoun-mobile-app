var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav, Platform, IonicApp, App, MenuController, AlertController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { FavorisPage } from '../pages/favoris/favoris';
import { RestProvider } from '../providers/rest/rest';
import { CategoriePage } from '../pages/categorie/categorie';
import { SousCategoriePage } from '../pages/sous-categorie/sous-categorie';
import { SousSCategoriePage } from '../pages/sous-s-categorie/sous-s-categorie';
import { StatusBar } from '@ionic-native/status-bar';
var MyApp = /** @class */ (function () {
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
    function MyApp(platform, restProvider, ionicApp, app, splashScreen, statusBar, alertCtrl, _menu) {
        // this.initializeApp();
        var _this = this;
        this.platform = platform;
        this.restProvider = restProvider;
        this.ionicApp = ionicApp;
        this.app = app;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this._menu = _menu;
        this.rootPage = HomePage;
        this.showLevel1 = null;
        this.showLevel2 = null;
        this.backButtonListener();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'List', component: ListPage }
        ];
        // this.backButtonListener();
        //this.setupBackButtonBehavior ();
        this.restProvider.getCategories().subscribe(function (data) {
            _this.categories = data.data;
            console.log(data);
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    }
    // pages: any;
    MyApp.prototype.toggleLevel1 = function (idx) {
        if (this.isLevel1Shown(idx)) {
            this.showLevel1 = null;
        }
        else {
            this.showLevel1 = idx;
        }
    };
    ;
    MyApp.prototype.toggleLevel2 = function (idx) {
        if (this.isLevel2Shown(idx)) {
            this.showLevel2 = null;
        }
        else {
            this.showLevel2 = idx;
        }
    };
    ;
    MyApp.prototype.isLevel1Shown = function (idx) {
        return this.showLevel1 === idx;
    };
    ;
    MyApp.prototype.isLevel2Shown = function (idx) {
        return this.showLevel2 === idx;
    };
    ;
    MyApp.prototype.backButtonListener = function () {
        var _this = this;
        var foo = { foo: true };
        history.pushState(foo, "Anything", " "); // Put something to history for back button
        window.onpopstate = function (evt) {
            // Close any active modals or overlays
            var activePortal = _this.ionicApp._loadingPortal.getActive() ||
                _this.ionicApp._modalPortal.getActive() || _this.ionicApp._toastPortal.getActive() ||
                _this.ionicApp._overlayPortal.getActive();
            if (activePortal) {
                activePortal.dismiss();
                return;
            }
        };
    };
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //this.statusBar.styleDefault();
            // this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.openCategorie = function (cat) {
        this.nav.push(CategoriePage, { nomCategorie: cat });
    };
    MyApp.prototype.openHome = function () {
        this.nav.push(HomePage);
    };
    MyApp.prototype.openMonCompte = function () {
        this.nav.push(HomePage, { page: "tab2" });
    };
    MyApp.prototype.openMonPanier = function () {
        this.nav.push(HomePage, { page: "tab3" });
    };
    MyApp.prototype.openMesFavoris = function () {
        this.nav.push(FavorisPage);
    };
    MyApp.prototype.openSousCategorie = function (cat, sCat) {
        this.nav.push(SousCategoriePage, { nomCategorie: cat, nomSousCategorie: sCat });
    };
    MyApp.prototype.openSSousCategorie = function (ssCat) {
        this.nav.push(SousSCategoriePage, { nomSousCategorie: ssCat });
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, RestProvider,
            IonicApp, App, SplashScreen, StatusBar, AlertController, MenuController])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map