import {Directive, HostListener, ElementRef, Renderer2, Input, Output, EventEmitter} from '@angular/core';
import {UploadService} from '../';

export interface IDragOverClass {
  accept: string;
  reject: string;
}

/**
 * Warning: DragEvent should not be used as a type since it causes an error in Safari browser
 * e.g.: drop(event: DragEvent) - using such signature will make application unavailable.
 */
@Directive({ selector: '[cadDropFile]' })
export class DropFileDirective {
  @Input() accept: string = '';
  @Input() disabled: boolean = false;
  @Input() dragOverClass: IDragOverClass;
  @Input() multiSelect: boolean = false;
  @Output() fileChanged = new EventEmitter<File|File[]>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private uploadService: UploadService
  ) {}

  @HostListener('drop', ['$event'])
  drop(event: any) {
    if (this.disabled) {
      return;
    }

    const files = event.dataTransfer.files;
    const filteredFiles = this.multiSelect
      ? _.filter(files, (file: File) => this.uploadService.isFileAccepted(this.accept, file))
      : _.filter([files[0]], (file: File) => this.uploadService.isFileAccepted(this.accept, file));

    if (filteredFiles.length) {
      this.multiSelect ? this.fileChanged.emit(filteredFiles) : this.fileChanged.emit(filteredFiles[0]);
    }
    this.removeStyle();
    this.preventDefault(event);
  }

  @HostListener('dragover', ['$event'])
  dragOver(event: any) {
    if (this.disabled) {
      return;
    }

    const items = event.dataTransfer.items;
    if (!_.isEmpty(items)) {
      let isAccepted = !this.multiSelect
        ? this.uploadService.isFileTypeAccepted(this.accept, items[0].type)
        : _.every(items, (file: File) => this.uploadService.isFileTypeAccepted(this.accept, file.type));

      this.addStyle(isAccepted);
    }
    this.preventDefault(event);
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(event: any) {
    if (this.disabled) {
      return;
    }

    this.removeStyle();
    this.preventDefault(event);
  }

  private preventDefault(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private addStyle(isFileAccepted: boolean) {
    if (!this.dragOverClass) {
      return;
    }
    if (isFileAccepted) {
      this.renderer.addClass(this.elementRef.nativeElement, this.dragOverClass.accept);
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, this.dragOverClass.reject);
    }
  }

  private removeStyle() {
    if (this.dragOverClass) {
      this.renderer.removeClass(this.elementRef.nativeElement, this.dragOverClass.accept);
      this.renderer.removeClass(this.elementRef.nativeElement, this.dragOverClass.reject);
    }
  }
}
