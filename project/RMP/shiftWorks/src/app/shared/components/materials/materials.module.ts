import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule
  ],
  exports: [
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatTabsModule
  ]
})
export class MaterialsModule {
}
