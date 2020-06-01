import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {WebRequestService} from "./web-request.service";
import {Router} from "@angular/router";
import {shareReplay, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private webService: WebRequestService, private router: Router) {
    }

    login(email: string, password: string, enforceAdmin = false) {
        return this.webService.login(email, password).pipe(
            shareReplay(),
            tap((res: HttpResponse<any>) => {
                if (enforceAdmin && res.statusText==="OK" && !res.body.isAdmin)
                {
                    // console.log("Not Admin");
                }
                else if (res.statusText != "Wrong credentials!")
                {
                    this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
                    // console.log("LOGGED IN!");
                }
                else
                {
                    // console.log("NOT LOGGED IN!");
                }
            })
        )
    }


    signUp(email: string, password: string, fullName:string, type:string , contact:Number, tickets:Number, imgFile:any) {
        return this.webService.signUp(email, password, fullName, type , contact, tickets ,imgFile).pipe(
            shareReplay(),
            tap((res: HttpResponse<any>) =>
            {
                if (res.statusText != "Duplicate Email")  // todo: bad code
                {
                    this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
                    // console.log("Successfully signed up and logged in!");
                }
                else
                {
                    // console.log("Duplicate email");
                }
            })
        )
    }


    logout() {
        this.removeSession();
        this.router.navigate(['/login']);
    }

    getAccessToken() {
        return localStorage.getItem('x-access-token');
    }

    getRefreshToken() {
        return localStorage.getItem('x-refresh-token');
    }

    getUserId() {
        return localStorage.getItem('user-id');
    }

    setAccessToken(accessToken: string) {
        localStorage.setItem('x-access-token', accessToken)
    }

    private setSession(userId: string, accessToken: string, refreshToken: string) {
        localStorage.setItem('user-id', userId);
        localStorage.setItem('x-access-token', accessToken);
        localStorage.setItem('x-refresh-token', refreshToken);
    }

    private removeSession() {
        localStorage.removeItem('user-id');
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('x-refresh-token');
    }

    getNewAccessToken() {
        return this.http.get(`${this.webService.URL}/users/me/access-token`, {
            headers: {
                'x-refresh-token': this.getRefreshToken(),
                '_id': this.getUserId()
            },
            observe: 'response'
        }).pipe(
            tap((res: HttpResponse<any>) => {
                this.setAccessToken(res.headers.get('x-access-token'));
            })
        )
    }
}
