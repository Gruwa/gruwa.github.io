import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TvmazeService, SearchService } from './../../shared';

@Component({

    templateUrl: './result.component.html'
})

export class ResultComponent implements OnInit, OnDestroy{

    searchItems: any;
    error: string;
    subscription: Subscription;
    searchItem: string;

    constructor(private _tvmazeService: TvmazeService,
                private _searchService: SearchService) {

    }

    ngOnInit() {
        this.getQuery();
        this.searchFromNav();
    }

    getQuery() {
        this.subscription = this._searchService.navItem$.subscribe(
            item => this.searchItem = item,
            error => this.error = error
        )
    }

    searchFromNav() {
        if(this.searchItem) {
            this._tvmazeService.search(this.searchItem).subscribe(
                shows => {
                    console.log(shows);
                    this.searchItems = shows;
                }, error => { 
                    console.log(error);
                    this.error = <any>error;
                }
            );            
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe;
    }
}