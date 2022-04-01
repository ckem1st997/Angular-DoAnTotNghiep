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
import { DashBoardChartInAndOutCountDTO } from 'src/app/model/DashBoardChartInAndOutCountDTO';
import { SelectTopWareHouseDTO } from 'src/app/model/SelectTopWareHouseDTO';


interface Food {
  value: string;
  viewValue: string;
}

interface DataChart {
  value: string;
  name: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //
  dataChart: DataChart[] = [];
  dataChart2: DataChart[] = [];
  getDashBoardWareHouse: ResultMessageResponse<SelectTopWareHouseDTO> = {
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

  getDashBoardByYear: DashBoardChartInAndOutCountDTO = {
    inward: null,
    outward: null
  }

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
  optioneChartCoulumn: any;
  optioneChart2: any;

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
    this.getIn();
    this.getOut();
    this.getIndex();
    this.getHistory();
    this.getChartToWarehouse();
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

  // getChartToYear(d: number) {
  //   if (d === undefined || d < 1900)
  //   d = new Date().getFullYear();
  //   this.dashboard.getChartByYear(2022).subscribe(
  //     (data) => {
  //       if (data.data !== undefined && data.data !== null) {
  //         for (let index = 0; index < data.data.length; index++) {
  //           const element = data.data[index];
  //           this.dataChart.push({
  //             name: element.name.replace('Kho', ''),
  //             value: element.sumBalance
  //           });
  //         }
  //       }
  //       this.optioneChartCoulumn = {
  //         title: {
  //           text: 'Biểu đồ tồn kho',
  //           subtext: 'Năm 2022',
  //           left: 'center'
  //         },
  //         tooltip: {
  //           trigger: 'item'
  //         },
  //         legend: {
  //           orient: 'vertical',
  //           left: 'left'
  //         },
  //         series: [
  //           {
  //             name: 'Access From',
  //             type: 'pie',
  //             radius: '50%',
  //             data: this.dataChart,
  //             emphasis: {
  //               itemStyle: {
  //                 shadowBlur: 10,
  //                 shadowOffsetX: 0,
  //                 shadowColor: 'rgba(0, 0, 0, 0.5)'
  //               }
  //             }
  //           }
  //         ]
  //       };

  //     }
  //   );
  // }

  getChartToWarehouse() {
    this.dashboard.getChartByWareHouse().subscribe(
      (data) => {
        if (data.data !== undefined && data.data !== null) {
          for (let index = 0; index < data.data.length; index++) {
            const element = data.data[index];
            this.dataChart.push({
              name: element.name.replace('Kho', ''),
              value: element.sumBalance
            });
          }
        }
        this.optioneChartCoulumn = {
          title: {
            text: 'Biểu đồ tồn kho',
            subtext: 'Năm 2022',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: this.dataChart,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

      }
    );
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
