import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginModel} from './login.model';
//import { AuthService } from "../shared/services/auth.service";
//import { LoaderService } from "../shared/services/loader.service";

//import { PageService } from '../shared/services/page.service';

@Component({
    selector: 'dc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    errorMessage: string;

    constructor(//private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                //private loaderService: LoaderService,
                //private pageService: PageService
    ) {
    }

    private returnURL: string;

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.returnURL = params['returnTo'];
        });

        //this.authService.logout();

        Promise.resolve(null).then(() => {
            //this.pageService.showPageMenu.emit(false);
        });
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            remember: new FormControl(false)
        });
    }

    onSubmit() {
        //this.loaderService.show();
        let model = this.loginForm.value as LoginModel;

        this.errorMessage = null;
        //this.authService.login(model).subscribe((response: boolean) => {
        //    if (response) {
        //        localStorage.setItem('currentUser', model.username);
        //        this.router.navigate([this.returnURL || this.authService.getRedirectUrl() || ''], { replaceUrl: true });
        //        this.loaderService.hide();
        //        this.pageService.showPageMenu.emit(true);
        //    }
        //    else {
        //        this.errorMessage = this.authService.errorMessage;
        //        this.loaderService.hide();
        //    }
        //},
        //    error => {
        //        this.errorMessage = error.errorMessage;
        //        this.loaderService.hide();
        //    });
    }

    ngOnDestroy() {
        //this.pageService.showPageMenu.emit(true);
    }
}
