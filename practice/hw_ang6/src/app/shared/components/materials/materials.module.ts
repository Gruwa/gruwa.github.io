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
  MatTabsModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
} from '@angular/material';
import {AmazingTimePickerModule} from 'amazing-time-picker';

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
    MatTabsModule,
    MatProgressSpinnerModule,
    AmazingTimePickerModule,
    MatDatepickerModule
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
    MatTabsModule,
    MatProgressSpinnerModule,
    AmazingTimePickerModule,
    MatDatepickerModule
  ]
})
export class MaterialsModule {
}
