import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { 
    reposRoutes,
    ReposComponent,
    RepoUserComponent
} from './';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(reposRoutes)
    ],
    declarations: [
        ReposComponent,
        RepoUserComponent
    ],
    providers: [

    ]
})

export class ReposModule {

}