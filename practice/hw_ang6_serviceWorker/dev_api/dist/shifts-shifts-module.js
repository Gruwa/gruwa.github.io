(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shifts-shifts-module"],{

/***/ "./src/app/shared/services/http-guard.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/services/http-guard.service.ts ***!
  \*******************************************************/
/*! exports provided: HttpGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpGuardService", function() { return HttpGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Http Guard Service
 */
var HttpGuardService = /** @class */ (function () {
    function HttpGuardService() {
    }
    /**
     * Method for guard shifts
     * @returns {Array<any>}
     * @memberof ShiftsService
     */
    HttpGuardService.prototype.guardReFreshShift = function (value) {
        var resp = [];
        resp['items'] = [];
        var obj = {
            'shiftTitle': value['Items'].ShiftTitle,
            'shiftID': value['Items'].ShiftID,
            'isDropRequest': value['Items'].IsDropRequest,
            'isPickupRequest': value['Items'].IsPickupRequest,
            'job': value['Items'].Job,
            'jobID': value['Items'].JobID,
            'station': value['Items'].Station,
            'stationID': value['Items'].StationID,
            'dateFrom': value['Items'].DateFrom,
            'dateTo': value['Items'].DateTo,
            'location': value['Items'].Location,
            'locationID': value['Items'].LocationID
        };
        resp['items'].push(obj);
        return resp;
    };
    /**
     * Method for guard shifts
     * @returns {Array<any>}
     * @memberof ShiftsService
     */
    HttpGuardService.prototype.guardShifts = function (value) {
        /**
         * Variable of resp
         * @type {Array<any>}
         * @memberof ShiftsService
         */
        var resp = [];
        resp['locationList'] = [];
        resp['stationList'] = [];
        resp['jobList'] = [];
        resp['items'] = [];
        for (var i = 0; i < value['LocationList'].length; i++) {
            var obj = {
                'id': value['LocationList'][i].ID,
                'description': value['LocationList'][i].Description
            };
            resp['locationList'].push(obj);
        }
        for (var i = 0; i < value['StationList'].length; i++) {
            var obj = {
                'id': value['StationList'][i].ID,
                'description': value['StationList'][i].Description
            };
            resp['stationList'].push(obj);
        }
        for (var i = 0; i < value['JobList'].length; i++) {
            var obj = {
                'id': value['JobList'][i].ID,
                'description': value['JobList'][i].Description
            };
            resp['jobList'].push(obj);
        }
        for (var i = 0; i < value['Items'].length; i++) {
            var obj = {
                'shiftTitle': value['Items'][i].ShiftTitle,
                'shiftID': value['Items'][i].ShiftID,
                'isDropRequest': value['Items'][i].IsDropRequest,
                'isPickupRequest': value['Items'][i].IsPickupRequest,
                'job': value['Items'][i].Job,
                'jobID': value['Items'][i].JobID,
                'station': value['Items'][i].Station,
                'stationID': value['Items'][i].StationID,
                'dateFrom': value['Items'][i].DateFrom,
                'dateTo': value['Items'][i].DateTo,
                'location': value['Items'][i].Location,
                'locationID': value['Items'][i].LocationID
            };
            resp['items'].push(obj);
        }
        console.log('http-guard guardShifts', resp); // TODO - Delete when ready
        return resp;
    };
    HttpGuardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' })
    ], HttpGuardService);
    return HttpGuardService;
}());



/***/ }),

/***/ "./src/app/shared/services/http.service.ts":
/*!*************************************************!*\
  !*** ./src/app/shared/services/http.service.ts ***!
  \*************************************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _http_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http-guard.service */ "./src/app/shared/services/http-guard.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _flow_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flow.service */ "./src/app/shared/services/flow.service.ts");
/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data.service */ "./src/app/shared/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Http Service
 */
var HttpService = /** @class */ (function () {
    /**
     * Creates an instance of HttpService
     * @param {HttpClient} http
     * @param {HttpGuardService} httpGuardService
     * @param {FlowService} flowService,
     * @param {DataService} dataService
     * @memberof HttpService
     */
    function HttpService(http, httpGuardService, flowService, dataService) {
        this.http = http;
        this.httpGuardService = httpGuardService;
        this.flowService = flowService;
        this.dataService = dataService;
        /**
         * Variable of headers
         * @type {HttpHeaders}
         * @memberof HttpService
         */
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
    }
    /**
     * Method for get shifts
     * @param {ITabTypesShifts} tab
     * @memberof HttpService
     */
    HttpService.prototype.getShifts = function (tab) {
        var _this = this;
        if (tab === void 0) { tab = 'upcoming'; }
        if (this.dataService.TABS[tab]) {
            this.flowService["" + this.dataService.FLOW[tab]] = this.getShiftsRequest(tab).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (resp) {
                console.log('httpService getShifts', resp); // TODO - Delete when ready
                return _this.httpGuardService.guardShifts(resp);
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["publishReplay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["refCount"])());
        }
        console.log('!!!!!getShifts htttpService!!!!!');
    };
    /**
     * Method for get request with shifts
     * @param {ITabTypesShifts} tab
     * @memberof HttpService
     */
    HttpService.prototype.getShiftsRequest = function (tab) {
        if (tab === void 0) { tab = 'upcoming'; }
        return this.http.get(this.dataService.BASEURL + '/shifts/' + this.dataService.TABS[tab]);
    };
    /**
     * Method for delete shifts
     * @param {string} id
     * @memberof HttpService
     */
    HttpService.prototype.deleteShifts = function (id) {
        console.log('!!!!!patch upcoming Shifts htttpService!!!!!');
        return this.http.delete(this.dataService.BASEURL + '/shifts/delete/' + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (resp) {
            console.log('httpService DELETEShifts', resp); // TODO - Delete when ready
            return resp;
        }));
    };
    /**
     * Method for patch shifts
     * @param {string} id
     * @param {object} body
     * @memberof HttpService
     */
    HttpService.prototype.patchShifts = function (id, body) {
        var _this = this;
        console.log('!!!!!patch upcoming Shifts htttpService!!!!!');
        return this.patchShiftsRequest(id, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (resp) {
            console.log('httpService patchShifts', resp); // TODO - Delete when ready
            return _this.httpGuardService.guardReFreshShift(resp);
        }));
    };
    /**
     * Method for patch request with editing shift
     * @param {string} id
     * @param {object} body
     * @memberof HttpService
     */
    HttpService.prototype.patchShiftsRequest = function (id, body) {
        return this.http.patch(this.dataService.BASEURL + '/shifts/' + id, body);
    };
    /**
     * Method add all object to db
     * @memberof HttpService
     */
    HttpService.prototype.addAllObject = function () {
        // TODO - delete for real api request
        console.log('!!!!!htttp addAllObject!!!!!');
        return this.http.get(this.dataService.BASEURL + '');
    };
    HttpService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _http_guard_service__WEBPACK_IMPORTED_MODULE_2__["HttpGuardService"],
            _flow_service__WEBPACK_IMPORTED_MODULE_4__["FlowService"],
            _data_service__WEBPACK_IMPORTED_MODULE_5__["DataService"]])
    ], HttpService);
    return HttpService;
}());



