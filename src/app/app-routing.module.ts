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

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // { path: 'home', component: HomeComponent },

  { path: 'snow', component: SnowComponent },
  { path: 'snow/webcam', component: WebcamGetComponent, data: { animation: 'webcams' } },
  { path: 'snow/webcam/create', component: WebcamAddComponent },
  { path: 'snow/webcam/edit/:id', component: WebcamEditComponent },

  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/image', component: ImageGetComponent },
  { path: 'gallery/image/create', component: ImageAddComponent },
  { path: 'gallery/image/edit/:id', component: ImageEditComponent },

  { path: 'login', component: LoginComponent },


  { path: '', redirectTo: '/', pathMatch: 'full' },
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
