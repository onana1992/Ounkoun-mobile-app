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
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { CommandePage } from '../commande/commande';
import { FavorisPage } from '../favoris/favoris';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { InscriptionPage } from '../inscription/inscription';
/**
 * Generated class for the PanierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PanierPage = /** @class */ (function () {
    function PanierPage(navCtrl, navParams, storage, restProvider, alertCtrl, popoverCtrl, toastController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.restProvider = restProvider;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.toastController = toastController;
        this.isLoadingDelete = false;
        this.isLoading = true;
        this.panierVide = false;
        this.arraySize = new Array();
        this.arrayPanier = new Array();
        this.panierSize = 0;
        this.isLoadingUpdate = false;
        this.isLoadingConnection = false;
        this.user = { login: "", dateDeNaiss: "", plainPassword: "", password: "", loginIsEmail: true, id: "", type: "", pseudo: "", sexe: "", name: "", firstName: "",
            adresseLivraison: null };
        this.arrayFormatedPanier = new Array();
        this.loginFormSubmitted = false;
        this.isConnected = false;
        this.isLoginFailled = false;
        this.favoris = new Array();
        this.panierLocal = new Array();
        this.panierDb = new Array();
        this.panierDiff = new Array();
        this.produits = new Array();
        this.bestBoissons = new Array();
        this.bannieres = new Array();
        this.modifNumberData = { login: "", idProduct: "", type: "detail", number: "" };
        this.deletePanierData = { login: "", idProduct: "" };
        this.diffProductData = { login: "", idProduct: "", type: "detail", number: 0, };
        this.prixTotal = 0;
        this.favorisSize = 0;
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        this.storage.get('panier').then(function (val) {
            if (val != undefined) {
                _this.arrayPanier = val;
                _this.panierSize = 0;
                for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                    _this.panierSize += parseInt(_this.arrayPanier[_this.i].number);
                }
            }
        });
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == undefined) ? false : true;
            if (_this.isConnected) {
                _this.isLoading = true;
                _this.login = val.login;
                _this.user.pseudo = val.pseudo;
                _this.restProvider.getPanier(_this.login).subscribe(function (data) {
                    if (data.statut == "200") {
                        _this.arrayPanier = data.data.products;
                        _this.panierVide = _this.arrayPanier.length == 0 ? true : false;
                        _this.arrayFormatedPanier = [];
                        for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                            _this.arrayFormatedPanier.push({
                                productId: _this.arrayPanier[_this.i].product.id,
                                name: _this.arrayPanier[_this.i].product.name,
                                number: _this.arrayPanier[_this.i].number,
                                type: _this.arrayPanier[_this.i].type
                            });
                            _this.arraySize[_this.i] = new Array();
                            for (_this.j = 0; _this.j < _this.arrayPanier[_this.i].product.quantity; _this.j++) {
                                _this.arraySize[_this.i][_this.j] = _this.j + 1;
                            }
                        }
                        _this.storage.remove("panier");
                        _this.storage.set("panier", _this.arrayFormatedPanier);
                        _this.prixTotal = _this.totalPanier();
                        _this.panierSize = 0;
                        for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                            _this.panierSize += _this.arrayPanier[_this.i].number;
                        }
                        _this.isLoading = false;
                    }
                    else {
                    }
                }, function (err) {
                    console.log(err);
                }, function () { return console.log('Movie Search Complete'); });
                _this.storage.get('favoris').then(function (val) {
                    if (val != undefined) {
                        _this.favorisSize = val.length;
                    }
                });
            }
            else {
                _this.storage.get('panier').then(function (val) {
                    _this.panierVide = true;
                    if (val != null) {
                        _this.arrayPanier = val;
                        _this.panierVide = _this.arrayPanier.length == 0 ? true : false;
                        _this.panierSize = 0;
                        _this.prixTotal = _this.totalPanier();
                        for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                            _this.panierSize += _this.arrayPanier[_this.i].number;
                            _this.arraySize[_this.i] = new Array();
                            for (_this.j = 0; _this.j < _this.arrayPanier[_this.i].product.quantity; _this.j++) {
                                _this.arraySize[_this.i][_this.j] = _this.j + 1;
                            }
                        }
                    }
                    _this.isLoading = false;
                });
            }
        });
    }
    PanierPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    PanierPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PanierPage');
    };
    PanierPage.prototype.totalPanier = function () {
        var total = 0;
        for (this.i = 0; this.i < this.arrayPanier.length; this.i++) {
            if (this.arrayPanier[this.i].number <= this.arrayPanier[this.i].product.quantity) {
                if (this.arrayPanier[this.i].product.retailSale.isInPromotion) {
                    total += this.arrayPanier[this.i].number * this.arrayPanier[this.i].product.retailSale.promotionalPrice;
                }
                else {
                    total += this.arrayPanier[this.i].number * this.arrayPanier[this.i].product.retailSale.price;
                }
            }
        }
        return total;
    };
    PanierPage.prototype.changeNumber = function (number, produitId) {
        var _this = this;
        this.modifNumberData.login = this.login;
        this.modifNumberData.idProduct = produitId;
        this.modifNumberData.number = number;
        this.prixTotal = this.totalPanier();
        if (this.isConnected) {
            this.restProvider.modifyPanier(this.objecttoParams(this.modifNumberData)).subscribe(function (data) {
                _this.restProvider.getPanier(_this.login).subscribe(function (data) {
                    if (data.statut == "200") {
                        _this.isLoading = false;
                        _this.arrayPanier = data.data.products;
                        _this.panierVide = _this.arrayPanier.length == 0 ? true : false;
                        _this.arrayFormatedPanier = [];
                        for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                            _this.arrayFormatedPanier.push({
                                productId: _this.arrayPanier[_this.i].product.id,
                                name: _this.arrayPanier[_this.i].product.name,
                                number: _this.arrayPanier[_this.i].number,
                                type: _this.arrayPanier[_this.i].type
                            });
                            _this.arraySize[_this.i] = new Array();
                            for (_this.j = 0; _this.j < _this.arrayPanier[_this.i].product.quantity; _this.j++) {
                                _this.arraySize[_this.i][_this.j] = _this.j + 1;
                            }
                        }
                        _this.storage.remove("panier");
                        _this.storage.set("panier", _this.arrayFormatedPanier);
                        _this.prixTotal = _this.totalPanier();
                        _this.panierSize = 0;
                        for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                            _this.panierSize += _this.arrayPanier[_this.i].number;
                        }
                    }
                    else {
                    }
                }, function (err) {
                    console.log(err);
                }, function () { return console.log('Movie Search Complete'); });
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
        }
        else {
            this.isLoading = false;
            this.prixTotal = this.totalPanier();
            this.panierSize = 0;
            for (this.i = 0; this.i < this.arrayPanier.length; this.i++) {
                this.arrayPanier[this.i].number = parseInt(this.arrayPanier[this.i].number);
            }
            for (this.i = 0; this.i < this.arrayPanier.length; this.i++) {
                this.panierSize += parseInt(this.arrayPanier[this.i].number);
            }
            this.storage.remove("panier");
            this.storage.set("panier", this.arrayPanier);
        }
    };
    PanierPage.prototype.confirmDelete = function (produit, event) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Suppression');
        alert.setMessage(" voulez-vous vraiment retirer le produits du panier ? ");
        alert.addButton('Annuler');
        this.deletePanierData.login = this.login;
        this.deletePanierData.idProduct = produit.id;
        alert.addButton({
            text: 'Supprimer',
            handler: function (data) {
                _this.isLoadingDelete = true;
                //supression dans la memoire locale
                _this.storage.get('panier').then(function (val) {
                    _this.panierLocal = val;
                    for (_this.i = 0; _this.i < _this.panierLocal.length; _this.i++) {
                        if (produit.id == _this.panierLocal[_this.i].productId && _this.panierLocal[_this.i].type == "detail") {
                            _this.panierLocal.splice(_this.i, 1);
                        }
                    }
                    for (_this.j = 0; _this.j < _this.arrayPanier.length; _this.j++) {
                        if (produit.id == _this.arrayPanier[_this.j].product.id) {
                            _this.arrayPanier.splice(_this.j, 1);
                        }
                    }
                    _this.panierSize = 0;
                    for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                        _this.panierSize += _this.arrayPanier[_this.i].number;
                    }
                    _this.prixTotal = _this.totalPanier();
                    _this.storage.remove("panier");
                    _this.storage.set("panier", _this.panierLocal);
                    //supression dans la bd
                    if (_this.isConnected) {
                        _this.restProvider.deletePanier(_this.objecttoParams(_this.deletePanierData)).subscribe(function (data) {
                            if (data.statut == "200") {
                                _this.isLoadingDelete = false;
                                _this.panierVide = _this.arrayPanier.length == 0 ? true : false;
                                _this.restProvider.getPanier(_this.login).subscribe(function (data) {
                                    if (data.statut == "200") {
                                        _this.isLoading = false;
                                        _this.arrayPanier = data.data.products;
                                        _this.panierVide = _this.arrayPanier.length == 0 ? true : false;
                                        _this.arrayFormatedPanier = [];
                                        for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                                            _this.arrayFormatedPanier.push({
                                                productId: _this.arrayPanier[_this.i].product.id,
                                                name: _this.arrayPanier[_this.i].product.name,
                                                number: _this.arrayPanier[_this.i].number,
                                                type: _this.arrayPanier[_this.i].type
                                            });
                                            _this.arraySize[_this.i] = new Array();
                                            for (_this.j = 0; _this.j < _this.arrayPanier[_this.i].product.quantity; _this.j++) {
                                                _this.arraySize[_this.i][_this.j] = _this.j + 1;
                                            }
                                        }
                                        _this.storage.remove("panier");
                                        _this.storage.set("panier", _this.arrayFormatedPanier);
                                        _this.prixTotal = _this.totalPanier();
                                        _this.panierSize = 0;
                                        for (var k = 0; k < _this.arrayPanier.length; k++) {
                                            _this.panierSize += _this.arrayPanier[k].number;
                                        }
                                    }
                                    else {
                                    }
                                }, function (err) {
                                    console.log(err);
                                }, function () { return console.log('Movie Search Complete'); });
                            }
                            else {
                                _this.isLoadingDelete = false;
                            }
                        }, function (err) {
                            console.log(err);
                        }, function () { return console.log('Complete'); });
                    }
                    else {
                        _this.isLoadingDelete = false;
                        _this.panierVide = _this.arrayPanier.length == 0 ? true : false;
                    }
                });
            }
        });
        alert.present();
    };
    PanierPage.prototype.openCommande = function () {
        if (this.isConnected) {
            this.navCtrl.push(CommandePage);
        }
        else {
            this.restProvider.setView2();
            this.navCtrl.popToRoot();
        }
    };
    PanierPage.prototype.goTorecheche = function () {
        this.navCtrl.push(RecherchePage);
    };
    PanierPage.prototype.openFavoris = function () {
        if (this.isConnected) {
            this.navCtrl.push(FavorisPage);
        }
        else {
            var toast = this.toastController.create({
                message: 'Veuillez vous connecter, pour avoir accès aux favoris',
                showCloseButton: true,
                position: 'bottom',
                duration: 3000
            });
            toast.present();
            this.navCtrl.popToRoot();
            this.restProvider.setView2();
        }
    };
    PanierPage.prototype.disconnect = function () {
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
    PanierPage.prototype.presentPopover = function (event) {
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
    PanierPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-panier',
            templateUrl: 'panier.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage, RestProvider, AlertController,
            PopoverController, ToastController])
    ], PanierPage);
    return PanierPage;
}());
export { PanierPage };
//# sourceMappingURL=panier.js.map