import {Component, ContentChild, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Output() tabChange: EventEmitter<any> = new EventEmitter();

  // @ContentChild(TemplateRef) tabActive: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Method for get changes on tab selectedTabChange
   * @returns {void}
   * @param {any} value
   * @memberof ShiftsComponent
   */

  selectedTabChange(value: any): void {
    this.tabChange.emit(value);
  }

}
