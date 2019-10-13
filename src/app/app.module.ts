import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingPage } from '../pages/setting/setting';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PrivacyPage } from '../pages/register/privacy/privacy';
import { InitialPage } from '../pages/initial/initial';
import { YouradvicePage } from './../pages/youradvice/youradvice';
import { AccountPage } from './../pages/account/account';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { PedometerPage } from '../pages/pedometer/pedometer';
import { MapPage } from '../pages/map/map';
import { SleepPage } from '../pages/sleep/sleep';
import { VoicePage } from '../pages/voice/voice';
import { ForgetPage } from '../pages/forget/forget';
import { GoalsetPage } from '../pages/goalset/goalset';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { HttpProvider } from '../providers/http/http';
import { ToastService } from '../providers/toast/toast';
import { UserService } from '../providers/user/user';
import { VerifyService } from '../providers/verify/verify';
import { Camera } from "@ionic-native/camera";
import { ImagePicker } from "@ionic-native/image-picker";
import { DirectivesModule } from "../directives/directives.module";
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceMotion } from '@ionic-native/device-motion';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer';
import { FileTransfer } from '@ionic-native/file-transfer';
import { BackButtonService } from '../providers/backButton/backButton';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SettingsProvider } from '../providers/settings/settings';
import { CameraGalleryProvider } from '../providers/camera-gallery/camera-gallery';
import { BaiduMapLoc } from 'baidumaploc';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PrivacyPage,
    YouradvicePage,
    PedometerPage,
    MapPage,
    SleepPage,
    VoicePage,
    ForgetPage,
    AccountPage,
    ChangePasswordPage,
    InitialPage,
    GoalsetPage,
    SettingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      mode: 'md',//'md'/'ios'
      backButtonIcon:'arrow-back',//头部返回键的文字
      tabsHideOnSubPages: 'true'//二级页面不显示底部栏
    }),
    HttpClientModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PrivacyPage,
    YouradvicePage,
    AccountPage,
    PedometerPage,
    MapPage,
    ForgetPage,
    GoalsetPage,
    SleepPage,
    VoicePage,
    ChangePasswordPage,
    InitialPage,
    SettingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    Camera,
    HttpClientModule,
    Geolocation,
    ImagePicker,
    ToastService,
    SettingsProvider,
    File,
    FileTransfer,
    BackButtonService,
    BackgroundMode,
    Pedometer,
    DeviceMotion,
    UserService,
    Media,
    CameraGalleryProvider,
    VerifyService,
    BaiduMapLoc,
  ]
})
export class AppModule {}
