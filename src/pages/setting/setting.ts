import { InitialPage } from './../initial/initial';
import { Component } from '@angular/core';
import { UserService, UserInfoState } from '../../providers/user/user';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from "@ionic-native/camera";
import { YouradvicePage } from '../youradvice/youradvice';
import { AccountPage } from '../account/account';
import { ChangePasswordPage } from '../change-password/change-password';
import { Crop } from '@ionic-native/crop';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  photo =  'assets/imgs/blank-avatar.jpg';;
  username: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public imagePicker: ImagePicker,
    public cropService: Crop,
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
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: '手机相册',
          handler: () => {
            this.openImagePicker();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openImagePicker(){
    let options = {
      maximumImagesCount: 5,
    }
    this.imagePicker.getPictures(options)
    .then((results) => {
      this.reduceImages(results).then(() => {
        console.log('all images cropped!!');
      });
    }, (err) => { console.log(err) });
  }

  reduceImages(selected_pictures: any) : any{
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 75}).then(cropped_image => this.photo = cropped_image);
      });
    }, Promise.resolve());
  }

  takePicture(){
    let options = {
      quality: 100,
      correctOrientation: true
    };

    this.camera.getPicture(options)
    .then((data) => {
      this.cropService
      .crop(data, {quality: 75})
      .then((newImage) => {
        this.photo = newImage;
      }, error => console.error("Error cropping image", error));
    }, function(error) {
      console.log(error);
    });

  }
}
