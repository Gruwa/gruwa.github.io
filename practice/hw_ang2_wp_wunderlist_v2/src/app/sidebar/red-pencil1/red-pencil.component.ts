import { Component, Inject } from '@angular/core'; //библеотека
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { RedPencilService } from './../../shared';
import { JQ_TOKEN } from './../../common';

@Component({ //декоратор, позволяет  идентифицировать класс как компонет
    selector: 'red-pencil',
    templateUrl: './red-pencil.component.html'
})

export class RedPencilComponent {
    
    redPencilForm: FormGroup;
    redPencil: boolean;
 
    name: string;
    listName: FormControl;
    click: any;


    constructor(private redPencilService: RedPencilService, @Inject(JQ_TOKEN) private $: any ) {

    }
    
    ngOnInit() {
        this.redPencil = this.redPencilService.redPencil;
        // console.log(this.redPencilService.name);
        // this.listNameFunc();

        
        
    }

    pencil() {
        return this.redPencilService.redPencil;     
    }

    ngOnChanges() {
        this.click = this.$('#clickRedPencil');
        console.log(this.click);
        let source = Observable.fromEvent(this.click, 'click');
        console.log(source);
        var subscription = source.subscribe(
            function (x) {
                this.qwe();
            },
            function (err) {
                console.log('Error: ' + err);   
            },
            function () {
                console.log('Completed');   
            });
    }

    qwe() {
        this.listName = new FormControl(this.redPencilService.name);
        
        console.log('FormGroup - ', this.listName);

        this.redPencilForm = new FormGroup({
            listName: this.listName
        })

        console.log('value - ', this.redPencilForm.value.listName);
    }

    saveForm(formValues: any) {
        this.redPencilService.updateListName(formValues.listName);
        this.cancelForm();
    }

    cancelForm() {
        this.redPencil = false; 
        this.redPencilService.redPencilFunc(this.redPencil);
        return this.redPencil;
    }
}