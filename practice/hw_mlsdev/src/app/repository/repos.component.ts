import { UsersService, IData } from '../shared';
import { Component } from '@angular/core';

@Component({
    templateUrl: './repos.component.html'
})

export class ReposComponent {

    repos: IData[];
    user: IData;
    
    constructor(private usersService: UsersService) {

    }

    ngOnInit() {
        this.usersService.dataGitUser$.subscribe(this.dataGitUserObserver.bind(this));
        
    }
    
    dataGitUserObserver(eventData: IData[]) {
        console.log('repose', eventData);
        
        // this.usersService.gitUsersList(eventData);
    }
    
    
    click() {
        // console.log(this.repos);
        console.log('repos', this.usersService.usersList);
        
        
    }

    dataUserFunc() {

    }

    ngOnDestroy() {
        if (!!this.usersService.dataGitUser$.unsubscribe()) this.usersService.dataGitUser$.unsubscribe();

    }


}