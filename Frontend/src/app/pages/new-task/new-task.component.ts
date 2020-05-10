import {Component, OnInit} from '@angular/core';
import {Task} from "../../models/task.model";
import {TaskService} from "../../task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

    listId: string;
    dueDate: string;
    minDate: string;
    status: string;

    constructor(private api: TaskService, private route: ActivatedRoute, private router: Router) {}


    ngOnInit(): void
    {
        const now = new Date();
        const day = ("0" + now.getDate()).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        this.minDate = now.getFullYear() + "-" + (month) + "-" + (day);
        this.dueDate = this.minDate;
        this.status = "New";
        this.route.params.subscribe((params: Params) =>
        {
            this.listId = params["listId"];
            console.log(this.listId);
        })

    }

    createTask(title: string) {
        this.api.createTask(title, this.listId,this.dueDate, this.status).subscribe((newTask: Task)=>{
            this.router.navigate(['../'],{relativeTo: this.route});
        });

    }

    onTypeChange(status) {
        this.status = status;
    }

    onDueDateChange(dueDate) {
        this.dueDate = dueDate;
    }
}
