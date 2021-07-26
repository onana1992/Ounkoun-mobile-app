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
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { FavorisPage } from '../favoris/favoris';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';
var AdressePage = /** @class */ (function () {
    function AdressePage(navCtrl, navParams, storage, restProvider, popoverCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.restProvider = restProvider;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.isLoading = true;
        this.user = { login: "", name: "", firstName: "", tel1: "", tel2: "", region: "", town: "", address: "", adresseLivraison: "" };
        this.localUser = { login: "", name: "", firstName: "", tel1: "", tel2: "", region: "", town: "", address: "", adresseLivraison: "" };
        this.login = "";
        this.hasAddress = false;
        this.panierSize = 0;
        this.favorisSize = 0;
        this.isConnected = false;
        this.tab = "tab1";
        this.arrayPanier = new Array();
        this.localites = [];
        //this.user.region= this.localites[0].region;
        // this.villes= this.localites[0].ville;
        /*this.localites= [{region: "centre", villes: ["yaounde-mendong","yaounde-biyem-assi","yaounde-ekounou"]}
        ,{region: "Littoral", villes: ["yaounde-mendong","yaounde-biyem-assi","yaounde-ekounou"]}];
  */
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com/adresse.php';
        }
        this.restProvider.setView1();
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == null) ? false : true;
            if (_this.isConnected) {
                _this.login = val.login;
            }
        });
        this.restProvider.getAllLocation().subscribe(function (data) {
            _this.localites = data.data;
            _this.user.region = _this.localites[0].region;
            _this.villes = _this.localites[0].villes;
            _this.isLoading = false;
            _this.storage.get('user').then(function (val) {
                _this.login = val.login;
                _this.user.login = val.login;
                _this.localUser = val;
                _this.hasAddress = val.adresseLivraison == null ? false : true;
                if (_this.hasAddress) {
                    _this.user.name = val.adresseLivraison.name;
                    _this.user.firstName = val.adresseLivraison.firstName;
                    _this.user.tel1 = val.adresseLivraison.tel1;
                    _this.user.tel2 = val.adresseLivraison.tel2;
                    _this.user.region = val.adresseLivraison.region;
                    _this.user.town = val.adresseLivraison.town;
                    _this.user.address = val.adresseLivraison.adresse;
                    for (var i = 0; i < _this.localites.length; i++) {
                        if (_this.localites[i].region == _this.user.region) {
                            _this.villes = _this.localites[i].villes;
                            return;
                        }
                    }
                }
            });
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.storage.get('panier').then(function (val) {
            if (val != undefined) {
                _this.panierSize = 0;
                for (var i = 0; i < val.length; i++) {
                    _this.panierSize += val[i].number;
                }
            }
        });
        this.storage.get('favoris').then(function (val) {
            if (val != undefined) {
                _this.favorisSize = val.length;
            }
        });
    }
    AdressePage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    AdressePage.prototype.changeNumber = function () {
        this.villes = [];
        //console.log(this.user.region);
        for (var i = 0; i < this.localites.length; i++) {
            if (this.localites[i].region == this.user.region) {
                this.villes = [];
                this.villes = this.localites[i].villes;
                i = this.localites.length;
            }
        }
    };
    AdressePage.prototype.ionViewDidLoad = function () {
        // this.user.region= this.localites[0].region;
        console.log('ionViewDidLoad AdressePage');
    };
    AdressePage.prototype.submitForm = function (form) {
        var _this = this;
        this.registrationFormSubmitted = true;
        if (form.valid) {
            this.isLoading = true;
            this.restProvider.postAdresse(this.objecttoParams(this.user)).subscribe(function (data) {
                if (data.statut == "200") {
                    _this.localUser.adresseLivraison = data.livraisonadresse;
                    _this.storage.set('user', _this.localUser);
                    _this.hasAddress = true;
                }
                else {
                }
                _this.isLoading = false;
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
            //form.reset();
            this.registrationFormSubmitted = false;
        }
        else {
        }
    };
    AdressePage.prototype.openPanier = function () {
        this.navCtrl.popToRoot();
        this.restProvider.setView3();
    };
    AdressePage.prototype.openFavoris = function () {
        this.navCtrl.push(FavorisPage);
    };
    AdressePage.prototype.goTorecheche = function () {
        this.navCtrl.push(RecherchePage);
    };
    AdressePage.prototype.disconnect = function () {
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
    AdressePage.prototype.presentPopover = function (event) {
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
                    //this.tab="tab2" ;
                    _this.navCtrl.popToRoot();
                    _this.restProvider.setView2();
                }
                else if (data == "3") {
                    _this.navCtrl.push(InscriptionPage);
                }
                else if (data == "4") {
                    _this.navCtrl.push(MescmdPage);
                }
            }
        });
    };
    AdressePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-adresse',
            templateUrl: 'adresse.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage, RestProvider,
            PopoverController, AlertController])
    ], AdressePage);
    return AdressePage;
}());
export { AdressePage };
//# sourceMappingURL=adresse.js.map