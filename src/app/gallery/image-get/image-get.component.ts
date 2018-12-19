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
  info;
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
    console.log("here brah", formData.get("file"));
    // image = formData;
  }

  getDatImageForm() {
    var formData = new FormData();
    var request = new XMLHttpRequest();
    request.open("GET", `${this.uri}/get/5c14a2f5add2591aa6b27d64`);
    request.send(formData);
    console.log("here brah to get the file", formData.get("file"));


    var formData = new FormData();
    var request = new XMLHttpRequest();
    request.open("GET", `${this.uri}`);
    request.send(formData);
    console.log("here brah bro", formData);
    this.image = formData.getAll;
    console.log(this.image);
    // image = formData;

    // this.info = this
    // .http
    // .get(`${this.uri}`);


    this.http.get(`${this.uri}`).subscribe((data: Image[]) => {
      console.log("bra", data)
      this.image = data;
      this.images = data;
    });
    //.subscribe(
    //   (files)=>{console.log('got r', files)}
    // )
    console.log("info", this.images)
  }

  ngOnInit() {
    this.is
      .getImages()
      .subscribe((data: Image[]) => {
        this.images = data;
        console.log(this.images)

      });
    console.log(this.images)
    // this.getDatImageForm();
  }
}
