import { Routes } from '@angular/router';

import { Error404Component } from './error/404.component';
import { CreateEventComponent } from './events/creat-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventRouterActivator } from './events/event-details/event-route-activator.service';
import { EventsListComponent } from './events/events-list.component';

export const appRoutes:Routes = [
    { path: 'events/new', component: CreateEventComponent },
    { path: 'events', component: EventsListComponent },
    { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouterActivator] },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' } // этой строчкой выполняется
    //редирект, если будет пустой путь то происходит перенаправление на путь 
    // '/events' 
] 