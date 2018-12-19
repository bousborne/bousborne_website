// Image.ts
import { Buffer } from 'buffer';

export default class Image {
  file: { data: Buffer, contentType: String };
  image_url: String;
  image_name: String;
  image_description: String;
  dataBase64: any;
}