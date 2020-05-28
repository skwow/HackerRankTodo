import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task.model";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
    listId: string;
    taskId: string;
    status: string;
    dueDate: string;
    minDate: string;


    constructor(private api: TaskService, private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        const now = new Date();
        const day = ("0" + now.getDate()).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        this.minDate = now.getFullYear() + "-" + (month) + "-" + (day);
        this.dueDate = this.minDate;
        this.status = "New";
        this.route.params.subscribe((params: Params) => {
            this.listId = params["listId"];
            this.taskId = params["taskId"];
        })

    }

    updateTask(title: string) {
        this.api.updateTask(this.listId, this.taskId, title, this.dueDate, this.status).subscribe((newTask: Task)=>{
            this.router.navigate(['/lists', this.listId, this.status]);
            this.notificationService.success("Task updated!");
        });
    }

    onTypeChange(status) {
        this.status = status;
    }

    onDueDateChange(dueDate) {
        this.dueDate = dueDate;
    }

}
