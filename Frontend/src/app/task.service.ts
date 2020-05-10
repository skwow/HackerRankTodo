import {Injectable} from '@angular/core';
import {WebRequestService} from "./web-request.service";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private apiService: WebRequestService) {
        //
    }

    createList(title: string)
    {
        return this.apiService.post('lists', {title});
    }
}
