import { InitialPage } from './../initial/initial';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService, UserInfoState } from '../../providers/user/user';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { YouradvicePage } from '../youradvice/youradvice';
import { AccountPage } from '../account/account';
import { ChangePasswordPage } from '../change-password/change-password';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  image: string;;
  username: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public imagePicker: ImagePicker,
    public domSanitizer: DomSanitizer,
    public camera: Camera) {

  }
  ionViewDidEnter(){
   this.username = localStorage.getItem('username');
  }
  Cancellation(){
    localStorage.removeItem('isLogin');
    this.navCtrl.setRoot(InitialPage);
    this.userService.removeUserInfo();
  }
  accountSetting(){
    this.navCtrl.push(AccountPage);
  }
  changePassword(){
    this.navCtrl.push(ChangePasswordPage);
  }
  youradvice(){
    this.navCtrl.push(YouradvicePage);
  }
  pickOption(){
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });
  actionSheet.present().then(value => {
    return value;
  });
}
takePhoto() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    saveToPhotoAlbum: true,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.displayErrorAlert(err);
    });
}

displayErrorAlert(err){
  console.log(err);
  let alert = this.alertCtrl.create({
     title: '错误',
     subTitle: '获取图片失败',
     buttons: ['确定']
   });
   alert.present();
}
chooseFromAlbum(){
  const options: ImagePickerOptions = {
    maximumImagesCount: 1,
    width: 100,
    height: 100,
    quality: 100
  };
    this.imagePicker.getPictures(options).then(imagedata => {
    this.image = 'data:image/jpeg;base64,' + imagedata[0];
    });

  }
}
