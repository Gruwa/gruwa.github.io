import { Component, OnChanges, Output, SimpleChange, Input } from '@angular/core';
import { ToggleService } from './shared/toggle.service'

import '../assets/style/style.scss';
import '../assets/img/icon.png';

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 

    redPencil: boolean;
    listToggle: boolean;

    constructor (private toggleService: ToggleService) {

    }

    ngOnInit() {
        this.listToggle = this.toggleService.listToggle;
        this.redPencil = this.toggleService.redPencil;
    }

    get listToggleFunc() {
        return this.listToggle;
    }

    set listToggleFunc(value) {
       this.listToggle = value; 
    }
    
    toggle() {
        return this.listToggleFunc = this.toggleService.listToggle;
    }

    get redPencilFunc() {
        return this.redPencil;
    }

    set redPencilFunc(value) {
        this.redPencil = value;
    }

    pencil() {
        return this.redPencilFunc = this.toggleService.redPencil;
    }

}
