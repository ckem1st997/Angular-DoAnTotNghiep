import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry, catchError, throwError, map } from "rxjs";
import { LoadingService } from "../service/Loading.service";
/// bắt lỗi toàn client
@Injectable()
export class ErrorIntercept implements HttpInterceptor {
    constructor(
        private _loading: LoadingService
      ) { }
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this._loading.setLoading(true, request.url);
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    
                    if (error.status === 0) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.error('An error occurred:', error.error);
                    } else {
                        console.error(
                            `Backend returned code ${error.status}, body was: `, error);
                    }
                    this._loading.setLoading(false, request.url);
                    // Return an observable with a user-facing error message.
                    return throwError(error);
                })
            ).pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                  this._loading.setLoading(false, request.url);
                }
                return evt;
              }));
    }
}