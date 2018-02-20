import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {MainService, UserService} from '../../../shared/services';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.scss']
})
export class ChartPageComponent implements OnInit {

  public chartFirstId = 'chartFirst';
  public chartSecondId = 'chartSecond';
  public chartThirdId = 'chartThird';
  public width = 600;
  public height = 400;
  public chartFirstType = 'column2d';
  public chartSecondType = 'pie3d';
  public chartThirdType = 'mscombi2d';
  public dataFormat = 'json';
  public dataSourceFirst;
  public dataSourceSecond;
  public dataSourceThird;
  public title = 'Sample of analytics chart';
  public countInit: number = 0;

  constructor(public userService: UserService,
              public toast: ToastsManager, vcr: ViewContainerRef,
              public mainService: MainService) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.mainService.loader$.next(true);
    this.onGetUsers();
  }

  /**
   * Method for set amount of users
   */

  initCharts(data: any) {
    this.dataSourceFirst = {
      'chart': {
        'caption': 'Users',
        'subCaption': 'Users by group',
        'numberprefix': '',
        'theme': 'fint'
      },
      'data': [
        {
          'label': 'Students',
          'value': data.students
        },
        {
          'label': 'Instructors',
          'value': data.lecturers
        },
        {
          'label': 'Admins',
          'value': data.admins
        }
      ]
    };
    this.dataSourceSecond = {
      'chart': {
        'caption': 'Bakersfield Central - Total footfalls',
        'subCaption': 'Last week',
        'xAxisName': 'Day',
        'yAxisName': 'No. of Visitors (In 1000s)',
        'showValues': '0',
        'theme': 'ocean'
      },
      'annotations': {
        'groups': [
          {
            'id': 'anchor-highlight',
            'items': [
              {
                'id': 'high-star',
                'type': 'circle',
                'x': '$dataset.0.set.2.x',
                'y': '$dataset.0.set.2.y',
                'radius': '12',
                'color': '#6baa01',
                'border': '2',
                'borderColor': '#f8bd19'
              },
              {
                'id': 'label',
                'type': 'text',
                'text': 'Highest footfall 25.5K',
                'fillcolor': '#6baa01',
                'rotate': '90',
                'x': '$dataset.0.set.2.x+75',
                'y': '$dataset.0.set.2.y-2'
              }
            ]
          }
        ]
      },
      'data': [
        {
          'label': 'Students',
          'value': data.students
        },
        {
          'label': 'Instructors',
          'value': data.lecturers
        },
        {
          'label': 'Admins',
          'value': data.admins
        }
      ]
    };
    this.dataSourceFirst = {
      'chart': {
        'caption': 'Actual Revenues, Targeted Revenues & Profits',
        'subcaption': 'Last year',
        'xaxisname': 'Users',
        'yaxisname': 'Amount',
        'numberprefix': '',
        'theme': 'ocean'
      },
      'categories': [
        {
          'category': [
            {
              'label': 'Students'
            },
            {
              'label': 'Lecturers'
            },
            {
              'label': 'Admins'
            }
          ]
        }
      ],
      'dataset': [
        {
          'seriesname': 'Actual Revenue',
          'data': [
            {
              'value': data.students
            },
            {
              'value': data.lecturers
            },
            {
              'value': data.admins
            }
          ]
        },
        {
          'seriesname': 'Projected Revenue',
          'renderas': 'line',
          'showvalues': '0',
          'data': [
            {
              'value': data.students
            },
            {
              'value': data.lecturers
            },
            {
              'value': data.admins
            }
          ]
        },
        {
          'seriesname': 'Profit',
          'renderas': 'area',
          'showvalues': '0',
          'data': [
            {
              'value': data.students
            },
            {
              'value': data.lecturers
            },
            {
              'value': data.admins
            }
          ]
        }
      ]
    };
    this.mainService.loader$.next(false);
  }

  /**
   * Method for get amount of users
   */

  onGetUsers() {
    this.userService.getChartUsers()
      .subscribe(
        (value: any) => this.initCharts(value),
        (error) => {
          if (error.status === 403) {
            this.toast.error('Students not found');
          }
        }
      );
  }

}
