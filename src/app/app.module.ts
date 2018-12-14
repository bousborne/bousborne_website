import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SnowComponent } from './snow/snow.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImagesService } from './_shared/images-service/images.service';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { GstAddComponent } from './gst-add/gst-add.component';
import { GstGetComponent } from './gst-get/gst-get.component';
import { GstEditComponent } from './gst-edit/gst-edit.component';

const appRoutes: Routes = [
  { path: 'snow', component: SnowComponent },
  { path: 'gallery', component: GalleryComponent },
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
    GstAddComponent,
    GstGetComponent,
    GstEditComponent
    
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    AngularFileUploaderModule,
    AppRoutingModule
  ],
  providers: [ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

