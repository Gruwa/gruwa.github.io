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
var shared_1 = require("./../../shared");
var EditProductComponent = /** @class */ (function () {
    function EditProductComponent(productsService, router) {
        this.productsService = productsService;
        this.router = router;
        this.imgUrl = "";
        this.resizeOptions = {
            resizeMaxHeight: 128,
            resizeMaxWidth: 128
        };
    }
    EditProductComponent.prototype.ngOnInit = function () {
        this.product = this.productsService.activeProduct;
        if (this.product === undefined) {
            this.router.navigate(['/products']);
        }
    };
    EditProductComponent.prototype.isSelected = function (imageResult) {
        this.imgUrl = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    };
    EditProductComponent.prototype.saveEditProduct = function (formValues, newProductForm) {
        if (this.imgUrl === '') {
            this.imgUrl = this.product.imageUrl;
        }
        this.productsService.saveEditProduct(formValues, this.imgUrl);
        newProductForm.resetForm();
        this.goToMainPage();
        this.productsService.productEditData$.next(true);
    };
    EditProductComponent.prototype.cancelEditForm = function (newProductForm) {
        newProductForm.resetForm();
    };
    EditProductComponent.prototype.goToMainPage = function () {
        this.router.navigate(['/products']);
    };
    EditProductComponent = __decorate([
        core_1.Component({
            templateUrl: './edit-product.component.html'
        }),
        __metadata("design:paramtypes", [shared_1.ProductsService,
            router_1.Router])
    ], EditProductComponent);
    return EditProductComponent;
}());
exports.EditProductComponent = EditProductComponent;
//# sourceMappingURL=edit-product.component.js.map