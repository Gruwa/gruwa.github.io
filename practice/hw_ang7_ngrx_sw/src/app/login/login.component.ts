import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {FlowService} from '../shared/services/flow.service';
import {AuthService} from './services/auth.service';

/**
 * Login Component
 */

@Component({
  selector: 'sw-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * Variable loginForm
   * @type {FormGroup}
   * @memberof LoginComponent
   */

  public loginForm: FormGroup;

  /**
   * Variable img
   * @type {object}
   * @memberof LoginComponent
   */

  public img: object;

  /**
   * Creates an instance of LoginComponent
   * @param {AuthService} authService
   * @param {FlowService} flowService
   * @param {FormBuilder} fb
   * @param {ActivatedRoute} activeRoute
   * @memberof LoginComponent
   */

  constructor(public authService: AuthService,
              public flowService: FlowService,
              private fb: FormBuilder,
              private activeRoute: ActivatedRoute) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof LoginComponent
   */

  public ngOnInit(): void {
    this.initHeader();
    this.initForm();
  }

  /**
   * Method initForm
   * @returns {void}
   * @memberof LoginComponent
   */

  private initHeader(): void {
    this.img = {
      url: 'assets/images/SWLogo.svg',
      class: 'rmdl-navheader__brand__img'
    };
  }

  /**
   * Method initForm
   * @returns {void}
   * @memberof LoginComponent
   */

  private initForm(): void {
    this.loginForm = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')
        ]
      ],
      password: ['', [Validators.required]],
      remember: [false, []]
    });
    this.flowService.dataSpinner$.next(false);
  }

  /**
   * Method onSubmit
   * @returns {void}
   * @memberof LoginComponent
   */

  public onSubmit(): void {
    this.flowService.buttonAuth$.next(true);
    const valueOfLogin: object = {
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value,
      remember: this.loginForm.get('remember').value
    };

    this.flowService.login$.next(valueOfLogin);
    setTimeout(() => {
      this.flowService.login$.next(null);
    }, 120000);
    this.authService.onLogin(valueOfLogin, this.activeRoute.snapshot.queryParams.redirectUrl);
  }
}
