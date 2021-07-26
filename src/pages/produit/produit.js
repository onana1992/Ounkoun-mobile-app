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
import { IonicPage, NavController, PopoverController, NavParams, ModalController, AlertController, ActionSheetController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { FavorisPage } from '../favoris/favoris';
import { RecherchePage } from '../recherche/recherche';
import { PanierBwmPage } from '../panier-bwm/panier-bwm';
import { RatingModalPage } from '../rating-modal/rating-modal';
import { ProduitParVendeurPage } from '../produit-par-vendeur/produit-par-vendeur';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
import { ProduitParMarquePage } from '../produit-par-marque/produit-par-marque';
var ProduitPage = /** @class */ (function () {
    function ProduitPage(navCtrl, navParams, restProvider, modalCtrl, alertCtrl, storage, popoverCtrl, actionSheetCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.popoverCtrl = popoverCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.tab = "tab1";
        this.isLoading = true;
        this.panierSize = 0;
        this.arrayPanier = new Array();
        this.panierBWMSize = 0;
        this.favorisSize = 0;
        this.isConnected = false;
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        this.arraySize = new Array();
        this.favoryArray = new Array();
        this.panierArray = new Array();
        this.panierBWMArray = new Array();
        this.localFavoryArray = new Array();
        this.otherModels = new Array();
        this.showMessageAjoutFavori = false;
        this.showMessageAjoutPanier = false;
        this.showMessageAjoutBWMPanier = false;
        this.favorisData = { login: "", idProduct: "" };
        this.panierData = { login: "", idProduct: "", type: "detail", number: 1 };
        this.panierBWMData = { login: "", idProduct: "", type: "BWM", number: 1 };
        this.login = "";
        this.produitName = navParams.get('ProduitName');
        /*if(screen.width>=800){
               window.location.href = 'https://www.ounkoun.com/produit.php?nom='+this.produitName ;
         }*/
        this.restProvider.setView1();
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == undefined) ? false : true;
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
        /*this.storage.get('panierBWM').then((val) => {
            if(val!= undefined ){
                this.panierBWMSize=0;
                for(var i=0;i<val.length;i++){
                    this.panierBWMSize+= val[i].number;
                }
            }
        });	*/
        this.storage.get('favoris').then(function (val) {
            if (val != undefined) {
                _this.favorisSize = val.length;
            }
        });
        this.restProvider.getProduit(this.produitName).subscribe(function (data) {
            //this.response = data.data;
            _this.produit = data.data.product;
            for (var i = 0; i < _this.produit.quantity; i++) {
                _this.arraySize[i] = i + 1;
                _this.produit.number = 1;
            }
            _this.getOtherModel(_this.produit.productName);
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    }
    ProduitPage.prototype.getOtherModel = function (produitName) {
        var _this = this;
        this.restProvider.getModels(produitName).subscribe(function (data) {
            //this.response = data.data;
            _this.otherModels = [];
            _this.otherModels = data.data.product;
            _this.isLoading = false;
            //this.isLoading = false;
            for (var i = 0; i < _this.otherModels.length; i++) {
                if (_this.otherModels[i].name == _this.produitName) {
                    _this.otherModels.splice(i, 1);
                }
            }
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    ProduitPage.prototype.changeModel = function (newModelName) {
        var _this = this;
        this.isLoading = true;
        this.produitName = newModelName;
        this.restProvider.getProduit(newModelName).subscribe(function (data) {
            //this.response = data.data;
            _this.produit = data.data.product;
            for (var i = 0; i < _this.produit.quantity; i++) {
                _this.arraySize[i] = i + 1;
                _this.produit.number = 1;
            }
            _this.getOtherModel(_this.produit.productName);
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    ProduitPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProduitPage');
    };
    ProduitPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    ProduitPage.prototype.presentActionSheet = function (produitName, modelName) {
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
    ProduitPage.prototype.addPanier = function (produit) {
        var _this = this;
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
                    _this.showMessageAjoutPanier = true;
                    _this.panierArray.push({ productId: produit.id, name: produit.name, number: number + parseInt(produit.number), type: "detail", product: produit });
                    _this.storage.set("panier", _this.panierArray);
                    _this.panierSize += parseInt(produit.number);
                    setTimeout(function () {
                        _this.showMessageAjoutPanier = false;
                    }, 2000);
                    if (_this.isConnected) {
                        _this.panierData.login = _this.login;
                        _this.panierData.idProduct = produit.id;
                        _this.panierData.number = produit.number;
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
    ProduitPage.prototype.addPanier1 = function (produit) {
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
                ;
            }
            if (number + 1 <= produit.quantity) {
                _this.showMessageAjoutPanier = true;
                _this.panierArray.push({ productId: produit.id, name: produit.name, number: number + parseInt(_this.produit.number), type: "detail", product: produit });
                _this.storage.set("panier", _this.panierArray);
                _this.panierSize += parseInt(_this.produit.number);
                setTimeout(function () {
                    _this.showMessageAjoutPanier = false;
                }, 2000);
                if (_this.isConnected) {
                    _this.panierData.login = _this.login;
                    _this.panierData.idProduct = produit.id;
                    _this.panierData.number = _this.produit.number;
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
    ProduitPage.prototype.addFavorite = function (produit) {
        var _this = this;
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
    ProduitPage.prototype.changeTab = function (tab) {
        if (tab === "tab1") {
            this.tab = "tab1";
        }
        else if (tab === 'tab2') {
            this.tab = "tab2";
        }
        else if (tab === "tab3") {
            this.tab = "tab3";
        }
    };
    ProduitPage.prototype.openPanier = function () {
        this.navCtrl.popToRoot();
        this.restProvider.setView3();
    };
    ProduitPage.prototype.openPanierBWM = function () {
        this.navCtrl.push(PanierBwmPage);
    };
    ProduitPage.prototype.openFavoris = function () {
        this.navCtrl.push(FavorisPage);
    };
    ProduitPage.prototype.goTorecheche = function () {
        this.navCtrl.push(RecherchePage);
    };
    ProduitPage.prototype.openVendeur = function (vendeur) {
        this.navCtrl.push(ProduitParVendeurPage, { seller: vendeur.nom });
    };
    ProduitPage.prototype.showRatingModal = function () {
        var _this = this;
        var myModal = this.modalCtrl.create(RatingModalPage, { produit: this.produitName });
        myModal.present();
        myModal.onDidDismiss(function (data) {
            _this.isLoading = true;
            _this.restProvider.getProduit(_this.produitName).subscribe(function (data) {
                _this.produit = data.data.product;
                _this.isLoading = false;
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
        });
    };
    ProduitPage.prototype.disconnect = function () {
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
    ProduitPage.prototype.presentPopover = function (event) {
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
    ProduitPage.prototype.openMarque = function (nom) {
        this.navCtrl.push(ProduitParMarquePage, { nomMarque: nom });
    };
    ProduitPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-produit',
            templateUrl: 'produit.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider,
            ModalController, AlertController, Storage, PopoverController, ActionSheetController])
    ], ProduitPage);
    return ProduitPage;
}());
export { ProduitPage };
//# sourceMappingURL=produit.js.map