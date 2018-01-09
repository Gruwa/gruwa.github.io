import {Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MainHeaderService} from '../../../header/main-header/main-header.service';

/*
* Component manually moves its content into main header via <ng-template [ngTemplateOutlet]="...> technique
* Reason - to correctly handle header animated "sticky" behaviour
* */
@Component({
  selector: 'cad-sticky-subheader',
  template: require('./sticky-subheader.html')
})
export class StickySubheaderComponent implements OnInit, OnDestroy {
  @Output() sticked = new EventEmitter<boolean>();
  @ViewChild(TemplateRef) private stickyHeaderTemplate: TemplateRef<any>;

  private alive = true;

  constructor(
    private headerService: MainHeaderService
  ) {}

  ngOnInit() {
    this.headerService.headerInstance.setStickyHeader(this.stickyHeaderTemplate);
    this.headerService.headerInstance.sticked$
      .takeWhile(() => this.alive)
      .subscribe(value => this.onStickedChange(value));
  }

  ngOnDestroy() {
    this.alive = false;
    this.headerService.headerInstance.removeStickyHeader(this.stickyHeaderTemplate);
  }

  onStickedChange(value: boolean) {
    this.sticked.emit(value);
  }
}
