import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ContextMenuModule } from 'ngx-contextmenu';
import { LocalStorageModule } from 'angular-2-local-storage';
import {ComponentsModule} from './shared/components/components.module';
import {
    MainPageComponent
} from './pages';
import {
  ProjectPointerDirective,
  ProjectTextDirective,
  ProjectTextEllipsisDirective,
  ProjectTitleDirective
} from './shared/directives';
import {
    AuthService
} from './shared/services';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
