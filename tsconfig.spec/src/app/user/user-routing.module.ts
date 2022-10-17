import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserComponent } from './user.component';
import { WorkItemsComponent } from './work-items/work-items.component';

const routes: Routes = [{ path: '', component: UserComponent }];

const userRoutes: Routes = [
  {
    path: 'dashboard', component: UserDashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent, },
      { path: 'work-items', component: WorkItemsComponent, }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