/***/ }),

/***/ "./src/app/shifts/content-shifts/content-shifts.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/shifts/content-shifts/content-shifts.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-shifts\">\n  <div *ngFor=\"let shifts of sortShifts\" class=\"content-shifts__wrapper\">\n    <div class=\"content-shifts__title\">{{shifts.dateFormated}}</div>\n    <div *ngFor=\"let shift of shifts.shifts\" class=\"content-shifts__content\">\n      <app-shift-block [shift]=\"shift\"\n                       class=\"app-shift-block\"\n                       [routerLink]=\"['/', this.route.snapshot.params['group'], 'shifts', shift.shiftID]\">\n      </app-shift-block>\n    </div>\n  </div>\n  <!--TODO - part of side bar-->\n  <!--<div *ngIf=\"tab === 'my requests'\" class=\"content-shifts__buttons\">-->\n    <!--<button mat-fab class=\"content-shifts__button\"-->\n            <!--(click)=\"addNewMyRequest()\">-->\n        <!--<i class=\"material-icons\">add</i>-->\n    <!--</button>-->\n  <!--</div>-->\n</div>\n"

/***/ }),

/***/ "./src/app/shifts/content-shifts/content-shifts.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/shifts/content-shifts/content-shifts.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app-shift-block {\n  height: 100%; }\n\n.content-shifts {\n  width: 100%;\n  padding: 8px;\n  height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #f2f4f7;\n  box-sizing: border-box; }\n\n.content-shifts__title {\n    margin-bottom: 16px;\n    color: #6c7380; }\n\n.content-shifts__wrapper {\n    max-width: 976px;\n    padding: 16px;\n    margin: auto; }\n\n.content-shifts__buttons {\n    min-height: 90px; }\n\n.content-shifts__button {\n    border-radius: 50%;\n    background-color: #219451;\n    box-shadow: 0px 2px 6px 0px rgba(108, 115, 128, 0.5);\n    position: absolute;\n    right: 24px;\n    bottom: 24px;\n    width: 64px;\n    height: 64px;\n    z-index: 797;\n    cursor: pointer; }\n\n.content-shifts__button:focus {\n      outline: none; }\n\n.material-icons {\n  color: white;\n  font-size: 28px; }\n\n@media (min-width: 1024px) {\n  .content-shifts__button {\n    right: 50%;\n    margin-right: -490px; } }\n"

/***/ }),

/***/ "./src/app/shifts/content-shifts/content-shifts.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/shifts/content-shifts/content-shifts.component.ts ***!
  \*******************************************************************/
/*! exports provided: ContentShiftsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentShiftsComponent", function() { return ContentShiftsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_shifts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/shifts.service */ "./src/app/shifts/services/shifts.service.ts");
/* harmony import */ var _shared_services_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/http.service */ "./src/app/shared/services/http.service.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/dist/app.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/services/flow.service */ "./src/app/shared/services/flow.service.ts");
/* harmony import */ var _shared_services_data_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/services/data.service */ "./src/app/shared/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Content Shifts Component
 */
var ContentShiftsComponent = /** @class */ (function () {
    /**
     * Creates an instance of ContentShiftsComponent
     * @param {HttpClient} http
     * @param {ShiftsService} shiftsService
     * @param {FlowService} flowService
     * @param {HttpService} httpService
     * @param {LocalStorageService} localStorage
     * @param {Router} router
     * @param {ActivatedRoute} route
     * @param {DataService} dataService
     * @memberof ContentShiftsComponent
     */
    function ContentShiftsComponent(http, flowService, shiftsService, httpService, router, localStorage, route, dataService) {
        this.http = http;
        this.flowService = flowService;
        this.shiftsService = shiftsService;
        this.httpService = httpService;
        this.router = router;
        this.localStorage = localStorage;
        this.route = route;
        this.dataService = dataService;
        /**
         * Variable of ngUnsubscribe
         * @type {Subject<void>}
         * @memberof ContentShiftsComponent
         */
        this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    }
    /**
     * Method ngOnInit
     * @returns {void}
     * @memberof ContentShiftsComponent
     */
    ContentShiftsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tab = this.dataService.indexTABS[this.tabActive];
        this.flowService.dataSmallSpinner$.next(true);
        this.flowService["" + this.dataService.FLOW[this.tab]].pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.ngUnsubscribe)).subscribe(function (value) {
            _this.getShifts(value['items']);
        });
    };
    /**
     * Method ngOnDestroy
     * @returns {void}
     * @memberof ContentShiftsComponent
     */
    ContentShiftsComponent.prototype.ngOnDestroy = function () {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    /**
     * Method for get Shifts
     * @returns {void}
     * @memberof ContentShiftsComponent
     */
    ContentShiftsComponent.prototype.getShifts = function (value) {
        this.sortShifts = this.shiftsService.sortShifts(value);
        console.log('sortShifts', this.sortShifts);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ContentShiftsComponent.prototype, "tabActive", void 0);
    ContentShiftsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-content-shifts',
            template: __webpack_require__(/*! ./content-shifts.component.html */ "./src/app/shifts/content-shifts/content-shifts.component.html"),
            styles: [__webpack_require__(/*! ./content-shifts.component.scss */ "./src/app/shifts/content-shifts/content-shifts.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_8__["FlowService"],
            _services_shifts_service__WEBPACK_IMPORTED_MODULE_2__["ShiftsService"],
            _shared_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _shared_services_data_service__WEBPACK_IMPORTED_MODULE_9__["DataService"]])
    ], ContentShiftsComponent);
    return ContentShiftsComponent;
}());



