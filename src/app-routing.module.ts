import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from "./app/gallery/gallery.component";
import { AppComponent } from './app/app.component';

import { ImageAddComponent } from './app/gallery/image-add/image-add.component';
import { ImageEditComponent } from './app/gallery/image-edit/image-edit.component';
import { ImageGetComponent } from './app/gallery/image-get/image-get.component';
import { SnowComponent } from './app/snow/snow.component';
import { NavigationComponent } from './app/navigation/navigation.component';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'snow', component: SnowComponent },
  { path: 'gallery', component: GalleryComponent },
  {
    path: 'gallery/image/create',
    component: ImageAddComponent
  },
  {
    path: 'gallery/image/edit/:id',
    component: ImageEditComponent
  },
  {
    path: 'gallery/image',
    component: ImageGetComponent
  },
  { path: '**', component: PageNotFoundComponent },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    SnowComponent,
    NavigationComponent,
    PageNotFoundComponent,
    GalleryComponent,
    ImageAddComponent,
    ImageGetComponent,
    ImageEditComponent
    
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
