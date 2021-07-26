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
import { IonicPage, NavController, NavParams, AlertController, Content, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { ProduitPage } from '../produit/produit';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
var FavorisPage = /** @class */ (function () {
    function FavorisPage(navCtrl, navParams, storage, restProvider, alertCtrl, popoverCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.restProvider = restProvider;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.isLoading = false;
        this.favorites = new Array();
        this.localFavorites = new Array();
        this.baseUrl = 'http://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        this.favorisVide = false;
        this.favorisData = { login: "", idProduct: "" };
        this.panierData = { login: "", idProduct: "", type: "detail", number: 1 };
        this.login = "";
        this.panierSize = 0;
        this.favorisSize = 0;
        this.showMessageAjoutPanier = false;
        this.isConnected = true;
        this.arrayPanier = new Array();
        this.panierArray = new Array();
        this.tab = "tab1";
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com/favoris.php';
        }
        this.isLoading = true;
        this.restProvider.setView1();
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == null) ? false : true;
            if (_this.isConnected) {
                _this.login = val.login;
            }
        });
        this.storage.get('user').then(function (val) {
            _this.userLogin = val.login;
            _this.restProvider.getFavorite(_this.userLogin).subscribe(function (data) {
                _this.isLoading = false;
                if (data.statut == "200") {
                    _this.favorites = data.data.favorites;
                    _this.favorisVide = _this.favorites.length == 0 ? true : false;
                    for (var i = 0; i < _this.favorites.length; i++) {
                        _this.localFavorites.push({
                            name: _this.favorites[i].product.name,
                            idPhoto: _this.favorites[i].product.idImage,
                            retailSale: _this.favorites[i].product.retailSale
                        });
                    }
                    _this.storage.set("favoris", _this.localFavorites);
                }
                else {
                }
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Movie Search Complete'); });
        });
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
    FavorisPage_1 = FavorisPage;
    FavorisPage.prototype.scrollToTop = function () {
        // Scrolls to the top, ie 0px to top.
        this.content.scrollToTop();
    };
    FavorisPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FavorisPage');
    };
    FavorisPage.prototype.gotoProduct = function (productName) {
        this.navCtrl.push(ProduitPage, { ProduitName: productName });
    };
    FavorisPage.prototype.goTorecheche = function () {
        this.navCtrl.push(RecherchePage);
    };
    FavorisPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    FavorisPage.prototype.confirmDelete = function (produit, event) {
        var _this = this;
        event.stopPropagation(); //THIS DOES THE MAGIC
        var alert = this.alertCtrl.create();
        alert.setTitle('Suppression');
        alert.setMessage(" voulez-vous vraiment supprimer le produits ");
        alert.addButton('Annuler');
        this.favorisData.login = this.userLogin;
        this.favorisData.idProduct = produit.id;
        alert.addButton({
            text: 'Supprimer',
            handler: function (data) {
                _this.isLoading = true;
                _this.restProvider.deleteFavori(_this.objecttoParams(_this.favorisData)).subscribe(function (data) {
                    if (data.statut == "200") {
                        _this.isLoading = false;
                        _this.storage.get('user').then(function (val) {
                            _this.userLogin = val.login;
                            _this.restProvider.getFavorite(_this.userLogin).subscribe(function (data) {
                                _this.isLoading = false;
                                if (data.statut == "200") {
                                    _this.favorites = [];
                                    _this.localFavorites = [];
                                    _this.favorites = data.data.favorites;
                                    _this.favorisVide = _this.favorites.length == 0 ? true : false;
                                    for (var i = 0; i < _this.favorites.length; i++) {
                                        _this.localFavorites.push({
                                            name: _this.favorites[i].product.name,
                                            idPhoto: _this.favorites[i].product.idImage,
                                            retailSale: _this.favorites[i].product.retailSale
                                        });
                                    }
                                    _this.favorisSize -= 1;
                                    _this.storage.set("favoris", _this.localFavorites);
                                }
                                else {
                                }
                            }, function (err) {
                                console.log(err);
                            }, function () { return console.log('Movie Search Complete'); });
                        });
                    }
                    else {
                    }
                }, function (err) {
                    console.log(err);
                }, function () { return console.log('Complete'); });
            }
        });
        alert.present();
    };
    FavorisPage.prototype.addPanier = function (produit, event) {
        var _this = this;
        event.stopPropagation(); //THIS DOES THE MAGIC
        var number = 0;
        this.storage.get('panier').then(function (val) {
            if (val != null) {
                _this.panierArray = val;
            }
            for (var i = 0; i < _this.panierArray.length; i++) {
                if (_this.panierArray[i].productId == produit.id && _this.panierArray[i].type == "detail") {
                    number = _this.panierArray[i].number;
                    _this.panierArray.splice(i, 1);
                }
            }
            if (number + 1 <= produit.quantity) {
                _this.panierArray.push({ productId: produit.id, name: produit.name, number: number + 1, type: "detail", product: produit });
                _this.storage.set("panier", _this.panierArray);
                _this.panierSize += 1;
                _this.showMessageAjoutPanier = true;
                setTimeout(function () {
                    _this.showMessageAjoutPanier = false;
                }, 2000);
                if (_this.isConnected) {
                    _this.panierData.login = _this.login;
                    _this.panierData.idProduct = produit.id;
                    _this.restProvider.postPanier(_this.objecttoParams(_this.panierData)).subscribe(function (data) {
                    }, function (err) {
                        console.log(err);
                    }, function () { return console.log('Complete'); });
                }
            }
            else {
            }
        });
    };
    FavorisPage.prototype.openPanier = function () {
        this.navCtrl.popToRoot();
        this.restProvider.setView3();
    };
    FavorisPage.prototype.openFavoris = function () {
        this.navCtrl.push(FavorisPage_1);
    };
    FavorisPage.prototype.disconnect = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Confirmation de la deconnexion');
        alert.setMessage("Voulez-vous vous deconnecter ?");
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
    FavorisPage.prototype.presentPopover = function (event) {
        var _this = this;
        var data = { isConnected: true };
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
    var FavorisPage_1;
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], FavorisPage.prototype, "content", void 0);
    FavorisPage = FavorisPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-favoris',
            templateUrl: 'favoris.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage,
            RestProvider, AlertController, PopoverController])
    ], FavorisPage);
    return FavorisPage;
}());
export { FavorisPage };
//# sourceMappingURL=favoris.js.map