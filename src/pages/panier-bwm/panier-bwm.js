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
var PanierBwmPage = /** @class */ (function () {
    function PanierBwmPage() {
        this.isLoading = false;
        this.isLoadingDelete = false;
        this.isLoadingUpdate = false;
        this.user = { login: "", dateDeNaiss: "", plainPassword: "", password: "", loginIsEmail: true, id: "", type: "", pseudo: "", sexe: "", name: "", firstName: "", adresseLivraison: null };
        this.arrayPanier = new Array();
        this.arrayFormatedPanier = new Array();
        this.loginFormSubmitted = false;
        this.isConnected = false;
        this.isLoginFailled = false;
        this.favoris = new Array();
        this.arraySize = new Array();
        this.panierLocal = new Array();
        this.panierDb = new Array();
        this.panierDiff = new Array();
        this.produits = new Array();
        this.panierVide = false;
        this.prixTotal = 0;
    }
    PanierBwmPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-panier-bwm',
            templateUrl: 'panier-bwm.html',
        }),
        __metadata("design:paramtypes", [])
    ], PanierBwmPage);
    return PanierBwmPage;
}());
export { PanierBwmPage };
//# sourceMappingURL=panier-bwm.js.map