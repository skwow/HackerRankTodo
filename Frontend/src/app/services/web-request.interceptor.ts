import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable, throwError, empty} from "rxjs";
import {AuthService} from "./auth.service";
import {catchError, switchMap, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {

    refreshingAccessToken: boolean;
    constructor(private auth:AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        req = this.addAuthHeader(req);
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse)=>{
                if (error.status === 401 && !this.refreshingAccessToken)
                {
                    return this.refreshAccessToken().pipe(
                        switchMap(()=>{
                            req = this.addAuthHeader(req);
                            return next.handle(req);
                        }),
                        catchError((err:any)=>{
                            console.log("here");
                            console.log(err);
                            console.log("here2");
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
        this.refreshingAccessToken = true;
        return this.auth.getNewAccessToken().pipe(
            tap(()=>{
                this.refreshingAccessToken = false;
                console.log("Access token refreshed");
            })
        )
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
