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
import { ConnexionPage } from '../connexion/connexion';
import { ActivationComptePage } from '../activation-compte/activation-compte';
import { RestProvider } from '../../providers/rest/rest';
var InscriptionPage = /** @class */ (function () {
    function InscriptionPage(navCtrl, navParams, restProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.user = { nom: "", prenom: "", dateDeNaiss: "", sex: "", email: "", password: "", rePassword: "", login: "", name: "", firstName: "",
            loginIsEmail: true, plainPassword: "", };
        this.registrationFormSubmitted = false;
        this.isLoading = false;
        this.accountExist = false;
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com/inscription.php';
        }
    }
    InscriptionPage.prototype.goTo = function (page) {
        if (page === 'connexion') {
            this.navCtrl.push(ConnexionPage);
        }
    };
    InscriptionPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    InscriptionPage.prototype.submitForm = function (form) {
        var _this = this;
        this.accountExist = false;
        this.registrationFormSubmitted = true;
        if (form.valid && (this.user.rePassword == this.user.password)) {
            this.isLoading = true;
            this.user.name = this.user.nom;
            this.user.firstName = this.user.prenom;
            this.user.login = this.user.login;
            this.user.loginIsEmail = true;
            this.user.plainPassword = this.user.password;
            this.user.dateDeNaiss = this.user.dateDeNaiss;
            this.user.sex = this.user.sex;
            this.restProvider.postUser(this.objecttoParams(this.user)).subscribe(function (data) {
                _this.isLoading = false;
                if (data.statut == "200") {
                    _this.accountExist = false;
                    _this.navCtrl.push(ActivationComptePage, { login: _this.user.login });
                }
                else {
                    _this.accountExist = true;
                }
            }, function (err) {
                console.log(err);
            }, function () { return console.log('Complete'); });
            //form.reset();
            this.registrationFormSubmitted = false;
        }
        else {
        }
    };
    InscriptionPage.prototype.submitForm1 = function (form) {
        this.data.name = this.user.nom;
        this.data.rN = "start";
        this.data.rT = this.user.login;
        this.data.rE = true;
        this.data.rH = this.user.password;
        this.data.rMt = this.user.dateDeNaiss;
        this.data.rDvs = this.user.sex;
        this.data.source = this.user.sex;
        this.data.rLocale = this.user.sex;
        this.data.rLocale = this.user.sex;
        this.data.rLocale = this.user.sex;
        this.data.rLocale = this.user.sex;
        var url = 'https://www.my-dohone.com/dohone/pay';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    InscriptionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-inscription',
            templateUrl: 'inscription.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider])
    ], InscriptionPage);
    return InscriptionPage;
}());
export { InscriptionPage };
//# sourceMappingURL=inscription.js.map