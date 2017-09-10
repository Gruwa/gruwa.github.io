import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { 
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { ImageUploadModule } from 'ng2-imageupload';

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
        ImageUploadModule
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