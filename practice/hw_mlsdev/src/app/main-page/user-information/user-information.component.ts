import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { 
    IData, 
    UsersService 
} from '../../shared';

@Component({
    templateUrl: './user-information.component.html'
})
export class  UserInformationComponent {

    activeUser: IData;
    repos: IData[];

    constructor(
        private usersService: UsersService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activeUser = this.usersService.getUserById(+this.activatedRoute.snapshot.params['id'])
        this.usersService.activeUser$.next(this.activeUser);
    }


}