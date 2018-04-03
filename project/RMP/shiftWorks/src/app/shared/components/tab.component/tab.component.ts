import {Component, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import * as Types from '../../interfaces/types.interface';
import {ShiftsService} from '../../../shifts/Services/shifts.service';
import {LocalStorageService} from 'ngx-webstorage';
import {DataService} from '../../services/data.service';

/**
 * TABS for navigate
 */

const TABS: Array<Types.ITabTypes> = [
    'upcoming',
    'my requests',
    'available'
];

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class TabComponent implements OnInit {

    /**
     * Variable tabsTitle
     * @type {Array<Types.tabTypes>}
     * @memberof TabComponent
     */

    tabsTitle: Array<Types.ITabTypes> = ['upcoming', 'my requests', 'available'];

    /**
     * Variable of tab
     * @type {Types.ITabTypes}
     * @memberof ContentShiftsComponent
     */

    public tab: Types.ITabTypes = 'upcoming';

    /**
     * Variable of tabIndex
     * @type {number}
     * @memberof ContentShiftsComponent
     */

    public tabIndex: number;

    /**
     * Creates an instance of TabComponent
     * @param {LocalStorageService} dataService
     * @param {LocalStorageService} localStorage
     * @memberof TabComponent
     */

    constructor(public dataService: DataService,
                public localStorage: LocalStorageService) {
    }

    /**
     * Method ngOnInit
     * @returns {void}
     * @memberof TabComponent
     */

    ngOnInit() {
        this.tabIndex = TABS.indexOf(this.localStorage.retrieve('tab'));
    }

    /**
     * Method for get changes on tab selectedTabChange
     * @returns {void}
     * @memberof TabComponent
     */

    selectedTabChange(value: any): void {
        console.log(TABS[value.index]);
        // this.localStorage.store('tab', TABS[value.index]);
        this.dataService.dataTab$.next(TABS[value.index]);
    }

}
