import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

/**
 * Page Not Found Component
 */

@Component({
  template: '<h2>Page not found</h2>',
  styles: [
    'h2 { text-align: center; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
}
