import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
    selector: 'app-confirm-sign-up',
    templateUrl: './confirm-sign-up.component.html',
    styleUrls: ['./confirm-sign-up.component.scss']
})
export class ConfirmSignUpComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ConfirmSignUpComponent>) {
    }

    ngOnInit(): void
    {
        // console.log(this.data.user);
    }

}
