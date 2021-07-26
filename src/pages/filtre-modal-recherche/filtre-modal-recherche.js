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
import { RestProvider } from '../../providers/rest/rest';
var FiltreModalRecherchePage = /** @class */ (function () {
    function FiltreModalRecherchePage(navCtrl, navParams, viewCtrl, restProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.restProvider = restProvider;
        this.tab = "tab1";
        this.filterMarque = "null";
        this.filterMinPrice = "null";
        this.filterMaxPrice = "null";
        this.isLoading = false;
        this.filterOption = "filter-by-most-rescent";
        this.page = 1;
        this.filterPrice = { 'lower': 0, 'upper': 100 };
        this.myRange = { "lower": "0", "upper": "20" };
        // var foo = { foo: true };
        //history.pushState(foo, "Anything", " "); // Put something to history for back button
        this.categorie = navParams.get('categorieName');
        this.textSearch = navParams.get('textSearch');
        this.restProvider.getResultatRecherche(this.textSearch, this.categorie, this.page, this.filterOption, this.filterMinPrice, this.filterMaxPrice, this.filterMarque).subscribe(function (data) {
            _this.marques = data.data.marques;
            _this.marque = _this.marques[0].name;
            _this.categories = data.data.categories;
            _this.cat = _this.categories[0].name;
            _this.minPrice = data.data.plusPetitPrix;
            _this.maxPrice = data.data.plusGrandPrix;
            _this.filterPrice.lower = data.data.plusPetitPrix;
            _this.filterPrice.upper = data.data.plusGrandPrix;
            _this.myRange.lower = data.data.plusPetitPrix;
            _this.myRange.upper = data.data.plusGrandPrix;
        }, function (err) {
            console.log(err);
        }, function () { return console.log('Complete'); });
    }
    FiltreModalRecherchePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FiltreModalCatPage');
    };
    FiltreModalRecherchePage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    FiltreModalRecherchePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    FiltreModalRecherchePage.prototype.launchFiltre = function () {
        if (this.tab == "tab1") {
            this.viewCtrl.dismiss({ 'filter': 'categorie', 'categorie': this.cat });
        }
        else if (this.tab == "tab2") {
            this.viewCtrl.dismiss({ 'filter': 'marque', 'marque': this.marque });
        }
        else if (this.tab == "tab3") {
            this.viewCtrl.dismiss({ 'filter': 'prix', 'valeur': this.filterPrice });
        }
    };
    FiltreModalRecherchePage.prototype.changeTab = function (tab) {
        if (tab === "tab1") {
            this.tab = "tab1";
        }
        else if (tab === 'tab2') {
            this.tab = "tab2";
        }
        else if (tab === "tab3") {
            this.tab = "tab3";
        }
    };
    FiltreModalRecherchePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-filtre-modal-recherche',
            templateUrl: 'filtre-modal-recherche.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ViewController, RestProvider])
    ], FiltreModalRecherchePage);
    return FiltreModalRecherchePage;
}());
export { FiltreModalRecherchePage };
//# sourceMappingURL=filtre-modal-recherche.js.map