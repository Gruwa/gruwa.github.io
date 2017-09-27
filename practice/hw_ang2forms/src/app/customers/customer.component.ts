import {
    Component,
    OnInit
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { Customer } from './customer';

function emailMatcher(c: AbstractControl) {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');

    if (emailControl.pristine || confirmControl.pristine) { // .pristine - нетронутое поле
        return null;
    }
    if (emailControl.value === confirmControl.value) {
        return null;
    }

    return { 'match': true };
}

function ratingRange(min: number, max: number): ValidatorFn {

    return (c: AbstractControl): {[key: string]: boolean} | null => {

        if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        };

    return null;

    };
}


@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customerForm: FormGroup;
    customer: Customer= new Customer();
    emailMessage: string;

    get addresses(): FormArray{
        return <FormArray>this.customerForm.get('addresses');
    }

    private validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    };

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: [ '', [Validators.required, Validators.minLength(3)] ],
            secondName: [ { value: 'n/a', disabled: true }, Validators.required ],
            lastName: [ '', [Validators.required, Validators.maxLength(50)] ],
            emailGroup: this.fb.group({
                email: [ '', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')] ],
                confirmEmail: [ '', Validators.required ],
            }, {validator: emailMatcher}),
            phone: [ '' ],
            notification: 'email',
            rating: [ '', ratingRange(1, 7) ],
            sendCatalog: [ true ],
            addresses: this.fb.array([ this.buildAddress() ])
        });

        this.customerForm.get('notification')
                         .valueChanges
                         .subscribe(value => this.setNotification(value));

        const emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.debounceTime(2000).subscribe(value => this.setMessage(emailControl));

        console.log(this.addresses.controls);
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }

    addAddress(): void {
        this.addresses.push(this.buildAddress());
    }

    buildAddress(): FormGroup {
        return this.fb.group({
            addressType: 'home',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: ''
        });
    }

    setNotification(notif: string): void {
        const phoneControl = this.customerForm.get('phone');
        if (notif === 'text') {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors)
                                      .map(key => this.validationMessages[key])
                                      .join('');
        }
    }

    save() {
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
 }
