import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {
    }

    config: MatSnackBarConfig =
        {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
        }

    success(msg: string) {
        this.config.panelClass = ["successNotification"]
        this.snackBar.open(msg, "", this.config);
    }

    warn(msg: string) {
        this.config.panelClass = ["warnNotification"]
        this.snackBar.open(msg, "", this.config);
    }
}
