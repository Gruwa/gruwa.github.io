import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ToastrService } from './common/toastr.service';
import { Error404Component } from './error/404.component';
import { EventsAppComponent } from './events-app.component';
import { CreateEventComponent } from './events/creat-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventRouterActivator } from './events/event-details/event-route-activator.service';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { EventsListComponent } from './events/events-list.component';
import { EventService } from './events/shared/event.service';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
        ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component
        ],
    providers: [
        EventService,
        ToastrService,
        EventRouterActivator
        ],
    bootstrap: [EventsAppComponent]
})

export class AppModule {}