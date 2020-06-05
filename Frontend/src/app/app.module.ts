import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoViewComponent} from './pages/todo-view/todo-view.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NewListComponent } from './dialogs/new-list/new-list.component';
import { NewTaskComponent } from './dialogs/new-task/new-task.component';
import {FormsModule} from "@angular/forms";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {WebRequestInterceptor} from "./services/web-request.interceptor";
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { EditListComponent } from './dialogs/edit-list/edit-list.component';
import { EditTaskComponent } from './dialogs/edit-task/edit-task.component';
import { ConfirmSignUpComponent } from './dialogs/confirm-sign-up/confirm-sign-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './dialogs/profile/profile.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ViewUserDashboardComponent } from './dialogs/view-user-dashboard/view-user-dashboard.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        TodoViewComponent,
        NewListComponent,
        NewTaskComponent,
        LoginPageComponent,
        SignUpPageComponent,
        EditListComponent,
        EditTaskComponent,
        ConfirmSignUpComponent,
        ProfileComponent,
        AdminLoginComponent,
        AdminDashboardComponent,
        ViewUserDashboardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatSnackBarModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: WebRequestInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents:[ConfirmSignUpComponent,ProfileComponent,ViewUserDashboardComponent,EditTaskComponent,EditListComponent,NewListComponent,NewTaskComponent]
})
export class AppModule {
}
