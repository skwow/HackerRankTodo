import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoViewComponent} from './pages/todo-view/todo-view.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import {FormsModule} from "@angular/forms";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {WebRequestInterceptor} from "./services/web-request.interceptor";
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { ConfirmSignUpComponent } from './pages/confirm-sign-up/confirm-sign-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './pages/profile/profile.component';

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
        ProfileComponent
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
            provide: HTTP_INTERCEPTORS,
            useClass: WebRequestInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents:[ConfirmSignUpComponent,ProfileComponent]
})
export class AppModule {
}
