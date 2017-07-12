import { Routes } from '@angular/router';

import { CreateEventComponent } from './events/creat-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventsListComponent } from './events/events-list.component';

export const appRoutes:Routes = [
    { path: 'events/new', component: CreateEventComponent },
    { path: 'events', component: EventsListComponent },
    { path: 'events/:id', component: EventDetailsComponent },
    { path: '', redirectTo: '/events', pathMatch: 'full' } // этой строчкой выполняется
    //редирект, если будет пустой путь то происходит перенаправление на путь 
    // '/events' 
] 