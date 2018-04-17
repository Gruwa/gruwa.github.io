import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-project-uploader',
  templateUrl: './project-uploader.component.html',
  styleUrls: ['./project-uploader.component.scss']
})
export class ProjectUploaderComponent {

  /**
   * Variable for input Form Control
   * @type {FormControl}
   * @memberof ProjectUploaderComponent
   */

  @Input() control: FormControl;

  /**
   * Variable for input label
   * @type {string}
   * @memberof ProjectUploaderComponent
   */

  @Input() label: string = '';

  /**
   * Variable for input title
   * @type {string}
   * @memberof ProjectUploaderComponent
   */

  @Input() title: string = '';

  /**
   * Variable for input attribute
   * @type {string}
   * @memberof ProjectUploaderComponent
   */

  @Input() attribute: string = '';

  /**
   * Variable for input classLabel
   * @type {string}
   * @memberof ProjectUploaderComponent
   */

  @Input() classLabel: string = '';

  /**
   * Variable for input classUploader
   * @type {string}
   * @memberof ProjectUploaderComponent
   */

  @Input() classUploader: string = '';

  /**
   * Variable for emit fileUpload
   * @type {EventEmitter<File>}
   * @memberof ProjectUploaderComponent
   */

  @Output() fileUpload = new EventEmitter<File>();

  /**
   * Variable for receive value of element
   * @type {any}
   * @memberof ProjectUploaderComponent
   */

  @ViewChild('inputElement') inputFormEl: any;

  /**
   * Method for uploading file
   * @param {any} file - data of file
   * @returns {void}
   * @memberof ProjectUploaderComponent
   */

  onFileUpload(file: any): void {
    if (this.control) {
        this.control.setValue(file);
        console.log(this.control.value);
    }

    this.fileUpload.emit(file);
    this.inputFormEl.nativeElement.value = '';
  }
}
