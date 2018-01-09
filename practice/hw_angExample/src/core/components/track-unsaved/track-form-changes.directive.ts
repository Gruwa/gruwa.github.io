import {TrackFormChangesController} from './track-form-changes.controller';

export function trackFormChangesDirective(): ng.IDirective {
  return {
    restrict: 'A',
    require: { form: 'form' },
    scope: {},
    bindToController: {
      modelsToTrack: '<cadTrackFormChanges',
      externalOptions: '<trackOptions'
    },
    controller: TrackFormChangesController,
    controllerAs: 'vm'
  };
}
