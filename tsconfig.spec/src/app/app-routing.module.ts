import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthRouteGuardService } from './user-auth-route-guard.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminAuthRouteGuardService } from './admin-auth-route-guard.service';

const routes: Routes = [
  { path: 'home', component: LandingPageComponent },
  { path: 'login/:role', component: LoginComponent },
  { path: 'signup/user', component: RegisterComponent },
  { path: 'user', canActivate: [UserAuthRouteGuardService], loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'admin', canActivate: [AdminAuthRouteGuardService], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
