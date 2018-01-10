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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shared_1 = require("./../../shared");
var ProductComponent = /** @class */ (function () {
    function ProductComponent(productsService, activatedRoute) {
        this.productsService = productsService;
        this.activatedRoute = activatedRoute;
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.product = this.productsService.getProductById(+this.activatedRoute.snapshot.params['id']);
    };
    ProductComponent.prototype.editProduct = function () {
        this.productsService.editProduct(this.product);
    };
    ProductComponent.prototype.deleteProduct = function () {
        return this.productsService.showDeleteForm = true;
    };
    ProductComponent.prototype.isDeleteFormOpened = function () {
        return this.productsService.showDeleteForm;
    };
    ProductComponent = __decorate([
        core_1.Component({
            templateUrl: './product.component.html'
        }),
        __metadata("design:paramtypes", [shared_1.ProductsService,
            router_1.ActivatedRoute])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map