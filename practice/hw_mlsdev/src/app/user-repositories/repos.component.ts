import { Router } from '@angular/router';
import { 
    UsersService, 
    IData 
} from '../shared';
import { Component } from '@angular/core';

@Component({
    templateUrl: './repos.component.html'
})
export class ReposComponent {

    activeUser: IData;
    repos: IData[];
    
    constructor(
        private usersService: UsersService,
        private router: Router) { }

    ngOnInit() {
        this.activeUser = this.usersService.getActiveUser();
        this.usersService.usersDataFromGitApi(this.activeUser.repos_url)
                       .subscribe(users => this.repos = users);
    }
                    
    activeUserPage() {
        this.router.navigate(['/users/' + this.activeUser.id]);
    }

    activationRepo(repo: IData) {
        this.usersService.setActiveRepo(repo);
    }


}