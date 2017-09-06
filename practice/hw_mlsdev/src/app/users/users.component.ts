import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService, IUser } from './../shared';

@Component({
    templateUrl: './users.component.html'
})

export class UsersComponent {

    users: IUser[];

    constructor(private usersService: UsersService) {

    }

    ngOnInit() {
        this.usersService.dataGit('https://api.github.com/users?since=135&per_page=32').subscribe(users => this.users = users);
    }
    
    getApi() {
        console.log(this.users);
    }

}