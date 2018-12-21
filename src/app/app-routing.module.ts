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

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'snow', component: SnowComponent },
  { path: 'snow/webcam/create', component: WebcamAddComponent },
  { path: 'snow/webcam/edit/:id', component: WebcamEditComponent },
  { path: 'snow/webcam', component: WebcamGetComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/image/create', component: ImageAddComponent },
  { path: 'gallery/image/edit/:id', component: ImageEditComponent },
  { path: 'gallery/image', component: ImageGetComponent },
  { path: '**', component: PageNotFoundComponent },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
