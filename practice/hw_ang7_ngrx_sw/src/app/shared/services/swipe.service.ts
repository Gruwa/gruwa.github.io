import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {

  constructor() {
    this.swipe();
  }

  private swipe() {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;
    let yDown = null;

    function handleTouchStart(evt) {
      xDown = evt.originalEvent.touches[0].clientX;
      yDown = evt.originalEvent.touches[0].clientY;
    }

    function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
        return;
      }

      const xUp = evt.originalEvent.touches[0].clientX;
      const yUp = evt.originalEvent.touches[0].clientY;

      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;

      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          /* left swipe */
        } else {
          /* right swipe */
        }
      } else {
        if ( yDiff > 0 ) {
          /* up swipe */
        } else {
          /* down swipe */
          location = window.location;
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  }
}
