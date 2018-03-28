import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './login.component';
import {LogoutComponent} from './logout.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: LoginComponent},
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LoginRoutingModule {
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: LogoutComponent}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class LogoutRoutingModule {
}
