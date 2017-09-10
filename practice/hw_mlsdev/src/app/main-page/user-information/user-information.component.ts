import { IData, UsersService } from '../../shared';
import { Component } from '@angular/core';

@Component({
    templateUrl: './user-information.component.html'
})

export class  UserInformationComponent {

    user: IData;
    repos: IData[];

    constructor(private usersService: UsersService) {

    }
    
    ngOnInit() {
        this.user = this.usersService.user; 
        // console.log('user-info',this.usersService.user);
        // this.usersService.dataGit(this.usersService.user.repos_url).subscribe(info => this.repos = info)
        // this.usersService.dataGitUser$.next(this.usersService.user); 
    }

    repoFunc() {
        this.usersService.repo = this.user;
        this.usersService.dataGitUser$.next(this.user);
    }


}