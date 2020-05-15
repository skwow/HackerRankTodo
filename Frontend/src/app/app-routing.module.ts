import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoViewComponent} from "./pages/todo-view/todo-view.component";
import {NewListComponent} from "./pages/new-list/new-list.component";
import {NewTaskComponent} from "./pages/new-task/new-task.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SignUpPageComponent} from "./pages/sign-up-page/sign-up-page.component";


const routes: Routes = [
    {path: '', redirectTo: '/lists', pathMatch: 'full'},
    {path: "lists", component: TodoViewComponent},
    {path: "newList", component:NewListComponent},
    {path: "login", component:LoginPageComponent},
    {path: "signUp", component:SignUpPageComponent},
    {path: "lists/:listId/:status", component:TodoViewComponent},
    {path: "lists/:listId/:status/newTask", component:NewTaskComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
