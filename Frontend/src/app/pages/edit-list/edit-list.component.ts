import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-edit-list',
    templateUrl: './edit-list.component.html',
    styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

    listId: string;
    activeTaskStatus: string;

    constructor(private taskService: TaskService,private route: ActivatedRoute, private router:Router, private notificationService: NotificationService) {
    }

    ngOnInit(): void
    {
        this.route.params.subscribe((params: Params) =>
        {
            this.listId = params.listId;
            this.activeTaskStatus = params.activeTaskStatus;
        })
    }

    updateList(title: string)
    {
        this.taskService.updateList(this.listId,title).subscribe(()=>{
            this.router.navigate(['/lists',this.listId, this.activeTaskStatus]);
            this.notificationService.success("List updated!");
        })
    }

}
