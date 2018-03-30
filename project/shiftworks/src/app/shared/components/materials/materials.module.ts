import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatDividerModule, MatInputModule, MatListModule, MatSelectModule, MatTabsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class MaterialsModule {
}