/***/ }),

/***/ "./src/app/shifts/details-shifts/details-shifts.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/shifts/details-shifts/details-shifts.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"details-shifts\">\n  <app-header-shifts [headerDescription]=\"headerDescription\"\n                     class=\"details-shifts__app-header\"\n                     [save]=\"true\"\n                     [tab]=\"tab\"\n                     [closePage]=\"true\">\n  </app-header-shifts>\n  <div class=\"details-shifts__content\">\n    <!--TODO - for side bar part-->\n    <!--<app-form [shiftActive]=\"shiftActive\"-->\n              <!--[status]=\"status\"-->\n              <!--[tab]=\"tab\"-->\n              <!--*ngIf=\"tab === 'my requests'\">-->\n    <!--</app-form>-->\n    <app-list-fields [shiftActive]=\"shiftActive\"\n                     [status]=\"status\"\n                     *ngIf=\"tab !== 'my requests'\">\n    </app-list-fields>\n    <app-small-spinner [ngClass]=\"{'global__small-spinner-display' : spinner}\"\n    class=\"global__small-spinner\">\n    </app-small-spinner>\n  </div>\n  <div class=\"details-shifts__footer\" (click)=\"clickFooter()\">\n    {{footerDescription}}\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shifts/details-shifts/details-shifts.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/shifts/details-shifts/details-shifts.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".details-shifts {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n  .details-shifts__app-header {\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    flex-shrink: 0;\n    align-items: center;\n    background-color: #222a51; }\n  .details-shifts__content {\n    width: 100%;\n    height: 100%;\n    padding: 24px;\n    background-color: white;\n    box-sizing: border-box;\n    overflow: auto;\n    position: relative; }\n  .details-shifts__footer {\n    width: 100%;\n    height: 56px;\n    background-color: #4c97ff;\n    color: white;\n    display: flex;\n    flex-direction: column;\n    flex-shrink: 0;\n    justify-content: center;\n    align-items: center;\n    text-transform: uppercase;\n    font-size: 15px;\n    cursor: pointer;\n    font-weight: bold; }\n"

/***/ }),

/***/ "./src/app/shifts/details-shifts/details-shifts.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/shifts/details-shifts/details-shifts.component.ts ***!
  \*******************************************************************/
/*! exports provided: DetailsShiftsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsShiftsComponent", function() { return DetailsShiftsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_shifts_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/shifts.service */ "./src/app/shifts/services/shifts.service.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/dist/app.js");
/* harmony import */ var _shared_services_http_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/http.service */ "./src/app/shared/services/http.service.ts");
/* harmony import */ var _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/services/flow.service */ "./src/app/shared/services/flow.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_services_data_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/services/data.service */ "./src/app/shared/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Details Shifts Component
 */
