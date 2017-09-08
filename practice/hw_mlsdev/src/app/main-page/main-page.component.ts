import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService, IData } from './../shared';

@Component({
    templateUrl: './main-page.component.html'
})

export class MainPageComponent {

    users: IData[];

    constructor(private usersService: UsersService) {

    }

    ngOnInit() {
        // this.usersService.dataGitUser$.subscribe(this.dataGitUserObserver.bind(this));
        this.usersService.dataGit('https://api.github.com/users?since=135&per_page=32').subscribe(users => this.users = users);
        // this.usersService.dataGitUser$.next(this.users);
        
    }

    dataGitUserObserver(eventData: IData[]) {
        console.log('repose', eventData);
        
        this.usersService.gitUsersList(eventData);
    }
    
    
    // ngOnDestroy() {
    //     this.usersService.dataGitUser$.unsubscribe();

    // }
    
    getApi() {
        console.log(this.users);
    }

}