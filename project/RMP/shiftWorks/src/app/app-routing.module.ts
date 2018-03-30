import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: '404', component: PageNotFoundComponent },
    { path: ':group', loadChildren: './shifts/shifts.module#ShiftsModule' },
    { path: '', redirectTo: '/login', pathMatch: 'full'}
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
export class AppRoutingModule { }
