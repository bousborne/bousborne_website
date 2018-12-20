// webcam-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Webcam from '../../shared/webcam-service/Webcam';
import { WebcamService } from '../../shared/webcam-service/webcam.service';

@Component({
  selector: 'app-webcam-edit',
  templateUrl: './webcam-edit.component.html',
  styleUrls: ['./webcam-edit.component.css']
})
export class WebcamEditComponent implements OnInit {

  webcam: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private is: WebcamService,
    private fb: FormBuilder) {
  }

  updateWebcam(webcam_url, webcam_name, webcam_location_tag) {
    this.route.params.subscribe(params => {
      this.is.updateWebcam(webcam_url, webcam_name, webcam_location_tag, params['id']);
      this.router.navigate(['webcam']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.is.editWebcam(params['id']).subscribe(res => {
        this.webcam = res;
      });
    });
  }
}