var DetailsShiftsComponent = /** @class */ (function () {
    /**
     * Creates an instance of DetailsShiftsComponent
     * @param {ActivatedRoute} route
     * @param {ShiftsService} shiftsService
     * @param {LocalStorageService} localStorage
     * @param {Router} router
     * @param {HttpService} httpService
     * @param {FlowService} flowService
     * @param {ToastrService} toastr
     * @param {DataService} dataService
     * @memberof DetailsShiftsComponent
     */
    function DetailsShiftsComponent(route, shiftsService, localStorage, httpService, flowService, router, toastr, dataService) {
        this.route = route;
        this.shiftsService = shiftsService;
        this.localStorage = localStorage;
        this.httpService = httpService;
        this.flowService = flowService;
        this.router = router;
        this.toastr = toastr;
        this.dataService = dataService;
        /**
         * Variable headerDescription
         * @type {string}
         * @memberof DetailsShiftsComponent
         */
        this.headerDescription = 'New request';
        /**
         * Variable spinner
         * @type {boolean}
         * @memberof DetailsShiftsComponent
         */
        this.spinner = false;
        /**
         * Variable of tab
         * @type {ITabTypesShifts}
         * @memberof DetailsShiftsComponent
         */
        this.tab = 'upcoming';
        /**
         * Variable of footerActive
         * @type {boolean}
         * @memberof DetailsShiftsComponent
         */
        this.footerActive = true;
        /**
         * Variable of ngUnsubscribe
         * @type {Subject<void>}
         * @memberof DetailsShiftsComponent
         */
        this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_6__["Subject"]();
    }
    /**
     * Method ngOnInit
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */
    DetailsShiftsComponent.prototype.ngOnInit = function () {
        this.flowService.dataSmallSpinner$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.ngUnsubscribe)).subscribe(this.spinnerShow.bind(this));
        this.flowService.dataSmallSpinner$.next(true);
        this.flowService.dataSave$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.ngUnsubscribe)).subscribe(this.saveShift.bind(this));
        this.tab = this.localStorage.retrieve('tab');
        this.shiftActiveId = this.route.snapshot.params['id'];
        if (this.flowService["" + this.dataService.FLOW[this.tab]] === undefined) {
            console.log(this.tab);
            this.httpService.getShifts(this.tab);
            this.flowService["" + this.dataService.FLOW[this.tab]].pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["takeUntil"])(this.ngUnsubscribe)).subscribe();
        }
        if (this.shiftActiveId === 'new') {
            this.headerDescription = 'new request';
        }
        this.getShifts();
    };
    /**
     * Method ngOnDestroy
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */
    DetailsShiftsComponent.prototype.ngOnDestroy = function () {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    /**
     * Method getDataShift
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */
    DetailsShiftsComponent.prototype.getShifts = function () {
        var _this = this;
        this.flowService["" + this.dataService.FLOW[this.tab]].subscribe(function (value) {
            for (var i in _this.dataService.FLOW) {
                if (_this.flowService["" + _this.dataService.FLOW[i]] === undefined) {
                    _this.httpService.getShifts(i);
                }
            }
            var item = {};
            if (_this.route.snapshot.params['id'] !== 'new') {
                item = value['items'].find(function (result) { return result.shiftID === _this.shiftActiveId; });
            }
            _this.shiftActive = {
                item: item,
                locationList: value.locationList,
                stationList: value.stationList,
                jobList: value.jobList
            };
            if (_this.shiftActive['item'] === undefined) {
                _this.router.navigate(['/' + _this.route.snapshot.params['group'], 'shifts']);
            }
            else {
                _this.headerDescription = _this.shiftActive['item'].shiftTitle;
                if (_this.tab === 'upcoming' || _this.tab === 'available') {
                    if (_this.shiftActive['item'].isDropRequest && _this.shiftActive['item'].isPickupRequest) {
                        _this.status = _this.dataService.STATUS["" + _this.dataService.SHIFT_REQUEST[_this.tab]];
                        _this.footerActive = false;
                    }
                    if (!_this.shiftActive['item'].isDropRequest && _this.shiftActive['item'].isPickupRequest) {
                        _this.status = _this.dataService.STATUS['pickup request'];
                        _this.footerActive = false;
                    }
                    if (!_this.shiftActive['item'].isDropRequest && !_this.shiftActive['item'].isPickupRequest) {
                        _this.status = _this.dataService.STATUS['scheduled'];
                        _this.footerActive = true;
                    }
                    if (_this.shiftActive['item'].isDropRequest && !_this.shiftActive['item'].isPickupRequest) {
                        _this.status = _this.dataService.STATUS['drop request'];
                        _this.footerActive = false;
                    }
                }
                if (_this.tab === 'my requests') {
                    console.log('shiftActive details', _this.shiftActive);
                    if (!_this.shiftActive['item'].isDropRequest && !_this.shiftActive['item'].isPickupRequest) {
                        _this.status = _this.dataService.STATUS['scheduled'];
                    }
                    else {
                        _this.status = ' ';
                    }
                }
                _this.setFooterRequest();
            }
        });
    };
    /**
     * Method for set description for FooterRequest
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */
    DetailsShiftsComponent.prototype.setFooterRequest = function () {
        if (this.tab === 'upcoming') {
            this.footerActive ? this.footerDescription = this.dataService.FOOTER_REQUESTS[0]
                : this.footerDescription = this.dataService.FOOTER_REQUESTS[1];
        }
        if (this.tab === 'my requests') {
            this.footerDescription = this.dataService.FOOTER_REQUESTS[4];
        }
        if (this.tab === 'available') {
            this.footerActive ? this.footerDescription = this.dataService.FOOTER_REQUESTS[2]
                : this.footerDescription = this.dataService.FOOTER_REQUESTS[3];
        }
        this.flowService.dataSmallSpinner$.next(false);
    };
    /**
     * Method for click on footer
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */
    DetailsShiftsComponent.prototype.clickFooter = function () {
        this.footerActive = !this.footerActive;
        if (this.tab === 'upcoming' || this.tab === 'available') {
            if (!this.footerActive) {
                this.shiftActive['item']["" + this.dataService.SHIFT_ACTIVE[this.tab]] = true;
                if (this.tab === 'upcoming') {
                    this.status = this.dataService.STATUS['drop request'];
                }
                if (this.tab === 'available') {
                    this.status = this.dataService.STATUS['pickup request'];
                }
            }
            else {
                this.shiftActive['item'].isDropRequest = false;
                this.shiftActive['item'].isPickupRequest = false;
                this.status = this.dataService.STATUS['scheduled'];
            }
        }
        if (this.tab === 'my requests') {
            if (this.route.snapshot.params['id'] === 'new') {
                this.router.navigate(['/' + this.route.snapshot.params['group'], 'shifts']);
            }
            else {
                this.deleteShift();
            }
        }
        this.setFooterRequest();
    };
    /**
     * Method for delete shift
     * @returns {void}
     * @memberof DetailsShiftsComponent
     */
    DetailsShiftsComponent.prototype.deleteShift = function () {
        var _this = this;
        console.log('DELETE');
        this.httpService.deleteShifts(this.route.snapshot.params['id']).subscribe(function () {
            _this.toastr.success(_this.dataService.httpSuccessResponse['delete']);
            _this.flowService["" + _this.dataService.FLOW[_this.tab]].subscribe(function (data) {
                for (var key in data['items']) {
                    if (data['items'][key].shiftID === _this.route.snapshot.params['id']) {
                        console.log(key);
                        data['items'].splice(key, 1);
                    }
                }
            });
            _this.router.navigate(['/' + _this.route.snapshot.params['group'], 'shifts']);
        });
        // TODO - method for delete shift
    };
    /**
     * Method for save shift- method work only if we receive object
     * @returns {void}
     * @param {string | object} value
     * @memberof DetailsShiftsComponent
     */
    DetailsShiftsComponent.prototype.saveShift = function (value) {
        var _this = this;
        if (typeof value === 'object') {
            this.httpService.patchShifts(this.route.snapshot.params['id'], value).subscribe(function (resp) {
                _this.toastr.success(_this.dataService.httpSuccessResponse['save']);
                _this.flowService["" + _this.dataService.FLOW[_this.tab]].subscribe(function (data) {
                    for (var key in data['items']) {
                        if (data['items'][key].shiftID === resp.items[0].shiftID) {
                            data['items'][key] = resp.items[0];
                        }
                    }
                });
                _this.router.navigate(['/' + _this.route.snapshot.params['group'], 'shifts']);
            });
        }
        // TODO - method for save shift
    };
    /**
     * Method fo show spinner
     * @returns {void}
     * @param {boolean} event
     * @memberof DetailsShiftsComponent
     */
    DetailsShiftsComponent.prototype.spinnerShow = function (event) {
        console.log('spinnerShow');
        this.spinner = event;
    };
    DetailsShiftsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-details-shifts',
            template: __webpack_require__(/*! ./details-shifts.component.html */ "./src/app/shifts/details-shifts/details-shifts.component.html"),
            styles: [__webpack_require__(/*! ./details-shifts.component.scss */ "./src/app/shifts/details-shifts/details-shifts.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_shifts_service__WEBPACK_IMPORTED_MODULE_2__["ShiftsService"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
            _shared_services_http_service__WEBPACK_IMPORTED_MODULE_4__["HttpService"],
            _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_5__["FlowService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"],
            _shared_services_data_service__WEBPACK_IMPORTED_MODULE_9__["DataService"]])
    ], DetailsShiftsComponent);
    return DetailsShiftsComponent;
}());



