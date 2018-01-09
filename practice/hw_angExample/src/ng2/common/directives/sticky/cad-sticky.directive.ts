import {Directive, ElementRef, Input, OnInit, OnDestroy, Inject, Output, EventEmitter} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {WindowService} from '../../services/window/window.service';

const SCROLL_TIMEOUT = 25;

@Directive({
  selector: '[cadSticky]'
})
export class StickyDirective implements OnInit, OnDestroy {
  @Input('stickyFrom') stickyFrom: number = 0; // set sticked state when scroll position is higher than this value
  @Input('stickyClass') stickyClass: string = 'is-fixed';
  @Output() sticked = new EventEmitter<boolean>();

  private alive: boolean = true;

  constructor(
    private element: ElementRef,
    @Inject(WindowService) private $window: Window
  ) {}

  ngOnInit() {
    // sampleTime() used as we need last emitted event which is not possible with throttleTime()
    Observable.fromEvent<Event>(this.$window, 'scroll')
      .sampleTime(SCROLL_TIMEOUT)
      .map<Event, boolean>(() => this.$window.pageYOffset > this.stickyFrom)
      .distinctUntilChanged()
      .takeWhile(() => this.alive)
      .subscribe(isSticked => {
        if (isSticked) {
          this.element.nativeElement.classList.add(this.stickyClass);
        } else {
          this.element.nativeElement.classList.remove(this.stickyClass);
        }

        this.sticked.emit(isSticked);
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
