import { Routes } from '@angular/router';
import { resolve } from 'path';

import { Error404Component } from './error/404.component';
import { 
    MainPageComponent,
    UserInformationComponent
} from './main-page';
import { 
    EventRouteActivatorService,
    RepoRouteActivatorService 
} from './shared';
import { RepoComponent } from './repo/repo.component';

export const appRoutes:Routes = [
    
    { path: 'users', component: MainPageComponent },
    { path: 'repos', loadChildren: './repository/repos.module#ReposModule' },
    // { path: 'events/search', component: ResultComponent },
    { path: 'users/:id', component: UserInformationComponent, canActivate: [EventRouteActivatorService] },
    { path: 'repos/:id', component: RepoComponent, canActivate: [RepoRouteActivatorService] },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/users', pathMatch: 'full' },
] 