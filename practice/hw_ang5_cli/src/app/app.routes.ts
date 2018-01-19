import {Routes} from '@angular/router';
import {HelloPageComponent} from './pages/hello-page/hello-page.component';
import {Error404Component} from './pages/error404/error404.component';
import {FormPageComponent} from './pages/form-page/form-page.component';
import {TabPageComponent} from './pages/tab-page/tab-page.component';
import {MainPageComponent} from './pages';

export const appRoutes: Routes = [
  { path: 'main', component: MainPageComponent },
  { path: 'main/form', component: FormPageComponent },
  { path: 'main/tab', component: TabPageComponent },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '/main'}
];
