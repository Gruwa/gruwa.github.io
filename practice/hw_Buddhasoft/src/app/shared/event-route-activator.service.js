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
var index_1 = require("./index");
var EventRouteActivatorService = /** @class */ (function () {
    function EventRouteActivatorService(productsService, router) {
        this.productsService = productsService;
        this.router = router;
    }
    EventRouteActivatorService.prototype.canActivate = function (route) {
        var eventExists = !!this.productsService.getProductById(+route.params['id']);
        if (!eventExists) {
            this.router.navigate(['/404']);
        }
        return eventExists;
    };
    EventRouteActivatorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [index_1.ProductsService,
            router_1.Router])
    ], EventRouteActivatorService);
    return EventRouteActivatorService;
}());
exports.EventRouteActivatorService = EventRouteActivatorService;
//# sourceMappingURL=event-route-activator.service.js.map