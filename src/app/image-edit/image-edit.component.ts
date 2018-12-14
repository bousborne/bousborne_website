// import { Component, OnInit } from '@angular/core';
// import { ImageService } from '../image.service';

// @Component({
//   selector: 'app-image-edit',
//   templateUrl: './image-edit.component.html',
//   styleUrls: ['./image-edit.component.css']
// })
// export class ImageEditComponent implements OnInit {

//   image: any = {};
//   constructor(private is: ImageService) {
//     // this.createForm();
//   }

//   ngOnInit() {
//   }

// }


// gst-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import Image from '../Image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {

  image: any = {};
  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private is: ImageService,
    private fb: FormBuilder) {
      this.createForm();
 }

  createForm() {
    this.angForm = this.fb.group({
        image_url: ['', Validators.required ],
        image_name: ['', Validators.required ],
        image_description: ['', Validators.required ]
      });
    }

    updateImage(person_name, business_name, business_gst_number) {
      this.route.params.subscribe(params => {
         this.is.updateImage(person_name, business_name, business_gst_number, params['id']);
         this.router.navigate(['business']);
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