import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SnowComponent } from './snow/snow.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImagesService } from './_shared/images-service/images.service';
import { AngularFileUploaderModule } from "angular-file-uploader";

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
    GalleryComponent
    
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AngularFileUploaderModule,
    AppRoutingModule
  ],
  providers: [ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

