import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../task.service";

@Component({
    selector: 'app-todo-view',
    templateUrl: './todo-view.component.html',
    styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {

    constructor(private api: TaskService) {
    }

    ngOnInit(): void {
    }

    createNewList()
    {
        this.api.createList("testing").subscribe((response)=>{
           console.log(response);
        });
    }

}
