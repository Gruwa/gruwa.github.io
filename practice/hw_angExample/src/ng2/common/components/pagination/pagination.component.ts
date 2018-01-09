import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'cad-pagination',
  template: require('./pagination.html'),
  styles: [require('./pagination.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input('disabled') globalDisabled: boolean = false;
  @Input() autohide: boolean = false;
  @Input() currentPage: number = 1;
  @Input() small: boolean = false;
  @Input() totalPages: number;
  @Output() onChange = new EventEmitter<number>();

  goToPrevPage() {
    if (this.isFirstPage()) { return; }

    this.currentPage--;
    this.onChange.emit(this.currentPage);
  }

  goToNextPage() {
    if (this.isLastPage()) { return; }

    this.currentPage++;
    this.onChange.emit(this.currentPage);
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  isVisible(): boolean {
    return this.autohide ? this.totalPages > 1 : true;
  }
}
