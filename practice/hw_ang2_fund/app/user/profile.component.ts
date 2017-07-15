import { AuthService } from './auth.service';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'app/user/profile.component.html'
})

export class ProfileComponent implements OnInit{
    profileForm:FormGroup;

    constructor(private authService:AuthService, private router:Router) {
        // конструктор добавляет сервисы в компонент
    }

    ngOnInit() {
        let firstName = new FormControl(this.authService.currentUser.firstName);
        let lastName = new FormControl(this.authService.currentUser.lastName);

        this.profileForm = new FormGroup({
            firstName: firstName,
            lastName: lastName
        })
    }

    cancel() { 
        this.router.navigate(['events']);
        }

    saveProfile(formValues) {
        this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
        this.router.navigate(['events']);
    }
}