import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './auth.guard';
import { UserListComponent } from './component/user-list/user-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  //{ path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'userlist', component: UserListComponent, canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
