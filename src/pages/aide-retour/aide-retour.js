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
/**
 * Generated class for the AideRetourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AideRetourPage = /** @class */ (function () {
    function AideRetourPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        if (screen.width >= 800) {
            window.location.href = 'https://www.ounkoun.com';
        }
    }
    AideRetourPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AideRetourPage');
    };
    AideRetourPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-aide-retour',
            templateUrl: 'aide-retour.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], AideRetourPage);
    return AideRetourPage;
}());
export { AideRetourPage };
//# sourceMappingURL=aide-retour.js.map