import {Component, Input, ContentChild, Output, EventEmitter, ChangeDetectorRef, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';

type InlineInputSize = 'small' | 'medium' | 'big';

@Component({
  selector: 'cad-inline-input',
  template: require('./inline-input.html'),
  styles: [require('./inline-input.scss')],
  host: {
    '(keyup.esc)': 'cancel()',
    '(keyup.enter)': 'save()'
  }
})
export class InlineInputComponent implements OnInit {
  @Input() size: InlineInputSize = 'small'; // predefined size of the control
  @Input() showSpinner: boolean; // if to show spinner instead of pencil icon (to demonstrate async saving process)
  @Input() placeholder: string; // text to display in view mode when no value set to the input
  @Output() onSave = new EventEmitter<{newValue: any, oldValue: any}>();

  private originalValue: any;
  private isEditing: boolean;
  @ContentChild(NgModel) private input: NgModel;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // ng1 + ng2 hybrid mode workaround: make sure that initial input value rendered in template (sometimes it wasn't)
    this.input.valueChanges
      .first()
      .subscribe(() => this.changeDetector.detectChanges());
  }

  edit() {
    this.originalValue = this.input.value;
    this.isEditing = true;
  }

  save() {
    if (this.input.valid) {
      this.onSave.emit({newValue: this.input.value, oldValue: this.originalValue});
      this.isEditing = false;
    }
  }

  cancel() {
    this.input.control.setValue(this.originalValue);
    this.isEditing = false;
  }
}
