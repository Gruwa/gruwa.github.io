import { IData, UsersService } from '../../shared';
import { Component } from '@angular/core';

@Component({
    templateUrl: './user-information.component.html'
})

export class  UserInformationComponent {

    user: IData;

    constructor(private usersService: UsersService) {

    }
    
    ngOnInit() {
        this.user = this.usersService.user;  
    }

    repoFunc() {
        this.usersService.repo = this.user;
    }


}