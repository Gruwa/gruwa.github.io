import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services';
import {ToastsManager} from 'ng2-toastr';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddUserPageComponent implements OnInit {

  public emailGroup: FormGroup;
  public userGroup: FormGroup;
  public email: any;
  public userGroupVisible: boolean = false;
  public onGetFields: boolean = true;
  public user: any = {};

  @Input() userActive;
  @Input() tab;
  @Output('onModalClose') visible: EventEmitter<any> = new EventEmitter<any>();

  // public roles: any[] = [];
  //
  // public groupsResults: any[] = [];
  // public groups = {sort: '', asc: true};
  // public groupsSort = {'Group Name': 'name', 'Group id': 'id', 'Created': 'created_date'};
  // public groupsFields = [
  //   {label: 'Group Name', name: 'name'},
  //   {label: 'Group id', name: 'id'},
  //   {label: 'Created', name: 'created_date'}
  // ];
  // public sessionsResults: any[] = [];
  // public sessions = {sort: '', asc: true};
  // public sessionsSort = {'Course Name': 'session_name', 'Course ID': 'id', 'Status': 'status'};
  // public sessionsFields = [
  //   {label: 'Course Name', name: 'name'},
  //   {label: 'Status', name: 'status'}
  // ];
  // // public smartSearch: MultiField;
  // // public multiField: any = MultiField;
  // public results: any = [];
  // public avatar: any;

  // public groupsVisible: boolean = false;
  // public sessionsSearch: any = {
  //   session_name: '',
  //   students: '',
  //   lecturers: '',
  //   portals: '',
  //   classroom: '',
  //   elearning: '',
  //   location: '',
  //   start_date: ''
  // };
  // public groupSearch: string = '';
  // public locations: any[] = [];

  constructor(private fb: FormBuilder,
              public userService: UserService,
              private storage: LocalStorageService,
              public toast: ToastsManager, vcr: ViewContainerRef,) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // this.initLocation();
    this.initEmailForm();
    this.initForm();
  }

  onCancel() {
    this.emailGroup.reset();
    this.userGroup.reset();
    this.visible.emit(false);
  }

  initEmailForm() {
    this.emailGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmitEmailCheck() {
    this.email = this.emailGroup.get('email').value;
    this.userService.getCheckEmail(this.email, this.tab).subscribe(
      (value) => {
        console.log(value)
        this.toast.error('Try another email', 'Email was found');
      },
      (error) => {
        this.toast.success('Email not found', 'Success');
        this.userGroupVisible = true;
        this.email = this.emailGroup.get('email').value;
        this.onGetFields = false;
        this.initForm();
      }
    );
  }

  initForm(): void {
    if (this.userActive._id) {
      this.userGroupVisible = true;
      console.log(this.userActive)
      // this.groupsVisible = true;
      this.userGroup = this.fb.group({
        first_name: [this.userActive.first_name, [Validators.required]],
        last_name: [this.userActive.last_name, [Validators.required]],
        email: [this.userActive.email, [Validators.required, Validators.email]],
        title: [this.userActive.title, []],
        company: [this.userActive.company_name, []],
        about_me: [this.userActive.about_me, []],
        city: [this.userActive.address ? this.userActive.address.city : '', []],
        country: [this.userActive.address ? this.userActive.address.country : '', []]
      });

      // if (this.onGetFields) {
      //     this.onGetSessionsFields();
      //     this.onGetGroupsFields();
      //     this.onGetFields = true;
      // }
    } else {
      this.userGroup = this.fb.group({
        first_name: ['', [Validators.required]],
        last_name: ['', [Validators.required]],
        email: [this.email, [Validators.required, Validators.email]],
        title: ['', []],
        company: ['', []],
        about_me: ['', []],
        city: ['', []],
        country: ['', []]
      });
    }
  }

  onSubmit() {
    const user: any = {};
    const address: any = {};

    address.city = this.userGroup.get('city').value;
    address.country = this.userGroup.get('country').value || 'Ukraine';
    user.first_name = this.userGroup.get('first_name').value;
    user.last_name = this.userGroup.get('last_name').value;
    user.email = this.userGroup.get('email').value;
    user.address = address;
    user.title = this.userGroup.get('title').value;
    user.company_name = this.userGroup.get('company').value;
    user.about_me = this.userGroup.get('about_me').value;

    this.user.user = user;
    // this.groupsVisible = true;
    this.onSave(this.user);
  }

  onSave(value: any) {
    if (this.userActive._id) {
      this.userService.onEditUser(value, this.tab).subscribe(
        (response) => {
          this.onCancel();
          this.toast.success('Save success', 'Success');
        },
        (error) => {
          this.toast.success('Save error', 'Error');
        }
      );
    } else {
      this.userService.onAddNewUser(value, this.tab).subscribe(
        (response) => {
          this.onCancel();
          this.toast.success('Save success', 'Success');
        },
        (error) => {
          this.toast.success('Save error', 'Error');
        }
      );
    }
  }




  //
  // initLocation() {
  //     const locs = this.locationService.locations$.value;
  //     if (Object.keys(locs).length < 1) {
  //         this.locationService.getLocations();
  //     } else {
  //         this.formatterLocation(locs);
  //     }
  //     this.locationService.locations$.subscribe(locations => {
  //         this.formatterLocation(locations);
  //     });
  // }
  //
  // formatterLocation(locations: any) {
  //     this.locations = [];
  //     if (locations && Object.keys(locations).length > 0) {
  //         for (const key of Object.keys(locations)) {
  //             const loc = locations[key];
  //             loc.value = key;
  //             this.locations.push(loc);
  //         }
  //     }
  // }

  // updateListSessions(params?: {sort, asc}) {
  //     if (!params) { params = this.sessions; }
  //     this.userService.getFields(true, params.sort, params.asc)
  //         .subscribe(results => {
  //             this.sessionsResults = results;
  //             this.sessions = params;
  //         });
  // }
  //
  // updateListGroups(params?: {sort, asc}) {
  //     if (!params) { params = this.groups; }
  //     this.userService.getFields(false, params.sort, params.asc)
  //         .subscribe(results => {
  //             this.groupsResults = results;
  //             this.groups = params;
  //         });
  // }


  // filterChanged(event) {
  //     if (this.smartSearch === MultiField.Sessions) {
  //         const filters = {...this.sessionsSearch};
  //         const search = {};
  //         search['type'] = filters.classroom ? 'classroom' : filters.elearning ? 'elearning' : '';
  //         if (filters.classroom && filters.elearning) {
  //             delete search['type'];
  //         }
  //         delete filters.elearning;
  //         delete filters.classroom;
  //
  //         Object.keys(filters).forEach(filter => {
  //             if (filters[filter]) {
  //                 if (this.smartSearch === MultiField.Sessions) {
  //                     search[filter] = filters[filter];
  //                 } else {
  //                     search['search'] = filters[filter];
  //                 }
  //             }
  //         });
  //         if (search['start_date'])
  //             search['start_date'] = search['start_date'].toISOString().slice(0, 10);
  //         this.onOpenSmartSearch(this.smartSearch, search);
  //     } else if (this.smartSearch === MultiField.Groups) {
  //         const search = {
  //             search: this.groupSearch
  //         };
  //
  //         this.onOpenSmartSearchGroups(this.smartSearch, search);
  //     }
  // }

  // onOpenSmartSearch(smartSearch: MultiField, params?: any) {
  //     this.smartSearch = smartSearch;
  //     this.userService.getSessionsResults(params).subscribe((value) => {
  //         this.results = value.results;
  //     });
  // }
  //
  // onOpenSmartSearchGroups(smartSearch: MultiField, params?: any) {
  //     this.smartSearch = smartSearch;
  //     this.userService.getGroupsResults(params).subscribe((value) => {
  //         this.results = value.results;
  //     });
  // }

  // onSelect(entity: any, field: MultiField) {
  //     if (field === MultiField.Sessions) {
  //         let body: any = {};
  //
  //         if (this.tab === 'students') {
  //             body = {
  //                 'vendor_student': this.userActive.id,
  //                 session: entity.id
  //             };
  //         } else if (this.tab === 'instructors') {
  //             body = {
  //                 'lecturers': [this.userActive.id]
  //             };
  //         }
  //
  //         this.userService.addSessionField(body, this.tab, entity).subscribe(
  //             (value) => {
  //                 this.smartSearch = null;
  //                 this.onGetSessionsFields();
  //                 this.toast.show('success', 'Session assign success' );
  //             },
  //             (error) => {
  //                 let errorMessage = 'Session is already in list';
  //                 error = error.json();
  //                 if (error['session'] && error['session'].length > 0) {
  //                     errorMessage = error['session'][0];
  //                 }
  //                 this.toast.show('error', errorMessage);
  //             }
  //         );
  //
  //     } else if (field === MultiField.Groups) {
  //         if (this.tab === 'students') {
  //             const value = entity.students;
  //
  //             value[value.length] = this.userActive.id;
  //
  //             const body = {
  //                 'students': value
  //             };
  //
  //             this.userService.addGroupField(entity, body).subscribe(
  //                 (value) => {
  //                     this.smartSearch = null;
  //                     this.onGetGroupsFields();
  //                     this.toast.show('success', 'Group assign success' );
  //                 },
  //                 (error) => {
  //                     this.toast.show('error', 'Group is already in list' );
  //                 }
  //             );
  //         } else if (this.tab === 'instructors') {
  //             const value = entity.lecturers;
  //
  //             value[value.length] = this.userActive.id;
  //
  //             const body = {
  //                 'lecturers': value
  //             };
  //
  //             this.userService.addGroupField(entity, body).subscribe(
  //                 (value) => {
  //                     this.smartSearch = null;
  //                     this.onGetGroupsFields();
  //                     this.toast.show('success', 'Group assign success' );
  //                 },
  //                 (error) => {
  //                     this.toast.show('error', 'Group is already in list' );
  //                 }
  //             );
  //         }
  //     }
  // }


  // ---------
  //

  // onGetSessionsFields(sort?: any) {
  //     if (this.tab !== 'admins') {
  //         this.userService.getSessionsFields(this.tab, this.userActive, sort)
  //             .subscribe(
  //                 (value) => {
  //                         this.sessionsResults = value.results;
  //                     }
  //                 );
  //     }
  // }
  //
  // onGetGroupsFields(sort?: any) {
  //     if (this.tab !== 'admins') {
  //         this.userService.getGroupsFields(this.tab, this.userActive, sort)
  //             .subscribe(
  //                 (value) => {
  //                     this.groupsResults = value.results;
  //                 }
  //             );
  //     }
  // }
  //
  // onDeleteSession(e: any) {
  //     this.userService.onDeleteSession(this.tab, e, this.userActive).subscribe(
  //         () => {
  //
  //             this.onGetSessionsFields();
  //             this.toast.show('success', 'Session delete success' );
  //         },
  //         (error) => {
  //             this.toast.show('error', 'Can not delete session' );
  //         }
  //     );
  // }
  //
  // onDeleteGroup(e: any) {
  //     this.userService.getGroupsResults().subscribe((value) => {
  //         const results = value.results;
  //         let obj: any;
  //
  //         for ( const i in results) {
  //
  //             if (results[i].id === e.id) {
  //                 obj = results[i];
  //             }
  //         }
  //
  //         if (this.tab === 'students') {
  //             obj.students.splice(obj.students.indexOf(this.userActive.id), 1);
  //
  //             const body = {
  //                 'students': obj.students
  //             };
  //
  //             this.userService.addGroupField(obj, body).subscribe(
  //                 () => {
  //                     this.smartSearch = null;
  //                     this.onGetGroupsFields();
  //                     this.toast.show('success', 'Group delete success' );
  //                 },
  //                 (error) => {
  //                     this.toast.show('error', 'Can not delete group' );
  //                 }
  //             );
  //
  //         }else if (this.tab === 'instructors') {
  //             obj.lecturers.splice(obj.lecturers.indexOf(this.userActive.id), 1);
  //
  //             const body = {
  //                 'lecturers': obj.lecturers
  //             };
  //
  //             this.userService.addGroupField(obj, body).subscribe(
  //                 () => {
  //                     this.smartSearch = null;
  //                     this.onGetGroupsFields();
  //                     this.toast.show('success', 'Group delete success' );
  //                 },
  //                 (error) => {
  //                     this.toast.show('error', 'Can not delete group' );
  //                 }
  //             );
  //         }
  //     });
  // }
}
