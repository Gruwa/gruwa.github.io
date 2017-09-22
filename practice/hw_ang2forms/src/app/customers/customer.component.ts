import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Customer } from './customer';

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
            firstName: '',
            secondName: { value: 'n/a', disabled: true },
            lastName: '',
            email: '',
            sendCatalog: true
        });
    }

    save() {
        console.log(this.cusomerForm);
        console.log('Saved: ' + JSON.stringify(this.cusomerForm.value));
    }
 }
