import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SnowComponent } from './snow/snow.component';
import { WebcamAddComponent } from './snow/webcam-add/webcam-add.component';
import { WebcamEditComponent } from './snow/webcam-edit/webcam-edit.component';
import { WebcamGetComponent } from './snow/webcam-get/webcam-get.component';

import { GalleryComponent } from './gallery/gallery.component';
import { ImageAddComponent } from './gallery/image-add/image-add.component';
import { ImageEditComponent } from './gallery/image-edit/image-edit.component';
import { ImageGetComponent } from './gallery/image-get/image-get.component';

import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from '../app/admin/admin/admin.component'

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // { path: 'home', component: HomeComponent },

  { path: 'snow', component: SnowComponent },
  { path: 'snow/webcam', component: WebcamGetComponent, data: { animation: 'webcams' }, canActivate: [AuthGuard] },
  { path: 'snow/webcam/create', component: WebcamAddComponent, canActivate: [AuthGuard] },
  { path: 'snow/webcam/edit/:id', component: WebcamEditComponent, canActivate: [AuthGuard] },

  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/image', component: ImageGetComponent, canActivate: [AuthGuard] },
  { path: 'gallery/image/create', component: ImageAddComponent, canActivate: [AuthGuard] },
  { path: 'gallery/image/edit/:id', component: ImageEditComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },


  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '/', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }

];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  // declarations: [
  //   WebcamGetComponent,
  //   WebcamEditComponent
  // ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
