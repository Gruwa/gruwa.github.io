import {Routes} from '@angular/router';
import {Error404Component} from './pages/error404/error404.component';
import {WrapperPageComponent} from './pages/wrapper-page/wrapper-page.component';

export const appRoutes: Routes = [
  { path: '',
    component: WrapperPageComponent,
    children: [
      { path: 'main', loadChildren: 'app/pages/main-page/main.module#MainModule' },
      { path: 'auth', loadChildren: 'app/pages/auth-page/login.module#LoginModule' },
      { path: '404', component: Error404Component },
      { path: '', redirectTo: '/main', pathMatch: 'full'},
      { path: '**', redirectTo: '/main'}
    ]
  }
];
