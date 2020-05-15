import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError, empty, Subject} from "rxjs";
import {AuthService} from "./auth.service";
import {catchError, switchMap, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {

    refreshingAccessToken: boolean;
    accessTokenRefreshed: Subject<any> = new Subject();

    constructor(private auth:AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        req = this.addAuthHeader(req);
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse)=>{
                if (error.status === 401)
                {
                    return this.refreshAccessToken().pipe(
                        switchMap(()=>{
                            req = this.addAuthHeader(req);
                            return next.handle(req);
                        }),
                        catchError((err:any)=>{
                            this.auth.logout();
                            return empty();
                        })
                    )
                }
                return throwError(error);
            })
        )

    }

    refreshAccessToken()
    {
        if (this.refreshingAccessToken)
        {
            return new Observable(observer => {
                this.accessTokenRefreshed.subscribe(() => {
                    // this code will run when the access token has been refreshed
                    observer.next();
                    observer.complete();
                })
            })
        }
        else
        {
            this.refreshingAccessToken = true;
            return this.auth.getNewAccessToken().pipe(
                tap(()=>{
                    this.refreshingAccessToken = false;
                    console.log("Access token refreshed");
                    this.accessTokenRefreshed.next();
                })
            )
        }
    }

    addAuthHeader(request: HttpRequest<any>)
    {
        const token = this.auth.getAccessToken();
        if(token)
        {
            return request.clone({
                setHeaders:{
                    'x-access-token': token
                }
            });
        }
        return request;
    }
}
