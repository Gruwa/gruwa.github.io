import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
//import { AuthService } from "../shared/services/auth.service";

//import { LoaderService } from "../shared/services/loader.service";

@Component({
    selector: "dc-logout",
    template: "Logout...",
})
export class LogoutComponent implements OnInit, OnDestroy {
    constructor(
        //private authService: AuthService,
        //private loaderService: LoaderService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    private sub: any;
    private returnURL: string;

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.returnURL = params['returnTo'];
        });

        //this.loaderService.show();
        //this.authService.logout()
        //    .subscribe((result: boolean) => {
        //        this.loaderService.hide();
        //        if (this.returnURL)
        //            this.router.navigate(['login', this.returnURL]);
        //        else
        //            this.router.navigate(['login']);
        //    })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
