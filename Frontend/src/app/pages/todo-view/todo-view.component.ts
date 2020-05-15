import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
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
    activeListId: string;
    taskStatus: string;
    constructor(private api: TaskService, private route: ActivatedRoute, private router:Router) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) =>
        {
            this.activeListId = params.listId;
            this.taskStatus = params.status;
            if(params.listId)
            {
                this.api.getTasks(params.listId, params.status).subscribe((tasks:Task[])=>{
                    this.tasks = tasks;
                });
            }
            else
            {
                this.tasks = undefined;
            }
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

    onDeleteListClick()
    {
        this.api.deleteList(this.activeListId).subscribe((res:any)=>{
            console.log(res);
            this.router.navigate(['/lists']);
        })
    }


    onDeleteTaskClick(id: string)
    {
        this.api.deleteTask(this.activeListId, id).subscribe((res: any) => {
            this.tasks = this.tasks.filter(val => val._id !== id);
            console.log(res);
        })
    }
}
