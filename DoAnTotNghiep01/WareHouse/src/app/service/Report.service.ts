import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultMessageResponse } from '../model/ResultMessageResponse';
import { TreeView } from '../model/TreeView';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = environment.baseApi+"Report";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  // getList(search: WareHouseSearchModel): Observable<ResultMessageResponse<WareHouseDTO>> {
  //   var check = search.active == null ? '' : search.active;
  //   var url = this.baseUrl + `WareHouses/get-list?KeySearch=` + search.keySearch + `&Active=` + check + `&Skip=` + search.skip + `&Take=` + search.take + ``;
  //   return this.http.get<ResultMessageResponse<WareHouseDTO>>(url, this.httpOptions).pipe(
  //     retry(3), // retry a failed request up to 3 times
     
  //   );
  // }
  
  getTreeView(): Observable<ResultMessageResponse<TreeView>> {

    var url = this.baseUrl + `/get-report-treeview`;
    return this.http.get<ResultMessageResponse<TreeView>>(url, this.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
    );
  }
}
