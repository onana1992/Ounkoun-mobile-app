var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, } from '@angular/core';
import { NavController, PopoverController, AlertController, NavParams, ModalController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FavorisPage } from '../favoris/favoris';
import { PanierPage } from '../panier/panier';
import { RecherchePage } from '../recherche/recherche';
import { ConnexionPage } from '../connexion/connexion';
import { InscriptionPage } from '../inscription/inscription';
import { PopoverPage } from '../popover/popover';
import { CategoriePage } from '../categorie/categorie';
import { ProduitPage } from '../produit/produit';
import { ProfilPage } from '../profil/profil';
import { StorageProvider } from '../../providers/storage/storage';
import { PasswordPage } from '../password/password';
import { AdressePage } from '../adresse/adresse';
import { ProduitParMarquePage } from '../produit-par-marque/produit-par-marque';
import { CommandePage } from '../commande/commande';
import { RestProvider } from '../../providers/rest/rest';
import { MescmdPage } from '../mescmd/mescmd';
import { PasswordRecoverPage } from '../password-recover/password-recover';
import { AboutPage } from '../about/about';
import { AidePage } from '../aide/aide';
import { ContactPage } from '../contact/contact';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, popoverCtrl, navParams, restProvider, storageProvider, storage, alertCtrl, modalCtrl) {
        /*if(screen.width>=800){
           window.location.href = 'https://www.ounkoun.com';
        }*/
        var _this = this;
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.storageProvider = storageProvider;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.mySlideOptions = {
            pager: true
        };
        this.tab = "tab1";
        this.isLoading = false;
        this.isLoadingMarques = true;
        this.isLoadingCategories = true;
        this.isLoadingProduits = true;
        this.isLoadingBannieres = true;
        this.isLoadingDelete = false;
        this.isLoadingUpdate = false;
        this.isLoadingConnection = false;
        this.user = { login: "", dateDeNaiss: "", plainPassword: "", password: "", loginIsEmail: true, id: "", type: "", pseudo: "", sexe: "", name: "", firstName: "",
            adresseLivraison: null };
        this.arrayPanier = new Array();
        this.arrayFormatedPanier = new Array();
        this.loginFormSubmitted = false;
        this.isConnected = false;
        this.isLoginFailled = false;
        this.favoris = new Array();
        this.arraySize = new Array();
        this.panierLocal = new Array();
        this.panierDb = new Array();
        this.panierDiff = new Array();
        this.produits = new Array();
        this.bestBoissons = new Array();
        this.bestTelephones = new Array();
        this.bestTvs = new Array();
        this.bannieres = new Array();
        this.modifNumberData = { login: "", idProduct: "", type: "detail", number: "" };
        this.deletePanierData = { login: "", idProduct: "" };
        this.diffProductData = { login: "", idProduct: "", type: "detail", number: 0, };
        this.panierVide = false;
        this.prixTotal = 0;
        this.panierSize = 0;
        this.favorisSize = 0;
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        this.marques = new Array();
        this.informatiques = new Array();
        this.restProvider.getBestMarque("ppp").subscribe(function (data) {
            _this.marques = data.data;
            _this.isLoadingMarques = false;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.restProvider.getBannieres().subscribe(function (data) {
            _this.bannieres = data.data;
            _this.isLoadingBannieres = false;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.storage.get('panier').then(function (val) {
            if (val != undefined) {
                _this.arrayPanier = val;
                _this.panierSize = 0;
                for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                    _this.panierSize += parseInt(_this.arrayPanier[_this.i].number);
                }
            }
        });
        // get the best of boissons
        this.restProvider.getBestProduitPerCat("Boissons").subscribe(function (data) {
            _this.bestBoissons = data.data;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.restProvider.getBestProduitPerCat("Telephonie et accessoires").subscribe(function (data) {
            _this.bestTelephones = data.data;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.restProvider.getBestProduitPerCat("Tv, audio et photo").subscribe(function (data) {
            _this.bestTvs = data.data;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.restProvider.getBestProduitPerCat("Informatique").subscribe(function (data) {
            _this.informatiques = data.data;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.restProvider.getBestProduct().subscribe(function (data) {
            _this.produits = data.data;
            _this.isLoadingProduits = false;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == undefined) ? false : true;
            if (_this.isConnected) {
                _this.login = val.login;
                _this.user.pseudo = val.pseudo;
                _this.parmPage = navParams.get('page');
                if (_this.parmPage != undefined) {
                    _this.tab = _this.parmPage;
                    _this.isLoading = true;
                    _this.getPanier();
                }
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
                _this.storage.get('favoris').then(function (val) {
                    if (val != undefined) {
                        _this.favorisSize = val.length;
                    }
                });
            }
            else {
                _this.storage.get('panier').then(function (val) {
                    if (val != undefined) {
                        _this.arrayPanier = val;
                        _this.panierSize = 0;
                        for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                            _this.panierSize += _this.arrayPanier[_this.i].number;
                        }
                    }
                });
                _this.storage.get('favoris').then(function (val) {
                    if (val != undefined) {
                        _this.favorisSize = val.length;
                    }
                });
                _this.parmPage = navParams.get('page');
                if (_this.parmPage != undefined) {
                    _this.tab = _this.parmPage;
                }
            }
        });
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.isLoading = true;
        this.arrayPanier = [];
        this.parmPage = this.navParams.get('page');
        if (this.restProvider.view == "tab1") {
            this.tab = "tab1";
            this.isLoading = false;
            this.storage.get('user').then(function (val) {
                _this.isConnected = (val == undefined) ? false : true;
                if (_this.isConnected) {
                    _this.user = val;
                    _this.login = val.login;
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
                    }, function (err) {
                        console.log(err);
                    }, function () { return console.log('Movie Search Complete'); });
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
        else if (this.restProvider.view == "tab3") {
            this.storage.get('user').then(function (val) {
                _this.isConnected = (val == undefined) ? false : true;
                if (_this.isConnected) {
                    _this.login = val.login;
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
                            _this.tab = "tab3";
                            _this.isLoading = false;
                        }
                    }, function (err) {
                        console.log(err);
                    }, function () { return console.log('Movie Search Complete'); });
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
                        _this.tab = "tab3";
                        _this.isLoading = false;
                    });
                }
            });
        }
        else {
            this.tab = "tab2";
        }
        this.storage.get('panier').then(function (val) {
            _this.panierSize = 0;
            if (val != undefined) {
                _this.arrayPanier = val;
                _this.panierSize = 0;
                for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                    _this.panierSize += parseInt(_this.arrayPanier[_this.i].number);
                }
            }
        });
        this.storage.get('favoris').then(function (val) {
            if (val != undefined) {
                _this.favorisSize = val.length;
            }
        });
    };
    HomePage.prototype.changeTab = function (tab) {
        var _this = this;
        if (tab === "tab1") {
            this.tab = "tab1";
        }
        else if (tab === 'tab2') {
            this.tab = "tab2";
        }
        else if (tab === "tab3") {
            this.tab = "tab3";
            this.isLoading = true;
            this.panierVide = false;
            if (this.isConnected) {
                this.restProvider.getPanier(this.login).subscribe(function (data) {
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
                }, function (err) {
                    console.log(err);
                }, function () { return console.log('Movie Search Complete'); });
            }
            else {
                this.storage.get('panier').then(function (val) {
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
                });
                this.isLoading = false;
            }
        }
    };
    HomePage.prototype.getPanier = function () {
        var _this = this;
        if (this.isConnected) {
            this.restProvider.getPanier(this.login).subscribe(function (data) {
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
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Movie Search Complete'); });
        }
        else {
            this.isLoading = false;
            this.isLoadingDelete = false;
            this.panierVide = false;
            this.storage.get('panier').then(function (val) {
                if (val != undefined) {
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
            });
        }
    };
    HomePage.prototype.totalPanier = function () {
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
    HomePage.prototype.disconnect = function () {
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
            }
        });
        alert.present();
    };
    HomePage.prototype.presentPopover = function (event) {
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
                    _this.navCtrl.push(InscriptionPage);
                }
                else if (data == "4") {
                    _this.navCtrl.push(MescmdPage);
                }
            }
        });
    };
    //slides:any[];
    HomePage.prototype.openMarque = function (nom) {
        this.navCtrl.push(ProduitParMarquePage, { nomMarque: nom });
    };
    HomePage.prototype.openCategorie = function (cat) {
        this.navCtrl.push(CategoriePage, { nomCategorie: cat });
    };
    HomePage.prototype.openCommande = function () {
        if (this.isConnected) {
            this.navCtrl.push(CommandePage);
        }
        else {
            this.tab = "tab2";
        }
    };
    HomePage.prototype.gotoProduct = function (productName) {
        this.navCtrl.push(ProduitPage, { ProduitName: productName });
    };
    HomePage.prototype.goTo = function (page) {
        if (page === 'favoris') {
            if (this.isConnected) {
                this.navCtrl.push(FavorisPage);
            }
            else {
                this.tab = "tab2";
            }
        }
        else if (page === 'panier') {
            this.navCtrl.push(PanierPage);
        }
        else if (page === 'recherche') {
            this.navCtrl.push(RecherchePage);
        }
        else if (page === 'connexion') {
            this.navCtrl.push(ConnexionPage);
        }
        else if (page === 'categorie') {
            this.navCtrl.push(CategoriePage);
        }
        else if (page === 'produit') {
            this.navCtrl.push(ProduitPage);
        }
        if (page === 'inscription') {
            this.navCtrl.push(InscriptionPage);
        }
        if (page === 'profil') {
            this.navCtrl.push(ProfilPage);
        }
        if (page === 'password') {
            this.navCtrl.push(PasswordPage);
        }
        if (page === 'adresse') {
            this.navCtrl.push(AdressePage);
        }
        if (page === 'commande') {
            this.navCtrl.push(MescmdPage);
        }
        if (page === 'recover') {
            this.navCtrl.push(PasswordRecoverPage);
        }
        if (page === 'aide') {
            this.navCtrl.push(AidePage);
        }
        if (page === 'contact') {
            this.navCtrl.push(ContactPage);
        }
        if (page === 'about') {
            this.navCtrl.push(AboutPage);
        }
    };
    HomePage.prototype.back = function () {
        if (this.navCtrl.length() >= 2) {
            this.navCtrl.pop();
        }
    };
    HomePage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    HomePage.prototype.submitForm = function (form) {
        var _this = this;
        this.loginFormSubmitted = true;
        if (form.valid) {
            this.isLoadingConnection = true;
            this.restProvider.connecter(this.user.login, this.user.password).subscribe(function (data) {
                _this.isLoginFailled = false;
                _this.isLoadingConnection = false;
                if (data.statut == "200") {
                    _this.user.type = "standart";
                    _this.user.login = data.response.login;
                    _this.user.name = data.response.name;
                    _this.user.firstName = data.response.firstName;
                    _this.user.id = data.response.id;
                    _this.user.dateDeNaiss = data.response.dateDeNaiss.date;
                    _this.user.sexe = data.response.sex;
                    _this.user.pseudo = data.response.pseudo;
                    if (data.response.livraisonAddress != "null") {
                        _this.user.adresseLivraison = data.response.livraisonAddress;
                    }
                    for (_this.i = 0; _this.i < data.response.favorites.length; _this.i++) {
                        _this.favoris.push({ name: data.response.favorites[_this.i].product.name });
                    }
                    _this.storage.set("user", _this.user);
                    _this.storage.set("favoris", _this.favoris);
                    _this.isConnected = true;
                    _this.login = _this.user.login;
                    // gestion du panier
                    _this.arrayPanier = data.response.panier;
                    _this.panierSize = 0;
                    for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                        _this.panierSize += _this.arrayPanier[_this.i].number;
                    }
                    _this.panierDb = [];
                    for (_this.i = 0; _this.i < _this.arrayPanier.length; _this.i++) {
                        _this.panierDb.push({
                            productId: _this.arrayPanier[_this.i].product.id,
                            name: _this.arrayPanier[_this.i].name,
                            number: _this.arrayPanier[_this.i].number,
                            type: _this.arrayPanier[_this.i].type,
                            product: _this.arrayPanier
                        });
                    }
                    _this.panierLocal = Array();
                    _this.panierDiff = [];
                    _this.storage.get('panier').then(function (val) {
                        if (val != undefined) {
                            _this.panierLocal = val;
                            var trouver = false;
                            for (_this.i = 0; _this.i < val.length; _this.i++) {
                                trouver = false;
                                for (_this.j = 0; _this.j < _this.panierDb.length; _this.j++) {
                                    if (_this.panierDb[_this.j].productId == _this.panierLocal[_this.i].productId && _this.panierDb[_this.j].type == _this.panierLocal[_this.i].type) {
                                        _this.panierDb[_this.j].number += _this.panierLocal[_this.i].number;
                                        _this.panierDiff.push(_this.panierLocal[_this.i]);
                                        trouver = true;
                                    }
                                }
                                if (trouver == false) {
                                    _this.panierDb.push(_this.panierLocal[_this.i]);
                                    _this.panierDiff.push(_this.panierLocal[_this.i]);
                                }
                            }
                            _this.panierSize = 0;
                            for (_this.i = 0; _this.i < _this.panierDb.length; _this.i++) {
                                _this.panierSize += _this.panierDb[_this.i].number;
                            }
                            //enregistrement des article additifs
                            for (_this.i = 0; _this.i < _this.panierDiff.length; _this.i++) {
                                _this.diffProductData.login = _this.login;
                                _this.diffProductData.idProduct = _this.panierDiff[_this.i].productId;
                                _this.diffProductData.type = "detail";
                                _this.diffProductData.number = _this.panierDiff[_this.i].number;
                                _this.restProvider.postPanier(_this.objecttoParams(_this.diffProductData)).subscribe(function (data) {
                                }, function (err) {
                                    console.log(err);
                                }, function () { return console.log('Complete'); });
                            }
                        }
                        else {
                        }
                        _this.storage.set("panier", _this.panierDb);
                    });
                }
                else {
                    _this.isLoginFailled = true;
                }
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Movie Search Complete'); });
            this.loginFormSubmitted = false;
        }
    };
    HomePage.prototype.changeNumber = function (number, produitId) {
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
    HomePage.prototype.confirmDelete = function (produit, event) {
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
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, PopoverController, NavParams, RestProvider,
            StorageProvider, Storage, AlertController, ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map