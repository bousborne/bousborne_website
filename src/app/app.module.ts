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
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ImageAddComponent } from './image-add/image-add.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ImageGetComponent } from './image-get/image-get.component';
import { ImageService } from './image.service';

const appRoutes: Routes = [
  { path: 'snow', component: SnowComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/image/create', component: ImageAddComponent },
  { path: 'gallery/image/edit/:id', component: ImageEditComponent },
  { path: 'gallery/image', component: ImageGetComponent },
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
    ImageAddComponent,
    ImageGetComponent,
    ImageEditComponent,
    PageNotFoundComponent,
    GalleryComponent,
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
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