/***/ }),

/***/ "./src/app/shifts/details-shifts/list-fields/list-fields.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/shifts/details-shifts/list-fields/list-fields.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"list-fields\">\n  <div class=\"list-fields__field\">\n    <span class=\"list-fields__label\">{{dataService.LIST_FIELDS['title'] | capitalizeFirst}}</span>\n    <span class=\"list-fields__value\">{{shift?.location | capitalizeFirst}}</span>\n  </div>\n  <div class=\"list-fields__field\">\n    <span class=\"list-fields__label\">{{dataService.LIST_FIELDS['date'] | capitalizeFirst}}</span>\n    <span class=\"list-fields__value\">{{shift?.dateFrom | realDate: \"L\"}}</span>\n  </div>\n  <div class=\"list-fields__group\">\n    <div class=\"list-fields__field\">\n      <span class=\"list-fields__label\">{{dataService.LIST_FIELDS['startTime'] | capitalizeFirst}}</span>\n      <span class=\"list-fields__value\">{{shift?.dateFrom | realDate: \"LT\"}}</span>\n    </div>\n    <div class=\"list-fields__field\">\n      <span class=\"list-fields__label\">{{dataService.LIST_FIELDS['endTime'] | capitalizeFirst}}</span>\n      <span class=\"list-fields__value\">{{shift?.dateTo | realDate: \"LT\"}}</span>\n    </div>\n  </div>\n  <div class=\"list-fields__field\">\n    <span class=\"list-fields__label\">{{dataService.LIST_FIELDS['location'] | capitalizeFirst}}</span>\n    <span class=\"list-fields__value\">{{shift?.location | capitalizeFirst}}</span>\n  </div>\n  <div class=\"list-fields__field\">\n    <span class=\"list-fields__label\">{{dataService.LIST_FIELDS['station'] | capitalizeFirst}}</span>\n    <span class=\"list-fields__value\">{{shift?.station | capitalizeFirst}}</span>\n  </div>\n  <div class=\"list-fields__field\">\n    <span class=\"list-fields__label\">{{dataService.LIST_FIELDS['jobTitle'] | capitalizeFirst}}</span>\n    <span class=\"list-fields__value\">{{shift?.job | capitalizeFirst}}</span>\n  </div>\n  <div class=\"list-fields__field\">\n    <span class=\"list-fields__label\">{{dataService.LIST_FIELDS['status'] | capitalizeFirst}}</span>\n    <span class=\"list-fields__value list-fields\">{{status | capitalizeFirst}}</span>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shifts/details-shifts/list-fields/list-fields.component.scss":
/*!******************************************************************************!*\
  !*** ./src/app/shifts/details-shifts/list-fields/list-fields.component.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".list-fields {\n  width: 100%;\n  max-width: 312px;\n  margin: auto;\n  font-family: Lato, Helvetica, Arial, sans-serif; }\n  .list-fields__group {\n    display: flex; }\n  .list-fields__field {\n    display: flex;\n    flex-direction: column;\n    margin-bottom: 22px;\n    border-bottom: 2px solid rgba(108, 115, 127, 0.502); }\n  .list-fields__group .list-fields__field {\n    width: 49%; }\n  .list-fields__group .list-fields__field:last-child {\n    margin-left: 7.5%; }\n  .list-fields__label {\n    margin-top: 2px;\n    margin-bottom: 4px;\n    font-size: 14px;\n    color: #6c737f;\n    line-height: 1.286; }\n  .list-fields__value {\n    margin-bottom: 7px;\n    font-size: 18px;\n    color: #141f33;\n    font-weight: bold;\n    line-height: 1; }\n"

/***/ }),

/***/ "./src/app/shifts/details-shifts/list-fields/list-fields.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/shifts/details-shifts/list-fields/list-fields.component.ts ***!
  \****************************************************************************/
/*! exports provided: ListFieldsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListFieldsComponent", function() { return ListFieldsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/dist/app.js");
/* harmony import */ var _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/services/flow.service */ "./src/app/shared/services/flow.service.ts");
/* harmony import */ var _shared_services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/services/data.service */ "./src/app/shared/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * List Fields Component
 * for showing some fields of shifts
 */
