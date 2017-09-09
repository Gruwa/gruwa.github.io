import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { 
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';

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
        ReactiveFormsModule,
        ImageUploadModule.forRoot()
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