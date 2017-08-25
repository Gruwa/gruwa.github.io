import { Routes } from '@angular/router';
import { resolve } from 'path';

import { Error404Component } from './error/404.component';
import { 
    ListContentComponent,
    CreateContentComponent
} from './content';
import { 
    EventRouteActivatorService
} from './shared';
import {
    ResultComponent
} from './sidebar'

export const appRoutes:Routes = [
    
    { path: 'events', component: CreateContentComponent },
    { path: 'events/search', component: ResultComponent },
    { path: 'events/:id', component: ListContentComponent, canActivate: [EventRouteActivatorService] },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' }
    
] 