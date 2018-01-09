import {Component, ViewChild} from '@angular/core';
import {NgForm, FormGroup, FormBuilder} from '@angular/forms';
import {CadTrackChangesDirective} from '../track-changes.directive';

@Component({
  selector: 'cad-examples-track-changes',
  template: require('./examples-track-changes.html')
})
export class ExamplesTrackChangesComponent {
  templateDriven = {
    trackChangesEnabled: true,
    ignoreEmptyProperties: true,
    showUnsavedPopup: true
  };
  reactiveDriven = {
    form: null,
    trackChangesEnabled: true,
    ignoreEmptyProperties: true,
    showUnsavedPopup: true
  };
  rolesList = [
    'admin',
    'power user',
    'limited user'
  ];
  user1 = {
    name: 'John Smith',
    email: undefined,
    role: 'limited user',
    active: true
  };
  user2 = {
    name: 'Chuck Norris',
    email: undefined,
    role: 'admin',
    active: true
  };
  @ViewChild('tracker1') private tracker1: CadTrackChangesDirective;
  @ViewChild('tracker2') private tracker2: CadTrackChangesDirective;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.reactiveDriven.form = this.formBuilder.group({
      user: this.formBuilder.group({
        name: this.user2.name,
        email: this.user2.email,
        role: this.user2.role,
        active: this.user2.active
      })
    });
  }

  onTemplateFormSubmit(form: NgForm) {
    this.user1 = form.value.user;
    this.tracker1.restart();
  }

  onSubmitReactiveForm(reactiveForm: FormGroup) {
    this.user2 = reactiveForm.value.user;
    this.tracker2.restart();
  }
}
