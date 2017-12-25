import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-with-input-output',
  templateUrl: './with-input-output.component.html',
  styleUrls: ['./with-input-output.component.css']
})
export class WithInputOutputComponent implements OnInit {

  @Input() jesus: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
