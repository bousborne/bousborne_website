import { Component, OnChanges, OnInit, Input } from '@angular/core';
import Image from '../shared/image-service/Image';
import { ImageService } from '../shared/image-service/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {
  title = 'Recent Photos'
  @Input() filterBy?: string = 'all'
  // visibleImages: any[] = [];
  
  images: Image[];
  
  constructor(private is: ImageService){
  }

  ngOnChanges(){
  }

  ngOnInit() {
    this.is
    .getImages()
    .subscribe((data: Image[]) => {
      this.images = data;
  });
  }

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png",
    maxSize: "1",
    uploadAPI: {
      url: "../../assets/gallery/",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      }
    },
    theme: "dragNDrop",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true
  };
}
