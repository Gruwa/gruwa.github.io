import { IUser, UsersService } from '../../shared';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})

export class UserComponent {

    dataUser: any;

    @Input() user: IUser;

    constructor(private usersService: UsersService) {

    }

    ngOnInit() {
        this.usersService.dataGit(this.user.url).subscribe(users => this.dataUser = users);
        this.usersService.userFunc(this.user);
    }

    dataUserFunc() {
        this.usersService.userFunc(this.dataUser);
    }

}