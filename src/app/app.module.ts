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
import { ImageAddComponent } from './gallery/image-add/image-add.component';
import { ImageEditComponent } from './gallery/image-edit/image-edit.component';
import { ImageGetComponent } from './gallery/image-get/image-get.component';
import { ImageService } from './shared/image-service/image.service';
import { WebcamAddComponent } from './snow/webcam-add/webcam-add.component';
import { WebcamEditComponent } from './snow/webcam-edit/webcam-edit.component';
import { WebcamGetComponent } from './snow/webcam-get/webcam-get.component';
import { WebcamService } from './shared/webcam-service/webcam.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab, faGithub, faInstagram, faGithubAlt, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: 'snow', component: SnowComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/image/create', component: ImageAddComponent },
  { path: 'gallery/image/edit/:id', component: ImageEditComponent },
  { path: 'gallery/image', component: ImageGetComponent },
  { path: 'snow/webcam/create', component: WebcamAddComponent },
  { path: 'snow/webcam/edit/:id', component: WebcamEditComponent },
  { path: 'snow/webcam', component: WebcamGetComponent },
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
    WebcamAddComponent,
    WebcamGetComponent,
    WebcamEditComponent,
    PageNotFoundComponent,
    GalleryComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    AngularFileUploaderModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faCoffee, far, fas, fab, faGithub, faInstagram, faGithubAlt, faGithubSquare);
  }
}

