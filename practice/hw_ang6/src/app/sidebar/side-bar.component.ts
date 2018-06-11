import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FlowService} from '../shared/services/flow.service';
import {DataService} from '../shared/services/data.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  @Output() closeSideBar = new EventEmitter();

  constructor(private flowService: FlowService,
              public dataService: DataService,
              private localStorage: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public onClickList($event?: any): void {
    console.log('vau');
    // if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['shifts']) {
    //   this.closeSideBar.emit();
    // }
    // if (this.dataService.SIDE_BAR_LIST[$event.description] === this.dataService.SIDE_BAR_LIST['logout']) {
    //   this.closeSideBar.emit();
    //   this.localStorage.clear('token');
    //   this.router.navigate(['/login']);
    //   location.reload(true);
    // }
  }

}
