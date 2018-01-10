"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.fadeInOutAnimation = animations_1.trigger('fadeInOutAnimation', [
    animations_1.transition(':enter', [
        animations_1.style({ opacity: 0 }),
        animations_1.animate('.3s', animations_1.style({ opacity: 1 }))
    ]),
    animations_1.transition(':leave', [
        animations_1.style({ opacity: 1 }),
        animations_1.animate('.3s', animations_1.style({ opacity: 0 }))
    ]),
]);
