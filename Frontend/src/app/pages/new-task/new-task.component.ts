import {Component, Inject, OnInit} from '@angular/core';
import {Task} from "../../models/task.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

    task: any;
    minDate: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<NewTaskComponent>) {
    }

    ngOnInit(): void
    {
        this.task = {};
        const now = new Date();
        const day = ("0" + now.getDate()).slice(-2);
        const month = ("0" + (now.getMonth() + 1)).slice(-2);
        this.minDate = now.getFullYear() + "-" + (month) + "-" + (day);
        this.task.due = now;
        this.task.status = "New";
    }

    onTypeChange(status) {
        this.task.status = status;
    }

    onDueDateChange(dueDate) {
        this.task.due = dueDate;
    }

    onTitleChange(title)
    {
        this.task.title = title;
    }
}
