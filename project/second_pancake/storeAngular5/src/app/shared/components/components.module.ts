import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader
} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {
  ProjectModalComponent,
  ProjectButtonComponent,
  ProjectDeleteComponent,
  ProjectCheckboxComponent,
  ProjectCircleComponent,
  ProjectBarComponent,
  ProjectTextareaComponent,
  ProjectSelectComponent,
  ProjectInputComponent,
  ProjectUploaderComponent,
  ProjectUploaderDirective
} from './';
import {NgCircleProgressModule} from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    ProjectModalComponent,
    ProjectButtonComponent,
    ProjectDeleteComponent,
    ProjectCheckboxComponent,
    ProjectCircleComponent,
    ProjectBarComponent,
    ProjectTextareaComponent,
    ProjectSelectComponent,
    ProjectInputComponent,
    ProjectUploaderDirective,
    ProjectUploaderComponent
  ],
  providers: [],
  exports: [
    ProjectModalComponent,
    ProjectButtonComponent,
    ProjectDeleteComponent,
    ProjectCheckboxComponent,
    ProjectCircleComponent,
    ProjectBarComponent,
    ProjectTextareaComponent,
    ProjectSelectComponent,
    ProjectInputComponent,
    ProjectUploaderComponent,
    RouterModule
  ]
})
export class ComponentsModule {
}
