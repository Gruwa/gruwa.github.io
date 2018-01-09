import * as _ from 'lodash';
import {
  Directive, Renderer2, HostListener, Input, Output, EventEmitter, OnInit, OnDestroy, Inject, ViewContainerRef
} from '@angular/core';
import {UploadService} from '../';
import {WindowService} from '../../common/services/window/window.service';

@Directive({ selector: '[cadSelectFile]' })
export class SelectFileDirective implements OnInit, OnDestroy {
  @Input() accept: string = '';
  @Input() multiple: boolean = false;
  @Input() name: string = '';
  @Input() resetOnChange: boolean = false;
  @Input() disabled: boolean = false;
  @Output() fileChanged = new EventEmitter<File|FileList>();
  @Output() fileRejected = new EventEmitter<File|FileList>();
  private input: HTMLInputElement;

  constructor(
    private renderer: Renderer2,
    private uploadService: UploadService,
    private viewContainerRef: ViewContainerRef,
    @Inject(WindowService) private $window: Window
  ) {}

  ngOnInit(): void {
    this.input = this.renderer.createElement('input');
    this.renderer.setAttribute(this.input, 'type', 'file');
    this.renderer.setAttribute(this.input, 'accept', this.accept);

    if (this.multiple) {
      this.renderer.setAttribute(this.input, 'multiple', this.multiple.toString());
    }

    if (this.name) {
      this.renderer.setAttribute(this.input, 'name', this.name.toString());
    }

    this.renderer.listen(this.input, 'change', this.onChange.bind(this));

    this.addToDOM();
  }

  ngOnDestroy(): void {
    this.removeFromDOM();
  }

  @HostListener('click')
  openFileBrowser() {
    if (this.disabled) {
      return;
    }
    this.input.click();
  }

  reset(): void {
    this.input.value = '';
  }

  private onChange() {
    const inputFile = this.multiple ? this.input.files : _.head<File>(this.input.files);
    if (!inputFile) {
      return;
    }

    this.validateFiles(inputFile);
    if (this.resetOnChange) {
      this.reset();
    }
  }

  private validateFiles(inputFile: File | FileList) {
    if (this.multiple) {
      _.each(inputFile, (file: File) => {
        this.emitValidationEvents(
          this.uploadService.isFileAccepted(this.accept, file),
          file);
      });
    } else {
      this.emitValidationEvents(
        this.uploadService.isFileAccepted(this.accept, <File> inputFile),
        <File> inputFile
      );
    }
  }

  private emitValidationEvents(isFileValid: boolean, inputFile?: File) {
    isFileValid ? this.fileChanged.emit(inputFile) : this.fileRejected.emit(inputFile);
  }

  private addToDOM(): void {
    // should not affect layout
    this.renderer.setStyle(this.input, 'visibility', 'hidden');
    this.renderer.setStyle(this.input, 'position', 'absolute');
    this.renderer.setStyle(this.input, 'height', '0');
    this.renderer.setStyle(this.input, 'width', '0');
    this.renderer.setStyle(this.input, 'overflow', 'hidden');
    this.renderer.setAttribute(this.input, 'tabindex', '-1');

    this.renderer.appendChild(this.viewContainerRef.element.nativeElement, this.input);
  }

  private removeFromDOM(): void {
    this.renderer.removeChild(this.viewContainerRef.element.nativeElement, this.input);
  }
}
