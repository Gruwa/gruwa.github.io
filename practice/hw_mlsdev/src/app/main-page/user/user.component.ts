import { 
    IData, 
    UsersService 
} from '../../shared';

import { 
    Component, 
    Input 
} from '@angular/core';

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})
export class UserComponent {

    dataActiveUser: IData;

    @Input() user: IData;

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.usersService.dataActiveUserFromGitApi(this.user.url).subscribe(user => this.dataActiveUser = user);
    }
    
    activateUser() {
        this.usersService.setActiveUser(this.dataActiveUser);
    }
}