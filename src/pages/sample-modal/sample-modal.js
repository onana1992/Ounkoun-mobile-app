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
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the SampleModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SampleModalPage = /** @class */ (function () {
    function SampleModalPage(navCtrl, navParams, viewCtrl, storage, restProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.restProvider = restProvider;
        this.adressLivraison = new Object();
        this.user = { login: "", name: "", firstName: "", tel1: "", tel2: "", region: "", town: "", address: "", adresseLivraison: "" };
        this.localUser = { login: "", name: "", firstName: "", tel1: "", tel2: "", region: "", town: "", address: "", adresseLivraison: "" };
        this.isLoading = true;
        this.hasAddress = false;
        this.localites = [];
        this.restProvider.getAllLocation().subscribe(function (data) {
            _this.localites = data.data;
            _this.user.region = _this.localites[0].region;
            _this.villes = _this.localites[0].villes;
            _this.isLoading = false;
            _this.storage.get('user').then(function (val) {
                _this.login = val.login;
                _this.user.login = val.login;
                _this.localUser = val;
                _this.hasAddress = val.adresseLivraison == null ? false : true;
                if (_this.hasAddress) {
                    _this.user.name = val.adresseLivraison.name;
                    _this.user.firstName = val.adresseLivraison.firstName;
                    _this.user.tel1 = val.adresseLivraison.tel1;
                    _this.user.tel2 = val.adresseLivraison.tel2;
                    _this.user.region = val.adresseLivraison.region;
                    _this.user.town = val.adresseLivraison.town;
                    _this.user.address = val.adresseLivraison.adresse;
                    for (var i = 0; i < _this.localites.length; i++) {
                        if (_this.localites[i].region == _this.user.region) {
                            _this.villes = _this.localites[i].villes;
                            return;
                        }
                    }
                }
            });
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    }
    SampleModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SampleModalPage');
    };
    SampleModalPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    SampleModalPage.prototype.changeNumber = function () {
        this.villes = [];
        //console.log(this.user.region);
        for (var i = 0; i < this.localites.length; i++) {
            if (this.localites[i].region == this.user.region) {
                this.villes = [];
                this.villes = this.localites[i].villes;
                i = this.localites.length;
            }
        }
    };
    SampleModalPage.prototype.submitForm = function (form) {
        var _this = this;
        this.registrationFormSubmitted = true;
        if (form.valid) {
            this.isLoading = true;
            this.restProvider.postAdresse(this.objecttoParams(this.user)).subscribe(function (data) {
                if (data.statut == "200") {
                    _this.localUser.adresseLivraison = data.livraisonadresse;
                    _this.storage.set('user', _this.localUser);
                    _this.hasAddress = true;
                }
                else {
                }
                _this.isLoading = false;
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
            this.registrationFormSubmitted = false;
        }
        else {
        }
    };
    SampleModalPage.prototype.close = function () {
        this.viewCtrl.dismiss({ 'random': 'data' });
    };
    SampleModalPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-sample-modal',
            templateUrl: 'sample-modal.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, Storage, RestProvider])
    ], SampleModalPage);
    return SampleModalPage;
}());
export { SampleModalPage };
//# sourceMappingURL=sample-modal.js.map