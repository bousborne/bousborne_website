import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
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
import { HomeComponent } from './home/home.component';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { ImagesFilterPipe } from './shared/filter/filter.pipe'
import { AlertComponent } from './auth/alert/alert.component';
import { JwtInterceptor } from './auth/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './auth/_helpers/error.interceptor';

import { RegisterComponent } from './auth/register/register.component';
import { fakeBackendProvider } from './auth/_helpers/fake-backend';
import { Alert } from 'selenium-webdriver';
// import { routing } from './app.routing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NhlComponent } from './nhl/nhl.component';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

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
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    NhlComponent,
    ImagesFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFileUploaderModule,
    FontAwesomeModule,
    AdminModule,
    AuthModule,
    //Always last (I think)
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ImageService,
    WebcamService,

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faCoffee, far, fas, fab, faGithub, faInstagram, faGithubAlt, faGithubSquare);
  }
}

