import { Component, OnInit } from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private auth: AuthService, private router:Router, private notificationService: NotificationService)
  { }

  ngOnInit(): void {
  }

    lowLevelValidation(email: string, password: string)
    {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( ! re.test(String(email).toLowerCase()))
        {
            return "Invalid Email format";
        }
        if (password.length < 8)
        {
            return "Password should be at least 8 character long";
        }
        return "-1";
    }

    onAdminLoginButtonClicked(email: string, pass: string)
    {
        const msg = this.lowLevelValidation(email,pass);
        if(msg!="-1")
        {
            this.notificationService.warn(msg);
            return;
        }
        this.auth.login(email, pass, true).subscribe((res: HttpResponse<any>) =>
        {
            if(res.status == 200 && res.statusText === "OK" && !res.body.isAdmin)
            {
                this.notificationService.warn("Not an admin account!");
            }
            else if (res.status == 200 && res.statusText === "Wrong credentials!" )
            {
                this.notificationService.warn("Credentials didn't match!");
            }
            else if (res.status == 200 && res.statusText === "OK") {
                this.router.navigate(['/adminDashboard']);
                this.notificationService.success("Logged in successfully");
            }
        });

    }

}
