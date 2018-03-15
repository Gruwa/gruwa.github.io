import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {UserService} from '../../../shared/services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';
import {MainService} from '../../../shared/services/index';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import {UserInterface} from '../../../shared/interfaces/user.interface';
import {ActivatedRoute, Router} from '@angular/router';
import * as Types from '../../../shared/interfaces/tab.interface';

@Component({
  selector: 'app-tab-page',
  templateUrl: './tab-page.component.html',
  styleUrls: ['./tab-page.component.scss'],
  providers: [UserService],
  encapsulation: ViewEncapsulation.None
})
export class TabPageComponent implements OnInit{

  /**
   * Variable userActive
   * @type {any}
   * @memberof TabPageComponent
   */

  public userActive: any = {};

  /**
   * Variable tab
   * @type {Types.tabTypes}
   * @memberof TabPageComponent
   */

  public tab: Types.tabTypes = 'students';

  /**
   * Variable visibleModal
   * @type {boolean}
   * @memberof TabPageComponent
   */

  public visibleModal: boolean = false;

  /**
   * Variable users
   * @type {Array<UserInterface>}
   * @memberof TabPageComponent
   */

  public users: Array<UserInterface>;

  /**
   * Variable modalType
   * @type {string}
   * @memberof TabPageComponent
   */

  public modalType: string = '';

  /**
   * Variable showModal
   * @type {boolean}
   * @memberof TabPageComponent
   */

  public showModal: boolean = false;

  /**
   * Variable modalTitle
   * @type {string}
   * @memberof TabPageComponent
   */

  public modalTitle: string = '';

  /**
   * Variable addUser
   * @type {Types.addUser}
   * @memberof TabPageComponent
   */

  public addUser: Types.addUser;

  /**
   * Variable tabActive
   * @type {Types.tabTypes}
   * @memberof TabPageComponent
   */

  public tabActive: Types.tabTypes;

  /**
   * Variable toggle
   * @type {boolean}
   * @memberof TabPageComponent
   */

  public toggle: boolean = false;

  /**
   * Variable titleBtn
   * @type {string}
   * @memberof TabPageComponent
   */

  public titleBtn: string = '+ Add students';

  /**
   * Variable idUser
   * @type {string}
   * @memberof TabPageComponent
   */

  public idUser: string = 'Student ID';

  private resolve: boolean = false;

  /**
   * Creates an instance of TabPageComponent.
   * @param {TranslateService} translate
   * @param {Router} router
   * @param {UserService} userService
   * @param {LocalStorageService} storage
   * @param {MainService} mainService
   * @param {ToastsManager} toast
   * @param {ViewContainerRef} vcr
   * @param {ActivatedRoute} route
   * @memberof TabPageComponent
   */

  constructor(
    public userService: UserService,
    public translate: TranslateService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    private storage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    public mainService: MainService
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof TabPageComponent
   */

  ngOnInit(): void {
    this.mainService.loader$.next(true);
    this.onGetUsers();
  }

  /**
   * Method for get users
   * @returns {void}
   * @memberof TabPageComponent
   */

  onGetUsers(): void {
    if (this.tab === 'students' && !this.resolve) {
      console.log(this.route.data)
      this.resolve = true;
      this.route.data
        .subscribe(
          (value: any) => {
            console.log('next', value['users'])

            this.users = value['users'];
          },
          (error) => {
            if (error.status === 403) {
              console.log('error')

              this.toast.error('Access is denied');
              this.tab = this.tabActive;
              this.titleBtn = '+ Add ' + this.tab;
              // this.search_user = 'Search ' + this.tab;
              this.onGetUsers();
            }
          }
        );
    } if (this.tab === 'students') {
      this.userService.getUsers(this.tab)
        .subscribe(
          (value: any) => {
            this.users = value;
          },
          (error) => {
            if (error.status === 403) {
              this.toast.error('Access is denied');
              this.tab = this.tabActive;
              this.titleBtn = '+ Add ' + this.tab;
              // this.search_user = 'Search ' + this.tab;
              this.onGetUsers();
            }
          }
        );
    } else {
      this.userService.getUsers(this.tab)
        .subscribe(
          (value: any) => {
            this.users = value;
          },
          (error) => {
            if (error.status === 403) {
              this.toast.error('Access is denied');
              this.tab = this.tabActive;
              this.titleBtn = '+ Add ' + this.tab;
              // this.search_user = 'Search ' + this.tab;
              this.onGetUsers();
            }
          }
        );
    }
    this.toggle = false;
    this.mainService.loader$.next(false);
  }

  /**
   * Method for visible modal
   * @param {boolean} modalStatus
   * @returns {void}
   * @memberof TabPageComponent
   */

  onVisibleChange(modalStatus: boolean): void {
    this.visibleModal = modalStatus;

    if (!this.visibleModal) {
      this.onGetUsers();
    }
  }

  /**
   * Method for visible modal
   * @param {boolean} onShow
   * @returns {void}
   * @memberof TabPageComponent
   */

  onShowModal(onShow: boolean): void {
    this.addUser = 'Add';
    this.visibleModal = onShow;
    this.userActive = {};
  }

  /**
   * Method for visible modal
   * @param {boolean} onShow
   * @param {UserInterface} user
   * @returns {void}
   * @memberof TabPageComponent
   */

  onShowModalEditUser(onShow: boolean, user: UserInterface): void {
    this.addUser = 'Edit';
    this.visibleModal = onShow;
    this.userActive = user;
  }

  /**
   * Method for change status of Student, Instructor, Admin
   * @param $event
   * @param {UserInterface} userActive
   * @returns {void}
   * @memberof TabPageComponent
   */

  toggleStudentStatus($event, userActive: UserInterface): void {
    const user: object = {};
    user['active'] = $event.target.checked;
    user['_id'] = userActive._id;
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
   * @param $event
   * @param {string} modalType
   * @param {UserInterface} user
   * @returns {void}
   * @memberof TabPageComponent
   */

  removeRecordShowModal($event, modalType: string, user: UserInterface): void {
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
   * @param $event
   * @returns {void}
   * @memberof TabPageComponent
   */

  closeModal($event?): void {
    this.showModal = false;
    this.modalType = '';
    this.modalTitle = '';
  }

  /**
   * Method for delete user
   * @param {boolean} needDelete
   * @returns {void}
   * @memberof TabPageComponent
   */

  deleteGroup(needDelete: boolean): void {
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
   * @param {Types.tabTypes} tab
   * @returns {void}
   * @memberof TabPageComponent
   */

  changeTab(tab: Types.tabTypes): void {
    this.tabActive = this.tab;
    this.tab = tab;
    this.titleBtn = '+ Add ' + this.tab;
    this.idUser = this.tab + ' ID';
    this.onGetUsers();
  }

  /**
   * Method for shaping file
   * @param {any} data
   * @returns {any[]}
   * @memberof TabPageComponent
   */

  transformData(data: any): any[] {
    return data.map(value => {
      const report = {};
      report['First Name'] = value.first_name;
      report['Last Name'] = value.last_name;
      report['Email'] = value.email;
      report['Date of created'] = moment(value.created_date).format('DD.MM.YYYY');
      report['Company name'] = value.company_name;
      report['About me'] = value.about_me;
      return report;
    });
  }

  /**
   * Method for download file
   * @param {string} type
   * @returns {void}
   * @memberof TabPageComponent
   */

  downloadFile(type: string = 'xlsx'): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.transformData(this.users));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `completions.${type}`);
  }
}
