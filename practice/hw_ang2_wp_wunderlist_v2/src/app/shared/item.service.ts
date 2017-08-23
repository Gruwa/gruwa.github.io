import { Injectable } from '@angular/core';

import { EventService, IEvents, IEventsItem } from './'

@Injectable()

export class ItemService {

    starItem: boolean = false;

    constructor(private eventService: EventService) {

    }

  
}