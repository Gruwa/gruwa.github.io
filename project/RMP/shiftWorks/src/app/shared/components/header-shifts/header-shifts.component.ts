import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';


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
                public localStorage: LocalStorageService) {
    }

    /**
     * Method closeOurPage for router on shifts page
     * @returns {void}
     * @memberof HeaderShiftsComponent
     */

    closeOurPage(): void {
        this.router.navigate(['/shifts']);
    }

    /**
     * Method showSideBar for show menu
     * @returns {void}
     * @memberof HeaderShiftsComponent
     */

    showSideBar(): void {

    }

}
