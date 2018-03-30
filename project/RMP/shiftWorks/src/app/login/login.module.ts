import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {
    MatInputModule, MatCheckboxModule, MatCardModule, MatIconModule, MatButtonModule
} from '@angular/material';

import { LoginComponent } from "./login.component";
import { LogoutComponent } from "./logout.component";
import { LoginRoutingModule, LogoutRoutingModule } from "./login.routing.module"

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        MatCardModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule
        //MaterialModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LogoutRoutingModule,
        //MaterialModule
    ],
    declarations: [LogoutComponent]
})
export class LogoutModule { }
