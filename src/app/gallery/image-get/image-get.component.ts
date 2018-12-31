import { Component, OnInit } from '@angular/core';
import Image from '../../shared/image-service/Image';
import { ImageService } from '../../shared/image-service/image.service';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-image-get',
  templateUrl: './image-get.component.html',
  styleUrls: ['./image-get.component.css']
})
export class ImageGetComponent implements OnInit {

  uri = environment.apiUrlRoot + '/gallery/image';

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
    var imageObjectMap: any;
    var fulldata = [];
    this.is
      .getImages()
      .subscribe((data: Image[]) => {
        this.images = data;
        console.log(this.images)
        for (let key in this.images) {

          imageObjectMap = Object.values(this.images[key].file.data)[1]
          var imageObjectUInt8 = new Uint8Array(imageObjectMap);
          var imageObjectUInt8Buffer = new Buffer(imageObjectUInt8)
          var imageObjectUInt8BufferParsed: String = JSON.parse(imageObjectUInt8Buffer.toString());
          fulldata.push(imageObjectUInt8BufferParsed)
          console.log(imageObjectUInt8BufferParsed)
          this.images[key].fileBuffer = imageObjectUInt8BufferParsed
          console.log("buffed", this.images[key])

        }
      });
    console.log(this.images)
    // this.getDatImageForm();
  }
}
