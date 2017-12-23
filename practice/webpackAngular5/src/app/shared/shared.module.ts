import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ProjectButtonComponent} from "./components/projectl-button/projectl-button.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        // ProjectButtonComponent
    ],
    providers: [],
    exports: [
        // ProjectButtonComponent
    ],

})
export class SharedModule { }