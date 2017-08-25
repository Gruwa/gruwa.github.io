import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { EventService, IEvents, IEventsItem } from './'

@Injectable()

export class SearchService {

    constructor(private eventService: EventService) {

    }

    private _navItemSource = new BehaviorSubject<string>(null);

    navItem$ = this._navItemSource.asObservable();

    changeSearch(searchItems: string) {
        this._navItemSource.next(searchItems);
    }
  
}