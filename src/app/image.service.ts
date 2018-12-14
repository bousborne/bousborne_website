import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  uri = 'http://localhost:4000/gallery/image';

  constructor(private http: HttpClient) { }

  addImage(image_url, image_name, image_description) {
    const obj = {
      image_url: image_url,
      image_name: image_name,
      image_description: image_description
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getImages() {
    return this
           .http
           .get(`${this.uri}`);
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
