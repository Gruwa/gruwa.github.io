import { Component, OnInit, Output } from '@angular/core';
import { ToggleService, IEvents } from './shared';

import '../assets/style/style.scss';
import '../assets/img/icon.png';

@Component({
  selector: 'main-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit { 

    listToggle: boolean;
    redPencilName: any;

    constructor (private toggleService: ToggleService) {

    }

    ngOnInit() {
        this.listToggle = this.toggleService.listToggle;
    }

    toggle() {
        return this.toggleService.listToggle;
    }

    redPencilClickedName(data: IEvents) {
        this.redPencilName = data;
    }

}
