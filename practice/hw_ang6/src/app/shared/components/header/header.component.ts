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

/**
 * Header Shifts Component
 */

@Component({
  selector: 'app-header',
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
   * @param {ActivatedRoute} route
   * @param {LocalStorageService} localStorage
   * @param {FlowService} flowService
   * @param {Router} router
   * @memberof HeaderComponent
   */

  constructor(public router: Router,
              public localStorage: LocalStorageService,
              public route: ActivatedRoute,
              public flowService: FlowService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof HeaderComponent
   */

  public ngOnInit(): void {
  }

  /**
   * Method closeOurPage for router on shifts page
   * @returns {void}
   * @memberof HeaderComponent
   */

  public clickEvent(event: string): void {
    this.outputActionMethod.emit(event);
  }



}
