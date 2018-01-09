import {Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {AboutEnvService, IEnvInfo} from './about-env.service';

@Component({
  selector: 'cad-about-env',
  template: require('./about-env.html'),
  styles: [require('./about-env.scss')]
})
export class AboutEnvComponent implements OnInit {
  isLoading: boolean;
  envUrl: string;
  items: IEnvInfo[];

  constructor(
    private aboutEnvService: AboutEnvService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.items = this.aboutEnvService.getAppInfo();

    const streams = [];
    this.items.forEach(item => {
      streams.push(item.api$);
      if (item.ui$) streams.push(item.ui$);
    });

    // analogue of Promise.all().finally()
    Observable.forkJoin(...streams).subscribe(null, null, () => this.isLoading = false);

    this.envUrl = this.aboutEnvService.getEnvInfo();
  }
}
