"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var ProductsService = /** @class */ (function () {
    function ProductsService(http, router) {
        this.http = http;
        this.router = router;
        this.showDeleteForm = false;
        this.productEditData$ = new Subject_1.Subject();
        this.productNewData$ = new Subject_1.Subject();
    }
    ProductsService.prototype.initialData = function () {
        var _this = this;
        if (localStorage.productsData != undefined) {
            return this.productsData = JSON.parse(localStorage.productsData);
        }
        else {
            return this.dataServer('assets/server/data.json').subscribe(function (data) { return _this.updateData(data); });
        }
    };
    ProductsService.prototype.dataServer = function (dataUrl) {
        return this.http.request(dataUrl)
            .map(function (res) { return res.json(); });
    };
    ProductsService.prototype.updateData = function (data) {
        localStorage.setItem('productsData', JSON.stringify(data));
        var dataLoacalStorage = localStorage.getItem('productsData');
        this.productsData = JSON.parse(dataLoacalStorage);
    };
    ProductsService.prototype.getProductById = function (id) {
        this.productsData = this.initialData();
        return this.productsData.find(function (product) { return product.id === id; });
    };
    ProductsService.prototype.deleteProduct = function (product) {
        this.productsData.splice(this.productsData.indexOf(product), 1);
        this.updateData(this.productsData);
    };
    ProductsService.prototype.editProduct = function (product) {
        this.activeProduct = product;
    };
    ProductsService.prototype.saveEditProduct = function (product, imgUrl) {
        product.id = this.activeProduct.id;
        product.imageUrl = imgUrl;
        this.productsData.splice(this.productsData.indexOf(this.activeProduct), 1, product);
        this.updateData(this.productsData);
    };
    ProductsService.prototype.saveNewProduct = function (product, imgUrl) {
        this.productsData = this.initialData();
        product.id = this.productsData[this.productsData.length - 1].id + 1;
        product.imageUrl = imgUrl;
        this.productsData.push(product);
        this.updateData(this.productsData);
    };
    ProductsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            router_1.Router])
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map