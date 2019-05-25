import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

/**
 * Shift Block Component
 */

@Component({
  selector: 'sw-app-shift-block',
  templateUrl: './shift-block.component.html',
  styleUrls: ['./shift-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftBlockComponent {

  /**
   * Input variable shift
   * @type {any}
   * @memberof ShiftBlockComponent
   */

  @Input() shift;

  /**
   * Input variable variable
   * @type {any}
   * @memberof ShiftBlockComponent
   */

  @Input() variable;
}
