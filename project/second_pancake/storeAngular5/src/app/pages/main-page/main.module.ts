import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ComponentsModule} from '../../shared/components/components.module';
import {Ng2Webstorage} from 'ngx-webstorage';
import {ToastModule} from 'ng2-toastr';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TabPageComponent} from './tab-page/tab-page.component';
import {ChartPageComponent} from './chart-page/chart-page.component';
import {RouteActivatorService} from '../../shared/services/route-activator.service';
import {MainPageComponent} from './main-page.component';
import {SidebarPageComponent} from './sidebar-page/sidebar-page.component';
import {HeaderPageComponent} from './header-page/header-page.component';
import {HelloPageComponent} from './hello-page/hello-page.component';
import {
  FocusDirective,
  ProjectListDirective,
  ProjectPointerDirective,
  ProjectTextDirective,
  ProjectTextEllipsisDirective,
  ProjectTitleDirective
} from '../../shared/directives';
import {AddUserPageComponent} from './add-user-page/add-user-page.component';
import {FusionChartsModule} from 'angular4-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import {UserResolverService} from '../../shared/services';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'chart',
        canActivate: [RouteActivatorService],
        component: ChartPageComponent
      },
      {
        path: 'users',
        canActivate: [RouteActivatorService],
        component: TabPageComponent,
        resolve:{users: UserResolverService}
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/main'
  }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FusionChartsModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    Ng2Webstorage
  ],
  declarations: [
    ChartPageComponent,
    TabPageComponent,
    MainPageComponent,
    SidebarPageComponent,
    HeaderPageComponent,
    HelloPageComponent,
    ProjectTextEllipsisDirective,
    ProjectTextDirective,
    ProjectTitleDirective,
    ProjectPointerDirective,
    ProjectListDirective,
    FocusDirective,
    AddUserPageComponent
  ]
})
export class MainModule {
}
