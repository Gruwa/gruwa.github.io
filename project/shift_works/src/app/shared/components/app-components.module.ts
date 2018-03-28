import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatTabsModule,
    MatListModule,
    MatDividerModule, MatButtonModule, MatSelectModule
} from '@angular/material';
import {TabComponent} from './tab.component/tab.component';
import {ShiftBlockComponent} from './shift-block/shift-block.component';
import {FormComponent} from './form/form.component';
import {MatInputModule} from '@angular/material/input';

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
    declarations: [
        TabComponent,
        ShiftBlockComponent,
        FormComponent
    ],
    exports: [
        TabComponent,
        ShiftBlockComponent,
        FormComponent
    ]
})
export class AppComponentsModule {
}