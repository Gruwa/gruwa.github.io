import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {DataService} from '../shared/services/data.service';
import {AuthService} from './services/auth.service';

/**
 * Login Component
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  /**
   * Variable of ngUnsubscribe
   * @type {Subject<void>}
   * @memberof LoginComponent
   */

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  /**
   * Variable loginForm
   * @type {FormGroup}
   * @memberof LoginComponent
   */

  public loginForm: FormGroup;

  /**
   * Creates an instance of LoginComponent
   * @param {AuthService} authService
   * @param {DataService} dataService
   * @param {FormBuilder} fb
   * @param {Router} router
   * @memberof LoginComponent
   */

  constructor(private router: Router,
              public authService: AuthService,
              public dataService: DataService,
              private fb: FormBuilder) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof LoginComponent
   */

  ngOnInit(): void {
    this.initForm();
    // TODO ADD data to the fake server
    // this.httpService.addAllObject().subscribe();
  }

  /**
   * Method initForm
   * @returns {void}
   * @memberof LoginComponent
   */

  initForm(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false, []]
    });
  }

  /**
   * Method onSubmit
   * @returns {void}
   * @memberof LoginComponent
   */

  onSubmit() {
    const valueOfLogin: object = {
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value,
      remember: this.loginForm.get('remember').value
    };

    this.authService.onLogin(valueOfLogin);
    this.dataService.dataLogin$.takeUntil(this.ngUnsubscribe).subscribe(
      (resp) => {
        this.dataService.dataSideBar$.next(true);
        this.router.navigate(['/', `${resp[0].description}`, 'shifts']);
      }
    );
  }

  /**
   * Method ngOnDestroy
   * @returns {void}Утпдшыр
   * @memberof ContentShiftsComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
