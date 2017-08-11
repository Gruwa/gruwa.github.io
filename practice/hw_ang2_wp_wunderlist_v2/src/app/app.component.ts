import { Component, OnChanges, Output, SimpleChange, Input } from '@angular/core';
import { ToggleService } from './shared/toggle.service'

import '../assets/style/style.scss';
import '../assets/img/icon.png';

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 

    @Output() redPancilName: any;
    // @Input() listToggle: boolean;

    redPancil:any;
    listToggle: boolean;
    // redPancilName:any;

    constructor (private toggleService: ToggleService) {

    }

    ngOnInit() {
        this.listToggle = this.toggleService.listToggle
    }

    get listToggleFunc() {
        return this.listToggle;
    }

    set listToggleFunc(value) {
       this.listToggle = value; 
    }
    
    toggle() {
        this.listToggleFunc = this.toggleService.listToggle
        return this.listToggleFunc;
    }


    redPancilClickedName(data: any) {
        this.redPancilName = data;
    }

    redPancilClicked(data: any) {
        this.redPancil = data;
    }

    redPancilContent() {
        return this.redPancil;
    }
}
