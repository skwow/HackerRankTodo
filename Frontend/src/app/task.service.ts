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

    createTask(title: string, listId: string, due: string, status: string)
    {
        return this.apiService.post(`lists/${listId}/tasks`, {title,status,due});
    }

    getList()
    {
        return this.apiService.get('lists');
    }

    getTasks(listId: string)
    {
        return this.apiService.get(`lists/${listId}/tasks`);
    }
}
