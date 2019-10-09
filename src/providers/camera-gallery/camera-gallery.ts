import { Injectable } from '@angular/core';

//Camera
import { Camera, CameraOptions  } from '@ionic-native/camera';

@Injectable()
export class CameraGalleryProvider {

  constructor( private camera: Camera) {
  }

  takeImage(){

    const options: CameraOptions  = { 
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA, //included seperatly
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
    //  allowEdit: true
    }
    
    return new Promise(resolve => {
        this.camera.getPicture(options).then(
          imageData => resolve(imageData),
          error => alert(error)
        );
    });
  };

  selectImageFromGellary(){
    const options : CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    //  maximumImagesCount: 1 //Image count
    }

    return new Promise(resolve => {
      this.camera.getPicture(options).then(
        imageData => resolve(imageData),
        error => alert(error)
      );
    });
  }

}
