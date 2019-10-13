import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Subscription } from 'rxjs/Subscription';
import { HttpProvider } from '../../providers/http/http';


@IonicPage()
@Component({
  selector: 'page-sleep',
  templateUrl: 'sleep.html',
})
export class SleepPage {

  accelerationSubscription: Subscription;
  sleep: any = {};
  time: any;
  timesleep: any;
  timegetup: any;
  accelerationX: number;
  accelerationY: number;
  accelerationZ: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private deviceMotion: DeviceMotion,
    public http: HttpProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SleepPage');
  }
   gotosleep(){
    this.sleep.gotosleep=new Date(new Date().getTime()+8*60*60*1000).toISOString();//北京时间
    this.timesleep=new Date().getTime();
    /** this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(
      'Acceleration X: ' + acceleration.x + '\n' +

      'Acceleration Y: ' + acceleration.y + '\n' +

      'Acceleration Z: ' + acceleration.z + '\n' +

      'Timestamp: '      + acceleration.timestamp + '\n'),
      (error: any) => console.log(error)
    );*/
    this.accelerationSubscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      console.log(
      'Acceleration X: ' + acceleration.x + '\n' +

      'Acceleration Y: ' + acceleration.y + '\n' +

      'Acceleration Z: ' + acceleration.z + '\n' +

      'Timestamp: '      + acceleration.timestamp + '\n');
    });
  }
  getup(){
    this.sleep.getup=new Date(new Date().getTime()+8*60*60*1000).toISOString();//北京时间
    //this.accelerationSubscription.unsubscribe();
    this.timegetup=new Date().getTime();
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.accelerationZ = 0;
    this.sleep.time = new Date((this.timegetup -this.timesleep)).toISOString();
    this.http.sleeptime(this.accelerationX, this.accelerationY, this.accelerationZ).subscribe(res=>{
      if(res["Status"]=="OK"){
        console.log('sleeptime ok')
      }
    })
  }
}
