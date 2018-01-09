import * as _ from 'lodash';
import 'rxjs/add/operator/debounceTime';
import {Directive, Input, OnChanges, OnInit, SimpleChange, Inject, OnDestroy, AfterViewInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {TrackChangesService} from './track-changes.service';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Directive({
  selector: '[cadTrackChanges]',
  exportAs: 'cadTrackChanges', // for local variable in template: #tracker="cadTrackChanges"
  host: {
    '(window:beforeunload)': 'onTabClose($event)'
  }
})
export class CadTrackChangesDirective implements AfterViewInit, OnChanges, OnDestroy {
  @Input('cadTrackChanges') private form: FormGroup;
  @Input() private trackChangesEnabled = true;
  @Input() private ignoreEmptyProperties = true;
  @Input() private showUnsavedPopup = true;
  @Input() private doNotIgnoreDisabledControls = false;

  private formChanges: Subscription;
  private original: any; // original value of form model to compare with
  private modified = false;
  private stateChangeListener: Function;

  constructor(
    private trackChangesService: TrackChangesService,
    @Inject('$state') private $state: ng.ui.IStateService,
    @Inject('authService') private authService: AuthService,
    @Inject('$translate') private $translate: ng.translate.ITranslateService,
    @Inject('$rootScope') private $rootScope: ng.IRootScopeService
  ) {}

  ngAfterViewInit() {
    if (!this.form) {
      throw new Error('cadTrackChanges needs valid FormGroup to work properly');
    }

    this.stateChangeListener = this.$rootScope.$on('$stateChangeStart', this.onStateChange.bind(this));

    // start tracking changes once directive created
    // special workaround for template driven forms - such forms are created with empty "this.form.value"
    // form control values are propagated via [ngModel]="..." bindings firing observable events one by one
    // as workaround start tracking when form value is stable for at least 50ms (actually even 0ms is enough)
    // proof: https://angular.io/guide/reactive-forms#async-vs-sync
    // "you must wait a tick before manipulating any of the controls from within the component class"
    if (this.trackChangesEnabled) {
      if (_.isEmpty(this.form.value)) {
        const tempSubscription = this.form.valueChanges.debounceTime(50).subscribe(() => {
          tempSubscription.unsubscribe();
          this.startTracking();
        });
      } else {
        // reactive form already has correct model at this moment as it creates with already preset values
        this.startTracking();
      }
    }
  }

  ngOnChanges(changes: {trackChangesEnabled: SimpleChange}) {
    if (changes.trackChangesEnabled && !changes.trackChangesEnabled.isFirstChange()) {
      this.trackChangesEnabled ? this.startTracking() : this.stopTracking();
    }
  }

  ngOnDestroy() {
    // unregister legacy listener
    if (_.isFunction(this.stateChangeListener)) this.stateChangeListener();
  }

  get isModified(): boolean {
    return this.modified;
  }

  restart() {
    this.stopTracking();
    this.startTracking();
  }

  private onTabClose($event: BeforeUnloadEvent) {
    const conditions = [
      this.modified,
      this.trackChangesEnabled,
      this.showUnsavedPopup,
      this.authService.isAuthenticated()
    ];

    if (_.every(conditions)) {
      const message = this.$translate.instant('form.unsaved_changes.statement');
      $event.returnValue = message;
      return message;
    }
  }

  private onStateChange(
    event: Event,
    nextState: ng.ui.IState,
    nextParams: any,
    fromState: any,
    fromParams: any,
    options: any
  ) {
    const conditions = [
      this.modified,
      this.trackChangesEnabled,
      this.showUnsavedPopup,
      !nextParams.ignoreUnsavedForm, // to suppress "unsaved changes" popup when changing state
      this.authService.isAuthenticated()
    ];

    if (_.every(conditions)) {
      event.preventDefault();
      this.trackChangesService.showPopup()
        .then(() => {
          this.stopTracking();
          this.$state.go(nextState, nextParams, { ...options, location: true });
        })
        .catch(() => {
          // do nothing
        });
    }
  }

  private startTracking() {
    // check if tracking already started
    if (this.formChanges) { return; }

    this.original = _.cloneDeep(this.form.value);
    this.formChanges = this.form.valueChanges.subscribe(data => {
      const newFormValues = this.doNotIgnoreDisabledControls ? this.form.getRawValue() : data;
      this.modified = !this.trackChangesService.equal(this.original, newFormValues, this.ignoreEmptyProperties);
    });
  }

  private stopTracking() {
    if (this.formChanges) {
      this.formChanges.unsubscribe();
      this.formChanges = null;
    }
    this.modified = false;
  }

}
