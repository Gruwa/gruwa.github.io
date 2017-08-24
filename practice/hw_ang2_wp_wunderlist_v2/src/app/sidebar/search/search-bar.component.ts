import { Component } from '@angular/core';
import { ToggleService } from './../../shared';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html'
})

export class SearchBarComponent {

    constructor (private toggleService: ToggleService) {

    }

    listToggle() {
        return this.toggleService.listToggle;
    }

}