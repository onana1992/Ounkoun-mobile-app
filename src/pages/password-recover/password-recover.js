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
import { RestProvider } from '../../providers/rest/rest';
import { RecoverPasswordConfirmPage } from '../recover-password-confirm/recover-password-confirm';
var PasswordRecoverPage = /** @class */ (function () {
    function PasswordRecoverPage(navCtrl, navParams, restProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.isLoading = false;
        this.isAccountExist = true;
        this.registrationFormSubmitted = false;
        this.login = "";
        this.data = { login: "" };
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com/recoverPassword.php';
        }
    }
    PasswordRecoverPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    PasswordRecoverPage.prototype.send = function () {
        var _this = this;
        this.isLoading = true;
        this.restProvider.sendPasswordRecover(this.objecttoParams(this.data)).subscribe(function (data) {
            _this.isLoading = false;
            if (data.statut == "200") {
                _this.isAccountExist = true;
                _this.navCtrl.push(RecoverPasswordConfirmPage, { login: _this.data.login });
            }
            else {
                _this.isAccountExist = false;
            }
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        //form.reset();
        this.registrationFormSubmitted = false;
    };
    PasswordRecoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PasswordRecoverPage');
    };
    PasswordRecoverPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-password-recover',
            templateUrl: 'password-recover.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider])
    ], PasswordRecoverPage);
    return PasswordRecoverPage;
}());
export { PasswordRecoverPage };
//# sourceMappingURL=password-recover.js.map