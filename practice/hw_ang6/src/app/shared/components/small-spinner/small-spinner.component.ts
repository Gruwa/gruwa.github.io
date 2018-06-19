import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

/**
 * Small Spinner Component
 */

@Component({
  selector: 'app-small-spinner',
  templateUrl: './small-spinner.component.html',
  styleUrls: ['./small-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SmallSpinnerComponent {
}
