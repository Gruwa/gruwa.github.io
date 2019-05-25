import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  ViewEncapsulation,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {FlowService} from '../../services/flow.service';
import {BehaviorSubject} from 'rxjs';

/**
 * Popup Component
 */

@Component({
  selector: 'sw-app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit, OnChanges {

  /**
   * Variable popupForm
   * @type {FormGroup}
   * @memberof PopupComponent
   */

  public popupForm: FormGroup;

  /**
   * Variable for popup-output type
   * @type {EventEmitter<string>}
   * @memberof PopupComponent
   */

  @Output() dataOutput: EventEmitter<string> = new EventEmitter();

  /**
   * Output variable ClosePopup
   * @type {EventEmitter<boolean>}
   * @memberof PopupComponent
   */

  @Output() ClosePopup: EventEmitter<boolean> = new EventEmitter();

  /**
   * Input variable buttonBehavior
   * @type {boolean}
   * @memberof PopupComponent
   */

  @Input() buttonBehavior: boolean = false;

  /**
   * Variable buttonAuth$
   * @type {BehaviorSubject<boolean>}
   * @memberof PopupComponent
   */

  public buttonAuth$: BehaviorSubject<boolean> = new BehaviorSubject(null);

  /**
   * Creates an instance of PopupComponent
   * @param {FormBuilder} fb
   * @param {FlowService} flowService
   * @memberof PopupComponent
   */

  constructor(
    private fb: FormBuilder,
    public flowService: FlowService
  ) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof PopupComponent
   */

  public ngOnInit(): void {
    this.initForm();
  }

  /**
   * Method initForm
   * @returns {void}
   * @memberof PopupComponent
   */

  private initForm(): void {
    this.popupForm = this.fb.group({
      password: ['', [Validators.required]]
    });
  }

  /**
   * Method onSubmit
   * @returns {void}
   * @memberof PopupComponent
   */

  public onSubmit(): void {
    this.buttonAuth$.next(true);
    this.dataOutput.emit(this.popupForm.get('password').value);
    this.popupForm.reset();
  }

  /**
   * Method event of ngOnChanges
   * 1. pushing new data in flow when it change
   * @returns {void}
   * @param {SimpleChanges} changes
   * @memberof PopupComponent
   */

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.buttonBehavior) {
      this.buttonAuth$.next(this.buttonBehavior);
    }
  }
}
