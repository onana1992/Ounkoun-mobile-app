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
var RecoverPasswordConfirmPage = /** @class */ (function () {
    function RecoverPasswordConfirmPage(navCtrl, navParams, restProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.login = "";
        this.data = { login: "", code: "", password: "" };
        this.isCorrectCode = true;
        this.login = navParams.get('login');
        this.data.login = this.login;
    }
    RecoverPasswordConfirmPage.prototype.objecttoParams = function (obj) {
        var p = [];
        for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
    };
    RecoverPasswordConfirmPage.prototype.send = function () {
        var _this = this;
        this.isLoading = true;
        this.isCorrectCode = true;
        this.restProvider.confirmPasswordRecover(this.objecttoParams(this.data)).subscribe(function (data) {
            _this.isLoading = false;
            if (data.statut == "200") {
                _this.isCorrectCode = true;
                _this.navCtrl.popToRoot();
            }
            else {
                _this.isCorrectCode = false;
            }
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
        //form.reset();
        this.registrationFormSubmitted = false;
    };
    RecoverPasswordConfirmPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RecoverPasswordConfirmPage');
    };
    RecoverPasswordConfirmPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-recover-password-confirm',
            templateUrl: 'recover-password-confirm.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider])
    ], RecoverPasswordConfirmPage);
    return RecoverPasswordConfirmPage;
}());
export { RecoverPasswordConfirmPage };
//# sourceMappingURL=recover-password-confirm.js.map