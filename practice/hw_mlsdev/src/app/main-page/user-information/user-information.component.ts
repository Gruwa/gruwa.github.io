import { IData, UsersService } from '../../shared';
import { Component } from '@angular/core';

@Component({
    templateUrl: './user-information.component.html'
})

export class  UserInformationComponent {

    activeUser: IData;
    repos: IData[];

    constructor(private usersService: UsersService) {

    }
    
    // ngOnInit() {
    //     // this.user = this.usersService.user; 
    //     // console.log('user-info',this.usersService.user);
    //     // this.usersService.dataGit(this.usersService.user.repos_url).subscribe(info => this.repos = info)
    //     // this.usersService.dataGitUser$.next(this.usersService.user); 
    // }


    ngOnInit() {
        // подписываемся на изменения в потоке
        this.usersService.activeUser$.subscribe(this.dataActiveUserObserver.bind(this));
        console.log("!!!!!!");
        
    }
    
    dataActiveUserObserver(eventData: IData) {
    this.activeUser = eventData;
    console.log('this.activeUser', this.activeUser.avatar_url);
    
    }

    repoFunc() {
        // this.usersService.repo = this.user;
        // this.usersService.dataGitUser$.next(this.user);
    }


}