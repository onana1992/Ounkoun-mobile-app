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
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
var CommandModalPage = /** @class */ (function () {
    function CommandModalPage(navCtrl, navParams, viewCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        this.commandeArray = new Array();
        this.maCommande = {};
        this.isLoading = true;
        this.isPaided = false;
        this.isShipped = false;
        this.adress = { name: "", firstName: "", tel1: "", tel2: "", region: "", town: "", adress: "" };
        this.ref = "okkkk";
        this.reference = this.navParams.get('reference');
        this.storage.get('commande').then(function (val) {
            _this.commandeArray = val;
            _this.ref = _this.commandeArray[0].reference;
            for (var i = 0; i < _this.commandeArray.length; i++) {
                if (_this.commandeArray[i].reference == _this.reference) {
                    _this.maCommande = _this.commandeArray[i];
                    _this.maDate = _this.commandeArray[i].dateCreation.date;
                    _this.mareference = _this.commandeArray[i].reference;
                    _this.isPaided = _this.commandeArray[i].isPaided;
                    _this.isShipped = _this.commandeArray[i].isShipped;
                    _this.adress.name = _this.commandeArray[i].livraisonAdress.name;
                    _this.adress.firstName = _this.commandeArray[i].livraisonAdress.firstName;
                    _this.adress.region = _this.commandeArray[i].livraisonAdress.region;
                    _this.adress.town = _this.commandeArray[i].livraisonAdress.town;
                    _this.adress.adress = _this.commandeArray[i].livraisonAdress.adresse;
                    _this.adress.tel1 = _this.commandeArray[i].livraisonAdress.tel1;
                    _this.adress.tel2 = _this.commandeArray[i].livraisonAdress.tel2;
                    _this.mesProduits = _this.commandeArray[i].products;
                    _this.isLoading = false;
                }
            }
            _this.total = 0;
            for (var j = 0; j < _this.maCommande.products.length; j++) {
                _this.total += _this.maCommande.products[j].quantity * _this.maCommande.products[j].price;
            }
        });
    }
    CommandModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommandModalPage');
    };
    CommandModalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-command-modal',
            templateUrl: 'command-modal.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, Storage])
    ], CommandModalPage);
    return CommandModalPage;
}());
export { CommandModalPage };
//# sourceMappingURL=command-modal.js.map