import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newReq = request.clone();
    // if ( this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken) )
    // {
    //     newReq = req.clone({
    //         headers: req.headers.set('Authorization', 'Bearer ' + this._authService.accessToken)
    //     });
    // }
    return next.handle(newReq).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          //this._authService.signOut();

          // Reload the app
          location.reload();
        }

        return throwError(error);
      })
    );
  }
}
