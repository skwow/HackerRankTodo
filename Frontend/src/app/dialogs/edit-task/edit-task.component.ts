import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
    minDate: string;
    currentDate: string;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditTaskComponent>) {
    }

    ngOnInit(): void {
        console.log(this.data);
        let now = new Date();
        let day = ("0" + now.getDate()).slice(-2);
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        this.minDate = now.getFullYear() + "-" + (month) + "-" + (day);
        now = new Date(this.data.task.due);
        day = ("0" + now.getDate()).slice(-2);
        month = ("0" + (now.getMonth() + 1)).slice(-2);
        this.currentDate = now.getFullYear() + "-" + (month) + "-" + (day);

    }

    onTypeChange(status) {
        this.data.task.status = status;
    }

    onDueDateChange(dueDate) {
        this.data.task.due = dueDate;
    }

    onTitleChange(title)
    {
        this.data.task.title = title;
    }

}
