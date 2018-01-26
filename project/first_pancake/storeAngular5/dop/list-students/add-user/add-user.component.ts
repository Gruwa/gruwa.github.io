import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FormGroupWrapper} from 'app/components/app-forms/form-group/form-group-wrapper';
import {UserService} from 'app/services';
import {StorageService} from 'app/services/storage-service';
import {MultiField} from 'app/pages/students/group/groupMultiFields.enum';
import { ToastService } from 'app/components/shared/toast-module/toast.service';
import {LocationService} from 'app/services/location-service/location.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddUserComponent implements OnInit {

    public userGroup: FormGroupWrapper;
    public emailGroup: FormGroupWrapper;
    public roles: any[] = [];
    public user: any = {};

    public groupsResults: any[] = [];
    public groups = {sort: '', asc: true};
    public groupsSort = {'Group Name': 'name', 'Group id': 'id', 'Created': 'created_date'};
    public groupsFields = [
        {label: 'Group Name', name: 'name'},
        {label: 'Group id', name: 'id'},
        {label: 'Created', name: 'created_date'}
        ];
    public sessionsResults: any[] = [];
    public sessions = {sort: '', asc: true};
    public sessionsSort = {'Course Name': 'session_name', 'Course ID': 'id', 'Status': 'status'};
    public sessionsFields = [
        {label: 'Course Name', name: 'name'},
        {label: 'Status', name: 'status'}
        ];
    public smartSearch: MultiField;
    public multiField: any = MultiField;
    public results: any = [];
    public avatar: any;
    public userGroupVisible: boolean = false;
    public email: any;
    public groupsVisible: boolean = false;
    public onGetFields: boolean = true;
    public sessionsSearch: any = {
        session_name: '',
        students: '',
        lecturers: '',
        portals: '',
        classroom: '',
        elearning: '',
        location: '',
        start_date: ''
    };
    public groupSearch: string = '';
    public locations: any[] = [];
    @Input() userActive;
    @Input() tab;
    @Output('onModalClose') visible: EventEmitter<any> = new EventEmitter<any>();


    constructor(private fb: FormBuilder,
                public userService: UserService,
                public storage: StorageService,
                public toast: ToastService,
                private locationService: LocationService) {
    }

    ngOnInit() {
        this.initLocation();
        this.initEmailForm();
        this.initForm();
    }

    initForm(): void {
        if (this.userActive.user) {
            this.userGroupVisible = true;
            this.groupsVisible = true;
            this.userGroup = <FormGroupWrapper>(this.fb.group({
                name: [this.userActive.user.first_name, [Validators.required]],
                last_name: [this.userActive.user.last_name, [Validators.required]],
                email: [this.userActive.user.email, [Validators.required, Validators.email]],
                title: [this.userActive.user.title, []],
                company: [this.userActive.user.company_name, []],
                about_me: [this.userActive.user.about, []],
                city: [this.userActive.user.address ? this.userActive.user.address.city : '', []],
                country: [this.userActive.user.address ? this.userActive.user.address.country : '', []],
                // timeZone: ['', [Validators.required]],
            }));

            if (this.onGetFields) {
                this.onGetSessionsFields();
                this.onGetGroupsFields();
                this.onGetFields = true;
            }
        } else {
            this.userGroup = <FormGroupWrapper>(this.fb.group({
                name: ['', [Validators.required]],
                last_name: ['', [Validators.required]],
                email: [this.email, [Validators.required, Validators.email]],
                title: ['', []],
                company: ['', []],
                about_me: ['', []],
                city: ['', []],
                country: ['', []],
                // timeZone: ['', [Validators.required]],
            }));
        }
    }

    onSubmit() {
        const user: any = {};
        const address: any = {};
        address.city = this.userGroup.get('city').value;
        address.country = this.userGroup.get('country').value || 'Ukraine';
        user.first_name = this.userGroup.get('name').value;
        user.last_name = this.userGroup.get('last_name').value;
        user.email = this.userGroup.get('email').value;
        user.address = address;
        user.title = this.userGroup.get('title').value;
        user.company_name = this.userGroup.get('company').value;
        user.about = this.userGroup.get('about_me').value;
        user.avatar = this.avatar;
        this.user.user = user;
        this.user.vendor = this.storage.getItem('vendor_id');
        this.groupsVisible = true;
        this.onSave(this.user);
    }

    initEmailForm() {
        this.emailGroup = <FormGroupWrapper>(this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        }));
    }

    onSubmitEmailCheck() {
        this.email = this.emailGroup.get('email').value;
        this.userService.getCheckEmail(this.email).subscribe(
            (value) => {
                this.toast.show('success', 'Email found');
                this.userGroupVisible = true;
                this.userActive.user = value;
                this.onGetFields = false;
                this.initForm();
                this.groupsVisible = false;
            },
            (error) => {
                if (error.status === 404) {
                    this.toast.show('error', 'Email not found');
                    this.userGroupVisible = true;
                    this.initForm();

                }
            }
        );
    }

    initLocation() {
        const locs = this.locationService.locations$.value;
        if (Object.keys(locs).length < 1) {
            this.locationService.getLocations();
        } else {
            this.formatterLocation(locs);
        }
        this.locationService.locations$.subscribe(locations => {
            this.formatterLocation(locations);
        });
    }

    formatterLocation(locations: any) {
        this.locations = [];
        if (locations && Object.keys(locations).length > 0) {
            for (const key of Object.keys(locations)) {
                const loc = locations[key];
                loc.value = key;
                this.locations.push(loc);
            }
        }
    }

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

    onCancel() {
        this.userGroup.reset();
        this.visible.emit(false);
    }

    onSave(value: any) {
        this.userService.onAddNewUser(value, this.tab).subscribe(
            (response) => {
                this.onCancel();
                this.toast.show('success', 'Save success' );
            },
            (error) => {
                this.toast.show('error', 'Save error' );
            }
        );
    }

    filterChanged(event) {
        if (this.smartSearch === MultiField.Sessions) {
            const filters = {...this.sessionsSearch};
            const search = {};
            search['type'] = filters.classroom ? 'classroom' : filters.elearning ? 'elearning' : '';
            if (filters.classroom && filters.elearning) {
                delete search['type'];
            }
            delete filters.elearning;
            delete filters.classroom;

            Object.keys(filters).forEach(filter => {
                if (filters[filter]) {
                    if (this.smartSearch === MultiField.Sessions) {
                        search[filter] = filters[filter];
                    } else {
                        search['search'] = filters[filter];
                    }
                }
            });
            if (search['start_date'])
                search['start_date'] = search['start_date'].toISOString().slice(0, 10);
            this.onOpenSmartSearch(this.smartSearch, search);
        } else if (this.smartSearch === MultiField.Groups) {
            const search = {
                search: this.groupSearch
            };

            this.onOpenSmartSearchGroups(this.smartSearch, search);
        }
    }

    onOpenSmartSearch(smartSearch: MultiField, params?: any) {
        this.smartSearch = smartSearch;
        this.userService.getSessionsResults(params).subscribe((value) => {
            this.results = value.results;
        });
    }

    onOpenSmartSearchGroups(smartSearch: MultiField, params?: any) {
        this.smartSearch = smartSearch;
        this.userService.getGroupsResults(params).subscribe((value) => {
            this.results = value.results;
        });
    }

    onSelect(entity: any, field: MultiField) {
        if (field === MultiField.Sessions) {
            let body: any = {};

            if (this.tab === 'students') {
                body = {
                    'vendor_student': this.userActive.id,
                    session: entity.id
                };
            } else if (this.tab === 'instructors') {
                body = {
                    'lecturers': [this.userActive.id]
                };
            }

            this.userService.addSessionField(body, this.tab, entity).subscribe(
                (value) => {
                    this.smartSearch = null;
                    this.onGetSessionsFields();
                    this.toast.show('success', 'Session assign success' );
                },
                (error) => {
                    let errorMessage = 'Session is already in list';
                    error = error.json();
                    if (error['session'] && error['session'].length > 0) {
                        errorMessage = error['session'][0];
                    }
                    this.toast.show('error', errorMessage);
                }
            );

        } else if (field === MultiField.Groups) {
            if (this.tab === 'students') {
                const value = entity.students;

                value[value.length] = this.userActive.id;

                const body = {
                    'students': value
                };

                this.userService.addGroupField(entity, body).subscribe(
                    (value) => {
                        this.smartSearch = null;
                        this.onGetGroupsFields();
                        this.toast.show('success', 'Group assign success' );
                    },
                    (error) => {
                        this.toast.show('error', 'Group is already in list' );
                    }
                );
            } else if (this.tab === 'instructors') {
                const value = entity.lecturers;

                value[value.length] = this.userActive.id;

                const body = {
                    'lecturers': value
                };

                this.userService.addGroupField(entity, body).subscribe(
                    (value) => {
                        this.smartSearch = null;
                        this.onGetGroupsFields();
                        this.toast.show('success', 'Group assign success' );
                    },
                    (error) => {
                        this.toast.show('error', 'Group is already in list' );
                    }
                );
            }
        }
    }

    onGetSessionsFields(sort?: any) {
        if (this.tab !== 'admins') {
            this.userService.getSessionsFields(this.tab, this.userActive, sort)
                .subscribe(
                    (value) => {
                            this.sessionsResults = value.results;
                        }
                    );
        }
    }

    onGetGroupsFields(sort?: any) {
        if (this.tab !== 'admins') {
            this.userService.getGroupsFields(this.tab, this.userActive, sort)
                .subscribe(
                    (value) => {
                        this.groupsResults = value.results;
                    }
                );
        }
    }

    onDeleteSession(e: any) {
        this.userService.onDeleteSession(this.tab, e, this.userActive).subscribe(
            () => {

                this.onGetSessionsFields();
                this.toast.show('success', 'Session delete success' );
            },
            (error) => {
                this.toast.show('error', 'Can not delete session' );
            }
        );
    }

    onDeleteGroup(e: any) {
        this.userService.getGroupsResults().subscribe((value) => {
            const results = value.results;
            let obj: any;

            for ( const i in results) {

                if (results[i].id === e.id) {
                    obj = results[i];
                }
            }

            if (this.tab === 'students') {
                obj.students.splice(obj.students.indexOf(this.userActive.id), 1);

                const body = {
                    'students': obj.students
                };

                this.userService.addGroupField(obj, body).subscribe(
                    () => {
                        this.smartSearch = null;
                        this.onGetGroupsFields();
                        this.toast.show('success', 'Group delete success' );
                    },
                    (error) => {
                        this.toast.show('error', 'Can not delete group' );
                    }
                );

            }else if (this.tab === 'instructors') {
                obj.lecturers.splice(obj.lecturers.indexOf(this.userActive.id), 1);

                const body = {
                    'lecturers': obj.lecturers
                };

                this.userService.addGroupField(obj, body).subscribe(
                    () => {
                        this.smartSearch = null;
                        this.onGetGroupsFields();
                        this.toast.show('success', 'Group delete success' );
                    },
                    (error) => {
                        this.toast.show('error', 'Can not delete group' );
                    }
                );
            }
        });
    }
}
