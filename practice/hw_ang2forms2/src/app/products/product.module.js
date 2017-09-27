"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
// Imports for loading & configuring the in-memory web api
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var product_data_1 = require("./product-data");
var product_list_component_1 = require("./product-list.component");
var product_detail_component_1 = require("./product-detail.component");
var product_guard_service_1 = require("./product-guard.service");
var product_edit_component_1 = require("./product-edit.component");
var product_filter_pipe_1 = require("./product-filter.pipe");
var product_service_1 = require("./product.service");
var shared_module_1 = require("../shared/shared.module");
var ProductModule = (function () {
    function ProductModule() {
    }
    return ProductModule;
}());
ProductModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            forms_1.ReactiveFormsModule,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(product_data_1.ProductData),
            router_1.RouterModule.forChild([
                { path: 'products', component: product_list_component_1.ProductListComponent },
                { path: 'product/:id',
                    canActivate: [product_guard_service_1.ProductDetailGuard],
                    component: product_detail_component_1.ProductDetailComponent
                },
                { path: 'productEdit/:id',
                    canDeactivate: [product_guard_service_1.ProductEditGuard],
                    component: product_edit_component_1.ProductEditComponent },
            ])
        ],
        declarations: [
            product_list_component_1.ProductListComponent,
            product_detail_component_1.ProductDetailComponent,
            product_edit_component_1.ProductEditComponent,
            product_filter_pipe_1.ProductFilterPipe
        ],
        providers: [
            product_service_1.ProductService,
            product_guard_service_1.ProductDetailGuard,
            product_guard_service_1.ProductEditGuard
        ]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map