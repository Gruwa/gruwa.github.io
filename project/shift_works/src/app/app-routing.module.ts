import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'shifts', loadChildren: './shifts/shifts.module#ShiftsModule' },
    { path: '**', component: PageNotFoundComponent }
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
