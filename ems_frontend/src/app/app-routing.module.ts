import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { LeaveComponent } from './leave/leave.component';
import { ManagerLeavesComponent } from './manager-leaves/manager-leaves.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: AuthComponent, canActivate: [NoAuthGuard] },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin', 'manager', 'user'] }
  },
  {
    path: 'myleaves', component: MyLeavesComponent, canActivate: [RoleGuard],
    data: { roles: ['admin', 'user'] }
  },
  {
    path: 'applyLeave', component: LeaveComponent, canActivate: [RoleGuard],
    data: { roles: ['admin', 'user'] }
  },
  {
    path: 'managerLeaves', component: ManagerLeavesComponent, canActivate: [RoleGuard],
    data: { roles: ['admin', 'manager'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
