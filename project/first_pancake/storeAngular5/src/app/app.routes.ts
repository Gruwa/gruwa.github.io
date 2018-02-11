import {Routes} from '@angular/router';
import {HelloPageComponent} from './pages/hello-page/hello-page.component';
import {Error404Component} from './pages/error404/error404.component';
import {FormPageComponent} from './pages/form-page/form-page.component';
import {TabPageComponent} from './pages/tab-page/tab-page.component';
import {MainPageComponent} from './pages';
import {RouteActivatorService} from './shared/services/route-activator.service';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {UserResolverService} from './shared/services';
import {LoginModule} from './pages/login-page/login.module';

export const appRoutes: Routes = [
  { path: 'main',
    component: MainPageComponent,
    children: [
      { path: 'form',
        canActivate: [RouteActivatorService],
        component: FormPageComponent },
      { path: 'users',
        canActivate: [RouteActivatorService],
        component: TabPageComponent,
        // resolve: [UserResolverService]
      }
    ]
  },
  { path: 'auth', component: LoginPageComponent },
  // { path: 'auth', loadChildren: 'app/pages/login-page/login.module#LoginModule' },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: '**', redirectTo: '/main'}
];
