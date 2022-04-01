import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Unit } from 'src/app/entity/Unit';
import { DashBoardSelectTopInAndOutDTO } from 'src/app/model/DashBoardSelectTopInAndOutDTO';
import { ResultDataResponse } from 'src/app/model/ResultDataResponse';
import { ResultMessageResponse } from 'src/app/model/ResultMessageResponse';
import { SelectTopDashBoardDTO } from 'src/app/model/SelectTopDashBoardDTO';
import { DashBoardService } from 'src/app/service/DashBoard.service';
import { UnitValidator } from 'src/app/validator/UnitValidator';
import { WareHouse } from 'src/app/entity/WareHouse';
import { WareHouseBookService } from 'src/app/service/WareHouseBook.service';
import { WareHouseBookDTO } from './../../model/WareHouseBookDTO';


interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // lisst history

  listHistory: ResultMessageResponse<WareHouseBookDTO> = {
    success: false,
    code: '',
    httpStatusCode: 0,
    title: '',
    message: '',
    data: [],
    totalCount: 0,
    isRedirect: false,
    redirectUrl: '',
    errors: {}
  };;


  //list in and out

  listIn: ResultMessageResponse<DashBoardSelectTopInAndOutDTO> = {
    success: false,
    code: '',
    httpStatusCode: 0,
    title: '',
    message: '',
    data: [],
    totalCount: 0,
    isRedirect: false,
    redirectUrl: '',
    errors: {}
  };


  listOut: ResultMessageResponse<DashBoardSelectTopInAndOutDTO> = {
    success: false,
    code: '',
    httpStatusCode: 0,
    title: '',
    message: '',
    data: [],
    totalCount: 0,
    isRedirect: false,
    redirectUrl: '',
    errors: {}
  };

  listIndex: SelectTopDashBoardDTO = {
    itemCountMax: undefined,
    itemCountMin: undefined,
    wareHouseBeginningCountMax: undefined,
    wareHouseBeginningCountMin: undefined
  };

  //
  options: any;
  optionstwo: any;
  optionst3: any;
  gaugeData = [
    {
      value: 20,
      name: 'Perfect',
      title: {
        offsetCenter: ['0%', '-30%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-20%']
      }
    },
    {
      value: 40,
      name: 'Good',
      title: {
        offsetCenter: ['0%', '0%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '10%']
      }
    },
    {
      value: 60,
      name: 'Commonly',
      title: {
        offsetCenter: ['0%', '30%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '40%']
      }
    }
  ];
  colors = ['#5470C6', '#91CC75', '#EE6666'];

  selectedValue: string | undefined;
  selectedCar: string | undefined;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  constructor(private dashboard: DashBoardService, private warehouseBook: WareHouseBookService) {

  }
  @HostListener('window:resize', ['$event'])

  SetHeightDashboard() {
    const getScreenHeight = window.innerHeight;
    const table = document.getElementById("dashboard") as HTMLDivElement;
    table.style.height = getScreenHeight - 95 + "px";
  }

  onWindowResize(): void {
    this.SetHeightDashboard();


  }

  ngOnInit(): void {
    this.SetHeightDashboard();
    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Email',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ]
    };
    this.optionstwo = {
      angleAxis: {},
      radiusAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu'],
        z: 10
      },
      polar: {},
      series: [
        {
          type: 'bar',
          data: [1, 2, 3, 4],
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        },
        {
          type: 'bar',
          data: [2, 4, 6, 8],
          coordinateSystem: 'polar',
          name: 'B',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        },
        {
          type: 'bar',
          data: [1, 2, 3, 4],
          coordinateSystem: 'polar',
          name: 'C',
          stack: 'a',
          emphasis: {
            focus: 'series'
          }
        }
      ],
      legend: {
        show: true,
        data: ['A', 'B', 'C']
      }
    };

    this.optionst3 = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}'
          },
          data: [
            {
              value: 50,
              name: 'SCORE'
            }
          ]
        }
      ]
    };
    this.getIn();
    this.getOut();
    this.getIndex();
    this.getHistory();
  }

  getIn() {
    this.dashboard.getTopInward().subscribe(
      (data) => {
        this.listIn = data;
      }
    );
  }
  getOut() {
    this.dashboard.getTopOutward().subscribe(
      (data) => {
        this.listOut = data;
      }
    );
  }
  getIndex() {

    this.dashboard.getTopIndex().subscribe(
      (data) => {
        this.listIndex = data.data;
      }
    );
  }


  getHistory() {
    this.dashboard.getHistory().subscribe(
      (data) => {
        this.listHistory = data;
      }
    );
  }

  getDateToName(d: Date) {
    return d.toString().replace('T', '-');
  }

  onChartInit(ec: any) {
    console.log('onChartInit', ec);
  }

  //   function daysInMonth (month, year) {
  //     return new Date(year, month, 0).getDate();
  // }

  // // July
  // daysInMonth(7,2009);
}
