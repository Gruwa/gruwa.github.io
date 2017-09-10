import { Component } from '@angular/core';

import { UsersService } from '../../shared';

@Component({
    selector: 'repo-user',
    templateUrl: './repo-user.component.html'
})

export class RepoUserComponent {

    constructor(private usersService: UsersService) {

    }

    ngOnInit() {

    }

    
}