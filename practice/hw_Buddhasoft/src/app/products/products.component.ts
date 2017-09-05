import { Component, OnInit } from '@angular/core';

import { EventService, IEvents } from './../shared'; 

@Component({
    templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit {

    products: IEvents[];
    
    constructor(private eventService: EventService ) {

    }

    ngOnInit() {
        this.products = this.eventService.getEvents();
    }
    
}