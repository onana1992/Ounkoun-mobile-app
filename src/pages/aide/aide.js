var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FavorisPage } from '../favoris/favoris';
import { RecherchePage } from '../recherche/recherche';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { RestProvider } from '../../providers/rest/rest';
import { AideLivraisonPage } from '../aide-livraison/aide-livraison';
import { AidePaiementPage } from '../aide-paiement/aide-paiement';
import { AideRetourPage } from '../aide-retour/aide-retour';
import { AideCommandePage } from '../aide-commande/aide-commande';
import { AideFraisPage } from '../aide-frais/aide-frais';
var AidePage = /** @class */ (function () {
    function AidePage(navCtrl, navParams, modalCtrl, alertCtrl, popoverCtrl, storage, restProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.storage = storage;
        this.restProvider = restProvider;
        this.view = "view1";
        this.tab = "tab1";
        this.filterOption = "filter-by-popularity";
        this.filterMarque = "null";
        this.filterMinPrice = "null";
        this.filterMaxPrice = "null";
        this.filterLabel = "Popularité";
        this.page = 1;
        this.isLoading = true;
        this.isFilterActivated = false;
        this.favoryArray = new Array();
        this.panierArray = new Array();
        this.arrayPanier = new Array();
        this.localFavoryArray = new Array();
        this.isConnected = false;
        this.panierSize = 0;
        this.favorisSize = 0;
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com';
        }
    }
    AidePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AidePage');
    };
    AidePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('panier').then(function (val) {
            if (val != undefined) {
                _this.arrayPanier = val;
                _this.panierSize = 0;
                for (var i = 0; i < _this.arrayPanier.length; i++) {
                    _this.panierSize += parseInt(_this.arrayPanier[i].number);
                }
            }
        });
        this.storage.get('favoris').then(function (val) {
            if (val != undefined) {
                _this.favorisSize = val.length;
            }
        });
    };
    AidePage.prototype.openPanier = function () {
        this.navCtrl.popToRoot();
        this.restProvider.setView3();
    };
    AidePage.prototype.goTorecheche = function () {
        this.navCtrl.push(RecherchePage);
    };
    AidePage.prototype.goToPaiement = function () {
        this.navCtrl.push(AidePaiementPage);
    };
    AidePage.prototype.goToLivraison = function () {
        this.navCtrl.push(AideLivraisonPage);
    };
    AidePage.prototype.goToRetour = function () {
        this.navCtrl.push(AideRetourPage);
    };
    AidePage.prototype.goToCommande = function () {
        this.navCtrl.push(AideCommandePage);
    };
    AidePage.prototype.goToFrais = function () {
        this.navCtrl.push(AideFraisPage);
    };
    AidePage.prototype.openFavoris = function () {
        if (this.isConnected) {
            this.navCtrl.push(FavorisPage);
        }
        else {
            this.navCtrl.push(HomePage, { page: "tab2" });
            this.navCtrl.popToRoot();
        }
    };
    AidePage.prototype.disconnect = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Confirmation de la deconnexion');
        alert.setMessage(" voulez-vous deconnecter");
        alert.addButton('Non');
        alert.addButton({
            text: 'Oui',
            handler: function (data) {
                _this.storage.remove('user');
                _this.storage.remove('favoris');
                _this.storage.remove('panier');
                _this.panierSize = 0;
                _this.arrayPanier = [];
                _this.favorisSize = 0;
                _this.isConnected = false;
                _this.navCtrl.popToRoot();
                _this.restProvider.setView1();
            }
        });
        alert.present();
    };
    AidePage.prototype.presentPopover = function (event) {
        var _this = this;
        var data = { isConnected: this.isConnected };
        var popover = this.popoverCtrl.create(PopoverPage, { data: data });
        popover.present({ ev: event });
        popover.onDidDismiss(function (data) {
            if (data != null) {
                if (data == "1") {
                    _this.disconnect();
                }
                else if (data == "2") {
                    _this.tab = "tab2";
                }
                else if (data == "3") {
                    _this.navCtrl.popToRoot();
                    _this.restProvider.setView2();
                }
                else if (data == "4") {
                    _this.navCtrl.push(MescmdPage);
                }
            }
        });
    };
    AidePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-aide',
            templateUrl: 'aide.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ModalController, AlertController, PopoverController,
            Storage, RestProvider])
    ], AidePage);
    return AidePage;
}());
export { AidePage };
//# sourceMappingURL=aide.js.map