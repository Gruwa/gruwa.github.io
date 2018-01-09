import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TrackUnsavedPopupComponent} from '../../widgets/unsaved-popup/unsaved-popup.component';

@Injectable()
export class TrackChangesService {
  private confirmModal: NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) {}

  equal(original: any, current: any, ignoreEmptyProperties): boolean {
    return _.isEqualWith(current, original, (val1, val2, key): boolean => {
      // skip angular's internal props
      if (_.isString(key) && key.charAt(0) === '$') {
        return true;
      }

      // consider "null", "undefined" and empty strings as equivalent values
      if (ignoreEmptyProperties && (_.isNil(val1) || val1 === '') && (_.isNil(val2) || val2 === '')) {
        return true;
      }

      // use default lodash comparator for other kind of values
      return undefined;
    });
  }

  showPopup(): Promise<void> {
    if (this.confirmModal && (<any> this.confirmModal)._contentRef) {
      return Promise.reject(null);
    }
    this.confirmModal = this.modalService.open(TrackUnsavedPopupComponent);
    return this.confirmModal.result;
  }
}
