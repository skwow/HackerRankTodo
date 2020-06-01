import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileComponent} from "../profile/profile.component";

@Component({
  selector: 'app-view-user-dashboard',
  templateUrl: './view-user-dashboard.component.html',
  styleUrls: ['./view-user-dashboard.component.scss']
})
export class ViewUserDashboardComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ProfileComponent>) {
    }

    ngOnInit(): void
    {
        // console.log(this.data);
    }

}
