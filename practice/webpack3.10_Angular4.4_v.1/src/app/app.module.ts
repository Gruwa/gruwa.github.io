import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';

import { ComponentsModule } from "./components/components.module";
import { ContextMenuModule } from './../../node_modules/ngx-contextmenu';
import { LocalStorageModule } from 'angular-2-local-storage';
// import {
//     GrowlModule
// } from 'primeng/primeng';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {
    ProjectPointerDirective,
    ProjectTextDirective,
    ProjectTextEllipsisDirective,
    ProjectTitleDirective
} from './directives';
import {
    MainPageComponent
} from './pages';
import {
    AuthService
} from './services';

@NgModule({
    imports: [
        BrowserModule,
        ContextMenuModule,
        BrowserAnimationsModule,
        HttpModule,
        ReactiveFormsModule,
        ToastModule.forRoot(),
        ComponentsModule
        // GrowlModule,
    ],
    declarations: [
        AppComponent,
        MainPageComponent,
        ProjectTextEllipsisDirective,
        ProjectTextDirective,
        ProjectTitleDirective,
        ProjectPointerDirective
    ],
    providers: [
        AuthService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }