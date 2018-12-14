import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import * as fs from 'graceful-fs';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
// declare function getFiles(path): any;
// import { O_DIRECTORY } from 'constants';
// import { readdir, fstat } from 'fs';

// var fs = require('graceful-fs')
 
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  uri = 'http://localhost:4000/image';

  constructor(private http: HttpClient) { 
    // this.visibleImages = [];
    // this.visibleImages = getFiles('/assets/gallery/');
  }
  
  addImage(imageURL) {
    imageURL = '/assets/gallery/nature.jpg';

    const obj = {
      image_url: imageURL
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
  
  visibleImages = [];
  filesInDirectory = [];
  getImages(){
    // return this.visibleImages = readdirp;
    // this.listFiles('../../assets/gallery');
    // console.log("here");
    // var data = [];
    // this.readFiles('../../assets/gallery/', function (filename, content) {
    //   data[filename] = content;
    // }, function (err) {
    //   throw err;
    // });
    // return data;
    // this.filesInDirectory = fs.readdirSync('../../assets/gallery');

    // readdir('/assets/gallery');

    // Directory
    // this.visibleImages = this.http.get('/assets/gallery.json').pipe(map(response => response.json()));
    // debugger;
    // console.log('testimg');
    // this.visibleImages = getFiles('/assets/gallery/');
    // console.log('themtherefiles', this.visibleImages);
    // return this.visibleImages;

    // this.getFiles('/assets/gallery/');
    //return this.getFiles('/assets/gallery/');
    
    return this.visibleImages = IMAGES.slice(0);
  }

  getImage(id: number){
    return IMAGES.slice(0).find(image => image.id == id);
  }

//   fs = require('fs');

// readFiles(dirname, onFileContent, onError) {
//   this.fs.readdir(dirname, function(err, filenames) {
//     if (err) {
//       onError(err);
//       return;
//     }
//     filenames.forEach(function(filename) {
//       this.fs.readFile(dirname + filename, 'utf-8', function(err, content) {
//         if (err) {
//           onError(err);
//           return;
//         }
//         onFileContent(filename, content);
//       });
//     });
//   });
// }
  // listFiles(path): Observable<string[]> {
  //   this.filesInDirectory = [];

  //   this.readdirp(path).forEach(file => {
  //     this.filesInDirectory.push(file);
  //   });
  //   return of(this.filesInDirectory); 
  // }
  // getFiles(path) {
  //   // debugger;
  //   this.filesInDirectory = [];

  //   this.http.get(path).forEach( file => {
  //     // debugger;
  //     this.filesInDirectory.push(file);
  //   });
  //   // debugger; 
  //   console.log('data', this.filesInDirectory)
  //   return of(this.filesInDirectory);
  // }



}

const IMAGES = [
  {"id": 1, "category": "water", "caption": "stuff", "url": "/assets/gallery/fjords.jpg" },
  {"id": 2, "category": "trees", "caption": "stuff", "url": "/assets/gallery/nature.jpg" },
  {"id": 4, "category": "sky", "caption": "stuff", "url": "/assets/gallery/lights.jpg" },
  {"id": 3, "category": "sky", "caption": "stuff", "url": "/assets/gallery/lights.jpg" },
  {"id": 4, "category": "sky", "caption": "stuff", "url": "/assets/gallery/nature.jpg" },
  {"id": 5, "category": "sky", "caption": "stuff", "url": "/assets/gallery/fjords.jpg" },
  {"id": 6, "category": "sky", "caption": "stuff", "url": "/assets/gallery/lights.jpg" },
  {"id": 7, "category": "sky", "caption": "stuff", "url": "/assets/gallery/nature.jpg" },
  {"id": 8, "category": "sky", "caption": "stuff", "url": "/assets/gallery/Spongebob.png" },
  {"id": 9, "category": "sky", "caption": "stuff", "url": "/assets/gallery/nature.jpg" },
  {"id": 10, "category": "sky", "caption": "stuff", "url": "/assets/gallery/fjords.jpg" },
  {"id": 11, "category": "sky", "caption": "stuff", "url": "/assets/gallery/lights.jpg" },
  {"id": 12, "category": "sky", "caption": "stuff", "url": "/assets/gallery/Spongebob.png" },
  {"id": 13, "category": "sky", "caption": "stuff", "url": "/assets/gallery/Spongebob.png" },
  {"id": 14, "category": "sky", "caption": "stuff", "url": "/assets/gallery/Spongebob.png" }




]