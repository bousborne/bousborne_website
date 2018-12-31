import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../shared/image-service/image.service';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';
import Image from '../../shared/image-service/Image';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css']
})
export class ImageAddComponent implements OnInit {
  file;
  image: Image;
  fileBase64;
  fileBuffer;

  constructor(private http: HttpClient, private is: ImageService) {
  }

  addImage(file, image_url, image_name, image_description, fileBuffer) {
    this.is.addImage(file, image_url, image_name, image_description, fileBuffer);
  }

  onUpload(event, image_url, image_name: 'n/a', image_description: 'n/a') {
    this.addImage(this.file, image_url, image_name, image_description, this.fileBuffer);
  }

  onFileSelected(event) {
    console.log("event", event);
    console.log("test", event.target.ownerdocument)
    if (<File>event.target.files && <File>event.target.files[0]) {
      const reader = new FileReader;
      reader.onload = (event) => {
        this.fileBase64 = reader.result;
        this.fileBuffer = new Buffer(JSON.stringify(this.fileBase64)); //use stringify?
        this.file = { data: this.fileBuffer, contentType: ".jpg" };
        console.log("fileBuffer", this.fileBuffer.toString('base64'))
        console.log("fileBuffer", this.fileBuffer)

      }
      reader.readAsDataURL(<File>event.target.files[0]);
    }
  }

  ngOnInit() {
  }
}