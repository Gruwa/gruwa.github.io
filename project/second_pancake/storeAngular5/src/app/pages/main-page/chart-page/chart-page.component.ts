import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {MainService, UserService} from '../../../shared/services';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.scss']
})
export class ChartPageComponent implements OnInit {

  /**
   * Variable chartFirstId
   * @type {string}
   * @memberof ChartPageComponent
   */

  public chartFirstId: string = 'chartFirst';

  /**
   * Variable chartSecondId
   * @type {string}
   * @memberof ChartPageComponent
   */

  public chartSecondId: string = 'chartSecond';

  /**
   * Variable chartThirdId
   * @type {string}
   * @memberof ChartPageComponent
   */

  public chartThirdId: string = 'chartThird';

  /**
   * Variable width
   * @type {number}
   * @memberof ChartPageComponent
   */

  public width: number = 600;

  /**
   * Variable height
   * @type {number}
   * @memberof ChartPageComponent
   */

  public height: number = 400;

  /**
   * Variable chartFirstType
   * @type {string}
   * @memberof ChartPageComponent
   */

  public chartFirstType: string = 'column2d';

  /**
   * Variable chartSecondType
   * @type {string}
   * @memberof ChartPageComponent
   */

  public chartSecondType: string = 'pie3d';

  /**
   * Variable chartThirdType
   * @type {string}
   * @memberof ChartPageComponent
   */

  public chartThirdType: string = 'mscombi2d';

  /**
   * Variable dataFormat
   * @type {string}
   * @memberof ChartPageComponent
   */

  public dataFormat: string = 'json';

  /**
   * Variable dataSourceFirst
   * @type {string}
   * @memberof ChartPageComponent
   */

  public dataSourceFirst;

  /**
   * Variable dataSourceSecond
   * @type {string}
   * @memberof ChartPageComponent
   */

  public dataSourceSecond;

  /**
   * Variable dataSourceThird
   * @type {string}
   * @memberof ChartPageComponent
   */

  public dataSourceThird;

  /**
   * Variable title
   * @type {string}
   * @memberof ChartPageComponent
   */

  public title: string = 'Sample of analytics chart';

  /**
   * Variable countInit
   * @type {number}
   * @memberof ChartPageComponent
   */

  public countInit: number = 0;

  /**
   * Creates an instance of ChartPageComponent.
   * @param {UserService} userService
   * @param {MainService} mainService
   * @param {ToastsManager} toast
   * @param {ViewContainerRef} vcr
   * @memberof ChartPageComponent
   */

  constructor(
    public userService: UserService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    public mainService: MainService
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  /**
   * Method ngOnInit
   * @returns {void}
   * @memberof ChartPageComponent
   */

  ngOnInit(): void {
    this.mainService.loader$.next(true);
    this.onGetUsers();
  }

  /**
   * Method for set amount of users
   * @param {any} data
   * @returns {void}
   * @memberof ChartPageComponent
   */

  initCharts(data: any): void {
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
   * @returns {void}
   * @memberof ChartPageComponent
   */

  onGetUsers(): void {
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
