import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {MaterialsModule} from '../shared/components/materials/materials.module';
import {AuthService} from './services/auth.service';
import {ScheduleLoginComponent} from './schedule-login/schedule-login.component';
import {StoreModule} from '@ngrx/store';
import {loginReducer} from './state/login.reducer';
import {EffectsModule} from '@ngrx/effects';
import {LoginEffects} from './state/login.effects';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'schedule',
        component: ScheduleLoginComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('login', loginReducer),
        EffectsModule.forFeature([LoginEffects]),
        AppComponentsModule,
        ReactiveFormsModule,
        MaterialsModule
    ],
    declarations: [
        LoginComponent,
        ScheduleLoginComponent
    ],
    providers: [
        AuthService
    ],
    exports: [
        LoginComponent,
        ScheduleLoginComponent
    ]
})

export class LoginModule {
}
