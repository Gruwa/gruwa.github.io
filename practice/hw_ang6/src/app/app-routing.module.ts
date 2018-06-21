import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components/not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'settings', loadChildren: './settings/settings.module#SettingsModule'},
  {path: 'availbility', loadChildren: './availbility/availbility.module#AvailbilityModule'},
  {path: 'contactinfo', loadChildren: './contact-info/contact-info.module#ContactInfoModule'},
  {path: '404', component: PageNotFoundComponent},
  {path: ':group', loadChildren: './shifts/shifts.module#ShiftsModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
