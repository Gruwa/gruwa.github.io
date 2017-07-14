import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'selector-name',
    templateUrl: 'app/user/login.component.html'
})

export class LoginComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    login(formValues) {
        console.log(formValues);
    }
}