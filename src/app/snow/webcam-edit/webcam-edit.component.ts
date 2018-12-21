import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebcamService } from '../../shared/webcam-service/webcam.service';
import Webcam from '../../shared/webcam-service/Webcam';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/destination';

@Component({
  selector: 'app-webcam-edit',
  templateUrl: './webcam-edit.component.html',
  styleUrls: ['./webcam-edit.component.css']
})
export class WebcamEditComponent implements OnInit {

  webcams: Webcam[];
  webcam: Webcam;
  id: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webService: WebcamService,
    private http: HttpClient
  ) { }

  onWebcamUpdate(event, webcam_url, webcam_name, webcam_location_tag) {
    this.webService.updateWebcam(webcam_url, webcam_name, webcam_location_tag, this.id)
    this.gotoWebcams();
  }

  gotoWebcams() {
    this.router.navigate(['/snow/webcam']);
  }



  ngOnInit() {
    this.webService
      .getWebcams()
      .subscribe((data: Webcam[]) => {
        this.webcams = data;
        this.id = this.route.snapshot.paramMap.get('id')
        this.webcam = this.findObjectByKey(this.webcams, '_id', this.id)

      });
  }

  findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return null;
  }
}