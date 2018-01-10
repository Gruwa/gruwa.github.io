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
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var shared_1 = require("./../../shared");
var NewProductComponent = /** @class */ (function () {
    function NewProductComponent(productsService, router) {
        this.productsService = productsService;
        this.router = router;
        this.imgUrl = "";
        this.resizeOptions = {
            resizeMaxHeight: 128,
            resizeMaxWidth: 128
        };
    }
    NewProductComponent.prototype.ngOnInit = function () {
        this.title = new forms_1.FormControl('', [forms_1.Validators.required,
            forms_1.Validators.minLength(2),
            forms_1.Validators.maxLength(15),]);
        this.description = new forms_1.FormControl('', [forms_1.Validators.required,
            forms_1.Validators.minLength(2)]);
        this.price = new forms_1.FormControl('', forms_1.Validators.required);
        this.productForm = new forms_1.FormGroup({
            title: this.title,
            description: this.description,
            price: this.price
        });
    };
    NewProductComponent.prototype.saveProduct = function (formValues, productForm) {
        if (this.productForm.valid) {
            this.productsService.saveNewProduct(formValues, this.imgUrl);
            this.productForm.reset();
            this.router.navigate(['/products']);
        }
        this.productsService.productNewData$.next(true);
    };
    NewProductComponent.prototype.isSelected = function (imageResult) {
        this.imgUrl = imageResult.resized
            && imageResult.resized.dataURL
            || imageResult.dataURL;
    };
    NewProductComponent.prototype.cancelCreateForm = function () {
        this.productForm.reset();
    };
    NewProductComponent.prototype.validateTitle = function () {
        return this.title.valid || this.title.untouched;
    };
    NewProductComponent.prototype.validateDescription = function () {
        return this.description.valid || this.description.untouched;
    };
    NewProductComponent.prototype.validatePrice = function () {
        return this.price.valid || this.price.untouched;
    };
    NewProductComponent = __decorate([
        core_1.Component({
            templateUrl: './new-product.component.html'
        }),
        __metadata("design:paramtypes", [shared_1.ProductsService,
            router_1.Router])
    ], NewProductComponent);
    return NewProductComponent;
}());
exports.NewProductComponent = NewProductComponent;
//# sourceMappingURL=new-product.component.js.map