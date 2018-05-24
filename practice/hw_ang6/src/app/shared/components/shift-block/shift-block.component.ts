import {Component, Input} from '@angular/core';

/**
 * Shift Block Component
 */

@Component({
    selector: 'app-shift-block',
    templateUrl: './shift-block.component.html',
    styleUrls: ['./shift-block.component.scss']
})
export class ShiftBlockComponent {

  /**
   * Input variable shift
   * @type {any}
   * @memberof ShiftBlockComponent
   */

    @Input() shift;
}
