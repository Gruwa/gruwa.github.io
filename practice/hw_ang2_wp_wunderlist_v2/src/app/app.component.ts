import { Component, OnInit, Output } from '@angular/core';
import { ToggleService } from './shared/index';

import '../assets/style/style.scss';
import '../assets/img/icon.png';

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit { 

    listToggle: boolean;

    @Output() redPancilName: any;

    constructor (private toggleService: ToggleService) {

    }

    ngOnInit() {
        this.listToggle = this.toggleService.listToggle;
    }

    toggle() {
        return this.toggleService.listToggle;
    }

    redPancilClickedName(data: any) {
        this.redPancilName = data;
    }

}
