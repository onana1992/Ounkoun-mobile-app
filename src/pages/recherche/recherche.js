var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ProduitPage } from '../produit/produit';
import { ResultatRecherchePage } from '../resultat-recherche/resultat-recherche';
import { FavorisPage } from '../favoris/favoris';
import { HomePage } from '../home/home';
var RecherchePage = /** @class */ (function () {
    function RecherchePage(navCtrl, navParams, restProvider, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restProvider = restProvider;
        this.actionSheetCtrl = actionSheetCtrl;
        this.produits = new Array();
        this.baseUrl = 'https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/';
    }
    RecherchePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad RecherchePage');
        setTimeout(function () {
            _this.myInput.setFocus();
        }, 500);
    };
    RecherchePage.prototype.search = function (item) {
        var _this = this;
        this.restProvider.getProduitbuytextSearch(item).subscribe(function (data) {
            _this.produits = data.data.products;
            _this.searchCategories = data.data.categories;
            _this.size = data.data.size;
            console.log(data);
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    };
    RecherchePage.prototype.gotoProduct = function (productName) {
        this.navCtrl.push(ProduitPage, { ProduitName: productName });
    };
    RecherchePage.prototype.gotoResultat = function (searchText, categorieName) {
        this.navCtrl.push(ResultatRecherchePage, { SearchText: searchText, CategorieName: categorieName });
    };
    RecherchePage.prototype.openPanier = function () {
        this.navCtrl.push(HomePage, { page: "tab3" });
    };
    RecherchePage.prototype.openFavoris = function () {
        this.navCtrl.push(FavorisPage);
    };
    __decorate([
        ViewChild('input'),
        __metadata("design:type", Object)
    ], RecherchePage.prototype, "myInput", void 0);
    RecherchePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-recherche',
            templateUrl: 'recherche.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, RestProvider, ActionSheetController])
    ], RecherchePage);
    return RecherchePage;
}());
export { RecherchePage };
//# sourceMappingURL=recherche.js.map