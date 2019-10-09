import { InitialPage } from './../initial/initial';
import { Component } from '@angular/core';
import { UserService, UserInfoState } from '../../providers/user/user';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from "@ionic-native/camera";
import { YouradvicePage } from '../youradvice/youradvice';
import { AccountPage } from '../account/account';
import { ChangePasswordPage } from '../change-password/change-password';
import { SettingsProvider } from '../../providers/settings/settings';
import { GoalsetPage } from '../goalset/goalset';
import { CameraGalleryProvider } from '../../providers/camera-gallery/camera-gallery';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  photo =  'assets/imgs/blank-avatar.jpg';;
  username: string;
  goal: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public imagePicker: ImagePicker,
    public modalCtrl: ModalController,
    public settings: SettingsProvider,
    private cameragalleryProvider: CameraGalleryProvider,
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
  showOptions() {
    let modal = this.modalCtrl.create(GoalsetPage);
    modal.onDidDismiss((result) => {
      if (result) {
        this.goal = result;
      }
    })
    modal.present();
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
    this.cameragalleryProvider.selectImageFromGellary().then(data => {
      this.photo = 'data:image/jpeg;base64,' + data;
    });
  }

  takePicture(){
    this.cameragalleryProvider.takeImage().then(data => {
      this.photo = 'data:image/jpeg;base64,' + data;
    });

  }
}
