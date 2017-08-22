import { Component, Output } from '@angular/core';
import { ToggleService } from './shared/index';

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

    toggle() {
        return this.toggleService.listToggle;
    }

    @Output() redPancilName: any;

    redPancilClickedName(data: any) {
        this.redPancilName = data;
    }

}
