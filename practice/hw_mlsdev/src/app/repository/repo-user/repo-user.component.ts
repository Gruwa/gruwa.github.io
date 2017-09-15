import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { 
    UsersService, 
    IData 
} from '../../shared';

@Component({
    templateUrl: './repo-user.component.html'
})
export class RepoUserComponent {

    activeRepo: IData;

    constructor(
        private usersService: UsersService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activeRepo = this.usersService.getRepoById(+this.activatedRoute.snapshot.params['id']);
        console.log(this.activeRepo);
        
    }

    
}