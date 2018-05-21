import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/not-found/not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: '404', component: PageNotFoundComponent },
    { path: ':group', loadChildren: './shifts/shifts.module#ShiftsModule' },
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
