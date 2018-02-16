import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDeleteComponent implements OnInit {

  @Input() entityName: string = 'user';
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor(public translate: TranslateService) {
  }

  ngOnInit() {
  }

  onDeleteClick(needDelete: boolean = false) {
    this.onDelete.emit(needDelete);
  }
}
