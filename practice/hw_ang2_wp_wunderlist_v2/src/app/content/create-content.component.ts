import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RedPencilService } from '../shared';

@Component({
    templateUrl: './create-content.component.html'
})

export class CreateContentComponent {

    newLists: boolean;

    constructor(private redPencilService: RedPencilService) {

    }

    creatNewLists() {
        this.newLists = true;
        this.redPencilService.creatNewLists(this.newLists);
    }
}