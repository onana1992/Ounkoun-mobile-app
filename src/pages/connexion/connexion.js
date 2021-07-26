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
import { InscriptionPage } from '../inscription/inscription';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
var ConnexionPage = /** @class */ (function () {
    function ConnexionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ConnexionPage.prototype.goTo = function (page) {
        if (page === 'inscription') {
            this.navCtrl.push(InscriptionPage);
        }
    };
    ConnexionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-connexion',
            templateUrl: 'connexion.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], ConnexionPage);
    return ConnexionPage;
}());
export { ConnexionPage };
//# sourceMappingURL=connexion.js.map