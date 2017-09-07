import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
    ReposComponent,
    repoRoutes,
    RepoComponent
} from './'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(repoRoutes)
    ],
    declarations: [
        ReposComponent,
        RepoComponent
    ],
    providers: [

    ]
})

export class ReposModules {

}