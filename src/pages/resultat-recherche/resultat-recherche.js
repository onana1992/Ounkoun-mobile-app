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
import { IonicPage, NavController, PopoverController, NavParams, ModalController, AlertController, Content, ActionSheetController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProduitPage } from '../produit/produit';
import { Storage } from '@ionic/storage';
import { FavorisPage } from '../favoris/favoris';
import { FiltreModalRecherchePage } from '../filtre-modal-recherche/filtre-modal-recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { PanierPage } from '../panier/panier';
var ResultatRecherchePage = /** @class */ (function () {
    function ResultatRecherchePage(navCtrl, popoverCtrl, navParams, restProvider, modalCtrl, alertCtrl, storage, actionSheetCtrl, toastController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastController = toastController;
        this.view = "view1";
        this.tab = "tab1";
        this.arrayPanier = new Array();
        this.filterOption = "filter-by-most-rescent";
        this.filterLabel = "Plus rescent";
        this.filterMarque = "null";
        this.filterMinPrice = "null";
        this.filterMaxPrice = "null";
        this.page = 1;
        this.isLoading = true;
        this.favoryArray = new Array();
        this.panierArray = new Array();
        this.localFavoryArray = new Array();
        this.otherModels = new Array();
        this.showMessageAjoutFavori = false;
        this.showMessageAjoutPanier = false;
        this.favorisData = { login: "", idProduct: "" };
        this.panierData = { login: "", idProduct: "", type: "detail", number: 1 };
        this.login = "";
        this.isConnected = false;
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        this.panierSize = 0;
        this.favorisSize = 0;
        this.isFilterActivated = false;
        this.restProvider.setView1();
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == null) ? false : true;
            if (_this.isConnected) {
                _this.login = val.login;
            }
        });
        this.categorieName = navParams.get('CategorieName');
        this.textSearch = navParams.get('SearchText');
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == null) ? false : true;
            if (_this.isConnected) {
                _this.login = val.login;
            }
        });
        this.restProvider.getResultatRecherche(this.textSearch, this.categorieName, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque).subscribe(function (data) {
            _this.response = data.data;
            _this.produits = data.data.products;
            _this.searchCategories = data.data.categories;
            _this.size = data.data.size;
            _this.nbProduits = data.data.size;
            _this.isLoading = false;
            console.log(data);
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
    ResultatRecherchePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoriePage');
    };
    ResultatRecherchePage.prototype.scrollToTop = function () {
        // Scrolls to the top, ie 0px to top.
        this.content.scrollToTop();
    };
    ResultatRecherchePage.prototype.changeView = function (view) {
        if (view === "view1") {
            this.view = "view2";
        }
        else if (view === 'view2') {
            this.view = "view3";
        }
        else if (view === "view3") {
            this.view = "view1";
        }
    };
    ResultatRecherchePage.prototype.showTriChoix = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Trier par:');
        alert.addInput({
            type: 'radio',
            label: 'plus rescent',
            value: 'filter-by-most-rescent',
            checked: this.filterOption == 'filter-by-most-rescent' ? true : false,
        });
        alert.addInput({
            type: 'radio',
            label: 'prix decroissant',
            value: 'filter-by-price-desc',
            checked: this.filterOption == 'filter-by-price-desc' ? true : false,
        });
        alert.addInput({
            type: 'radio',
            label: 'prix croisant',
            value: 'filter-by-price-asc',
            checked: this.filterOption == 'fliter-by-price-asc' ? true : false,
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                //this.testRadioOpen = false;
                //this.testRadioResult = data;
                _this.filterOption = data;
                if (_this.filterOption == "filter-by-most-rescent") {
                    _this.filterLabel = "Plus rescent";
                }
                else if (_this.filterOption == "filter-by-price-desc") {
                    _this.filterLabel = "Prix desc.";
                }
                else if (_this.filterOption == "filter-by-price-asc") {
                    _this.filterLabel = "Prix asc.";
                }
                console.log('Radio data:', data);
                _this.isLoading = true;
                _this.restProvider.getResultatRecherche(_this.textSearch, _this.categorieName, _this.page, _this.filterOption, _this.filterMinPrice, _this.filterMaxPrice, _this.filterMarque).subscribe(function (data) {
                    _this.response = data.data;
                    _this.produits = data.data.products;
                    _this.isLoading = false;
                    console.log(data);
                }, function (err) {
                    console.log(err);
                }, function () { return console.log('Complete'); });
            }
        });
        alert.present();
    };
    ResultatRecherchePage.prototype.showPageChoix = function () {
        var _this = this;
        var modulo = 0;
        var nbPage = 0;
        var alert = this.alertCtrl.create();
        alert.setTitle('Aller a la page:');
        modulo = this.nbProduits % 40;
        nbPage = (modulo == 0) ? (this.nbProduits / 40) : Math.ceil(this.nbProduits / 40);
        for (var i = 0; i < nbPage; i++) {
            alert.addInput({
                type: 'radio',
                label: '' + (i + 1) + '',
                value: (i + 1).toString(),
                checked: (this.page == i + 1) ? true : false,
            });
        }
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                _this.page = data;
                console.log('Radio data:', data);
                _this.isLoading = true;
                _this.restProvider.getResultatRecherche(_this.textSearch, _this.categorieName, _this.page, _this.filterOption, _this.filterMinPrice, _this.filterMaxPrice, _this.filterMarque).subscribe(function (data) {
                    _this.response = data.data;
                    _this.produits = data.data.products;
                    _this.isLoading = false;
                    console.log(data);
                }, function (err) {
                    console.log(err);
                }, function () { return console.log('Complete'); });
            }
        });
        alert.present();
    };
    ResultatRecherchePage.prototype.goSuivant = function () {
        var _this = this;
        var modulo = 0;
        var nbPage = 0;
        modulo = this.nbProduits % 40;
        nbPage = (modulo == 0) ? (this.nbProduits / 40) : Math.ceil(this.nbProduits / 40);
        if (nbPage > this.page) {
            this.isLoading = true;
            this.page++;
            this.restProvider.getResultatRecherche(this.textSearch, this.categorieName, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque).subscribe(function (data) {
                _this.response = data.data;
                _this.produits = data.data.products;
                _this.isLoading = false;
                console.log(data);
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
        }
    };
    ResultatRecherchePage.prototype.goPrecedant = function () {
        var _this = this;
        if (this.page > 1) {
            this.isLoading = true;
            this.page--;
            this.restProvider.getResultatRecherche(this.textSearch, this.categorieName, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque).subscribe(function (data) {
                _this.response = data.data;
                _this.produits = data.data.products;
                _this.searchCategories = data.data.categories;
                _this.size = data.data.size;
                _this.isLoading = false;
                console.log(data);
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
        }
    };
    ResultatRecherchePage.prototype.gotoProduct = function (productName) {
        this.navCtrl.push(ProduitPage, { ProduitName: productName });
    };
    ResultatRecherchePage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    ResultatRecherchePage.prototype.addFavorite = function (produit, event) {
        var _this = this;
        event.stopPropagation(); //THIS DOES THE MAGIC
        if (this.isConnected) {
            this.storage.get('favoris').then(function (val) {
                if (val != null) {
                    _this.localFavoryArray = val;
                    for (var i = 0; i < val.length; i++) {
                        if (produit.name == val[i].name) {
                            return;
                        }
                    }
                    _this.localFavoryArray.push({ name: produit.name });
                    _this.storage.set("favoris", _this.localFavoryArray);
                    _this.showMessageAjoutFavori = true;
                    _this.favorisSize += 1;
                    setTimeout(function () {
                        _this.showMessageAjoutFavori = false;
                    }, 2000);
                    _this.favorisData.login = _this.login;
                    _this.favorisData.idProduct = produit.id;
                    _this.restProvider.postFavori(_this.objecttoParams(_this.favorisData)).subscribe(function (data) {
                    }, function (err) {
                        console.log(err);
                    }, function () { return console.log('Complete'); });
                }
                else {
                    _this.localFavoryArray.push({ name: produit });
                    _this.storage.set("favoris", _this.localFavoryArray);
                    _this.favorisSize += 1;
                }
            });
        }
        else {
            alert("pas connecter");
        }
    };
    ResultatRecherchePage.prototype.addPanier = function (produit, event) {
        var _this = this;
        event.stopPropagation(); //THIS DOES THE MAGIC
        var number = 0;
        if (produit.isVirtual) {
            this.presentActionSheet(produit.productName, produit.name);
        }
        else {
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
        }
    };
    ResultatRecherchePage.prototype.openPanier = function () {
        this.navCtrl.push(PanierPage);
    };
    ResultatRecherchePage.prototype.openFavoris = function () {
        if (this.isConnected) {
            this.navCtrl.push(FavorisPage);
        }
        else {
            var toast = this.toastController.create({
                message: 'Veuillez vous connecter, pour avoir acc??s aux favoris',
                showCloseButton: true,
                position: 'bottom',
                duration: 3000
            });
            toast.present();
            this.navCtrl.popToRoot();
            this.restProvider.setView2();
        }
    };
    ResultatRecherchePage.prototype.showFiltreModal = function () {
        var _this = this;
        var myModal = this.modalCtrl.create(FiltreModalRecherchePage, { 'textSearch': this.textSearch, 'categorieName': this.categorieName });
        myModal.present();
        myModal.onDidDismiss(function (data) {
            if (data != undefined) {
                if (data.filter == "categorie") {
                    _this.isLoading = true;
                    _this.categorieName = data.categorie;
                    _this.restProvider.getResultatRecherche(_this.textSearch, _this.categorieName, _this.page, _this.filterOption, _this.filterMinPrice, _this.filterMaxPrice, _this.filterMarque).subscribe(function (data) {
                        _this.response = data.data;
                        _this.produits = data.data.products;
                        _this.searchCategories = data.data.categories;
                        _this.size = data.data.size;
                        _this.nbProduits = data.data.size;
                        _this.isLoading = false;
                        _this.isFilterActivated = true;
                        console.log(data);
                    }, function (err) {
                        console.log(err);
                    }, function () { return console.log('Complete'); });
                }
                else if (data.filter == "marque") {
                    _this.isLoading = true;
                    _this.isFilterActivated = true;
                    _this.filterMarque = data.marque;
                    _this.restProvider.getResultatRecherche(_this.textSearch, _this.categorieName, _this.page, _this.filterOption, _this.filterMinPrice, _this.filterMaxPrice, _this.filterMarque).subscribe(function (data) {
                        _this.response = data.data;
                        _this.produits = data.data.products;
                        _this.searchCategories = data.data.categories;
                        _this.size = data.data.size;
                        _this.nbProduits = data.data.size;
                        _this.isLoading = false;
                        _this.isFilterActivated = true;
                        console.log(data);
                    }, function (err) {
                        console.log(err);
                    }, function () { return console.log('Complete'); });
                }
                else if (data.filter == "prix") {
                    _this.isLoading = true;
                    _this.filterMinPrice = data.valeur.lower;
                    _this.filterMaxPrice = data.valeur.upper;
                    _this.isFilterActivated = true;
                    _this.restProvider.getResultatRecherche(_this.textSearch, _this.categorieName, _this.page, _this.filterOption, _this.filterMinPrice, _this.filterMaxPrice, _this.filterMarque).subscribe(function (data) {
                        _this.response = data.data;
                        _this.produits = data.data.products;
                        _this.searchCategories = data.data.categories;
                        _this.size = data.data.size;
                        _this.nbProduits = data.data.size;
                        _this.isLoading = false;
                        _this.isFilterActivated = true;
                        console.log(data);
                    }, function (err) {
                        console.log(err);
                    }, function () { return console.log('Complete'); });
                }
            }
        });
    };
    ResultatRecherchePage.prototype.cancelFilter = function () {
        var _this = this;
        this.filterMinPrice = "null";
        this.filterMaxPrice = "null";
        this.filterMarque = "null";
        this.categorieName = "null";
        this.isLoading = true;
        this.restProvider.getResultatRecherche(this.textSearch, this.categorieName, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque).subscribe(function (data) {
            _this.response = data.data;
            _this.produits = data.data.products;
            _this.searchCategories = data.data.categories;
            _this.size = data.data.size;
            _this.nbProduits = data.data.size;
            _this.isLoading = false;
            _this.isFilterActivated = false;
            console.log(data);
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    ResultatRecherchePage.prototype.disconnect = function () {
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
    ResultatRecherchePage.prototype.presentPopover = function (event) {
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
                    _this.restProvider.setView1();
                }
                else if (data == "4") {
                    _this.navCtrl.push(MescmdPage);
                }
            }
        });
    };
    ResultatRecherchePage.prototype.addPanier1 = function (produit) {
        var _this = this;
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
    ResultatRecherchePage.prototype.presentActionSheet = function (produitName, modelName) {
        var _this = this;
        this.isLoading = true;
        this.restProvider.getModels(produitName).subscribe(function (data) {
            //this.response = data.data;
            _this.otherModels = [];
            _this.otherModels = data.data.product;
            _this.isLoading = false;
            //this.isLoading = false;
            for (var i = 0; i < _this.otherModels.length; i++) {
                if (_this.otherModels[i].name == modelName) {
                    _this.otherModels.splice(i, 1);
                }
            }
            var buttons = [];
            var _loop_1 = function (i_1) {
                var button = {
                    text: _this.otherModels[i_1].taille,
                    handler: function () {
                        _this.addPanier1(_this.otherModels[i_1]);
                    }
                };
                buttons.push(button);
            };
            for (var i_1 = 0; i_1 < _this.otherModels.length; i_1++) {
                _loop_1(i_1);
            }
            var actionSheet = _this.actionSheetCtrl.create({
                title: 'Choisir la Taille du produit',
                buttons: buttons
            });
            actionSheet.present();
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], ResultatRecherchePage.prototype, "content", void 0);
    ResultatRecherchePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-resultat-recherche',
            templateUrl: 'resultat-recherche.html',
        }),
        __metadata("design:paramtypes", [NavController, PopoverController, NavParams, RestProvider,
            ModalController, AlertController, Storage,
            ActionSheetController, ToastController])
    ], ResultatRecherchePage);
    return ResultatRecherchePage;
}());
export { ResultatRecherchePage };
//# sourceMappingURL=resultat-recherche.js.map