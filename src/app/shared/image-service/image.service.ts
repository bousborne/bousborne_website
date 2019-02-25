import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Image from '../../shared/image-service/Image';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images: Image[];

  uri = environment.apiUrlRoot + '/gallery/image';

  constructor(private http: HttpClient) { }

  addImage(file, image_url, image_name, image_description, fileBuffer) {
    const obj = {
      file: file,
      image_url: image_url,
      image_name: image_name,
      image_description: image_description,
      fileBuffer: fileBuffer
    };
    console.log("image service upload", obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done', res));
  }

  getImages() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        // 'Accept-Language': 'en-US,en;q=0.5',
        // 'Upgrade-Insecure-Requests': '1',
        // 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:64.0) Gecko/20100101 Firefox/64.0'
      })
    };
    console.log("getImages url: ", this.uri)
    return this
      .http
      .get(`${this.uri}`, httpOptions);
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
