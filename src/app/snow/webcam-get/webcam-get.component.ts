import { Component, OnInit } from '@angular/core';
import Webcam from '../../shared/webcam-service/Webcam';
import { WebcamService } from '../../shared/webcam-service/webcam.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-webcam-get',
  templateUrl: './webcam-get.component.html',
  styleUrls: ['./webcam-get.component.css']
})
export class WebcamGetComponent implements OnInit {

  uri = 'http://localhost:4000/snow/webcam';

  webcams: Webcam[];
  constructor(private is: WebcamService, private http: HttpClient) { }

  deleteWebcam(id) {
    this.is.deleteWebcam(id).subscribe(res => {
      console.log('Deleted');
    });
  }

  getWebcams() {
    this.is.getWebcams()
  }

  ngOnInit() {
    this.is
      .getWebcams()
      .subscribe((data: Webcam[]) => {
        this.webcams = data;
        console.log(this.webcams)

      });
  }

  output($scope) {
    console.log("here now dude")
  }

  isImage($scope) {
    console.log("here", $scope.webcam_location_tag.toString(), $scope.webcam_url)
    if ($scope.webcam_location_tag == 'traffic') { return true; }
    else { return false; }
  }
}
