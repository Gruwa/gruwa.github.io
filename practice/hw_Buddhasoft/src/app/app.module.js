"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var routes_1 = require("./routes");
var http_1 = require("@angular/http");
var ngx_contextmenu_1 = require("./../../node_modules/ngx-contextmenu");
var angular_2_local_storage_1 = require("angular-2-local-storage");
var app_component_1 = require("./app.component");
var _404_component_1 = require("./error/404.component");
var shared_1 = require("./shared");
var products_1 = require("./products");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule.forRoot(routes_1.appRoutes, { useHash: true }),
                http_1.HttpModule,
                ngx_contextmenu_1.ContextMenuModule,
                angular_2_local_storage_1.LocalStorageModule.withConfig({
                    prefix: 'my-app',
                    storageType: 'localStorage'
                })
            ],
            declarations: [
                app_component_1.AppComponent,
                _404_component_1.Error404Component,
                products_1.ProductsComponent,
                products_1.ProductComponent,
                products_1.DeleteProductComponent
            ],
            providers: [
                shared_1.ProductsService,
                shared_1.EventRouteActivatorService
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map