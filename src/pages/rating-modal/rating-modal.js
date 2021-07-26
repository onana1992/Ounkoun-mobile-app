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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the RatingModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RatingModalPage = /** @class */ (function () {
    function RatingModalPage(navCtrl, navParams, restProvider, viewCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.isLoading = true;
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
        this.rate = 1;
        this.avis = { 'value': "" };
        this.produitName = navParams.get('produit');
        this.isLoading = true;
        this.restProvider.getProduit(this.produitName).subscribe(function (data) {
            _this.produit = data.data.product;
            _this.isLoading = false;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        this.storage.get('user').then(function (val) {
            _this.user = val;
        });
    }
    RatingModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RatingModalPage');
    };
    RatingModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RatingModalPage.prototype.onModelChange = function (event) {
        this.rate = event;
    };
    RatingModalPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    RatingModalPage.prototype.submitNotation = function () {
        var _this = this;
        this.isLoading = true;
        var myobject = { 'idModel': this.produit.id, 'note': this.rate };
        this.restProvider.postNotation(this.objecttoParams(myobject)).subscribe(function (data) {
            _this.isLoading = false;
            _this.viewCtrl.dismiss();
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    RatingModalPage.prototype.submitComment = function (form) {
        var _this = this;
        this.isLoading = true;
        var myobject = { 'idModel': this.produit.id, 'login': this.user.login,
            'name': this.user.name, 'firstName': this.user.firstName, 'valeur': this.avis.value };
        this.restProvider.postAvis(this.objecttoParams(myobject)).subscribe(function (data) {
            _this.isLoading = false;
            _this.viewCtrl.dismiss();
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    RatingModalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-rating-modal',
            templateUrl: 'rating-modal.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider,
            ViewController, Storage])
    ], RatingModalPage);
    return RatingModalPage;
}());
export { RatingModalPage };
//# sourceMappingURL=rating-modal.js.map