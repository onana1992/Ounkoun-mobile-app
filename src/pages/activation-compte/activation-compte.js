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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { FavorisPage } from '../favoris/favoris';
import { HomePage } from '../home/home';
import { InscriptionPage } from '../inscription/inscription';
import { TimerObservable } from "rxjs/observable/TimerObservable";
var ActivationComptePage = /** @class */ (function () {
    function ActivationComptePage(navCtrl, navParams, storage, restProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.restProvider = restProvider;
        this.isLoading = false;
        this.isIncorrectCode = false;
        this.user = { name: "", firstName: "", pseudo: "", sexe: "", email: "", login: "", dateDeNaiss: "" };
        this.counter = 180;
        this.stopped = 0;
        this.login = navParams.get('login');
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com/activation.php?login=' + this.login;
        }
        this.sendCoundown(this.login);
        //this.countdown();
    }
    ActivationComptePage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    ActivationComptePage.prototype.ngOnInit = function () {
        var _this = this;
        var timer = TimerObservable.create(1000, 2000);
        this.subscription = timer.subscribe(function (t) {
            _this.tick = t;
            _this.counter--;
            if (_this.counter == 0) {
                _this.subscription.unsubscribe();
                _this.navCtrl.push(InscriptionPage);
            }
        });
    };
    ActivationComptePage.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ActivationComptePage.prototype.sendCoundown = function (loginUser) {
        var credential = { login: loginUser };
        this.restProvider.launchCountDown(this.objecttoParams(credential)).subscribe(function (data) {
            if (data.statut == "200") {
            }
            //this.response=data.data;
            console.log(data);
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    ActivationComptePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ActivationComptePage');
    };
    ActivationComptePage.prototype.activate = function () {
        var _this = this;
        var credential = { login: this.login, code: this.code };
        this.isLoading = true;
        this.isIncorrectCode = false;
        this.restProvider.activiteUser(this.objecttoParams(credential)).subscribe(function (data) {
            _this.isLoading = false;
            if (data.statut == "200") {
                _this.user.pseudo = data.response.pseudo;
                _this.user.login = data.response.login;
                _this.user.name = data.response.name;
                _this.user.firstName = data.response.firstName;
                _this.user.dateDeNaiss = data.response.dateDeNaiss.date;
                _this.user.sexe = data.response.sex;
                _this.storage.set('user', _this.user);
                _this.navCtrl.popToRoot();
                _this.restProvider.setView1();
            }
            else {
                _this.isIncorrectCode = true;
            }
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    ActivationComptePage.prototype.openPanier = function () {
        this.navCtrl.push(HomePage, { page: "tab3" });
    };
    ActivationComptePage.prototype.openFavoris = function () {
        this.navCtrl.push(FavorisPage);
    };
    ActivationComptePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-activation-compte',
            templateUrl: 'activation-compte.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage, RestProvider])
    ], ActivationComptePage);
    return ActivationComptePage;
}());
export { ActivationComptePage };
//# sourceMappingURL=activation-compte.js.map