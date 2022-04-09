import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultDataResponse } from '../model/ResultDataResponse';
import { ResultMessageResponse } from '../model/ResultMessageResponse';
import { UserMaster } from '../model/UserMaster';

@Injectable({
  providedIn: 'root'
})
export class AuthozireService {

  private baseUrlMaster = environment.authorizeApi;
  private readonly notifier!: NotifierService;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, notifierService: NotifierService) {
    this.notifier = notifierService;
  }


  getList(key:string, whId:string, pages:number, num:number): Observable<ResultMessageResponse<UserMaster>> {
    var url = this.baseUrlMaster + `AuthorizeMaster/get-list?Number=`+num+`&Pages=`+pages+`&Key=`+key+`&Id=`+whId+``;
    return this.http.get<ResultMessageResponse<UserMaster>>(url, this.httpOptions).pipe(
      retry(1), // retry a failed request up to 3 times
     
    );
  }

  EditIndex(iduser: string | null): Observable<ResultDataResponse<UserMaster>> {
    var url = this.baseUrlMaster + `AuthorizeMaster/role-edit?id=` + iduser;
    return this.http.get<ResultDataResponse<UserMaster>>(url, this.httpOptions).pipe(
      tap(_ => console.log(`create`)),
    );
  }
}