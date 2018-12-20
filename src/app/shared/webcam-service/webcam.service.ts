import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Webcam from './Webcam';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {
  webcams: Webcam[];

  uri = 'http://localhost:4000/snow/webcam';

  constructor(private http: HttpClient) { }

  addWebcam(webcam_url, webcam_name, webcam_location_tag) {
    const obj = {
      webcam_url: webcam_url,
      webcam_name: webcam_name,
      webcam_location_tag: webcam_location_tag,
    };
    console.log("webcam service upload", obj);
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => console.log('Done', res));
  }

  getWebcams() {
    return this
      .http
      .get(`${this.uri}`);
  }

  editWebcam(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  deleteWebcam(id) {
    return this
      .http
      .get(`${this.uri}/delete/${id}`);
  }

  updateWebcam(webcam_url, webcam_name, webcam_location_tag, id) {

    const obj = {
      webcam_url: webcam_url,
      webcam_name: webcam_name,
      webcam_location_tag: webcam_location_tag,
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }
}
