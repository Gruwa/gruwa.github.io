import {Routes} from '@angular/router';
import {HelloPageComponent} from './pages/hello-page/hello-page.component';
import {Error404Component} from './pages/error404/error404.component';
import {FormPageComponent} from './pages/form-page/form-page.component';
import {TabPageComponent} from './pages/tab-page/tab-page.component';
import {MainPageComponent} from './pages';
import {RouteActivatorService} from './shared/services/route-activator.service';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {UserResolverService} from './shared/services';

export const appRoutes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'main/form', canActivate: [RouteActivatorService], component: FormPageComponent },
  { path: 'main/tab', canActivate: [RouteActivatorService], component: TabPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '/main'}
];
