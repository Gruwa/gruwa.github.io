import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-project-button',
  templateUrl: './project-button.component.html',
  styleUrls: ['./project-button.component.scss']
})
export class ProjectButtonComponent implements OnInit {

  /**
   * Variable for input newStyle
   * @type {string}
   * @memberof ProjectButtonComponent
   */
  
  @Input() newStyle: string = '';

  /**
   * Variable for input type
   * @type {string}
   * @memberof ProjectButtonComponent
   */
  
  @Input() type: string = 'button';

  /**
   * Variable for input ifLabel
   * @type {boolean}
   * @memberof ProjectButtonComponent
   */
  
  @Input() ifLabel: boolean = false;

  /**
   * Variable for input iconName
   * @type {string}
   * @memberof ProjectButtonComponent
   */
  
  @Input() iconName: string = '';

  /**
   * Variable for input disabled
   * @type {boolean}
   * @memberof ProjectButtonComponent
   */
  
  @Input() disabled: boolean = false;

  /**
   * Variable for input title
   * @type {string}
   * @memberof ProjectButtonComponent
   */
  
  @Input() title: string = '';

  /**
   * Variable for input cancel
   * @type {boolean}
   * @memberof ProjectButtonComponent
   */
  
  @Input() cancel: boolean = false;

  /**
   * Variable for emit onClickEvent
   * @type {EventEmitter<any>}
   * @memberof ProjectButtonComponent
   */
  
  @Output() onClickEvent: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Variable for input classes
   * @type {string}
   * @memberof ProjectButtonComponent
   */
  
  public classes: string = '';

  /**
   * Creates an instance of ProjectButtonComponent.
   * @param {TranslateService} translate
   * @memberof ProjectButtonComponent
   */
  
  constructor(public translate: TranslateService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ProjectButtonComponent
   */
  
  ngOnInit() {
    this.getClass();
  }

  /**
   * Method for get class
   * @returns {void}
   * @memberof ProjectButtonComponent
   */
  
  getClass(): void {
    this.classes = this.newStyle;

    if (this.cancel) {
      this.classes += ' ' + 'project-btn--cancel';
    }
  }
}
