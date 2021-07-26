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
import { IonicPage, NavController, NavParams, ToastController, PopoverController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { FavorisPage } from '../favoris/favoris';
import { HomePage } from '../home/home';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
var PasswordPage = /** @class */ (function () {
    function PasswordPage(navCtrl, navParams, restProvider, storage, toastCtrl, popoverCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.isLoading = false;
        this.hasSucceed = true;
        this.hasNotSucceed = true;
        this.isConnected = false;
        this.user = { login: "", oldPassword: "", newPassword: "", rePassword: "" };
        this.registrationFormSubmitted = false;
        this.panierSize = 0;
        this.favorisSize = 0;
        this.tab = "tab1";
        this.login = "";
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com/password.php';
        }
        this.restProvider.setView1();
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == null) ? false : true;
            if (_this.isConnected) {
                _this.login = val.login;
            }
        });
        this.storage.get('user').then(function (val) {
            _this.user.login = val.login;
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
    }
    PasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PasswordPage');
    };
    PasswordPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Mot de passe modifié avec succès',
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PasswordPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    PasswordPage.prototype.submitForm = function (form) {
        var _this = this;
        this.registrationFormSubmitted = true;
        this.hasSucceed = true;
        if (form.valid && (this.user.rePassword == this.user.newPassword)) {
            this.isLoading = true;
            this.restProvider.updatePassword(this.objecttoParams(this.user)).subscribe(function (data) {
                _this.isLoading = false;
                if (data.statut == "200") {
                    _this.hasSucceed = true;
                    _this.presentToast();
                }
                else {
                    _this.hasSucceed = false;
                }
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
        }
        else {
        }
    };
    PasswordPage.prototype.openPanier = function () {
        this.navCtrl.push(HomePage, { page: "tab3" });
    };
    PasswordPage.prototype.openFavoris = function () {
        this.navCtrl.push(FavorisPage);
    };
    PasswordPage.prototype.goTorecheche = function () {
        this.navCtrl.push(RecherchePage);
    };
    PasswordPage.prototype.disconnect = function () {
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
    PasswordPage.prototype.presentPopover = function (event) {
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
    PasswordPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-password',
            templateUrl: 'password.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider,
            Storage, ToastController, PopoverController, AlertController])
    ], PasswordPage);
    return PasswordPage;
}());
export { PasswordPage };
//# sourceMappingURL=password.js.map