import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodoViewComponent} from "./pages/todo-view/todo-view.component";
import {NewListComponent} from "./pages/new-list/new-list.component";


const routes: Routes = [
    {path: "lists", component: TodoViewComponent},
    {path: "newList", component:NewListComponent},
    {path: "lists/:listId", component:TodoViewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
