import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Webcam from './Webcam';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {
  webcam: Webcam;
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

  getWebcams(): Observable<Webcam[]> {
    return this
      .http
      .get<Webcam[]>(`${this.uri}`);
  }

  getWebcam(id): Observable<Webcam> {
    return this
      .http
      .get<Webcam>(`${this.uri}/edit/${id}`);
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
      .put(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done', res));
  }
}
