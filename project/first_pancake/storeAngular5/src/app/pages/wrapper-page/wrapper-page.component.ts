import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {MainService} from '../../shared/services/main.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../shared/services';

@Component({
  selector: 'app-wrapper-page',
  templateUrl: './wrapper-page.component.html',
  styleUrls: ['./wrapper-page.component.scss']
})
export class WrapperPageComponent implements OnInit, OnDestroy {

  public visibleLogin: boolean = true;
  public visibleRegister: boolean = false;
  public visibleContent: boolean = false;
  public loading: boolean = false;

  constructor(public router: Router,
              public mainService: MainService,
              public translate: TranslateService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.mainService.setLanguage('en');
    this.authService.stateLogin$.subscribe(this.stateLogin.bind(this));
    this.mainService.loader$.subscribe(this.loaderChange.bind(this));
    // this.authService.validToken().subscribe(
    //   (res) => {
    //     this.authService.stateLogin$.next({
    //       eventType: false
    //     });
    //   });
  }

  loaderChange(value: boolean) {
    console.log(value)
    this.loading = value;
  }

  stateLogin(eventData: boolean) {
    console.log(eventData);
    this.visibleContent = eventData;
    this.visibleLogin = !eventData;
  }

  visibleModal(data: boolean) {
    console.log(data)
    this.visibleLogin = data;
  }

  ngOnDestroy() {
    this.authService.stateLogin$.unsubscribe();
    this.mainService.loader$.unsubscribe();
  }

}
