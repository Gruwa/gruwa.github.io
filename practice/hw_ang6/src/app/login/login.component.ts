import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {FlowService} from '../shared/services/flow.service';
import {AuthService} from './services/auth.service';
import {HttpGuardRequestService} from '../shared/services/http-guard-request.service';


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
   * @param {HttpGuardRequestService} httpGuardRequestService
   * @memberof LoginComponent
   */

  constructor(private router: Router,
              public authService: AuthService,
              public flowService: FlowService,
              // public httpService: HttpService, // TODO - delete when will be ready real api
              private fb: FormBuilder,
              private httpGuardRequestService: HttpGuardRequestService) {
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof LoginComponent
   */

  public ngOnInit(): void {
    this.initForm();
    // TODO ADD data to the fake server
    // this.httpService.addAllObject().subscribe(); // TODO - delete when will be ready real api
  }

  /**
   * Method initForm
   * @returns {void}
   * @memberof LoginComponent
   */

  private initForm(): void {
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

  public onSubmit(): void {
    this.flowService.dataSpinner$.next(true);
    const valueOfLogin: object = {
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value,
      remember: this.loginForm.get('remember').value
    };

    this.authService.onLogin(this.httpGuardRequestService.guardlogin(valueOfLogin));
  }

  /**
   * Method ngOnDestroy
   * @returns {void}
   * @memberof ContentShiftsComponent
   */

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
