import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoViewComponent} from "./pages/todo-view/todo-view.component";
import {NewListComponent} from "./pages/new-list/new-list.component";
import {NewTaskComponent} from "./pages/new-task/new-task.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SignUpPageComponent} from "./pages/sign-up-page/sign-up-page.component";
import {EditListComponent} from "./dialogs/edit-list/edit-list.component";
import {AdminLoginComponent} from "./pages/admin-login/admin-login.component";
import {AdminDashboardComponent} from "./pages/admin-dashboard/admin-dashboard.component";


const routes: Routes = [
    {path: '', redirectTo: '/lists', pathMatch: 'full'},
    {path: "adminLogin", component: AdminLoginComponent},
    {path: "adminDashboard", component: AdminDashboardComponent},
    {path: "lists", component: TodoViewComponent},
    {path: "login", component:LoginPageComponent},
    {path: "signUp", component:SignUpPageComponent},
    {path: "lists/:listId/:status", component:TodoViewComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
