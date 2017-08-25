import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { EventService, IEvents, IEventsItem } from './'

@Injectable()

export class TvmazeService {

    private _tvMazeURL:string = 'https://api.tvmaze.com/search/shows';

    constructor(private eventService: EventService,
                private _http: Http) {

    }

    search(searchItems: string): Observable<any>{
        const search: URLSearchParams = new URLSearchParams();
        search.set('q', searchItems)

        return 
        // this._http.get(this._tvMazeURL, {search}).map(res=>res.json()).do(data=>console.log(data));
    }
}