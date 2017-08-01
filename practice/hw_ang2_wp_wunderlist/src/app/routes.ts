import { Routes } from '@angular/router';
import { resolve } from 'path';

// import { Error404Component } from './error/404.component';
import { 
    ListContentComponent,
    CreateContentComponent
} from './content/index';

export const appRoutes:Routes = [
    
    { path: 'events', component: CreateContentComponent },
    { path: 'events/:id', component: ListContentComponent },
    { path: '', redirectTo: '/events', pathMatch: 'full' }
    
] 