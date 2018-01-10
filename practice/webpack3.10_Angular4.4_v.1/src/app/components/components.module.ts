import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from '@angular/http';

import {
    ProjectModalComponent,
    ProjectButtonComponent,
    ProjectDeleteComponent,
    ProjectCheckboxComponent,
    ProjectCircleComponent,
    ProjectBarComponent,
    ProjectTextareaComponent,
    ProjectSelectComponent,
    ProjectInputComponent
} from './';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        NgCircleProgressModule.forRoot()
    ],
    declarations: [
        ProjectModalComponent,
        ProjectButtonComponent,
        ProjectDeleteComponent,
        ProjectCheckboxComponent,
        ProjectCircleComponent,
        ProjectBarComponent,
        ProjectTextareaComponent,
        ProjectSelectComponent,
        ProjectInputComponent
    ],
    providers: [],
    exports: [
        ProjectModalComponent,
        ProjectButtonComponent,
        ProjectDeleteComponent,
        ProjectCheckboxComponent,
        ProjectCircleComponent,
        ProjectBarComponent,
        ProjectTextareaComponent,
        ProjectSelectComponent,
        ProjectInputComponent
    ]
})
export class ComponentsModule {}