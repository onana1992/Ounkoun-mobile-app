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
import { IonicPage, NavController, NavParams, ModalController, PopoverController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { FavorisPage } from '../favoris/favoris';
import { HomePage } from '../home/home';
import { CommandModalPage } from '../command-modal/command-modal';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
var MescmdPage = /** @class */ (function () {
    function MescmdPage(navCtrl, navParams, storage, restProvider, modalCtrl, popoverCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.restProvider = restProvider;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.panierSize = 0;
        this.favorisSize = 0;
        this.isLoading = true;
        this.arrayCommands = new Array();
        this.arrayFormatedCommands = new Array();
        this.total = 0;
        this.nbProduits = 0;
        this.isConnected = false;
        this.tab = "tab1";
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com';
        }
        this.restProvider.setView1();
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
        this.storage.get('user').then(function (val) {
            _this.login = val.login;
            _this.restProvider.getCommande(_this.login).subscribe(function (data) {
                if (data.statut == "200") {
                    _this.isLoading = false;
                    _this.arrayCommands = data.data;
                    _this.arrayFormatedCommands = [];
                    for (var i = 0; i < _this.arrayCommands.length; i++) {
                        _this.arrayFormatedCommands.push({
                            reference: _this.arrayCommands[i].reference,
                            dateCreation: _this.arrayCommands[i].dateCreation,
                            isPaided: _this.arrayCommands[i].isPaided,
                            isShipped: _this.arrayCommands[i].isShipped,
                            livraisonAdress: _this.arrayCommands[i].livraisonAdress,
                            products: _this.arrayCommands[i].products
                        });
                    }
                    _this.storage.remove("commande");
                    _this.storage.set("commande", _this.arrayFormatedCommands);
                }
                else {
                }
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Movie Search Complete'); });
        });
    }
    MescmdPage_1 = MescmdPage;
    MescmdPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MescmdPage');
    };
    MescmdPage.prototype.getNumber = function (commande) {
        var n = 0;
        for (var i = 0; i < commande.products.length; i++) {
            n += commande.products[i].quantity;
        }
        return n;
    };
    MescmdPage.prototype.getTotal = function (commande) {
        var t = 0;
        for (var i = 0; i < commande.products.length; i++) {
            t += commande.products[i].quantity * commande.products[i].price;
        }
        return t;
    };
    MescmdPage.prototype.showAdressModal = function (commande) {
        var obj = { reference: commande.reference };
        var myModal = this.modalCtrl.create(CommandModalPage, obj);
        myModal.present();
        myModal.onDidDismiss(function (data) {
        });
    };
    MescmdPage.prototype.openPanier = function () {
        this.navCtrl.push(HomePage, { page: "tab3" });
    };
    MescmdPage.prototype.openFavoris = function () {
        this.navCtrl.push(FavorisPage);
    };
    MescmdPage.prototype.goTorecheche = function () {
        this.navCtrl.push(RecherchePage);
    };
    MescmdPage.prototype.disconnect = function () {
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
                _this.favorisSize = 0;
                _this.isConnected = false;
                _this.navCtrl.popToRoot();
                _this.restProvider.setView1();
            }
        });
        alert.present();
    };
    MescmdPage.prototype.presentPopover = function (event) {
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
                    _this.restProvider.setView1();
                }
                else if (data == "4") {
                    _this.navCtrl.push(MescmdPage_1);
                }
            }
        });
    };
    var MescmdPage_1;
    MescmdPage = MescmdPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-mescmd',
            templateUrl: 'mescmd.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage,
            RestProvider, ModalController, PopoverController, AlertController])
    ], MescmdPage);
    return MescmdPage;
}());
export { MescmdPage };
//# sourceMappingURL=mescmd.js.map