import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from './customer';

function ratingRange(c: AbstractControl): {[key: string]: boolean} | null {
    if (c.value !== undefined && (isNaN(c.value) || c.value < 1 || c.value >5)) {
        return { 'range': true};
    };

    return null;
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
            email: [ '', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+')] ],
            phone: [ '' ],
            notification: 'email',
            rating: '',
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
