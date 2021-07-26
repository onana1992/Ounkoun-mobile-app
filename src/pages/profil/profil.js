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
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { FavorisPage } from '../favoris/favoris';
import { RecherchePage } from '../recherche/recherche';
import { PopoverPage } from '../popover/popover';
import { MescmdPage } from '../mescmd/mescmd';
var ProfilPage = /** @class */ (function () {
    function ProfilPage(navCtrl, navParams, storage, restProvider, toastCtrl, popoverCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.restProvider = restProvider;
        this.toastCtrl = toastCtrl;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.loginFormSubmitted = false;
        this.isLoading = false;
        this.user = { nom: "", prenom: "", dateDeNaiss: "", sex: "", login: "", pseudo: "", id: "" };
        this.updateUser = { name: "", firstName: "", dateDeNaiss: "", sex: "", login: "" };
        this.updateStorageUser = { id: "", name: "", firstName: "", dateDeNaiss: "", sexe: "", login: "", adresseLivraison: "", pseudo: "", type: "" };
        this.panierSize = 0;
        this.favorisSize = 0;
        this.tab = "tab1";
        this.login = "";
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com/profil.php';
        }
        this.restProvider.setView1();
        this.storage.get('user').then(function (val) {
            _this.isConnected = (val == null) ? false : true;
            if (_this.isConnected) {
                _this.login = val.login;
            }
        });
        this.storage.get('user').then(function (val) {
            _this.updateStorageUser = val;
            _this.user.nom = val.name;
            _this.user.prenom = val.firstName;
            _this.user.dateDeNaiss = val.dateDeNaiss.split(" ")[0];
            _this.user.sex = val.sexe;
            _this.user.login = val.login;
            _this.user.pseudo = val.pseudo;
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
    ProfilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilPage');
    };
    ProfilPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Informations personelles modifier avec succès',
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ProfilPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    ProfilPage.prototype.submitForm = function (form) {
        var _this = this;
        this.loginFormSubmitted = true;
        if (form.valid) {
            this.isLoading = true;
            this.updateUser.name = this.user.nom;
            this.updateUser.firstName = this.user.prenom;
            this.updateUser.dateDeNaiss = this.user.dateDeNaiss.split(" ")[0];
            this.updateUser.sex = this.user.sex;
            this.updateUser.login = this.user.login;
            this.restProvider.updateUser(this.objecttoParams(this.updateUser)).subscribe(function (data) {
                _this.user.login = data.response.login;
                _this.user.nom = data.response.name;
                _this.user.prenom = data.response.firstName;
                _this.user.id = data.response.id;
                _this.user.dateDeNaiss = data.response.birthDate;
                _this.user.sex = data.response.sex;
                _this.user.pseudo = data.response.pseudo;
                _this.isLoading = false;
                _this.updateStorageUser.login = data.response.login;
                _this.updateStorageUser.name = data.response.name;
                _this.updateStorageUser.firstName = data.response.firstName;
                _this.updateStorageUser.id = data.response.id;
                _this.updateStorageUser.dateDeNaiss = data.response.birthDate;
                _this.updateStorageUser.sexe = data.response.sex;
                _this.updateStorageUser.pseudo = data.response.pseudo;
                _this.storage.set('user', _this.updateStorageUser);
                _this.presentToast();
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
            this.loginFormSubmitted = false;
        }
    };
    ProfilPage.prototype.openPanier = function () {
        this.navCtrl.popToRoot();
        this.restProvider.setView3();
    };
    ProfilPage.prototype.openFavoris = function () {
        this.navCtrl.push(FavorisPage);
    };
    ProfilPage.prototype.goTorecheche = function () {
        this.navCtrl.push(RecherchePage);
    };
    ProfilPage.prototype.disconnect = function () {
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
    ProfilPage.prototype.presentPopover = function (event) {
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
                    _this.navCtrl.push(MescmdPage);
                }
            }
        });
    };
    ProfilPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-profil',
            templateUrl: 'profil.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage,
            RestProvider, ToastController, PopoverController, AlertController])
    ], ProfilPage);
    return ProfilPage;
}());
export { ProfilPage };
//# sourceMappingURL=profil.js.map