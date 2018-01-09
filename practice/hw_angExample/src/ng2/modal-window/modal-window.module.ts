import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnityCommonComponentsModule} from '../common/components/components.module';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {ModalContentComponent} from './';

@NgModule({
  imports: [
    CommonModule,
    UnityCommonComponentsModule,
    NgbModalModule.forRoot()
  ],
  declarations: [
    ModalContentComponent
  ],
  exports: [
    ModalContentComponent,
    NgbModalModule
  ]
})
export class UnityModalWindowModule {}
