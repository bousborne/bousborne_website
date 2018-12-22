import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';

import { AuthRoutingModule } from '../auth/auth-routing.module';
import { ManageWebcamsComponent } from './manage-webcams/manage-webcams.component';

@NgModule({
  declarations: [AdminDashboardComponent, AdminComponent, ManageWebcamsComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
})
export class AdminModule { }
