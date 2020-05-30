import {Component, OnInit} from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';
import {TaskService} from "../../services/task.service";
import {DialogService} from "../../services/dialog.service";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    users: any;

    constructor(private taskService: TaskService, private dialog: DialogService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.taskService.getAllUsers().subscribe((res: any) => {
            this.users = res;
            let dict: { [id: string]: number; } =
                {
                    "Self": 0,
                    "Corporate": 0,
                    "Group": 0,
                    "Others": 0
                };
            for (let doc of res)
                dict[doc.type] += 1;
            let _dataPoints: { y: number, type: string }[] = [];
            for (let key in dict)
                _dataPoints.push({type: key, y: dict[key]});
            let chart = new CanvasJS.Chart("chartContainer", {
                theme: "dark2",
                animationEnabled: true,
                exportEnabled: false,
                title: {
                    text: "Insight: Type of users"
                },
                data: [{
                    type: "pie",
                    showInLegend: false,
                    toolTipContent: "<b>{type}</b>: {y} (#percent%)",
                    indexLabel: "{type} - #percent%",
                    dataPoints: _dataPoints
                }]
            });
            chart.render();
        })

    }

    viewUserDetails(user: any) {
        this.dialog.viewUserDialog(user).afterClosed().subscribe((confirmed) => {
            if (confirmed) {
                // may come handy later.
            }
        });
    }
}


// todo: add timestamps as requirements
