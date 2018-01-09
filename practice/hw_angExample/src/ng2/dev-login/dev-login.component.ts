import {Component, Inject} from '@angular/core';
import {AuthService} from '../../core/auth';

@Component({
  selector: 'cad-dev-login',
  template: require('./dev-login.html'),
  styles: [require('./dev-login.scss')]
})
export class DevLoginComponent {
  constructor(
    @Inject('authService') private authService: AuthService
  ) {}

  login() {
    this.authService.startSso();
  }
}