var ListFieldsComponent = /** @class */ (function () {
    /**
     * Creates an instance of ListFieldsComponent
     * @param {ActivatedRoute} route
     * @param {LocalStorageService} localStorage
     * @param {FlowService} flowService
     * @param {DataService} dataService
     * @memberof ListFieldsComponent
     */
    function ListFieldsComponent(route, localStorage, flowService, dataService) {
        this.route = route;
        this.localStorage = localStorage;
        this.flowService = flowService;
        this.dataService = dataService;
    }
    /**
     * Method ngOnInit
     * @returns {void}
     * @memberof ListFieldsComponent
     */
    ListFieldsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.shiftActive === undefined) {
            this.flowService[this.dataService.FLOW[this.localStorage.retrieve('tab')]].subscribe(function (resp) {
                var array = [];
                for (var key in resp) {
                    if (key === 'items') {
                        array = array.concat(resp[key]);
                        _this.shift = array.find(function (item) { return item.shiftID === _this.route.snapshot.params['id']; });
                        console.log(array);
                    }
                }
            });
        }
        else {
            this.shift = this.shiftActive['item'];
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ListFieldsComponent.prototype, "shiftActive", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ListFieldsComponent.prototype, "status", void 0);
    ListFieldsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-list-fields',
            template: __webpack_require__(/*! ./list-fields.component.html */ "./src/app/shifts/details-shifts/list-fields/list-fields.component.html"),
            styles: [__webpack_require__(/*! ./list-fields.component.scss */ "./src/app/shifts/details-shifts/list-fields/list-fields.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
            _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_3__["FlowService"],
            _shared_services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"]])
    ], ListFieldsComponent);
    return ListFieldsComponent;
}());



/***/ }),

/***/ "./src/app/shifts/services/shifts.service.ts":
/*!***************************************************!*\
  !*** ./src/app/shifts/services/shifts.service.ts ***!
  \***************************************************/
/*! exports provided: ShiftsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShiftsService", function() { return ShiftsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/services/http.service */ "./src/app/shared/services/http.service.ts");
/* harmony import */ var _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/flow.service */ "./src/app/shared/services/flow.service.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Variable of month
 * @type {Array<string>}
 * @memberof ShiftsService
 */
var MONTH = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
/**
 * Variable of day
 * @type {Array<string>}
 * @memberof ShiftsService
 */
var DAY = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];
/**
 * Auth Guard Service
 */
var ShiftsService = /** @class */ (function () {
    /**
     * Creates an instance of ShiftsService
     * @param {Router} router
     * @param {HttpService} httpService
     * @param {FlowService} flowService
     * @memberof ShiftsService
     */
    function ShiftsService(router, httpService, flowService) {
        this.router = router;
        this.httpService = httpService;
        this.flowService = flowService;
    }
    /**
     * Method for creating and sorting array of shifts
     * @param {Array<IShift>} value - raw array of shifts
     * @returns {Array<IShiftsSorted>}
     * @memberof ShiftsService
     */
    ShiftsService.prototype.sortShifts = function (value) {
        this.shifts = value;
        /**
         * Variable of newObjectOfShifts
         * @type {Object}
         * @memberof ShiftsService
         */
        var newObjectOfShifts = {};
        /**
         * Variable of result
         * @type {Array}
         * @memberof ShiftsService
         */
        var result = [];
        /**
         * Method for formating date of shifts
         * @param {any} dateStr - date of starting shifts
         * @returns {string}
         * @memberof ShiftsService
         */
        function getFormatedDate(dateStr) {
            /**
             * Variable of date
             * @type {any}
             * @memberof ShiftsService
             */
            var date = new Date(dateStr);
            return DAY[date.getDay()] + ',' + ' ' + MONTH[date.getMonth()] + ' ' + date.getDate();
        }
        /**
         * Loop for creating new object of shifts
         * @memberof ShiftsService
         */
        for (var i = 0; i < value.length; i++) {
            /**
             * Variable of formatedDate
             * @type {any}
             * @memberof ShiftsService
             */
            var formatedDate = getFormatedDate(value[i].dateFrom);
            if (newObjectOfShifts[formatedDate]) {
                newObjectOfShifts[formatedDate].shifts.push(value[i]);
            }
            else {
                /**
                 * Variable of object for creating new object
                 * @type {any}
                 * @memberof ShiftsService
                 */
                var object = {
                    'dateFrom': value[i].dateFrom,
                    'dateFormated': formatedDate,
                    'shifts': []
                };
                object.shifts.push(newObjectOfShifts[formatedDate]);
                newObjectOfShifts[formatedDate] = object;
                newObjectOfShifts[formatedDate].shifts = [value[i]];
            }
        }
        /**
         * Loop for creating new array of shifts
         * @memberof ShiftsService
         */
        for (var i in newObjectOfShifts) {
            newObjectOfShifts[i].shifts.sort(this.sortFunction);
            result.push(newObjectOfShifts[i]);
        }
        this.flowService.dataSpinner$.next(false);
        this.flowService.dataSmallSpinner$.next(false);
        return result.sort(this.sortFunction);
    };
    /**
     * Method of sorting
     * @param {IShiftsSorted} a - sorted shift
     * @param {IShiftsSorted} b - sorted shift
     * @returns {number}
     * @memberof ShiftsService
     */
    ShiftsService.prototype.sortFunction = function (a, b) {
        var dateA = new Date(a.dateFrom).getTime();
        var dateB = new Date(b.dateFrom).getTime();
        return dateA > dateB ? 1 : -1;
    };
    /**
     * Method of create dateFrom and dateTo for save request
     * @param {string} timeFrom
     * @param {string} timeTo
     * @param {string} date
     * @returns {Array}
     * @memberof ShiftsService
     */
    ShiftsService.prototype.createDate = function (date, timeFrom, timeTo) {
        if ((timeFrom.substring(0, 2) > timeTo.substring(0, 2)) ||
            (timeFrom.substring(0, 2) === timeTo.substring(0, 2) && timeFrom.substring(3, 5) > timeTo.substring(3, 5))) {
            return [
                moment__WEBPACK_IMPORTED_MODULE_4__(new Date(date)).format('YYYY-MM-DD') + 'T' + timeFrom + ':00.000Z',
                moment__WEBPACK_IMPORTED_MODULE_4__(new Date(date)).add(1, 'days').format('YYYY-MM-DD') + 'T' + timeTo + ':00.000Z'
            ];
        }
        else {
            return [
                moment__WEBPACK_IMPORTED_MODULE_4__(new Date(date)).format('YYYY-MM-DD') + 'T' + timeFrom + ':00.000Z',
                moment__WEBPACK_IMPORTED_MODULE_4__(new Date(date)).format('YYYY-MM-DD') + 'T' + timeTo + ':00.000Z'
            ];
        }
    };
    ShiftsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _shared_services_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_3__["FlowService"]])
    ], ShiftsService);
    return ShiftsService;
}());



