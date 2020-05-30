import {Injectable, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmSignUpComponent} from "../pages/confirm-sign-up/confirm-sign-up.component";
import {ProfileComponent} from "../pages/profile/profile.component";
import {ViewUserDashboardComponent} from "../pages/view-user-dashboard/view-user-dashboard.component";

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

    viewProfileDialog(user: any)
    {
        return this.dialog.open(ProfileComponent,{
            width: "700px",
            disableClose: true,
            data:{
                user: user
            }
        });
    }

    viewUserDialog(user: any)
    {
        return this.dialog.open(ViewUserDashboardComponent,{
            width: "700px",
            disableClose: true,
            data:{
                user: user
            }
        });
    }
}
