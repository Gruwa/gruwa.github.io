import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services';
import {ToastsManager} from 'ng2-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {UserInterface} from '../../../shared/interfaces/user.interface';
import {IAddress} from '../../../shared/interfaces/adress.interface';
import * as Types from '../../../shared/interfaces/tab.interface';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddUserPageComponent implements OnInit {

  /**
   * Variable emailGroup
   * @type {FormGroup}
   * @memberof AddUserPageComponent
   */

  public emailGroup: FormGroup;

  /**
   * Variable userGroup
   * @type {FormGroup}
   * @memberof AddUserPageComponent
   */

  public userGroup: FormGroup;

  /**
   * Variable email
   * @type {string}
   * @memberof AddUserPageComponent
   */

  public email: string;

  /**
   * Variable userGroupVisible
   * @type {boolean}
   * @memberof AddUserPageComponent
   */

  public userGroupVisible: boolean = false;

  /**
   * Variable onGetFields
   * @type {boolean}
   * @memberof AddUserPageComponent
   */

  public onGetFields: boolean = true;

  /**
   * Variable user
   * @type {any}
   * @memberof AddUserPageComponent
   */

  public user: any = {};

  /**
   * Variable userNew
   * @type {UserInterface}
   * @memberof AddUserPageComponent
   */

  public userNew: UserInterface;

  /**
   * Variable userActive
   * @type {any}
   * @memberof AddUserPageComponent
   */

  @Input() userActive: any = {};

  /**
   * Variable tab
   * @type {tabTypes}
   * @memberof AddUserPageComponent
   */

  @Input() tab: Types.tabTypes;

  /**
   * Variable for emit visible
   * @type {EventEmitter<any>}
   * @memberof AddUserPageComponent
   */

  @Output('onModalClose') visible: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Creates an instance of LoginPageComponent.
   * @param {FormBuilder} fb
   * @param {UserService} userService
   * @param {LocalStorageService} storage
   * @param {ToastsManager} toast
   * @param {ViewContainerRef} vcr
   * @memberof LoginPageComponent
   */

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private storage: LocalStorageService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof AddUserPageComponent
   */

  ngOnInit(): void {
    this.initEmailForm();
    this.initForm();
  }

  /**
   * Method for cancel add user
   * @returns {void}
   * @memberof AddUserPageComponent
   */

  onCancel(): void {
    this.emailGroup.reset();
    this.userGroup.reset();
    this.visible.emit(false);
  }

  /**
   * Method for init form EmailForm
   * @returns {void}
   * @memberof AddUserPageComponent
   */

  initEmailForm(): void {
    this.emailGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Method for check email
   * @returns {void}
   * @memberof AddUserPageComponent
   */

  onSubmitEmailCheck(): void {
    this.email = this.emailGroup.get('email').value;
    this.userService.getCheckEmail(this.email, this.tab).subscribe(
      (value) => {
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

  /**
   * Method for init form userGroup
   * @returns {void}
   * @memberof AddUserPageComponent
   */

  initForm(): void {
    if (this.userActive._id) {
      this.userGroupVisible = true;
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

  /**
   * Method for submit new user
   * @returns {void}
   * @memberof AddUserPageComponent
   */

  onSubmit(): void {
    const address: IAddress = {
      city: this.userGroup.get('city').value,
      country: this.userGroup.get('country').value || 'Ukraine'
    };

    this.userNew.first_name = this.userGroup.get('first_name').value;
    this.userNew.last_name = this.userGroup.get('last_name').value;
    this.userNew.email = this.userGroup.get('email').value;
    this.userNew.address = address;
    this.userNew.title = this.userGroup.get('title').value;
    this.userNew.company_name = this.userGroup.get('company').value;
    this.userNew.about_me = this.userGroup.get('about_me').value;
    this.user.user = this.userNew;
    this.onSave(this.user);
  }

  /**
   * Method for save new user
   * @param {any} value
   * @returns {void}
   * @memberof AddUserPageComponent
   */

  onSave(value: any): void {
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
}
