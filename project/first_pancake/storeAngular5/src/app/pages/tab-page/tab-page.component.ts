import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
import {UserService} from '../../shared/services/user.service';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {LocalStorageService} from 'ngx-webstorage';
import {MainService} from '../../shared/services';

@Component({
  selector: 'app-tab-page',
  templateUrl: './tab-page.component.html',
  styleUrls: ['./tab-page.component.scss'],
  providers: [UserService]
})
export class TabPageComponent implements OnInit {
  rea;
  visibleModal: boolean = false;
  visibleModalEditUser: boolean = false;
  closableModal: boolean = true;
  public filter: string = '';
  public users: any = [];
  public userActive: any = {};
  public modalType: string = '';
  public showModal = false;
  public showModalBulk = false;
  public modalTitle = '';
  public addUser = '';
  public ascType: boolean = true;
  public sort: string = '';
  public tab: string = 'students';
  public tab_active: string = '';
  public toggle: boolean = false;
  public title_btn: string = '+ Add students';
  public search_user: string = 'Search students';
  public id_user: string = 'Student ID';
  public listErrors: boolean = false;

  constructor(public userService: UserService,
              public translate: TranslateService,
              public toast: ToastsManager, vcr: ViewContainerRef,
              private storage: LocalStorageService,
              public mainService: MainService) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.onGetUsers();

  }

  onGetUsers(sortField?: string) {
    this.mainService.loader$.next(true);
    this.users = [];

    if (!this.toggle) {
      if (this.sort === sortField) {
        this.ascType = !this.ascType;
      }
      if (this.sort !== sortField && this.sort !== '') {
        this.sort = sortField;
        this.ascType = true;
      }
      if (this.sort === '') {
        this.ascType = true;
        this.sort = 'name';
      }
    }
    this.userService.getUsers(this.filter, (sortField ? sortField : 'name'), this.ascType, this.tab)
      .subscribe(
        (value: any) => {
          this.users = value;
        },
        (err: any) => {
          if (this.storage.retrieve(this.tab)) {
            this.users = this.storage.retrieve(this.tab)['results'];
          } else {
            this.userService.getUsers(this.filter, (sortField ? sortField : 'name'),
              this.ascType, this.tab, '/../../../assets/localServer/' + this.tab + '.json').subscribe(
              (value: any) => {
                this.users = value;
              });
          }
        }
        // (error) => {
        //
        //   if ( error.status === 403 ) {
        //     this.toast.error('Access is denied');
        //     this.tab = this.tab_active;
        //     this.title_btn = '+ Add ' + this.tab;
        //     this.search_user = 'Search ' + this.tab;
        //     this.onGetUsers();
        //   }
        // }
      );

    this.toggle = false;
    this.mainService.loader$.next(false);
  }

  //
  // onVisibleChange(modalStatus: boolean) {
  //
  //   this.visibleModal = modalStatus;
  //
  //   if (!this.visibleModal) {
  //     this.sort = '';
  //     this.onGetUsers();
  //   }
  // }
  //
  // onShowModal(onShow: boolean) {
  //
  //   this.addUser = 'Add';
  //   this.visibleModal = onShow;
  //   this.userActive = {};
  // }
  //
  // onShowModalBulk(onShow: boolean) {
  //
  //   console.log('this.showModalBulk', this.showModalBulk);
  //   this.showModalBulk = onShow;
  //   console.log('onShow', onShow);
  //   console.log('this.showModalBulk', this.showModalBulk);
  // }
  //
  // onShowModalEditUser(onShow: boolean, user: any) {
  //
  //   this.addUser = 'Edit';
  //   this.visibleModal = onShow;
  //   this.userActive = user;
  // }
  //
  // toggleStudentStatus($event, user) {
  //
  //   const student: any = {};
  //   student.active = $event.target.checked;
  //   this.userService.onEditToggleStatusUser(student, user, this.tab)
  //     // .subscribe(() => {
  //     //   this.toggle = true;
  //     //   this.onGetUsers();
  //     // }
  //   // );
  //   $event.stopPropagation();
  // }
  //
  removeRecordShowModal($event, modalType: string, user) {

    this.modalType = modalType;
    this.userActive = user;

    if (modalType === 'delete') {
      this.modalTitle = 'Delete Confirmation';
    }

    this.showModal = true;
    $event.stopPropagation();
  }

  //
  // deleteGroup(needDelete: boolean) {
  //
  //   if (needDelete) {
  //     this.userService.onDeleteUser(this.userActive, this.tab)
  //     //   .subscribe(() => {
  //     //     this.onGetUsers();
  //     //   }
  //     // );
  //   }
  //
  //   this.closeModal();
  // }
  //
  // closeModal(e?) {
  //
  //   this.showModal = false;
  //   this.modalType = '';
  //   this.modalTitle = '';
  // }
  //
  // closeModalBulk($event) {
  //   this.showModalBulk = false;
  //   this.modalType = '';
  //   this.modalTitle = '';
  // }
  //
  // onPressEnter(e?) {
  //
  //   if (e && e.keyCode === 13) {
  //     this.onGetUsers();
  //   }
  // }
  //
  // getFileUploader($event) {
  //
  //   if ($event.name.match(/(.xls|.xlsx)$/)) {
  //
  //     const file = new FormData();
  //
  //     file.append('file', $event);
  //     this.userService.sentUploaderFile(file)
  //     //   .subscribe((value) => {
  //     //   console.log(value);
  //     // });
  //     this.showModalBulk = false;
  //     // this.toast.success('File was successfully uploaded', 'Success');
  //   } else {
  //
  //     // this.toast.error('File was not uploaded. Choose excel file', 'Error');
  //   }
  //
  // }
  //
  changeTab(tab: string) {

    this.tab_active = this.tab;
    this.tab = tab;
    this.title_btn = '+ Add ' + this.tab;
    this.search_user = 'Search ' + this.tab;
    this.id_user = this.tab + ' ID';
    this.sort = '';
    this.onGetUsers();
  }

}
