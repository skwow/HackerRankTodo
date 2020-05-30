import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-new-list',
    templateUrl: './new-list.component.html',
    styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

    title: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<NewListComponent>) {
    }

    ngOnInit(): void {
    }

    onTitleChange(value: string) {
        this.title = value;
    }


}
