import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../shared/image-service/image.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {

  constructor(private is: ImageService) {
    // this.createForm();
  }

  addImage(image_url, image_name: 'n/a', image_description: 'n/a') {
    this.is.addImage(image_url, image_name, image_description);
  }

  ngOnInit() {
  }

}

// import { Component, OnInit } from '@angular/core';
// import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
// import { ImageService } from '../image.service';

// @Component({
//   selector: 'app-image-add',
//   templateUrl: './image-add.component.html',
//   styleUrls: ['./image-add.component.css']
// })
// export class ImageAddComponent implements OnInit {

//   angForm: FormGroup; 
//   constructor(private fb: FormBuilder, private is: ImageService) {
//     this.createForm();
//   }

//   createForm() {
//     this.angForm = this.fb.group({
//       image_url: ['', Validators.required ],
//       image_name: ['', Validators.required ],
//       image_description: ['', Validators.required ]
//     });
//   }

//   addImage(image_url, image_name, image_description) {
//     this.is.addImage(image_url, image_name, image_description);
//   }
//   ngOnInit() {
//   }

// }
