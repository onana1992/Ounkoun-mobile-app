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
import { RecherchePage } from '../recherche/recherche';
import { FiltreModalCatPage } from '../filtre-modal-cat/filtre-modal-cat';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { PanierPage } from '../panier/panier';
import { InscriptionPage } from '../inscription/inscription';
var CategoriePage = /** @class */ (function () {
    function CategoriePage(navCtrl, navParams, restProvider, modalCtrl, alertCtrl, popoverCtrl, storage, actionSheetCtrl, toastController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.storage = storage;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastController = toastController;
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
        this.showMessageAjoutFavori = false;
        this.showMessageAjoutPanier = false;
        this.favorisData = { login: "", idProduct: "" };
        this.panierData = { login: "", idProduct: "", type: "detail", number: 1 };
        this.login = "";
        this.panierSize = 0;
        this.favorisSize = 0;
        this.isConnected = false;
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        this.otherModels = new Array();
        this.restProvider.setView1();
        /*if(this.navCtrl.length()==0)
        this.navCtrl.insert(0,HomePage);*/
        this.categorieName = navParams.get('nomCategorie');
        /*if(screen.width>=800){
           window.location.href = 'https://www.ounkoun.com?cat='+this.categorieName;
        }*/
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == null) ? false : true;
            if (_this.isConnected) {
                _this.login = val.login;
            }
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
        this.restProvider.getProduitPerCat1(this.categorieName, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque).subscribe(function (data) {
            _this.response = data.data;
            _this.produits = data.data.products;
            _this.nbProduits = data.data.size;
            console.log(data);
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.restProvider.getCategorie(this.categorieName).subscribe(function (data) {
            _this.response = data.data;
            _this.categorie = data.data;
            _this.isLoading = false;
            console.log(data);
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    }
    CategoriePage.prototype.ionViewDidEnter = function () {
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
    CategoriePage.prototype.scrollToTop = function () {
        // Scrolls to the top, ie 0px to top.
        this.content.scrollToTop();
    };
    CategoriePage.prototype.cancelFilter = function () {
        var _this = this;
        this.filterMinPrice = "null";
        this.filterMaxPrice = "null";
        this.filterMarque = "null";
        this.isLoading = true;
        this.restProvider.getProduitPerCat1(this.categorieName, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque).subscribe(function (data) {
            _this.response = data.data;
            _this.produits = data.data.products;
            _this.nbProduits = data.data.size;
            _this.isLoading = false;
            _this.isFilterActivated = false;
            console.log(data);
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    CategoriePage.prototype.showFiltreModal = function () {
        var _this = this;
        var myModal = this.modalCtrl.create(FiltreModalCatPage, { categorie: this.categorieName });
        myModal.present();
        myModal.onDidDismiss(function (data) {
            if (data != undefined) {
                if (data.filter == "marque") {
                    _this.isLoading = true;
                    _this.isFilterActivated = true;
                    _this.filterMarque = data.marque;
                    _this.restProvider.getProduitPerCat1(_this.categorieName, _this.page, _this.filterOption, _this.filterMinPrice, _this.filterMaxPrice, _this.filterMarque).subscribe(function (data) {
                        _this.isLoading = false;
                        _this.response = data.data;
                        _this.produits = data.data.products;
                        _this.nbProduits = data.data.size;
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
                    _this.restProvider.getProduitPerCat1(_this.categorieName, _this.page, _this.filterOption, _this.filterMinPrice, _this.filterMaxPrice, _this.filterMarque).subscribe(function (data) {
                        _this.isLoading = false;
                        _this.response = data.data;
                        _this.produits = data.data.products;
                        _this.nbProduits = data.data.size;
                        console.log(data);
                    }, function (err) {
                        console.log(err);
                    }, function () { return console.log('Complete'); });
                }
            }
        });
    };
    CategoriePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoriePage');
    };
    CategoriePage.prototype.changeView = function (view) {
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
    CategoriePage.prototype.showTriChoix = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Trier par:');
        alert.addInput({
            type: 'radio',
            label: 'popularité',
            value: 'filter-by-popularity',
            checked: this.filterOption == 'filter-by-popularity' ? true : false,
        });
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
                _this.filterOption = data;
                _this.restProvider.getProduitPerCat1(_this.categorieName, _this.page, _this.filterOption, _this.filterMinPrice, _this.filterMaxPrice, _this.filterMarque).subscribe(function (data) {
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
    CategoriePage.prototype.showPageChoix = function () {
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
                _this.restProvider.getProduitPerCat1(_this.categorieName, _this.page, _this.filterOption, _this.filterMinPrice, _this.filterMaxPrice, _this.filterMarque).subscribe(function (data) {
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
    CategoriePage.prototype.goSuivant = function () {
        var _this = this;
        var modulo = 0;
        var nbPage = 0;
        modulo = this.nbProduits % 40;
        nbPage = (modulo == 0) ? (this.nbProduits / 40) : Math.ceil(this.nbProduits / 40);
        if (nbPage > this.page) {
            this.isLoading = true;
            this.page++;
            this.restProvider.getProduitPerCat1(this.categorieName, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque).subscribe(function (data) {
                _this.response = data.data;
                _this.produits = data.data.products;
                _this.isLoading = false;
                console.log(data);
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
        }
    };
    CategoriePage.prototype.goPrecedant = function () {
        var _this = this;
        if (this.page > 1) {
            this.isLoading = true;
            this.page--;
            this.restProvider.getProduitPerCat1(this.categorieName, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque).subscribe(function (data) {
                _this.response = data.data;
                _this.produits = data.data.products;
                _this.isLoading = false;
                console.log(data);
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
        }
    };
    CategoriePage.prototype.gotoProduct = function (productName) {
        this.navCtrl.push(ProduitPage, { ProduitName: productName });
    };
    CategoriePage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    CategoriePage.prototype.addFavorite = function (produit, event) {
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
    CategoriePage.prototype.presentActionSheet = function (produitName, modelName) {
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
                /*[
                    {
                        text: 'Destructive',
                        role: 'destructive',
                        handler: () => {
                        console.log('Destructive clicked');
                    }
                    },{
                        text: 'Archive',
                        handler: () => {
                        console.log('Archive clicked');
                      }
                    }
                    ,{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                    }
                ]*/
            });
            actionSheet.present();
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    CategoriePage.prototype.addPanier = function (produit, event) {
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
    CategoriePage.prototype.addPanier1 = function (produit) {
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
    CategoriePage.prototype.openPanier = function () {
        //this.navCtrl.popToRoot();
        //this.restProvider.setView3();
        this.navCtrl.push(PanierPage);
    };
    CategoriePage.prototype.goTorecheche = function () {
        this.navCtrl.push(RecherchePage);
    };
    CategoriePage.prototype.openFavoris = function () {
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
    CategoriePage.prototype.disconnect = function () {
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
    CategoriePage.prototype.presentPopover = function (event) {
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
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], CategoriePage.prototype, "content", void 0);
    CategoriePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-categorie',
            templateUrl: 'categorie.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider,
            ModalController, AlertController, PopoverController,
            Storage, ActionSheetController, ToastController])
    ], CategoriePage);
    return CategoriePage;
}());
export { CategoriePage };
//# sourceMappingURL=categorie.js.map