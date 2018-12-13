import { Injectable } from '@angular/core';
// import { readFile } from 'fs';
// import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor() { }

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