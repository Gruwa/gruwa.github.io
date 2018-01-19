import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-wrapper-page',
  templateUrl: './wrapper-page.component.html',
  styleUrls: ['./wrapper-page.component.scss']
})
export class WrapperPageComponent implements OnInit {
  title = 'app';

  constructor (
    private localStorageService: LocalStorageService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.localStorageService.store('language', 'en');
    console.log(this.localStorageService.retrieve('language'));
  }

}
