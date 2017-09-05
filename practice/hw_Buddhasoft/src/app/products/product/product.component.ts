import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventService, IEvents } from './../../shared';

@Component({
    templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit {

    product: IEvents;

    constructor( private eventService: EventService,
                 private activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.product = this.eventService.getEvent(+this.activatedRoute.snapshot.params['id']);
    }

    clickEditFunc() {
        this.eventService.productEditFunc(this.product);
    }

    clickDeleteFunc() {
        return this.eventService.verifyProduct = true;
    }

    verifyProduct() {
        return this.eventService.verifyProduct;
    }
}