import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {UserService} from '../../../shared/services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';
import {MainService} from '../../../shared/services/index';

@Component({
  selector: 'app-tab-page',
  templateUrl: './tab-page.component.html',
  styleUrls: ['./tab-page.component.scss'],
  providers: [UserService],
  encapsulation: ViewEncapsulation.None
})
export class TabPageComponent implements OnInit {

  public userActive: any = {};
  public tab: string = 'students';
  public visibleModal: boolean = false;
  public filter: string = '';
  public users: any = [];
  public modalType: string = '';
  public showModal = false;
  public showModalBulk = false;
  public modalTitle = '';
  public addUser = '';
  public ascType: boolean = true;
  public sort: string = '';
  public tab_active: string = '';
  public toggle: boolean = false;
  public title_btn: string = '+ Add students';
  public id_user: string = 'Student ID';

  constructor(public userService: UserService,
              public translate: TranslateService,
              public toast: ToastsManager, vcr: ViewContainerRef,
              private storage: LocalStorageService,
              public mainService: MainService) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.mainService.loader$.next(true);
    this.onGetUsers();
  }

  /**
   * Method for get users
   */

  onGetUsers(sortField?: string) {
    this.users = [];
    this.userService.getUsers(this.tab)
      .subscribe(
        (value: any) => {
          this.users = value;
        },
        (error) => {
          if (error.status === 403) {
            this.toast.error('Access is denied');
            this.tab = this.tab_active;
            this.title_btn = '+ Add ' + this.tab;
            // this.search_user = 'Search ' + this.tab;
            this.onGetUsers();
          }
        }
      );

    this.toggle = false;
    this.mainService.loader$.next(false);
  }

  /**
   * Method for visible modal
   */

  onVisibleChange(modalStatus: boolean) {
    this.visibleModal = modalStatus;

    if (!this.visibleModal) {
      this.sort = '';
      this.onGetUsers();
    }
  }

  /**
   * Method for visible modal
   */

  onShowModal(onShow: boolean) {
    this.addUser = 'Add';
    this.visibleModal = onShow;
    this.userActive = {};
  }

  /**
   * Method for visible modal
   */

  onShowModalEditUser(onShow: boolean, user: any) {
    this.addUser = 'Edit';
    this.visibleModal = onShow;
    this.userActive = user;
  }

  /**
   * Method for change status of Student, Instructor, Admin
   */

  toggleStudentStatus($event, userActive) {
    const user: any = {};
    user.active = $event.target.checked;
    user._id = userActive._id;
    this.userService.onEditToggleStatusUser(user, this.tab)
      .subscribe(() => {
          this.toggle = true;
          // this.onGetUsers();
        }
      );
    $event.stopPropagation();
  }

  /**
   * Method for show modal of delete
   */

  removeRecordShowModal($event, modalType: string, user) {
    this.modalType = modalType;
    this.userActive = user;

    if (modalType === 'delete') {
      this.modalTitle = 'Delete Confirmation';
    }

    this.showModal = true;
    $event.stopPropagation();
  }

  /**
   * Method for show modal of delete
   */

  closeModal(e?) {
    this.showModal = false;
    this.modalType = '';
    this.modalTitle = '';
  }

  /**
   * Method for delete user
   */

  deleteGroup(needDelete: boolean) {
    if (needDelete) {
      this.userService.onDeleteUser(this.userActive, this.tab)
        .subscribe(() => {
            this.onGetUsers();
          }
        );
    }
    this.closeModal();
  }

  /**
   * Method for change tabs
   */

  changeTab(tab: string) {
    this.tab_active = this.tab;
    this.tab = tab;
    this.title_btn = '+ Add ' + this.tab;
    // this.search_user = 'Search ' + this.tab;
    this.id_user = this.tab + ' ID';
    this.sort = '';
    this.onGetUsers();
  }

  preventDefaultevent(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

}
