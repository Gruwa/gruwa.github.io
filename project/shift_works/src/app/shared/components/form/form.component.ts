import {Component, Input, OnInit} from '@angular/core';
import {IForm} from '../../interfaces/types.interface';
import * as Types from '../../interfaces/types.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    /**
     * Variable availbleInput
     * @type {boolean}
     * @memberof FormComponent
     */

    public availbleInput: boolean;

    /**
     * Variable status
     * @type {string}
     * @memberof FormComponent
     */

    @Input() form: IForm;

    /**
     * Variable status
     * @type {string}
     * @memberof FormComponent
     */

    @Input() tab: Types.ITabTypes;

  constructor() { }

    /**
     * Method ngOnInit
     * @returns {void}
     * @memberof FormComponent
     */

  ngOnInit(): void {
        this.tab === 'my requests' ? this.availbleInput = false : this.availbleInput = true;
  }

}
