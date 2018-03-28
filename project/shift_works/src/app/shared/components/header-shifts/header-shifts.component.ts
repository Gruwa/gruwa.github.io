import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {ShiftsService} from '../../services/shifts.service';

@Component({
    selector: 'app-header-shifts',
    templateUrl: './header-shifts.component.html',
    styleUrls: ['./header-shifts.component.scss']
})
export class HeaderShiftsComponent {

    /**
     * Input variable headerDescription
     * @type {string}
     * @memberof HeaderShiftsComponent
     */

    @Input() headerDescription: string;

    /**
     * Input variable sideBar
     * @type {boolean}
     * @memberof HeaderShiftsComponent
     */

    @Input() sideBar: boolean = false;

    /**
     * Input variable close Page
     * @type {boolean}
     * @memberof HeaderShiftsComponent
     */

    @Input() closePage: boolean = false;

    /**
     * Input variable tabsPage for show tab
     * @type {boolean}
     * @memberof HeaderShiftsComponent
     */

    @Input() tabsPage: boolean = false;

    /**
     * Creates an instance of HeaderShiftsComponent
     * @param {Router} router
     * @memberof HeaderShiftsComponent
     */

    constructor(public router: Router,
                public localStorage: LocalStorageService,
                public shiftsService: ShiftsService) { }

    /**
     * Method closeOurPage for router on shifts page
     * @returns {void}
     * @memberof HeaderShiftsComponent
     */

    closeOurPage() {
        this.router.navigate(['/shifts']);
    }

}
