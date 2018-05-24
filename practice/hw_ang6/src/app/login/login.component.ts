import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import {FlowService} from '../shared/services/flow.service';
import {AuthService} from './services/auth.service';
import {HttpService} from '../shared/services/http.service';

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
   * @param {FlowService} flowService
   * @param {FormBuilder} fb
   * @param {Router} router
   * @memberof LoginComponent
   */

  constructor(private router: Router,
              public authService: AuthService,
              public flowService: FlowService,
              // public httpService: HttpService, // TODO - delete when will be ready real api
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
    // this.httpService.addAllObject().subscribe(); // TODO - delete when will be ready real api
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

  onSubmit(): void {
    this.flowService.dataSpinner$.next(true);
    const valueOfLogin: object = {
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value,
      remember: this.loginForm.get('remember').value
    };

    this.authService.onLogin(valueOfLogin);
    this.flowService.dataLogin$.takeUntil(this.ngUnsubscribe).subscribe(
      (resp) => {
        this.router.navigate(['/login/schedule']);
      }
    );
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
