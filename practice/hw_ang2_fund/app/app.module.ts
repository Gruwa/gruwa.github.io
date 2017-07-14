import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { 
    CreateEventComponent,
    EventDetailsComponent,
    EventRouterActivator,
    EventThumbnailComponent,
    EventListResolver,
    EventsListComponent,
    EventService
} from './events/index';
import { ToastrService } from './common/toastr.service';
import { Error404Component } from './error/404.component';
import { EventsAppComponent } from './events-app.component';
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
        // { provide: EventService, useValue: EventService },
        EventService,
        ToastrService,
        EventRouterActivator,
        EventListResolver,
        { 
            provide: 'canDeactivateCreateEvent', 
            useValue: checkDirtyState 
        }
        ],
    bootstrap: [EventsAppComponent]
})

export class AppModule {}

function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You are not saved this event, do You really want to cancel?')
    }
    return true
}