import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { ImagesService } from "../_shared/images-service/images.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {
  title = 'Recent Photos'
  @Input() filterBy?: string = 'all'
  visibleImages: any[] = [];
  
  constructor(private imagesService: ImagesService){
    this.visibleImages = this.imagesService.getImages();
  }

  ngOnChanges(){
    this.visibleImages = this.imagesService.getImages();
  }

  ngOnInit() {
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
