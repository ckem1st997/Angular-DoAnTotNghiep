import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, retry, catchError, throwError } from "rxjs";
/// bắt lỗi toàn client
export class ErrorIntercept implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
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
                    // Return an observable with a user-facing error message.
                    return throwError(error);
                })
            )
    }
}