import 'rxjs/add/operator/debounceTime';
import {Observable} from 'rxjs';
import {Directive, EventEmitter, Output, OnInit, ElementRef, OnDestroy, Inject, Input} from '@angular/core';
import {WindowService} from '../../services/window/window.service';

const THROTTLE_TIMEOUT = 25; // trigger onNextPage() only after this time interval
const BORDER_DISTANCE = 100; // trigger onNextPage() when scroll position is less than this value to the very bottom

interface IInfiniteScrollOptions {
  attachToWindow?: boolean; // if to watch scroll event at host element (default) or for window in general
  timeout?: number; // custom idle timeout for debounce time
  distance?: number; // min distance to bottom border when to trigger onNextPage() event
  fetchUntilScroll?: boolean; // tries to trigger onNextPage() event until there's a scroll on the page
}

@Directive({
  selector: '[cadInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  @Input('cadInfiniteScroll') options: IInfiniteScrollOptions;
  @Input('cadInfiniteScrollDisabled') scrollDisabled: boolean;
  @Output() onNextPage = new EventEmitter<void>();

  private scrollTimeout: number;
  private minBorderDistance: number;
  private scrollElement: HTMLElement;
  private alive = true;

  constructor(
    private hostElement: ElementRef,
    @Inject(WindowService) private $window: Window
  ) {}

  ngOnInit() {
    let eventSource: HTMLElement | Window;

    if (this.options.attachToWindow) {
      eventSource = this.$window;
      this.scrollElement = this.$window.document.body;
    } else {
      eventSource = this.hostElement.nativeElement;
      this.scrollElement = this.hostElement.nativeElement;
    }

    this.scrollTimeout = this.options.timeout || THROTTLE_TIMEOUT;
    this.minBorderDistance = this.options.distance || BORDER_DISTANCE;

    this.setSubscriptions(eventSource);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private setSubscriptions(eventSource: HTMLElement | Window) {
    if (this.options.fetchUntilScroll && !_.isNil(this.scrollDisabled)) {
      Observable.interval(200) // how frequently we'll try to load next bunch of data
        .filter(() => !this.scrollDisabled) // skip if load is in progress
        .filter(() => !this.hasScrollBar()) // skip if there's a scroll on the page
        .takeWhile(() => this.alive)
        .subscribe(() => this.onNextPage.emit());
    }

    Observable.fromEvent(eventSource, 'scroll')
      .filter(() => !this.scrollDisabled)
      .debounceTime(this.scrollTimeout)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        if (this.isBottomReached(this.minBorderDistance)) {
          this.onNextPage.emit();
        }
      });

    // block scrolling when we are already at the bottom (especially useful for mac's inertial scroll)
    Observable.fromEvent(eventSource, 'wheel')
      .filter((event: WheelEvent) => {
        const isScrollingDown = event.deltaY > 0;
        if (isScrollingDown) {
          return this.isBottomReached();
        } else {
          return false; // don't check positions if scrolling upwards
        }
      })
      .takeWhile(() => this.alive)
      .subscribe((event: Event) => {
        // prevent "onwheel" event to block actual scrolling
        event.preventDefault();
      });
  }

  private hasScrollBar(): boolean {
    return this.scrollElement.scrollHeight > this.scrollElement.offsetHeight;
  }

  private isBottomReached(minDistance = 0): boolean {
    let result: boolean;

    const scrollTopPos = this.options.attachToWindow
      ? this.$window.pageYOffset
      : this.scrollElement.scrollTop;

    const scrollBottomPos = this.scrollElement.offsetHeight + scrollTopPos;

    if (this.hasScrollBar()) {
      result = scrollBottomPos >= this.scrollElement.scrollHeight - minDistance;
    } else {
      result = false;
    }

    return result;
  }
}