/***/ }),

/***/ "./src/app/shifts/shifts.component.html":
/*!**********************************************!*\
  !*** ./src/app/shifts/shifts.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"shifts\">\r\n  <app-header-shifts [headerDescription]=\"headerDescription\"\r\n                     class=\"shifts__app-header\"\r\n                     [sideBar]=\"true\">\r\n  </app-header-shifts>\r\n  <div class=\"shifts__content\">\r\n    <mat-tab-group (selectedTabChange)=\"selectedTabChange($event)\"\r\n                   [selectedIndex]=tabIndex>\r\n      <div *ngFor=\"let tab of dataService.indexTABS; let l = index\">\r\n        <mat-tab label={{tab}}\r\n                 position=0\r\n                 class=\"mat-tab-label\">\r\n          <ng-template matTabContent>\r\n\r\n            <app-content-shifts [tabActive]=\"l\"></app-content-shifts>\r\n            <app-small-spinner [ngClass]=\"{'global__small-spinner-display' : spinner}\"\r\n                               class=\"global__small-spinner\">\r\n            </app-small-spinner>\r\n          </ng-template>\r\n        </mat-tab>\r\n      </div>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/shifts/shifts.component.scss":
/*!**********************************************!*\
  !*** ./src/app/shifts/shifts.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "app-shifts {\n  height: 100%;\n  display: block; }\n\n.mat-tab-group.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-group.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus,\n.mat-tab-nav-bar.mat-primary .mat-tab-label:not(.mat-tab-disabled):focus,\n.mat-tab-nav-bar.mat-primary .mat-tab-link:not(.mat-tab-disabled):focus {\n  background-color: transparent; }\n\n.shifts {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow: hidden; }\n\n.shifts__app-header {\n    width: 100%;\n    background-color: #222a51;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    height: 48px;\n    flex-shrink: 0; }\n\n.shifts__content {\n    width: 100%;\n    display: flex;\n    flex-grow: 1;\n    flex-direction: column; }\n\n.shifts__content .mat-tab-group {\n      flex-grow: 1;\n      -webkit-tap-highlight-color: transparent; }\n\n.shifts__content .mat-tab-group .mat-tab-label .mat-ripple .ng-star-inserted {\n        padding: 0; }\n\n.shifts__content .mat-tab-group .mat-tab-label {\n        text-transform: uppercase;\n        color: #63749b;\n        font-size: 14px;\n        padding: 0 16px;\n        min-width: inherit;\n        font-weight: bold;\n        font-family: Lato, Helvetica, Arial, sans-serif;\n        opacity: 1; }\n\n.shifts__content .mat-tab-group .mat-tab-label:hover {\n          color: #b2bbd2; }\n\n.shifts__content .mat-tab-group .mat-tab-label:hover.mat-tab-label-active {\n            color: #4c93ff; }\n\n.shifts__content .mat-tab-group .mat-tab {\n        position: relative; }\n\n.shifts__content .mat-tab-group .mat-tab-header {\n        background-color: #222a51;\n        border-bottom: none;\n        height: 48px;\n        flex-shrink: 0;\n        padding: 0 8px; }\n\n.shifts__content .mat-tab-group .mat-tab-label-container {\n        max-width: 1008px;\n        margin: auto; }\n\n.shifts__content .mat-tab-group .mat-ink-bar {\n        height: 3px;\n        color: #4c93ff; }\n\n.shifts__content .mat-tab-group .mat-tab-label-active {\n        color: #4c93ff; }\n\n.shifts__content .mat-tab-group .mat-tab-body-wrapper {\n        flex-grow: 1;\n        overflow: auto;\n        height: 100%; }\n\n.shifts__content .mat-tab-group .mat-tab-header-pagination-before {\n        margin-left: -8px; }\n\n.shifts__content .mat-tab-group .mat-tab-header-pagination-after {\n        margin-right: -8px; }\n\n.shifts__content .mat-tab-group .mat-tab-header-pagination-chevron {\n        border-color: rgba(255, 255, 255, 0.9); }\n\n.shifts__content .mat-tab-group .mat-tab-header-pagination-disabled .mat-tab-header-pagination-chevron {\n        border-color: rgba(255, 255, 255, 0.3); }\n"

/***/ }),

/***/ "./src/app/shifts/shifts.component.ts":
/*!********************************************!*\
  !*** ./src/app/shifts/shifts.component.ts ***!
  \********************************************/
/*! exports provided: ShiftsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShiftsComponent", function() { return ShiftsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/services/http.service */ "./src/app/shared/services/http.service.ts");
/* harmony import */ var _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/services/flow.service */ "./src/app/shared/services/flow.service.ts");
/* harmony import */ var ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-webstorage */ "./node_modules/ngx-webstorage/dist/app.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _shared_services_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/services/data.service */ "./src/app/shared/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Shifts Component
 */
