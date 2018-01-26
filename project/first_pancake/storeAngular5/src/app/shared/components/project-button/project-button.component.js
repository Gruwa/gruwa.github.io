"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProjectButtonComponent = /** @class */ (function () {
    function ProjectButtonComponent() {
        this.color = 'project__btn__color';
        this.type = 'button';
        this.fa = false;
        this.iconname = '';
        this.disabled = false;
        this.title = '';
        this.newClass = '';
        this.cancel = false;
        this.onClickEvent = new core_1.EventEmitter();
        this.classes = '';
    }
    ProjectButtonComponent.prototype.ngOnInit = function () {
    };
    ProjectButtonComponent.prototype.getClass = function () {
        this.classes = this.color;
        if (this.newClass) {
            this.classes += ' ' + this.newClass;
        }
        if (this.cancel) {
            this.classes += ' ' + 'project__btn__color--cancel';
        }
        return this.classes;
    };
    __decorate([
        core_1.Input()
    ], ProjectButtonComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input()
    ], ProjectButtonComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input()
    ], ProjectButtonComponent.prototype, "fa", void 0);
    __decorate([
        core_1.Input()
    ], ProjectButtonComponent.prototype, "iconname", void 0);
    __decorate([
        core_1.Input()
    ], ProjectButtonComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input()
    ], ProjectButtonComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input()
    ], ProjectButtonComponent.prototype, "newClass", void 0);
    __decorate([
        core_1.Input()
    ], ProjectButtonComponent.prototype, "cancel", void 0);
    __decorate([
        core_1.Output()
    ], ProjectButtonComponent.prototype, "onClickEvent", void 0);
    ProjectButtonComponent = __decorate([
        core_1.Component({
            selector: 'app-project-button',
            template: "\n        <button [disabled]=\"disabled\"\n                [type]=\"type\"\n                class=\"project__btn\"\n                [ngClass]=\"[getClass()]\"\n                (click)=\"onClickEvent.emit($event)\">\n            <i *ngIf=\"fa\" ngClass=\"{{ iconname }}\"></i>\n            {{ title }}\n        </button>",
            styleUrls: ['./project-button.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], ProjectButtonComponent);
    return ProjectButtonComponent;
}());
exports.ProjectButtonComponent = ProjectButtonComponent;
