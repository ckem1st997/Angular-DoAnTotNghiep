import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseSelectDTO } from '../model/BaseSelectDTO';
import { DashBoardSelectTopInAndOutDTO } from '../model/DashBoardSelectTopInAndOutDTO';
import { ResultDataResponse } from '../model/ResultDataResponse';
import { ResultMessageResponse } from '../model/ResultMessageResponse';
import { SelectTopDashBoardDTO } from '../model/SelectTopDashBoardDTO';
import { WareHouseBookDTO } from '../model/WareHouseBookDTO';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  private baseUrl = environment.baseApi + 'DashBoard';
  private readonly notifier!: NotifierService;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, notifierService: NotifierService) {
    this.notifier = notifierService;
  }


  getTopInward(): Observable<ResultMessageResponse<DashBoardSelectTopInAndOutDTO>> {
    var url = this.baseUrl + `/get-select-top-inward-order-by?order=desc&selectTopWareHouseBook=0`;
    return this.http.get<ResultMessageResponse<DashBoardSelectTopInAndOutDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }

  getTopOutward(): Observable<ResultMessageResponse<DashBoardSelectTopInAndOutDTO>> {
    var url = this.baseUrl + `/get-select-top-outward-order-by?order=desc&selectTopWareHouseBook=0`;
    return this.http.get<ResultMessageResponse<DashBoardSelectTopInAndOutDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }

  getTopIndex(): Observable<ResultDataResponse<SelectTopDashBoardDTO>> {
    var url = this.baseUrl + `/get-select-chart-by-index`;
    return this.http.get<ResultDataResponse<SelectTopDashBoardDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }

  getHistory(): Observable<ResultMessageResponse<WareHouseBookDTO>> {
    var url = environment.baseApi + `WareHouseBook/get-list?Skip=0&Take=3`;
    return this.http.get<ResultMessageResponse<WareHouseBookDTO>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }
}
