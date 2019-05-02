import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  uri = environment.apiUrlRoot + '/gallery/image';
  constructor(private http: HttpClient) { }

  sendEmail(sendEmailData) {
    console.log("email service, sending email");
    console.log("email service uri", this.uri);
    console.log("Email Service sendEmailData = ", sendEmailData)
    const httpOptions = {

    };
    const obj = {
    };
    console.log("email service send", obj);
    this.http.post(`${this.uri}/emailpost`, sendEmailData)
      .subscribe(res => console.log('Done', res));
  }
}