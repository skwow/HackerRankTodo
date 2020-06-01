import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ProfileComponent>) {
    }

    ngOnInit(): void {
        // console.log(this.data);
    }

}
