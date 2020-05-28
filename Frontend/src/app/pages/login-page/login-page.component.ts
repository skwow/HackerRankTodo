import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {DialogService} from "../../services/dialog.service";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    constructor(private auth: AuthService, private router:Router, private notificationService: NotificationService) {
    }

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

    onLoginButtonClicked(email: string, pass: string)
    {
        const msg = this.lowLevelValidation(email,pass);
        if(msg!="-1")
        {
            this.notificationService.warn(msg);
            return;
        }
        this.auth.login(email, pass).subscribe((res: HttpResponse<any>) =>
        {
            if (res.status == 200 && res.statusText === "Wrong credentials!" )
            {
                this.notificationService.warn("Credentials didn't match!");
            }
            if (res.status == 200 && res.statusText === "OK") {
                this.router.navigate(['/lists']);
                this.notificationService.success("Logged in successfully");
            }
        });

    }
}
