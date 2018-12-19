import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Image from '../../shared/image-service/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images: Image[];

  uri = 'http://localhost:4000/gallery/image';

  constructor(private http: HttpClient) { }

  addImage(file, image_url, image_name, image_description) {
    const obj = {
      file: file,
      image_url: image_url,
      image_name: image_name,
      image_description: image_description
    };
    console.log("image service upload", obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done', res));
  }

  getImages() {
    return this
      .http
      .get(`${this.uri}`);
  }

  // getImages(images, imagesOutput) {
  //   var imageObjectMap: any;
  //   var fulldata = [];
  //   return this
  //     .http
  //     .get(`${this.uri}`).subscribe((data: Image[]) => {
  //       images = data;
  //       for (let key in images) {
  //         imageObjectMap = Object.values(images[key].file.data)[1]
  //         var imageObjectUInt8 = new Uint8Array(imageObjectMap);
  //         var imageObjectUInt8Buffer = new Buffer(imageObjectUInt8)
  //         var imageObjectUInt8BufferParsed: String = JSON.parse(imageObjectUInt8Buffer.toString());
  //         fulldata.push(imageObjectUInt8BufferParsed)
  //       }
  //       imagesOutput = fulldata
  //     });
  // }

  getImageFromForm() {

  }

  editImage(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  deleteImage(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

  updateImage(image_url, image_name, image_description, id) {

    const obj = {
      image_url: image_url,
      image_name: image_name,
      image_description: image_description
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }
}
