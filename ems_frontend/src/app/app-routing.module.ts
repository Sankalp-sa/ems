import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
<<<<<<< HEAD
import { LeaveComponent } from './leave/leave.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Assuming AuthComponent is the dashboard
  { path: 'applyLeave', component: LeaveComponent, canActivate: [AuthGuard]  }
=======
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},
  { path: 'login', component: AuthComponent, canActivate: [NoAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'myleaves', component: MyLeavesComponent, canActivate: [AuthGuard] },
>>>>>>> 78c79354c047761c5f825fb51ea71f7e2bd79e23
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
