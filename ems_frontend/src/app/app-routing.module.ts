import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // { path: 'add', loadChildren: () => import('./todos/add-todo/add-todo.module').then(m => m.AddTodoModule), canActivate: [AuthGuard] },
  // { path: 'get', loadChildren: () => import('./todos/get-todo/get-todo.module').then(m => m.GetTodoModule), canActivate: [AuthGuard] },
  // { path: 'update/:id', loadChildren: () => import('./todos/update-todo/update-todo.module').then(m => m.UpdateTodoModule), canActivate: [AuthGuard] },
  // { path: 'details/:id', loadChildren: () => import('./todos/view-details/view-details.module').then(m => m.ViewDetailsModule), canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
