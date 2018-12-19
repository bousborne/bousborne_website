import { Component, OnInit } from '@angular/core';
import Image from '../../shared/image-service/Image';
import { ImageService } from '../../shared/image-service/image.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-get',
  templateUrl: './image-get.component.html',
  styleUrls: ['./image-get.component.css']
})
export class ImageGetComponent implements OnInit {

  uri = 'http://localhost:4000/gallery/image';

  images: Image[];
  image;
  constructor(private is: ImageService, private http: HttpClient) { }

  deleteImage(id) {
    this.is.deleteImage(id).subscribe(res => {
      console.log('Deleted');
    });
  }

  getImageForm(event) {
    var formData = new FormData();
    var request = new XMLHttpRequest();
    request.open("GET", `${this.uri}/get/5c149b6badd2591aa6b27d5d`);
    request.send(formData);
  }


  ngOnInit() {
    this.is
      .getImages()
      .subscribe((data: Image[]) => {
        this.images = data;
      });
  }
}
