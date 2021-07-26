var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var StorageProvider = /** @class */ (function () {
    function StorageProvider(storage) {
        this.storage = storage;
        console.log('Hello StorageProvider Provider');
    }
    StorageProvider.prototype.setUser = function (user) {
        this.storage.set('user', user);
    };
    StorageProvider.prototype.getUser = function (user) {
        //console.log(this.storage.get('user'));  
        //return this.storage.get('user');
        this.storage.get('user').then(function (val) {
            console.log(val);
            user = val;
        });
    };
    StorageProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], StorageProvider);
    return StorageProvider;
}());
export { StorageProvider };
//# sourceMappingURL=storage.js.map