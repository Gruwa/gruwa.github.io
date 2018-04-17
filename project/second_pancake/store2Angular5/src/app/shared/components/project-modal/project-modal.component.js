"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("./../../animations");
var ProjectModalComponent = /** @class */ (function () {
    function ProjectModalComponent() {
        this.closable = true;
        this.visibleChange = new core_1.EventEmitter();
    }
    ProjectModalComponent.prototype.ngOnInit = function () { };
    ProjectModalComponent.prototype.close = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    __decorate([
        core_1.Input()
    ], ProjectModalComponent.prototype, "closable", void 0);
    __decorate([
        core_1.Input()
    ], ProjectModalComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Output()
    ], ProjectModalComponent.prototype, "visibleChange", void 0);
    ProjectModalComponent = __decorate([
        core_1.Component({
            selector: 'app-project-modal',
            templateUrl: './project-modal.component.html',
            styleUrls: ['./project-modal.component.scss'],
            animations: [animations_1.fadeInOutAnimation]
        })
    ], ProjectModalComponent);
    return ProjectModalComponent;
}());
exports.ProjectModalComponent = ProjectModalComponent;
