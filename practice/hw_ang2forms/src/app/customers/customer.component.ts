import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
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
            sendCatalog: [ true ]
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

    save() {
        // console.log(this.cusomerForm);
        // console.log('Saved: ' + JSON.stringify(this.cusomerForm.value));
    }
 }
