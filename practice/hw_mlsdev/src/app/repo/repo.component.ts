import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { 
    UsersService, 
    IData 
} from '../shared';

@Component({
    templateUrl: './repo.component.html'
})
export class RepoComponent {

    activeRepo: IData;

    constructor(
        private usersService: UsersService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activeRepo = this.usersService.getRepoById(+this.activatedRoute.snapshot.params['id']);
        console.log('this.activeRepo.owner', this.activeRepo.owner);
        
    }

    
}