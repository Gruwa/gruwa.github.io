import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {FlowService} from '../../services/flow.service';
import {takeUntil} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {MainService} from '../../services/main.service';

/**
 * Header Shifts Component
 *
 * 1. For universal component need global class in unicorn-app-theme.scss
 * global__element-display for show it
 * 2. COmponent has 1 Output for all actions. Actions has different key:
 * iconLeft, iconRight, descriptionRight and item.id for second part
 */

@Component({
  selector: 'sw-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  /**
   * Input variable arrow
   * @type {boolean}
   * @memberof HeaderComponent
   */

  @Input() arrow: boolean = false;

  /**
   * Input variable items
   * @type {any}
   * @memberof HeaderComponent
   */

  @Input() items: Array<object>;

  /**
   * Input variable iconLeft
   * @type {string}
   * @memberof HeaderComponent
   */

  @Input() iconLeft: string;

  /**
   * Input variable iconRight
   * @type {string}
   * @memberof HeaderComponent
   */

  @Input() iconRight: string;

  /**
   * Input variable description on left
   * @type {string}
   * @memberof HeaderComponent
   */

  @Input() descriptionLeft: string;

  /**
   * Input variable description on right
   * @type {string}
   * @memberof HeaderComponent
   */

  @Input() descriptionRight: string;

  /**
   * Input variable descriptionActive on right
   * @type {boolean}
   * @memberof HeaderComponent
   */

  @Input() descriptionRightActive: 'VALID' | 'INVALID' | 'DISABLED' = 'VALID';

  /**
   * Input variable img
   * @type {string}
   * @memberof HeaderComponent
   */

  @Input() img: object;

  /**
   * Output action from header
   * @memberof HeaderComponent
   */

  @Output() outputActionMethod: EventEmitter<any> = new EventEmitter();

  /**
   * Creates an instance of DetailsShiftsComponent
   * @param {LocalStorageService} localStorage
   * @param {FlowService} flowService
   * @param {ToastrService} toastr
   * @param {MainService} mainService
   * @memberof HeaderComponent
   */

  constructor(public localStorage: LocalStorageService,
              public flowService: FlowService,
              private toastr: ToastrService,
              private mainService: MainService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof HeaderComponent
   */

  public ngOnInit(): void {
  }

  /**
   * Method clickEvent for emit event
   * @returns {void}
   * @memberof HeaderComponent
   */

  public clickEvent(event: string): void {
    if (this.mainService.onlineCheck()) {
      this.outputActionMethod.emit(event);
    } else {
      this.toastr.info('INTERNET DISCONNECTED');
    }
  }
}
