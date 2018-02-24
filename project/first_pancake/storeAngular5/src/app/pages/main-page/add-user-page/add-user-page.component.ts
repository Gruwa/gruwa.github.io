import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/services';
import {ToastsManager} from 'ng2-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {UserInterface} from '../../../shared/interfaces/user.interface';
import {IAddress} from '../../../shared/interfaces/adress.interface';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddUserPageComponent implements OnInit {

  public emailGroup: FormGroup;
  public userGroup: FormGroup;
  public email: string;
  public userGroupVisible: boolean = false;
  public onGetFields: boolean = true;
  public user: any = {};
  public userNew: UserInterface;

  @Input() userActive;
  @Input() tab;
  @Output('onModalClose') visible: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private storage: LocalStorageService,
    public toast: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    this.initEmailForm();
    this.initForm();
  }

  /**
   * Method for cancel add user
   */

  onCancel(): void {
    this.emailGroup.reset();
    this.userGroup.reset();
    this.visible.emit(false);
  }

  /**
   * Method for init form EmailForm
   */

  initEmailForm(): void {
    this.emailGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Method for check email
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
