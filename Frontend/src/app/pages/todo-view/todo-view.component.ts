import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Task} from "../../models/task.model";
import {List} from "../../models/list.model";
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

    private getSortedTask()
    {
        this.api.getTasks(this.activeListId, this.taskStatus).subscribe((tasks:Task[])=>{
            tasks.sort( (x,y)=>{
                let a = new Date(x.due);
                let b = new Date(y.due);
                return a>b ? 1 : a<b ? -1 : 0;
            });
            for(let task of tasks)
            {
                let tmp = new Date(task.due);
                task.dueS = tmp.getUTCDate()+"-"+(tmp.getUTCMonth()+1) + "-"+tmp.getUTCFullYear();
            }
            this.tasks = tasks;
        });
    }

    ngOnInit(): void
    {
        this.route.params.subscribe((params: Params) =>
        {
            this.activeListId = params.listId;
            this.taskStatus = params.status;
            if(this.currentUser === undefined)
            {
                this.api.getCurrentUser().subscribe((user:any)=>{
                    this.currentUser = user;
                })
            }
            if(params.listId)
            {
                this.getSortedTask();
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

    editTask(task: Task)
    {
        this.dialog.editTaskDialog(task).afterClosed().subscribe((data)=>{
            if(data)
            {
                this.api.updateTask(this.activeListId, data._id, data.title, data.due, data.status).subscribe((res)=>{
                    this.getSortedTask();
                    this.notificationService.success("Task updated!");
                });
            }
        });
    }

    editList()
    {
        let list = this.lists.filter(obj => {
            return obj._id === this.activeListId;
        })
        this.dialog.editListDialog(list[0]).afterClosed().subscribe((res)=>{
            if (res)
            {
                this.api.updateList(this.activeListId,res.list.title).subscribe(()=>{
                    this.notificationService.success("List updated!");
                })
            }
        });
    }

    createList() {
        this.dialog.newListDialog().afterClosed().subscribe((title)=>{
            if (title)
            {
                this.api.createList(title).subscribe((res: any) => {
                    if(res.status === 200 && res.statusText === "Duplicate List")
                    {
                        this.notificationService.warn("This list already exist!");
                    }
                    else if (res.status === 200 && res.statusText === "OK")
                    {
                        this.lists.push(res.body);
                        this.router.navigate(['/lists', res.body._id, 'progress']);
                        this.notificationService.success("New List Created!");
                    }
                });
            }
        });
    }

    createTask() {
        this.dialog.newTaskDialog().afterClosed().subscribe((task)=>{
            if (task)
            {
                this.api.createTask(task.title, this.activeListId,task.due, task.status).subscribe((newTask: Task)=>{
                    this.getSortedTask();
                    this.notificationService.success("New Task Created");
                });
            }
        });
    }
}
