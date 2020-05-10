import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../task.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-todo-view',
    templateUrl: './todo-view.component.html',
    styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {

    lists: any[];
    tasks: any[];
    constructor(private api: TaskService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) =>
        {
            console.log(params);
            this.api.getTasks(params.listId).subscribe((tasks:any[])=>{
                this.tasks = tasks;
            });
        })

        this.api.getList().subscribe((lists: any[]) => {
            this.lists = lists;
        })
    }

    createNewList() {
        this.api.createList("testing").subscribe((response) => {
            console.log(response);
        });
    }

}
