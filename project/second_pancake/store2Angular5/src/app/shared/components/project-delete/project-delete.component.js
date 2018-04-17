"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DeleteProjectComponent = /** @class */ (function () {
    function DeleteProjectComponent() {
        this.entityName = 'course';
        this.onDelete = new core_1.EventEmitter();
    }
    DeleteProjectComponent.prototype.ngOnInit = function () {
    };
    DeleteProjectComponent.prototype.onDeleteClick = function (needDelete) {
        if (needDelete === void 0) { needDelete = false; }
        this.onDelete.emit(needDelete);
    };
    __decorate([
        core_1.Input()
    ], DeleteProjectComponent.prototype, "entityName", void 0);
    __decorate([
        core_1.Output()
    ], DeleteProjectComponent.prototype, "onDelete", void 0);
    DeleteProjectComponent = __decorate([
        core_1.Component({
            selector: 'project-delete',
            templateUrl: './project-delete.component.html',
            styleUrls: ['./project-delete.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], DeleteProjectComponent);
    return DeleteProjectComponent;
}());
exports.DeleteProjectComponent = DeleteProjectComponent;
