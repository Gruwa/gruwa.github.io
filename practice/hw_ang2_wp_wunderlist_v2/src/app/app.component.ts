import { Component } from '@angular/core';
import { ToggleService } from './shared/index'

import '../assets/style/style.scss';
import '../assets/img/icon.png';

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 

    listToggle: boolean;

    constructor (private toggleService: ToggleService) {

    }

    ngOnInit() {
        this.listToggle = this.toggleService.listToggle;
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

}
