import {AuthService} from '../../auth';
import {TrackChangesService} from '../../../ng2/common/directives/track-changes/track-changes.service';

export interface ITrackOptions {
  ignoreEmptyProperties?: boolean;
  showUnsavedPopup?: boolean;
  manualRun?: boolean;
  delay?: number;
}

const MAX_COMPARE_TIME = 100; // 0.1 second

export class TrackFormChangesController {
  form: cad.IFormController;
  externalOptions: ITrackOptions;
  modelsToTrack: any;

  private originalData: any = null;
  private unregWatcher: Function = angular.noop;
  private options: ITrackOptions;

  private defaultOptions: ITrackOptions = {
    ignoreEmptyProperties: true,
    showUnsavedPopup: true,
    manualRun: false,
    delay: 0
  };

  constructor(
    private trackChangesService: TrackChangesService,
    private $window: ng.IWindowService,
    private $state: ng.ui.IStateService,
    private $translate: ng.translate.ITranslateService,
    private authService: AuthService,
    private $timeout: ng.ITimeoutService,
    private $log: ng.ILogService,
    private $scope: ng.IScope
  ) {
    'ngInject';
  }

  $onInit() {
    let onPageClosed = this.onPageClosed.bind(this);
    this.$window.addEventListener('beforeunload', onPageClosed);
    this.$scope.$on('$destroy', () => this.$window.removeEventListener('beforeunload', onPageClosed));
    this.$scope.$on('$stateChangeStart', this.onStateChange.bind(this));

    this.form.restartChangesTracking = this.runTracking.bind(this);

    this.options = _.merge({}, this.defaultOptions, this.externalOptions);

    if (!this.options.manualRun) {
      this.initTracking();
    }
  }

  private initTracking() {
    this.$timeout(this.options.delay).then(this.runTracking.bind(this));
  }

  private runTracking() {
    this.form.isModified = false;
    this.originalData = _.cloneDeep(this.modelsToTrack);
    this.unregWatcher();
    this.unregWatcher = this.$scope.$watch(() => this.modelsToTrack, this.compare.bind(this), true);
  }

  private stopTracking() {
    this.unregWatcher();
    this.form.isModified = false;
  }

  private compare(newVal, oldVal) {
    if (newVal !== oldVal) {
      const start = this.$window.performance.now();
      this.form.isModified =
        !this.trackChangesService.equal(this.originalData, newVal, this.options.ignoreEmptyProperties);
      const delta = this.$window.performance.now() - start;
      if (delta > MAX_COMPARE_TIME) {
        this.$log.warn('Compare time exceeds limit ' + MAX_COMPARE_TIME + 'ms');
      }
    }
  }

  private onPageClosed(event: BeforeUnloadEvent) {
    if (this.options.showUnsavedPopup && this.form.isModified && this.authService.isAuthenticated()) {
      let message = this.$translate.instant('form.unsaved_changes.statement');
      event.returnValue = message;
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
    if (
      this.options.showUnsavedPopup &&
      this.form.isModified &&
      !nextParams.ignoreUnsavedForm && // to suppress "unsaved changes" popup when changing state
      this.authService.isAuthenticated()
    ) {
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
}
