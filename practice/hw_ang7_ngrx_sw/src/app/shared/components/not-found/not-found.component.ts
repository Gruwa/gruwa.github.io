import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import {FlowService} from '../../services/flow.service';
import {takeUntil} from 'rxjs/operators';
import {SettingsService} from '../../../settings/services/settings.service';
import {ToastrService} from 'ngx-toastr';

/**
 * Page Not Found Component
 */

@Component({
  selector: 'sw-app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent implements OnInit {

  /**
   * Variable of iconLeft
   * @type {string}
   * @memberof PageNotFoundComponent
   */

  public iconLeft: string = 'menu';

  /**
   * Variable descriptionLeft
   * @type {string}
   * @memberof PageNotFoundComponent
   */

  public descriptionLeft: string = 'page Not Found';

  /**
   * Creates an instance of PageNotFoundComponent
   * @param {FlowService} flowService
   * @param {ToastrService} toastr
   * @memberof PageNotFoundComponent
   */

  constructor(public flowService: FlowService,
              private toastr: ToastrService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof PageNotFoundComponent
   */

  public ngOnInit(): void {
    this.flowService.dataSpinner$.next(false);
  }

  /**
   * Method fo show side bar
   * @returns {void}
   * @param {any} event
   * @memberof PageNotFoundComponent
   */

  public showSideBar(event?: any): void {
    if (event === 'iconLeft') {
      this.flowService.dataSideBar$.next('iconLeft');
    } else if (event === 'descriptionRight') {
    } else if (event === 'descriptionRightDeactivate') {
    }
  }
}
