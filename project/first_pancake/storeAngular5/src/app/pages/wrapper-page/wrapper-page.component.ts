import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MainService} from '../../shared/services/main.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../shared/services';

@Component({
  selector: 'app-wrapper-page',
  templateUrl: './wrapper-page.component.html',
  styleUrls: ['./wrapper-page.component.scss']
})
export class WrapperPageComponent implements OnInit {

  public visibleLogin: boolean = true;
  public visibleRegister: boolean = false;
  public visibleContent: boolean = false;

  constructor(public router: Router,
              public mainService: MainService,
              public translate: TranslateService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.mainService.setLanguage('en');
    this.authService.stateLogin$.subscribe(this.stateLogin.bind(this));
    // this.authService.validToken().subscribe(
    //   (res) => {
    //     this.authService.stateLogin$.next({
    //       eventType: false
    //     });
    //   });
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

}
