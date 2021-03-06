import './rxjs-extensions';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { 
    CreateEventComponent,
    EventDetailsComponent,
    EventResolver,
    EventThumbnailComponent,
    EventListResolver,
    EventsListComponent,
    EventService,
    CreatSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator
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
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, 
            {preloadingStrategy: PreloadAllModules}) 
            // вроде, модули будут подгружаться по обращению к ним при добавлении 
            // {preloadingStrategy: PreloadAllModules}
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
        ModalTriggerDirective,
        UpvoteComponent,
        LocationValidator
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
        EventResolver,
        EventListResolver,
        AuthService,
        VoterService
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