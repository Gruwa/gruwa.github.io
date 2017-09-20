import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { 
    reposRoutes,
    ReposComponent
} from './';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(reposRoutes)
    ],
    declarations: [
        ReposComponent
    ],
    providers: [

    ]
})

export class ReposModule {

}