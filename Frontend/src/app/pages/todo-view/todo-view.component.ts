import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../task.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Task} from "../../models/task.model";
import {List} from "../../models/list.model";

@Component({
    selector: 'app-todo-view',
    templateUrl: './todo-view.component.html',
    styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {

    lists: List[];
    tasks: Task[];
    constructor(private api: TaskService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) =>
        {
            console.log(params);
            this.api.getTasks(params.listId).subscribe((tasks:Task[])=>{
                this.tasks = tasks;
            });
        })

        this.api.getList().subscribe((lists: List[]) => {
            this.lists = lists;
        })
    }


    onTaskStatusChange(task: Task, _status: string)
    {
        this.api.complete(task, _status).subscribe(()=>{
            // console.log("Completed")
        });
    }
}
