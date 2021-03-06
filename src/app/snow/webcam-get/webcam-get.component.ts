import { Component, OnInit } from '@angular/core';
import Webcam from '../../shared/webcam-service/Webcam';
import { WebcamService } from '../../shared/webcam-service/webcam.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-webcam-get',
  templateUrl: './webcam-get.component.html',
  styleUrls: ['./webcam-get.component.css']
})
export class WebcamGetComponent implements OnInit {

  uri = environment.apiUrlRoot + '/snow/webcam';
  // uri = 'http://localhost:4000/snow/webcam';

  webcams: Webcam[];
  selectedID: number;
  // webcams$: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webService: WebcamService,
    private http: HttpClient
  ) { }

  deleteWebcam(id) {
    this.webService.deleteWebcam(id).subscribe(res => {
      console.log('Deleted');
    });
  }

  getWebcams() {
    this.webService.getWebcams()
  }

  ngOnInit() {
    this.webService
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
