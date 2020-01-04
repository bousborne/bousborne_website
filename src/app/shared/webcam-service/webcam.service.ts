import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Webcam from './Webcam';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LogService } from '../libraries/log-service/log.service';

@Injectable({
  providedIn: 'root'
})
export class WebcamService {
  webcam: Webcam;
  uri = environment.apiUrlRoot + '/snow/webcam'
  constructor(private http: HttpClient, private logger: LogService) { }

  addWebcam(webcam_url, webcam_name, webcam_location_tag) {
    const obj = {
      webcam_url: webcam_url,
      webcam_name: webcam_name,
      webcam_location_tag: webcam_location_tag,
    };
    this.logger.log("Adding webcam from webcam service: " + JSON.stringify(obj));
    this.http.post(`${this.uri}/add`, obj)
      .subscribe(res => this.logger.log('Done', res));
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
