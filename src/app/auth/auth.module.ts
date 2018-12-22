import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    // LoginComponent,
    // AlertComponent,
    // RegisterComponent
  ]
})
export class AuthModule { }