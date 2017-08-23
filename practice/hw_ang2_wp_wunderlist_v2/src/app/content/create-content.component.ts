import { Component, Input } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { CreateSidebarComponent } from '../sidebar/index';

@Component({
    providers: [CreateSidebarComponent],
    templateUrl: './create-content.component.html'
})

export class CreateContentComponent {

    constructor(private createSidebarComponent: CreateSidebarComponent) {

    }
    
    creatNewLists() {
        this.createSidebarComponent.creatNewLists();
    }
}