import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkItemsComponent } from './work-items/work-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortPipe } from './sort.pipe';
import { AddItemsFormComponent } from './add-items-form/add-items-form.component';


@NgModule({
  declarations: [
    UserComponent,
    UserDashboardComponent,
    ProfileComponent,
    WorkItemsComponent,
    SortPipe,
    AddItemsFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
