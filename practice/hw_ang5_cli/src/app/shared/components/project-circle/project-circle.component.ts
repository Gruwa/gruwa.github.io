import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-circle',
  templateUrl: './project-circle.component.html',
  styleUrls: ['./project-circle.component.scss']
})
export class ProjectCircleComponent implements OnInit {

  @Input() progress: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
