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

    updateList(id: string,title: string)
    {
        return this.apiService.patch(`lists/${id}`, {title});
    }

    updateTask(listId: string, taskId: string, title: string, due: string, status: string)
    {
        return this.apiService.patch(`lists/${listId}/tasks/${taskId}`, {title,status,due});
    }

    createTask(title: string, listId: string, due: string, status: string)
    {
        return this.apiService.post(`lists/${listId}/tasks`, {title,status,due});
    }

    getList()
    {
        return this.apiService.get('lists');
    }

    getTasks(listId: string, _status: string)
    {
        return this.apiService.get(`lists/${listId}/tasks/${_status}`);
    }

    deleteList(id: string)
    {
        return this.apiService.delete(`lists/${id}`);
    }

    deleteTask(listId: string, taskId: string)
    {
        return this.apiService.delete(`lists/${listId}/tasks/${taskId}`);
    }

    getCurrentUser()
    {
        return this.apiService.getCurrentUser();
    }
}
