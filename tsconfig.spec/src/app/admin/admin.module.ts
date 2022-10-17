import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { TerminalsComponent } from './terminals/terminals.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { WorkItemsComponent } from './work-items/work-items.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminComponent,
    TerminalsComponent,
    VehiclesComponent,
    WorkItemsComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})

export class AdminModule { }
