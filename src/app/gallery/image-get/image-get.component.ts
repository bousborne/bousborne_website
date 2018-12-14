import { Component, OnInit } from '@angular/core';
import Image from '../../shared/image-service/Image';
import { ImageService } from '../../shared/image-service/image.service';

@Component({
  selector: 'app-image-get',
  templateUrl: './image-get.component.html',
  styleUrls: ['./image-get.component.css']
})
export class ImageGetComponent implements OnInit {

 
  images: Image[];

  constructor(private is: ImageService) { }
  
  deleteImage(id) {
    this.is.deleteImage(id).subscribe(res => {
      console.log('Deleted');
    });
  }

  ngOnInit() {
    this.is
      .getImages()
      .subscribe((data: Image[]) => {
        this.images = data;
    });
  }
}