import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../admin/admin/admin.component';
import { AdminDashboardComponent } from '../admin/admin-dashboard/admin-dashboard.component'
import { ManageWebcamsComponent } from '../admin/manage-webcams/manage-webcams.component';

import { AuthGuard } from './auth.guard';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'manage-webcams', component: ManageWebcamsComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
