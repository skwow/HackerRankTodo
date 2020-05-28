import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import {List} from "../../models/list.model";
import {DialogService} from "../../services/dialog.service";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-new-list',
    templateUrl: './new-list.component.html',
    styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

    constructor(private taskService: TaskService, private router: Router, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    createList(title: string) {
        this.taskService.createList(title).subscribe((list: List) => {
            console.log(list);
            this.router.navigate(['/lists', list._id, 'progress']);
            this.notificationService.success("New List Created!");
        });
    }

}
