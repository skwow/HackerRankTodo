import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

    constructor(private auth:AuthService, private router:Router) {
    }

    ngOnInit(): void {
    }

    onSignUpButtonClicked(email: string, password: string, fullName: string) {
        this.auth.signUp(email,password, fullName).subscribe((res: HttpResponse<any>) =>
        {
            if (res.status === 200) {
                this.router.navigate(['/lists']);
            }
            console.log(res);
        });
    }

}
