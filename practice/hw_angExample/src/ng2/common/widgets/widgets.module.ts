import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UnityCommonComponentsModule} from '../components/components.module';
import {UnityCommonPipesModule} from '../pipes/pipes.module';
import {UnityCommonDirectivesModule} from '../directives/directives.module';
import {UnityModalWindowModule} from '../../modal-window/modal-window.module';

import {MenuPlusComponent} from './';
import {ContextMenuComponent} from './';
import {ContextMenuItemComponent} from './';
import {SmartSearchListComponent} from './';
import {SmartSearchListItemComponent} from './';
import {SmartSearchListItemSubtextComponent} from './';
import {TrackUnsavedPopupComponent} from './';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UnityCommonPipesModule,
    UnityCommonComponentsModule,
    UnityCommonDirectivesModule,
    UnityModalWindowModule
  ],
  declarations: [
    MenuPlusComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    SmartSearchListComponent,
    SmartSearchListItemComponent,
    SmartSearchListItemSubtextComponent,
    TrackUnsavedPopupComponent
  ],
  providers: [],
  exports: [
    MenuPlusComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    SmartSearchListComponent,
    SmartSearchListItemComponent,
    SmartSearchListItemSubtextComponent
  ],
  entryComponents: [
    TrackUnsavedPopupComponent
  ]
})
export class UnityCommonWidgetsModule {}
