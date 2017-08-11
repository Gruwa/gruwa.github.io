import { Component, OnChanges, Output, SimpleChange, Input } from '@angular/core';
import { ToggleService } from './shared/toggle.service'

import '../assets/style/style.scss';
import '../assets/img/icon.png';

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 

    redPancil: boolean;
    listToggle: boolean;

    constructor (private toggleService: ToggleService) {

    }

    ngOnInit() {
        this.listToggle = this.toggleService.listToggle;
        this.redPancil = this.toggleService.redPencil;
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

    get redPancilFunc() {
        return this.redPancil;
    }

    set redPancilFunc(value) {
        this.redPancil = value;
    }

    pancil() {
        return this.redPancilFunc = this.toggleService.redPencil;
    }

}
