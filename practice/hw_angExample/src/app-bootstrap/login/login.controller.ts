import {AuthService} from '../../core/auth';
import {UsersService} from '../../core/services/resources/users/users.service';
import {CurrentUserService} from '../../core/auth';

interface ILoginErrorResponse {
  K: number; // numbers of unsuccessful logins
  N: number; // numbers of attempts that remained before an account will be deactivated
  error: string;
  message: string;
  status: number;
}

export class LoginController {
  invalid = false;
  isProcessing = false;
  username = '';
  pass = '';
  errorInfo: ILoginErrorResponse;

  constructor(
    private authService: AuthService,
    private $cacheFactory: ng.ICacheFactoryService,
    private usersService: UsersService,
    private currentUserService: CurrentUserService
  ) {
    'ngInject';
  }

  login(username: string, password: string) {
    this.invalid = false;
    this.isProcessing = true;

    this.authService.authenticate(username, password)
      .then(() => {
        this.currentUserService.unsetCurrentUser();
        this.$cacheFactory.get('$http').removeAll();
        return this.usersService.getMe();
      })
      .then((user: cad.IUser) => {
        this.currentUserService.setCurrentUser(user);
        this.authService.signInRedirect();
      })
      .catch((response: ng.IHttpPromiseCallbackArg<ILoginErrorResponse>) => {
        this.pass = '';
        this.errorInfo = response.data;
        this.invalid = true;
        this.isProcessing = false;
      });
  }

  get showLabelAtLogo(): boolean {
    return _.get(WHITELABEL, 'loginPage.showLabelAtLogo', false);
  }
}