var ShiftsComponent = /** @class */ (function () {
    /**
     * Creates an instance of ShiftsComponent
     * @param {FlowService} flowService
     * @param {LocalStorageService} localStorage
     * @param {HttpService} httpService
     * @param {DataService} dataService
     * @memberof ShiftsComponent
     */
    function ShiftsComponent(httpService, flowService, localStorage, dataService) {
        this.httpService = httpService;
        this.flowService = flowService;
        this.localStorage = localStorage;
        this.dataService = dataService;
        /**
         * Variable headerDescription
         * @type {string}
         * @memberof ShiftsComponent
         */
        this.headerDescription = 'Shifts';
        /**
         * Variable of tab
         * @type {ITabTypesShifts}
         * @memberof ShiftsComponent
         */
        this.tab = 'upcoming';
        /**
         * Variable spinner
         * @type {boolean}
         * @memberof ShiftsComponent
         */
        this.spinner = false;
        /**
         * Variable of tabActive
         * @type {ITabTypesShifts}
         * @memberof ShiftsComponent
         */
        this.tabActive = 'upcoming';
        /**
         * Variable of ngUnsubscribe
         * @type {Subject<void>}
         * @memberof ShiftsComponent
         */
        this.ngUnsubscribe = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
    }
    /**
     * Method ngOnInit
     * @returns {void}
     * @memberof ShiftsComponent
     */
    ShiftsComponent.prototype.ngOnInit = function () {
        this.flowService.dataSmallSpinner$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["takeUntil"])(this.ngUnsubscribe), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(500)).subscribe(this.spinnerShow.bind(this));
        this.flowService.dataSmallSpinner$.next(true);
        for (var i in this.dataService.FLOW) {
            if (this.flowService["" + this.dataService.FLOW[i]] === undefined) {
                this.httpService.getShifts(i);
            }
        }
        if (this.localStorage.retrieve('tab') !== null) {
            console.log(this.localStorage.retrieve('tab'));
            this.tabActive = this.localStorage.retrieve('tab');
        }
        else {
            this.localStorage.store('tab', this.tabActive);
        }
        this.tabIndex = this.dataService.indexTABS.indexOf(this.localStorage.retrieve('tab'));
    };
    /**
     * Method for get changes on tab selectedTabChange
     * @returns {void}
     * @memberof ShiftsComponent
     */
    ShiftsComponent.prototype.selectedTabChange = function (value) {
        this.tabActive = this.dataService.indexTABS[value.index];
        this.localStorage.store('tab', this.dataService.indexTABS[value.index]);
    };
    /**
     * Method fo show spinner
     * @returns {void}
     * @param {boolean} event
     * @memberof ShiftsComponent
     */
    ShiftsComponent.prototype.spinnerShow = function (event) {
        console.log('spinnerShow');
        this.spinner = event;
    };
    /**
     * Method ngOnDestroy
     * @returns {void}
     * @memberof ShiftsComponent
     */
    ShiftsComponent.prototype.ngOnDestroy = function () {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    };
    ShiftsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-shifts',
            template: __webpack_require__(/*! ./shifts.component.html */ "./src/app/shifts/shifts.component.html"),
            styles: [__webpack_require__(/*! ./shifts.component.scss */ "./src/app/shifts/shifts.component.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_shared_services_http_service__WEBPACK_IMPORTED_MODULE_1__["HttpService"],
            _shared_services_flow_service__WEBPACK_IMPORTED_MODULE_2__["FlowService"],
            ngx_webstorage__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"],
            _shared_services_data_service__WEBPACK_IMPORTED_MODULE_6__["DataService"]])
    ], ShiftsComponent);
    return ShiftsComponent;
}());



/***/ }),

/***/ "./src/app/shifts/shifts.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shifts/shifts.module.ts ***!
  \*****************************************/
/*! exports provided: routes, ShiftsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShiftsModule", function() { return ShiftsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shifts_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shifts.component */ "./src/app/shifts/shifts.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_components_app_components_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/components/app-components.module */ "./src/app/shared/components/app-components.module.ts");
/* harmony import */ var _content_shifts_content_shifts_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./content-shifts/content-shifts.component */ "./src/app/shifts/content-shifts/content-shifts.component.ts");
/* harmony import */ var _details_shifts_details_shifts_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./details-shifts/details-shifts.component */ "./src/app/shifts/details-shifts/details-shifts.component.ts");
/* harmony import */ var _services_shifts_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/shifts.service */ "./src/app/shifts/services/shifts.service.ts");
/* harmony import */ var _shared_components_materials_materials_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/components/materials/materials.module */ "./src/app/shared/components/materials/materials.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _details_shifts_list_fields_list_fields_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./details-shifts/list-fields/list-fields.component */ "./src/app/shifts/details-shifts/list-fields/list-fields.component.ts");
/* harmony import */ var _shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/pipes/pipe.module */ "./src/app/shared/pipes/pipe.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var routes = [
    {
        path: '',
        redirectTo: 'shifts',
        pathMatch: 'full'
    },
    {
        path: 'shifts',
        component: _shifts_component__WEBPACK_IMPORTED_MODULE_1__["ShiftsComponent"],
        pathMatch: 'full'
    },
    {
        path: 'shifts/:id',
        component: _details_shifts_details_shifts_component__WEBPACK_IMPORTED_MODULE_6__["DetailsShiftsComponent"]
    },
    {
        path: '**',
        component: _shifts_component__WEBPACK_IMPORTED_MODULE_1__["ShiftsComponent"]
    }
];
var ShiftsModule = /** @class */ (function () {
    function ShiftsModule() {
    }
    ShiftsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
                _shared_components_app_components_module__WEBPACK_IMPORTED_MODULE_4__["AppComponentsModule"],
                _shared_components_materials_materials_module__WEBPACK_IMPORTED_MODULE_8__["MaterialsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"],
                _shared_pipes_pipe_module__WEBPACK_IMPORTED_MODULE_11__["PipeModule"].forRoot()
            ],
            declarations: [
                _shifts_component__WEBPACK_IMPORTED_MODULE_1__["ShiftsComponent"],
                _content_shifts_content_shifts_component__WEBPACK_IMPORTED_MODULE_5__["ContentShiftsComponent"],
                _details_shifts_details_shifts_component__WEBPACK_IMPORTED_MODULE_6__["DetailsShiftsComponent"],
                _details_shifts_list_fields_list_fields_component__WEBPACK_IMPORTED_MODULE_10__["ListFieldsComponent"]
            ],
            providers: [
                _services_shifts_service__WEBPACK_IMPORTED_MODULE_7__["ShiftsService"]
            ]
        })
    ], ShiftsModule);
    return ShiftsModule;
}());



/***/ })

}]);
//# sourceMappingURL=shifts-shifts-module.js.map