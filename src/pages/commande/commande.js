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
import { NavController, IonicPage, NavParams, ModalController, Platform, PopoverController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { StorageProvider } from '../../providers/storage/storage';
import { SampleModalPage } from '../sample-modal/sample-modal';
import { CommandSucceedPage } from '../command-succeed/command-succeed';
import { MescmdPage } from '../mescmd/mescmd';
import { PopoverPage } from '../popover/popover';
var CommandePage = /** @class */ (function () {
    function CommandePage(navCtrl, popoverCtrl, navParams, restProvider, storageProvider, plt, storage, alertCtrl, modalCtrl) {
        /* if(screen.width>=800){
             window.location.href = 'https://www.ounkoun.com/commande.php';
         }*/
        var _this = this;
        this.navCtrl = navCtrl;
        this.popoverCtrl = popoverCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.storageProvider = storageProvider;
        this.plt = plt;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.arrayPanier = new Array();
        this.produits = new Array();
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        this.isLoading = true;
        this.hasConfirmAdress = false;
        this.hasConfirmLivraisonMode = false;
        this.hasConfirmCommand = false;
        this.hasPaided = false;
        this.hasAddress = true;
        this.LivraisonType = "domicile";
        this.paiementType = "livraison";
        this.tab = "tab1";
        this.today = new Date();
        this.panierSize = 0;
        this.favorisSize = 0;
        this.creationDate = new Date().toISOString().slice(0, 10);
        this.isConnected = false;
        this.livraison = { "type": 1,
            "price": 700,
            "delais": "2019-09-18" };
        this.restProvider.setView1();
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == null) ? false : true;
            if (_this.isConnected) {
                _this.login = val.login;
            }
        });
        this.today = new Date(this.today.getFullYear() + "-" + this.pad(this.today.getMonth() + 1) + "-" + this.pad(this.today.getDate()));
        //add a day to the date
        this.today.setDate(this.today.getDate() + 2);
        var y = this.today.getFullYear();
        var m = this.today.getMonth() + 1; // january is month 0 in javascript
        var d = this.today.getDate();
        var livraisonDate = [y, this.pad(m), this.pad(d)].join("-");
        this.livraison.delais = livraisonDate;
        this.restProvider.setView1();
        this.storage.get('user').then(function (val) {
            _this.user = val;
            _this.adresseLivraison = val.adresseLivraison;
            _this.login = val.login;
            _this.hasAddress = val.adresseLivraison == null ? false : true;
            if (_this.adresseLivraison != 'null') {
            }
            _this.restProvider.getPanier(_this.login).subscribe(function (data) {
                if (data.statut == "200") {
                    _this.arrayPanier = data.data.products;
                    _this.isLoading = false;
                    _this.prixTotal = _this.totalPanier();
                    _this.nombreTotal = _this.totalArticle();
                }
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Movie Search Complete'); });
        });
    }
    CommandePage.prototype.ionViewDidLoad = function () {
        console.log(' ionViewDidLoad CommandePage');
    };
    CommandePage.prototype.pad = function (val) {
        var str = val.toString();
        return (str.length < 2) ? "0" + str : str;
    };
    CommandePage.prototype.showAdressModal = function () {
        var _this = this;
        var myModal = this.modalCtrl.create(SampleModalPage);
        myModal.present();
        myModal.onDidDismiss(function (data) {
            _this.isLoading = true;
            _this.storage.get('user').then(function (val) {
                _this.adresseLivraison = val.adresseLivraison;
                _this.hasAddress = val.adresseLivraison == null ? false : true;
                _this.login = val.login;
                _this.isLoading = false;
            });
        });
    };
    CommandePage.prototype.totalPanier = function () {
        var total = 0;
        for (var i = 0; i < this.arrayPanier.length; i++) {
            if (this.arrayPanier[i].number <= this.arrayPanier[i].product.quantity) {
                if (this.arrayPanier[i].product.retailSale.isInPromotion) {
                    total += this.arrayPanier[i].number * this.arrayPanier[i].product.retailSale.promotionalPrice;
                    this.produits.push({ 'name': this.arrayPanier[i].product.name, 'quantity': this.arrayPanier[i].number, 'price': this.arrayPanier[i].product.retailSale.promotionalPrice });
                }
                else {
                    total += this.arrayPanier[i].number * this.arrayPanier[i].product.retailSale.price;
                    this.produits.push({ 'name': this.arrayPanier[i].product.name, 'quantity': this.arrayPanier[i].number, 'price': this.arrayPanier[i].product.retailSale.price });
                }
            }
        }
        return total;
    };
    CommandePage.prototype.totalArticle = function () {
        var total = 0;
        for (var i = 0; i < this.arrayPanier.length; i++) {
            if (this.arrayPanier[i].number <= this.arrayPanier[i].product.quantity) {
                total++;
            }
        }
        return total;
    };
    CommandePage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    CommandePage.prototype.sendCommand = function () {
        if (this.LivraisonType == "domicile") {
            this.livraison.type = 1;
        }
        else {
            this.livraison.type = 2;
        }
        this.isLoading = true;
        var myobject = { login: this.login, commandDate: this.creationDate, adressL: JSON.stringify(this.adresseLivraison), livraison: JSON.stringify(this.livraison), products: JSON.stringify(this.produits) };
        /*this.restProvider.postCommand(this.objecttoParams(myobject)).subscribe(
                data => {
                    if(data.statut=="200"){
                        this.navCtrl.pop();
                        this.navCtrl.push(CommandSucceedPage);
                        this.storage.remove('panier');
                        this.isLoading=false;
                    }
                },
                    err => {
                        console.log(err);
                    },
                    () => console.log('Movie Search Complete')
        ); */
        this.navCtrl.pop();
        this.navCtrl.push(CommandSucceedPage);
    };
    CommandePage.prototype.disconnect = function () {
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
    CommandePage.prototype.presentPopover = function (event) {
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
    CommandePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-commande',
            templateUrl: 'commande.html',
        }),
        __metadata("design:paramtypes", [NavController, PopoverController, NavParams, RestProvider,
            StorageProvider, Platform, Storage, AlertController, ModalController])
    ], CommandePage);
    return CommandePage;
}());
export { CommandePage };
//# sourceMappingURL=commande.js.map