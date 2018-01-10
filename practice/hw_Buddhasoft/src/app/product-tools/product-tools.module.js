"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng2_imageupload_1 = require("ng2-imageupload");
var _1 = require("./");
var ProductToolsModule = /** @class */ (function () {
    function ProductToolsModule() {
    }
    ProductToolsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(_1.productToolsRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ng2_imageupload_1.ImageUploadModule
            ],
            declarations: [
                _1.NewProductComponent,
                _1.EditProductComponent
            ],
            providers: []
        })
    ], ProductToolsModule);
    return ProductToolsModule;
}());
exports.ProductToolsModule = ProductToolsModule;
//# sourceMappingURL=product-tools.module.js.map