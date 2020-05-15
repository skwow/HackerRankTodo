import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class WebRequestService {

    readonly URL;

    constructor(private http: HttpClient) {
        this.URL = 'http://localhost:3000';
    }

    get(url: string) {
        return this.http.get(`${this.URL}/${url}`);
    }

    post(url: string, payload: Object) {
        return this.http.post(`${this.URL}/${url}`, payload);
    }

    patch(url: string, payload: Object) {
        return this.http.patch(`${this.URL}/${url}`, payload);
    }

    delete(url: string) {
        return this.http.delete(`${this.URL}/${url}`);
    }

    login(email:string, password:string)
    {
        return this.http.post(`${this.URL}/users/login`,{
            email,
            password
        },{
            observe:"response"
        });
    }

    signUp(email:string, password:string, fullName:string)
    {
        return this.http.post(`${this.URL}/users`,{
            email,
            password,
            fullName
        },{
            observe:"response"
        });
    }

}