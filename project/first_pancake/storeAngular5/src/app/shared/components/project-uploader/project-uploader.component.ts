import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-project-uploader',
  templateUrl: './project-uploader.component.html',
  styleUrls: ['./project-uploader.component.scss']
})
export class ProjectUploaderComponent implements OnInit {

  @Input() control: FormControl;
  @Input() label: string = '';
  @Input() title: string = '';
  @Input() attribute: string = '';
  @Input() classLabel: string = '';
  @Input() classUploader: string = '';
  @Output() fileUpload = new EventEmitter<File>();

  @ViewChild('inputElement') inputFormEl: any;
  constructor() { }


  ngOnInit() {

  }

  onFileUpload(file) {


    if (this.control) {
        this.control.setValue(file);
        console.log(this.control.value);
    }

    this.fileUpload.emit(file);
    this.inputFormEl.nativeElement.value = '';
  }
}
