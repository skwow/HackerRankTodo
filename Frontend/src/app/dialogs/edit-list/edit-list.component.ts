import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {NotificationService} from "../../services/notification.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-edit-list',
    templateUrl: './edit-list.component.html',
    styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditListComponent>) {
    }

    ngOnInit(): void {
        // console.log(this.data);
    }

    onTitleChange(value: string) {
        this.data.list.title = value;
        // console.log(this.data.list.title);
    }
}
