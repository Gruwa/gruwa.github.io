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
var core_1 = require("@angular/core");
var shared_1 = require("./../shared");
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(productsService, router) {
        this.productsService = productsService;
        this.router = router;
    }
    ProductsComponent.prototype.ngOnInit = function () {
        this.productsService.initialData();
    };
    ProductsComponent.prototype.ngAfterContentChecked = function () {
        this.products = this.productsService.productsData;
    };
    ProductsComponent = __decorate([
        core_1.Component({
            templateUrl: './products.component.html'
        }),
        __metadata("design:paramtypes", [shared_1.ProductsService,
            router_1.Router])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map