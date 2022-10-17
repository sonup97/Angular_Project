import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { TerminalsComponent } from './terminals/terminals.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { WorkItemsComponent } from './work-items/work-items.component';

const routes: Routes = [
  {
    path: 'dashboard', component: AdminDashboardComponent,
    children: [
      { path: "terminals", component: TerminalsComponent },
      { path: "work-items", component: WorkItemsComponent },
      { path: "vehicles", component: VehiclesComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
