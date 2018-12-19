// image-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Image from '../../shared/image-service/Image';
import { ImageService } from '../../shared/image-service/image.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {

  image: any = {};

  constructor(private route: ActivatedRoute,
    private router: Router,
    private is: ImageService,
    private fb: FormBuilder) {
  }

  updateImage(image_url, image_name, image_description) {
    this.route.params.subscribe(params => {
      this.is.updateImage(image_url, image_name, image_description, params['id']);
      this.router.navigate(['image']);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.is.editImage(params['id']).subscribe(res => {
        this.image = res;
      });
    });
  }
}