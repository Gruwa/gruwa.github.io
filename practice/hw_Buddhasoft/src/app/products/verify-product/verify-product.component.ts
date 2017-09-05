import { IEvents } from '../../shared';
import { Component, Input } from '@angular/core';

import { EventService } from '../../shared';

@Component({
    selector: 'verify-product',
    templateUrl: './verify-product.component.html'
})

export class VerifyProductComponent {

    @Input() product: IEvents;

    constructor(private eventService: EventService) {

    }

    deleteVerify() {
        this.eventService.productDeleteFunc(this.product);
        this.cancelVerify();
    }

    cancelVerify() {
        this.eventService.verifyProduct = false;
    }
}