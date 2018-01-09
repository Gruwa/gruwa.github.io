import {Component} from '@angular/core';

@Component({
  selector: 'cad-examples-pagination',
  template: require('./examples-pagination.html')
})
export class ExamplesPaginationComponent {
  totalPages = 8;

  pageChanged(pageNumber: number) {
    console.log('page changed:', pageNumber); // tslint:disable-line
  }
}
