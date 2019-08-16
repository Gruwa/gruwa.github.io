import * as fromRoot from '../../state/app.state';

/**
 * Export interface IState
 * with extends ILoginState
 */

export interface IState extends fromRoot.IState {
  sidebar: ISidebarState;
}

/**
 * Export interface ILogin
 */

export interface ISidebarState {
  activeItem: 'shifts' | 'settings' | 'my availability' | 'contact info';
}
