import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MainHeaderService} from '../../../header/main-header/main-header.service';
import {LoggerService} from '../../services';

/*
* Component manually moves its content into main header via <ng-template [ngTemplateOutlet]="...> technique
* Reason - to correctly handle header animated "sticky" behaviour
* */
@Component({
  selector: 'cad-sticky-header',
  template: require('./sticky-header.html'),
  styles: [require('./sticky-header.scss')]
})
export class StickyHeaderComponent implements OnInit, OnDestroy {
  @Input() startHeight: number; // initial (not sticked) header height
  @Input() endHeight: number; // height in sticked state
  @Output() sticked = new EventEmitter<boolean>();

  isSticked: boolean;

  private alive = true;
  @ViewChild(TemplateRef) private stickyHeaderTemplate: TemplateRef<any>;

  constructor(
    loggerService: LoggerService,
    private headerService: MainHeaderService
  ) {
    loggerService.warn('<cad-sticky-header> component is deprecared. Use <cad-sticky-subheader> instead.');
  }

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
    this.isSticked = value;
    this.sticked.emit(value);
  }
}
