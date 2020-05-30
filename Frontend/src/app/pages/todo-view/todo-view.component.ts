import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Task} from "../../models/task.model";
import {List} from "../../models/list.model";
import {HttpResponse} from "@angular/common/http";
import {DialogService} from "../../services/dialog.service";
import {NotificationService} from "../../services/notification.service"
import {AuthService} from "../../services/auth.service";

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
    currentUser:any;

    constructor(private api: TaskService,private auth:AuthService, private route: ActivatedRoute, private router:Router,private dialog:DialogService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {      // todo: bug: runs everytime a list type is clicked.
        this.route.params.subscribe((params: Params) =>
        {
            this.activeListId = params.listId;
            this.taskStatus = params.status;
            if(this.currentUser === undefined)
            {
                this.api.getCurrentUser().subscribe((user:any)=>{
                    this.currentUser = user;
                    console.log(this.currentUser);
                })
            }
            if(params.listId)
            {
                this.api.getTasks(params.listId, params.status).subscribe((tasks:Task[])=>{
                    tasks.sort( (x,y)=>{
                        let a = new Date(x.due);
                        let b = new Date(y.due);
                        return a>b ? 1 : a<b ? -1 : 0;
                    });
                    for(let task of tasks)
                    {
                        let tmp = new Date(task.due);
                        task.due = tmp.getUTCDate()+"-"+(tmp.getUTCMonth()+1) + "-"+tmp.getUTCFullYear();
                    }
                    this.tasks = tasks;
                    console.log(this.tasks);
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

    onDeleteListClick()
    {
        this.api.deleteList(this.activeListId).subscribe((res:any)=>{
            console.log(res);
            this.router.navigate(['/lists']);
            this.notificationService.warn("List deleted Successfully!");
        });
    }


    onDeleteTaskClick(id: string)
    {
        this.api.deleteTask(this.activeListId, id).subscribe((res: any) => {
            this.tasks = this.tasks.filter(val => val._id !== id);
            this.notificationService.warn("Task deleted Successfully!");
        })
    }

    showProfile() {
        this.dialog.viewProfileDialog(this.currentUser).afterClosed().subscribe((confirmed)=>{
            if(confirmed)
            {
                this.auth.logout();
                this.notificationService.success("Logged out Successfully");
            }
        });
    }
}
