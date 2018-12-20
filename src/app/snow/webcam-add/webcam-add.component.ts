import { Component, OnInit } from '@angular/core';
import { WebcamService } from '../../shared/webcam-service/webcam.service';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import Webcam from '../../shared/webcam-service/Webcam';

@Component({
  selector: 'app-webcam-add',
  templateUrl: './webcam-add.component.html',
  styleUrls: ['./webcam-add.component.css']
})
export class WebcamAddComponent implements OnInit {
  webcam: Webcam;

  constructor(private http: HttpClient, private is: WebcamService) {
  }

  addWebcam(webcam_url, webcam_name, webcam_location_tag) {
    this.is.addWebcam(webcam_url, webcam_name, webcam_location_tag);
    console.log("web component", webcam_url)
  }

  onWebcamUpload(event, webcam_url, webcam_name, webcam_location_tag) {
    this.addWebcam(webcam_url, webcam_name, webcam_location_tag);
  }

  ngOnInit() {
  }
}