import {Injectable, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmSignUpComponent} from "../pages/confirm-sign-up/confirm-sign-up.component";

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) {
    }

    confirmSignUpDialog(user: any)
    {
        return this.dialog.open(ConfirmSignUpComponent,{
            width: "700px",
            disableClose: true,
            data:{
                user: user
            }
        });

    }
}
