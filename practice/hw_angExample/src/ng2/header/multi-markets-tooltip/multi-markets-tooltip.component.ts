import {Component, Input, Inject, OnInit} from '@angular/core';
import {UsersService} from '../../../core/services/resources/users/users.service';
import {CurrentUserService} from '../../../core/auth/services/current-user.service';
import {DropdownPlacements} from '../../common/components';

@Component({
  selector: 'cad-multi-markets-tooltip',
  template: require('./multi-markets-tooltip.html'),
  styles: [require('./multi-markets-tooltip.scss')]
})
export class MultiMarketsTooltipComponent implements OnInit {
  @Input() position: DropdownPlacements;
  isShown = false;
  isLoading = false;

  constructor(
    @Inject('usersService') private usersService: UsersService,
    @Inject('currentUserService') private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    const isFirstTime = _.get(this.currentUserService.user, 'customData.informer.multimarket') !== true;
    const isCorrectPermission = this.currentUserService.hasPermissions('cad_access_campaign_manager');

    if (isFirstTime && isCorrectPermission) {
      this.isShown = true;
    }
  }

  close() {
    const newCustomData = _.cloneDeep(this.currentUserService.user.customData);
    _.set(newCustomData, 'informer.multimarket', true);

    this.isLoading = true;

    this.usersService
      .updateUser(this.currentUserService.name, {
        customData: JSON.stringify(newCustomData)
      })
      .then(() => {
        this.currentUserService.setCustomData(newCustomData);
      })
      .finally(() => {
        this.isShown = false;
        this.isLoading = false;
      });
  }
}
