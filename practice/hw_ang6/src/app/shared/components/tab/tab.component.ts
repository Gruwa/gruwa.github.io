import {Component, ContentChild, EventEmitter, OnInit, Output, TemplateRef, ElementRef, ViewChild} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Output() tabChange: EventEmitter<any> = new EventEmitter();

  // @Output() tabIndex: EventEmitter<any> = new EventEmitter();

  // @ContentChild(TemplateRef) tabActive: TemplateRef<any>;

  // @ContentChild('contentL') header: ElementRef;

  @ViewChild('as') as: ElementRef;


  constructor(public dataService: DataService) {
  }

  ngOnInit() {

    console.log(this.as);
  }

  /**
   * Method for get changes on tab selectedTabChange
   * @returns {void}
   * @param {any} value
   * @memberof ShiftsComponent
   */

  selectedTabChange(value: any): void {
    // this.dataService.indexTABS.indexOf(tab);
    console.log('change tab');
    this.tabChange.emit(value);
  }


}
