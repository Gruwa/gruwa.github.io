import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operator/first';
import { TOASTR_TOKEN, Toastr} from '../common/toastr.service';

@Component({
    templateUrl: 'app/user/profile.component.html'
})

export class ProfileComponent implements OnInit{
    profileForm:FormGroup;
    private firstName:FormControl;
    private lastName:FormControl;

    constructor(private authService:AuthService, 
            private router:Router,
            @Inject(TOASTR_TOKEN) private toastr: Toastr) {
        // конструктор добавляет сервисы в компонент

    }

    ngOnInit() {
        this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required,
             Validators.pattern('[a-zA-Z].*')]);
            //  Validators => проверка формы
                    // required -  на заполненность формы, не пустое
                    // pattern - на наличия определенных символов, в данном случае начинаться должен с буквы
        this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);

        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName
        })
    }

    cancel() { 
        this.router.navigate(['events']);
        }

    saveProfile(formValues) {
        if (this.profileForm.valid) {
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
            this.toastr.success('Profile Saved');
        }
    }

    validateLastName() {
        return this.lastName.valid || this.lastName.untouched;
    }

    validateFirstName() {
        return this.firstName.valid || this.firstName.untouched;
    }
}