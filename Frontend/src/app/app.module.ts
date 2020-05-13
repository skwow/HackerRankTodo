import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TodoViewComponent} from './pages/todo-view/todo-view.component';
import {HttpClientModule} from "@angular/common/http";
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import {FormsModule} from "@angular/forms";
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoViewComponent,
        NewListComponent,
        NewTaskComponent,
        LoginPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
