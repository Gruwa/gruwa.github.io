import {NgModule} from '@angular/core';
import {CadSref} from './';
import {CadIntegersOnly} from './';
import {AutofocusDirective} from './';
import {InfiniteScrollDirective} from './';
import {StickyDirective} from './';
import {CadTrackChangesDirective} from './';
import {TrackChangesService} from './';
import {ClickOutsideDirective} from './click-outside/click-outside.directive';

@NgModule({
  declarations: [
    CadSref,
    CadIntegersOnly,
    AutofocusDirective,
    InfiniteScrollDirective,
    StickyDirective,
    CadTrackChangesDirective,
    ClickOutsideDirective
  ],
  exports: [
    CadSref,
    CadIntegersOnly,
    AutofocusDirective,
    InfiniteScrollDirective,
    StickyDirective,
    CadTrackChangesDirective,
    ClickOutsideDirective
  ],
  providers: [
    TrackChangesService
  ]
})
export class UnityCommonDirectivesModule {}
