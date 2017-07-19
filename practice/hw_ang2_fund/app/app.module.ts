import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { 
    CreateEventComponent,
    EventDetailsComponent,
    EventRouterActivator,
    EventThumbnailComponent,
    EventListResolver,
    EventsListComponent,
    EventService,
    CreatSessionComponent,
    SessionListComponent,
    DurationPipe
} from './events/index';
import { 
    CollapsibleWellComonent,
    TOASTR_TOKEN,
    Toastr,
    JQ_TOKEN,
    SimpleModalComponent,
    ModalTriggerDirective
} from './common/index';
import { Error404Component } from './error/404.component';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';

declare let toastr: Toastr;
declare let jQuery: Object;

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
        ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreatSessionComponent,
        SessionListComponent,
        CollapsibleWellComonent,
        DurationPipe,
        SimpleModalComponent,
        ModalTriggerDirective
        ],
    providers: [
        // EventService,
        {// запись двумя разными способами
            provide: EventService,
            useClass: EventService
        },
        { 
            provide: TOASTR_TOKEN, 
            useValue: toastr 
        },
        { 
            provide: JQ_TOKEN, 
            useValue: jQuery 
        },
        { 
            provide: 'canDeactivateCreateEvent', 
            useValue: checkDirtyState 
        },
        EventRouterActivator,
        EventListResolver,
        AuthService
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