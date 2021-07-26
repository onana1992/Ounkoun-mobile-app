var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
var RestProvider = /** @class */ (function () {
    function RestProvider(http) {
        this.http = http;
        this.baseUrl = "https://node16375-ounkoun1.hidora.com/backend/web/app_dev.php/";
        this.view = "tab1";
        this.change = new EventEmitter();
        console.log('Hello RestProvider Provider');
    }
    RestProvider.prototype.searchMovies = function (movieName) {
        var url = this.baseUrl + 'category/all';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getCategories = function () {
        var url = this.baseUrl + 'category/all';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getBannieres = function () {
        var url = this.baseUrl + 'baniere/all';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.setView3 = function () {
        this.view = "tab3";
        this.change.emit(this.view);
    };
    RestProvider.prototype.setView2 = function () {
        this.view = "tab2";
        this.change.emit(this.view);
    };
    RestProvider.prototype.setView1 = function () {
        this.view = "tab1";
        this.change.emit(this.view);
    };
    RestProvider.prototype.getAllMarque = function (parn) {
        var url = this.baseUrl + 'marque/all';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getAllLocation = function () {
        var url = this.baseUrl + 'localite/all';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getBestMarque = function (parn) {
        var url = this.baseUrl + 'marque/best';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getBestProduct = function () {
        var url = this.baseUrl + 'products/best';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getBestProduitPerCat = function (nomCat) {
        var url = this.baseUrl + 'product/model/category/best/' + encodeURI(nomCat);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getModels = function (nomProduct) {
        var url = this.baseUrl + 'product/models/' + encodeURI(nomProduct);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getProduitPerCat = function (nomCat, page, filterOption) {
        var url = this.baseUrl + 'product/model/category/' + encodeURI(nomCat) + '/' + encodeURI(page) + '/' + encodeURI(filterOption) + '/null/null/null';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getProduitPerCat1 = function (nomCat, page, filterOption, filterMinPrice, filterMaxPrice, filterMarque) {
        var url = this.baseUrl + 'product/model/category/' + encodeURI(nomCat) + '/' + encodeURI(page) + '/' + encodeURI(filterOption) + '/' + encodeURI(filterMinPrice) + '/' + encodeURI(filterMaxPrice) + '/' + encodeURI(filterMarque);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getProduitPerMarque = function (nomMarque, page, filterOption) {
        var url = this.baseUrl + 'product/model/marque/' + encodeURI(nomMarque) + '/' + encodeURI(page) + '/' + encodeURI(filterOption) + '/null/null';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getProduitPerSeller = function (idSeller, page, filterOption) {
        var url = this.baseUrl + 'product/model/seller/' + encodeURI(idSeller) + '/' + encodeURI(page) + '/' + encodeURI(filterOption) + '/null/null';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getProduitPerSousCat = function (nomSousCat, page, filterOption, filterMinPrice, filterMaxPrice, filterMarque) {
        var url = this.baseUrl + 'product/model/scategory/' + encodeURI(nomSousCat) + '/' + encodeURI(page) + '/' + encodeURI(filterOption) + '/' + encodeURI(filterMinPrice) + '/' + encodeURI(filterMaxPrice) + '/' + encodeURI(filterMarque);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getProduitPerSSousCat = function (nomSSousCat, page, filterOption, filterMinPrice, filterMaxPrice, filterMarque) {
        var url = this.baseUrl + 'product/model/sscategory/' + encodeURI(nomSSousCat) + '/' + encodeURI(page) + '/' + encodeURI(filterOption) + '/' + encodeURI(filterMinPrice) + '/' + encodeURI(filterMaxPrice) + '/' + encodeURI(filterMarque);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getCategorie = function (nomCat) {
        var url = this.baseUrl + 'category/' + encodeURI(nomCat);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getSousCategorie = function (nomCat, nomSCat) {
        var url = this.baseUrl + 'category/' + encodeURI(nomCat) + '/' + encodeURI(nomSCat);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getProduit = function (nomProduit) {
        var url = this.baseUrl + 'product/model/' + encodeURI(nomProduit);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getProduitbuytextSearch = function (text) {
        var url = this.baseUrl + 'product/model/search/' + encodeURI(text) + '/1/filter-by-most-rescent/null/null/null/null';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getResultatRecherche = function (searchtext, categorieName, page, filterOption, filterMinPrice, filterMaxPrice, filterMarque) {
        var url = this.baseUrl + 'product/model/search/' + encodeURI(searchtext) + '/' + encodeURI(page) + '/' + encodeURI(filterOption) + '/' + encodeURI(filterMinPrice) + '/' + encodeURI(filterMaxPrice) + '/' + encodeURI(filterMarque) + '/' + encodeURI(categorieName);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.connecter = function (login, password) {
        var url = this.baseUrl + 'user/log/' + encodeURI(login) + '/' + encodeURI(password);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.postUser = function (user) {
        var url = this.baseUrl + 'user/registration';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, user, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.updateUser = function (user) {
        var url = this.baseUrl + 'user/update';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, user, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.updatePassword = function (user) {
        var url = this.baseUrl + 'user/modifyPassword';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, user, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.activiteUser = function (credential) {
        var url = this.baseUrl + 'user/validation';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, credential, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.postAdresse = function (user) {
        var url = this.baseUrl + 'user/adresseLivraison';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, user, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.postFavori = function (data) {
        var url = this.baseUrl + 'user/favorite';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.getFavorite = function (userLogin) {
        var url = this.baseUrl + 'user/favorite/' + encodeURI(userLogin);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.deleteFavori = function (data) {
        var url = this.baseUrl + 'user/favorite/delete';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.postPanier = function (data) {
        var url = this.baseUrl + 'user/panier/detail';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.postPanierBWM = function (data) {
        var url = this.baseUrl + 'user/panier/BWM';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.getPanier = function (userLogin) {
        var url = this.baseUrl + 'user/panier/detail/' + encodeURI(userLogin);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.getPanierBWM = function (userLogin) {
        var url = this.baseUrl + 'user/panier/BWM/' + encodeURI(userLogin);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.modifyPanier = function (data) {
        var url = this.baseUrl + 'user/panier/detail/modifNumber';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.deletePanier = function (data) {
        var url = this.baseUrl + 'user/panier/delete/detail';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.getCommande = function (userLogin) {
        var url = this.baseUrl + 'user/command/' + encodeURI(userLogin);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    RestProvider.prototype.launchCountDown = function (data) {
        var url = this.baseUrl + 'user/timer';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.sendPasswordRecover = function (data) {
        var url = this.baseUrl + 'user/passRecover/code';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.confirmPasswordRecover = function (data) {
        var url = this.baseUrl + 'user/passRecover/confirm';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.postCommand = function (data) {
        var url = this.baseUrl + 'command';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.postNotation = function (data) {
        var url = this.baseUrl + 'product/model/note';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.postAvis = function (data) {
        var url = this.baseUrl + 'product/model/comment';
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
        var options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(url, data, options) // ...using post request
            .map(function (res) { return res.json(); });
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], RestProvider.prototype, "change", void 0);
    RestProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], RestProvider);
    return RestProvider;
}());
export { RestProvider };
//# sourceMappingURL=rest.js.map