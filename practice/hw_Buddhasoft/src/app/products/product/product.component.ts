import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService, IEvents } from './../../shared';

@Component({
    selector: 'product',
    templateUrl: './product.component.html'
})

export class ProductComponent {

    constructor( private eventService: EventService,
                 private activatedRoute: ActivatedRoute) {

    }

    product: IEvents;

    ngOnInit() {
        this.product = this.eventService.getEvent(+this.activatedRoute.snapshot.params['id']);
    }

    clickEditFunc() {
        this.eventService.productFunc(this.product);
    }
}