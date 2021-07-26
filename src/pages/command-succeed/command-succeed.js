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
var CommandSucceedPage = /** @class */ (function () {
    function CommandSucceedPage(navCtrl, navParams, storage, restProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.restProvider = restProvider;
        this.restProvider.setView1();
        this.storage.get('user').then(function (val) {
            _this.nom = val.name;
            _this.prenom = val.firstName;
        });
    }
    CommandSucceedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommandSucceedPage');
    };
    CommandSucceedPage.prototype.gotTheRoot = function () {
        this.navCtrl.popToRoot();
    };
    CommandSucceedPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-command-succeed',
            templateUrl: 'command-succeed.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage, RestProvider])
    ], CommandSucceedPage);
    return CommandSucceedPage;
}());
export { CommandSucceedPage };
//# sourceMappingURL=command-succeed.js.map