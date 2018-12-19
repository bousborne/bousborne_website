import { Component, OnChanges, OnInit, Input } from '@angular/core';
import Image from '../shared/image-service/Image';
import { ImageService } from '../shared/image-service/image.service';
import { HttpClient } from '@angular/common/http';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {
  title = 'Recent Photos'
  @Input() filterBy?: string = 'all'
  images: Image[];
  imagesOutput;

  constructor(private http: HttpClient, private is: ImageService) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
    // this.is.getImages(this.images, this.imagesOutput);
    var imageObjectMap: any;
    var fulldata = [];
    this.is.getImages().subscribe((data: Image[]) => {
      this.images = data;
      for (let key in this.images) {
        imageObjectMap = Object.values(this.images[key].file.data)[1]
        var imageObjectUInt8 = new Uint8Array(imageObjectMap);
        var imageObjectUInt8Buffer = new Buffer(imageObjectUInt8)
        var imageObjectUInt8BufferParsed: String = JSON.parse(imageObjectUInt8Buffer.toString());
        fulldata.push(imageObjectUInt8BufferParsed)
      }
      this.imagesOutput = fulldata
    });
  }
}