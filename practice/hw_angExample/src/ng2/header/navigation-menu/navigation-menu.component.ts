import {Component, HostListener, Inject, Input} from '@angular/core';
import {CurrentUserService} from '../../../core/auth/services/current-user.service';

export interface INavigationMenuItem {
  title: string;
  name: string;
  permissions: string[];
  url: string;
  type: string; // tslint:disable-line
  visible: boolean;
}

@Component({
  selector: 'cad-navigation-menu',
  template: require('./navigation-menu.html'),
  styles: [require('./navigation-menu.scss')]
})
export class NavigationMenuComponent {
  @Input() overlay: HTMLElement;
  @Input() items: INavigationMenuItem[];

  visible: boolean = false;
  aboutEnvVisible = false;
  mainItems: INavigationMenuItem[];
  secondaryItems: INavigationMenuItem[];

  constructor(
    @Inject('$state') private $state: ng.ui.IStateService,
    @Inject('currentUserService') private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.mainItems = _.filter(this.items, item => this.filterItem(item, 'main'));
    this.secondaryItems = _.filter(this.items, item => this.filterItem(item, 'secondary'));
  }

  open() {
    this.visible = true;
    this.overlay.style.filter = 'blur(15px)';
  }

  @HostListener('document:keyup.esc')
  close() {
    this.visible = false;
    this.aboutEnvVisible = false;
    this.overlay.style.filter = '';
  }

  isSelected(item: {name: string}): boolean {
    return _.startsWith(this.$state.current.name, item.name);
  }

  private filterItem(item: INavigationMenuItem, menuType: string): boolean {
    return _.every([
      item.type === menuType,
      item.visible === true,
      this.currentUserService.hasPermissions(item.permissions)
    ]);
  }
}
