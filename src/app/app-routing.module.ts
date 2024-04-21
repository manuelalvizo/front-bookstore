import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { AuthGuard } from './security/user-guard.guard';
import { NoAuthGuard } from './security/login-guard.guard';
import { ActionsUsersComponent } from './components/users/actions-users/actions-users.component';

const routes: Routes = [
  {
    path: '', 
    component: BookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books', 
    component: BookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users', 
    component: ActionsUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register', 
    component: RegisterComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
