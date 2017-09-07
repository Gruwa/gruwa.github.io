import { IUser, UsersService } from '../../shared';
import { Component } from '@angular/core';

@Component({
    templateUrl: './user-information.component.html'
})

export class  UserInformationComponent {

    user: IUser;

    constructor(private usersService: UsersService) {

    }
    
    ngOnInit() {
        this.user = this.usersService.user;      
    }
}