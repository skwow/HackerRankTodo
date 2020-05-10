import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoViewComponent} from "./pages/todo-view/todo-view.component";


const routes: Routes = [
  {
    path: "", component:TodoViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
