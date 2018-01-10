"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _404_component_1 = require("./error/404.component");
var products_1 = require("./products");
var shared_1 = require("./shared");
exports.appRoutes = [
    { path: 'products', component: products_1.ProductsComponent },
    { path: 'products/:id', component: products_1.ProductComponent, canActivate: [shared_1.EventRouteActivatorService] },
    { path: '404', component: _404_component_1.Error404Component },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'tools', loadChildren: './product-tools/product-tools.module#ProductToolsModule' },
];
//# sourceMappingURL=routes.js.map