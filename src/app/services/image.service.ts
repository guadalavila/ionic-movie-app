import { Injectable } from '@angular/core';
import {
  ImagePicker,
  ImagePickerOptions,
} from '@ionic-native/image-picker/ngx';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private imagePicker: ImagePicker) { }

  getImage(): Promise<string> {
    const option: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 200,
      height: 300,
      quality: 25,
      outputType: 1,
    };
    return new Promise((resolve, reject) => {
      this.imagePicker.getPictures(option).then((results) => {
        if (results[0]) {
          const image = `data:image/jpeg;base64,${results[0]}`;
          resolve(image);
        } else {
          reject('');
        }
      },
        (err) => {
          reject(err.message);
        }
      );
    });
  }
}
