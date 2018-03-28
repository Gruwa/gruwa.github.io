import {NgModule} from '@angular/core';
import {ShiftsComponent} from './shifts.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponentsModule} from '../shared/components/app-components.module';
import {HeaderShiftsComponent} from '../shared/components/header-shifts/header-shifts.component';
import {ContentShiftsComponent} from './content-shifts/content-shifts.component';
import {HttpClientModule} from '@angular/common/http';
import { DetailsShiftsComponent } from './details-shifts/details-shifts.component';

export const routes: Routes = [
    {
        path: '',
        component: ShiftsComponent,
    },
    {
        path: ':id',
        component: DetailsShiftsComponent,
    },
    {
        path: '**',
        redirectTo: '/shifts'
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AppComponentsModule
    ],
    declarations: [
        ShiftsComponent,
        HeaderShiftsComponent,
        ContentShiftsComponent,
        DetailsShiftsComponent
    ],
    providers: []
})
export class ShiftsModule {
}
