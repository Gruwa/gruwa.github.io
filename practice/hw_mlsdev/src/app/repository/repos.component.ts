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
        this.usersService.dataGit(this.usersService.repo.repos_url).subscribe(info => this.repos = info);
        // this.user = this.usersService.repo;
    }

    click() {
        console.log(this.repos);
        
    }
    click1() {
        this.usersService.dataFlow$.next({
            aaa: 'aaa'
          });
    }
    click2() {
        this.usersService.dataFlow$.next({
            bbb: 'bbb'
          });
    }

}