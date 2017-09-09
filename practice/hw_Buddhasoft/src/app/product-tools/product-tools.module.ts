import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { 
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

import {
    productToolsRoutes,
    NewProductComponent,
    EditProductComponent
} from './';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(productToolsRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        NewProductComponent,
        EditProductComponent
    ],
    providers: [

    ]
})
export class ProductToolsModule {

}