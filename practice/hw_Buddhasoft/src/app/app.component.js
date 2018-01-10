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
var shared_1 = require("./shared");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var timers_1 = require("timers");
require("../assets/style/style.scss");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, productsService) {
        this.router = router;
        this.productsService = productsService;
        this.isProductEdited = false;
        this.isProductCreated = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.productsService.productEditData$.subscribe(this.isProductEdited$Observer.bind(this));
        this.productsService.productNewData$.subscribe(this.isProductCreated$Observer.bind(this));
    };
    AppComponent.prototype.isProductEdited$Observer = function (booleanData) {
        var _this = this;
        this.isProductEdited = booleanData;
        timers_1.setTimeout(function () {
            _this.isProductEdited = false;
        }, 3000);
    };
    AppComponent.prototype.isProductCreated$Observer = function (booleanData) {
        var _this = this;
        this.isProductCreated = booleanData;
        timers_1.setTimeout(function () {
            _this.isProductCreated = false;
        }, 3000);
    };
    AppComponent.prototype.goToMainPage = function () {
        this.router.navigate(['/products']);
    };
    AppComponent.prototype.link = function () {
        this.router.navigate(['/tools/new']);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            shared_1.ProductsService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map