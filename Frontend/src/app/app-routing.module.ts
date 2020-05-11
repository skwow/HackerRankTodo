import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoViewComponent} from "./pages/todo-view/todo-view.component";
import {NewListComponent} from "./pages/new-list/new-list.component";
import {NewTaskComponent} from "./pages/new-task/new-task.component";


const routes: Routes = [
    {path: '', redirectTo: '/lists', pathMatch: 'full'},
    {path: "lists", component: TodoViewComponent},
    {path: "newList", component:NewListComponent},
    {path: "lists/:listId/:status", component:TodoViewComponent},
    {path: "lists/:listId/:status/newTask", component:NewTaskComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
