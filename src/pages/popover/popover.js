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
var PopoverPage = /** @class */ (function () {
    function PopoverPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.isConnected = false;
        this.inputData = this.navParams.get('data');
        this.isConnected = this.inputData.isConnected;
    }
    PopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopoverPage');
    };
    PopoverPage.prototype.disconnect = function () {
        var data = "1";
        this.viewCtrl.dismiss(data);
    };
    PopoverPage.prototype.connect = function () {
        var data = "2";
        this.viewCtrl.dismiss(data);
    };
    PopoverPage.prototype.register = function () {
        var data = "3";
        this.viewCtrl.dismiss(data);
    };
    PopoverPage.prototype.goTogoCommand = function () {
        var data = "4";
        this.viewCtrl.dismiss(data);
    };
    PopoverPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-popover',
            templateUrl: 'popover.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController])
    ], PopoverPage);
    return PopoverPage;
}());
export { PopoverPage };
//# sourceMappingURL=popover.js.map