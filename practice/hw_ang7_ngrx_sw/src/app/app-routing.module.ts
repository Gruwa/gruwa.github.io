import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components/not-found/not-found.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', loadChildren: './login/login.module#LoginModule'},
  {path: 'settings', loadChildren: './settings/settings.module#SettingsModule'},
  {path: 'availability', loadChildren: './availability/availability.module#AvailabilityModule'},
  {path: 'contactinfo', loadChildren: './contact-info/contact-info.module#ContactInfoModule'},
  {path: '404', component: PageNotFoundComponent},
  {path: 'shifts', loadChildren: './shifts/shifts.module#ShiftsModule'},
  {path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {useHash: true}
    )
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
