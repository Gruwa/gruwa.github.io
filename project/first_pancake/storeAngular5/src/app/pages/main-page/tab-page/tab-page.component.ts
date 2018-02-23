import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {UserService} from '../../../shared/services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';
import {MainService} from '../../../shared/services/index';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

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
  public users: any = [];
  public modalType: string = '';
  public showModal = false;
  public modalTitle = '';
  public addUser = '';
  public tabActive: string = '';
  public toggle: boolean = false;
  public titleBtn: string = '+ Add students';
  public idUser: string = 'Student ID';

  constructor(public userService: UserService,
              public translate: TranslateService,
              public toast: ToastsManager, vcr: ViewContainerRef,
              private storage: LocalStorageService,
              public mainService: MainService) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    this.mainService.loader$.next(true);
    this.onGetUsers();
  }

  /**
   * Method for get users
   */

  onGetUsers(): void {
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
    this.toggle = false;
    this.mainService.loader$.next(false);
  }

  /**
   * Method for visible modal
   */

  onVisibleChange(modalStatus: boolean): void {
    this.visibleModal = modalStatus;

    if (!this.visibleModal) {
      this.onGetUsers();
    }
  }

  /**
   * Method for visible modal
   */

  onShowModal(onShow: boolean): void {
    this.addUser = 'Add';
    this.visibleModal = onShow;
    this.userActive = {};
  }

  /**
   * Method for visible modal
   */

  onShowModalEditUser(onShow: boolean, user: any): void {
    this.addUser = 'Edit';
    this.visibleModal = onShow;
    this.userActive = user;
  }

  /**
   * Method for change status of Student, Instructor, Admin
   */

  toggleStudentStatus($event, userActive): void {
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
   */

  removeRecordShowModal($event, modalType: string, user): void {
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

  closeModal(e?): void {
    this.showModal = false;
    this.modalType = '';
    this.modalTitle = '';
  }

  /**
   * Method for delete user
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
   */

  changeTab(tab: string): void {
    this.tabActive = this.tab;
    this.tab = tab;
    this.titleBtn = '+ Add ' + this.tab;
    this.idUser = this.tab + ' ID';
    this.onGetUsers();
  }

  /**
   * Method for shaping file
   */

  transformData(data): any[] {
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
   */

  downloadFile(type: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.transformData(this.users));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `completions.xlsx`);
  }
}
