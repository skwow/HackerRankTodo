import {Injectable, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmSignUpComponent} from "../dialogs/confirm-sign-up/confirm-sign-up.component";
import {ProfileComponent} from "../dialogs/profile/profile.component";
import {ViewUserDashboardComponent} from "../dialogs/view-user-dashboard/view-user-dashboard.component";
import {EditTaskComponent} from "../dialogs/edit-task/edit-task.component";
import {EditListComponent} from "../dialogs/edit-list/edit-list.component";
import {NewListComponent} from "../dialogs/new-list/new-list.component";
import {NewTaskComponent} from "../dialogs/new-task/new-task.component";

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

    editTaskDialog(task: any)
    {
        return this.dialog.open(EditTaskComponent,{
            width: "700px",
            disableClose: true,
            data:{
                task: task
            }
        });
    }

    editListDialog(list: any)
    {
        return this.dialog.open(EditListComponent,{
            width: "700px",
            disableClose: true,
            data:{
                list: list
            }
        });
    }

    newListDialog()
    {
        return this.dialog.open(NewListComponent,{
            width: "700px",
            disableClose: true,
        });
    }

    newTaskDialog()
    {
        return this.dialog.open(NewTaskComponent,{
            width: "700px",
            disableClose: true,
        });
    }
}
