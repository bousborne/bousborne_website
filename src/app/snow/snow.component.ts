import { Component, OnInit, OnChanges } from '@angular/core';
import Webcam from '../shared/webcam-service/Webcam';
import { WebcamService } from '../shared/webcam-service/webcam.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-snow',
  templateUrl: './snow.component.html',
  styleUrls: ['./snow.component.css']
})
export class SnowComponent implements OnInit {
  title = 'Benjamin Ousborne';
  webcams: Webcam[];

  constructor(private http: HttpClient, private is: WebcamService) { }

  ngOnChanges() {
  }

  ngOnInit() {
    this.is.getWebcams().subscribe((data: Webcam[]) => {
      this.webcams = data;
    });
  }

}
