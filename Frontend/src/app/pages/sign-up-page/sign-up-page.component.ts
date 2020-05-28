import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {DialogService} from "../../services/dialog.service";
import {NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
    private image: string;

    constructor(private auth:AuthService, private router:Router,private dialog:DialogService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    lowLevelValidation(email: string, password: string, fullName: string)
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
        if(fullName.length < 4)
        {
            return "Full name should be at least 4 character long"
        }
        return "-1";
    }

    onSignUpButtonClicked(email: string, password: string, fullName: string, type:string, _tickets:string, _contact:string)
    {
        const msg = this.lowLevelValidation(email,password,fullName);
        if(msg != "-1")
        {
            this.notificationService.warn(msg);
            return;
        }
        let tickets = parseInt(_tickets);
        let contact = parseInt(_contact);
        let user = {
            email: email,
            fullName: fullName,
            type: type,
            tickets: tickets,
            contact: contact,
            imageUrl: this.image
        };
        this.dialog.confirmSignUpDialog(user).afterClosed().subscribe((confirmed)=>{
            if(confirmed)
            {
                this.auth.signUp(email,password, fullName, type, contact,tickets, this.image).subscribe((res: HttpResponse<any>) =>
                {
                    if (res.statusText === "Duplicate Email")
                    {
                        this.notificationService.warn("Email Already exists");
                    }
                    else if (res.status === 200 && res.statusText === "OK") {
                        this.router.navigate(['/lists']);
                        this.notificationService.success("Signed Up successfully!");
                    }
                });
            }
        });

    }

    preview(files)
    {
        if (files.length === 0)
            return;
        let mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            console.log("Only images are supported.");  // todo: show notification
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.image = reader.result as string ;
        }
    }
}
