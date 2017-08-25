import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToggleService, SearchService } from './../../shared';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html'
})

export class SearchBarComponent {

    searchItems: string;

    constructor (private toggleService: ToggleService,
                 private _searchSevice: SearchService,
                 private _router: Router) {

    }

    listToggle() {
        return this.toggleService.listToggle;
    }

    searchItemsFunc() {
        console.log(this.searchItems);
        this._searchSevice.changeSearch(this.searchItems);
        this.searchItems = '';
        this._router.navigate(["/events/search"]);

    }

}