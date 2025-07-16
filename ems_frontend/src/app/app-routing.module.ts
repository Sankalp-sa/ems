import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { LeaveComponent } from './leave/leave.component';
import { EditLeaveComponent } from './edit-leave/edit-leave.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},
  { path: 'login', component: AuthComponent, canActivate: [NoAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'myleaves', component: MyLeavesComponent, canActivate: [AuthGuard] },
  { path: 'applyLeave', component: LeaveComponent, canActivate: [AuthGuard]  },
  { path: 'update/:id', component:EditLeaveComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
