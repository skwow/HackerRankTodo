import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {DialogService} from "../../services/dialog.service";

@Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {
    private image: string;

    constructor(private auth:AuthService, private router:Router,private dialog:DialogService) {
    }

    ngOnInit(): void {
    }

    onSignUpButtonClicked(email: string, password: string, fullName: string, type:string, _tickets:string, _contact:string)
    {
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
                    if (res.status === 200) {
                        this.router.navigate(['/lists']);
                    }
                    console.log(res);
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
