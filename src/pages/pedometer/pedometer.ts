import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Pedometer, IPedometerData } from '@ionic-native/pedometer';
import { Subscription } from 'rxjs/Subscription';
import { HttpProvider } from '../../providers/http/http';



@IonicPage()
@Component({
  selector: 'page-pedometer',
  templateUrl: 'pedometer.html',
})
export class PedometerPage {

  startCount: Boolean = true;
  //btnText: String = "START";
  stepsCount: any = 0;
  currentTime: Number;
  timeElapsed: any;
  //间隔
  interval: any;
  caloriesBurnt: any = 0;
  pedometer: Pedometer;
  pedometerSubscription: Subscription;
  time: any;
  time1: any;
  time2: any;
  currentH: any;
  currentM: any;
  currentS: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedometerPage');
    this.interval = setInterval(() => {
      this.timeElapsed = new Date().getTime()// -（+this.currentTime）// Removing timezone hours
      }, 1000)
      if(new Date().getHours() === 0 && new Date().getMinutes() === 0 && new Date().getSeconds() === 0) {
        this.stepsCount = 0; // Resetting the steps counter
        this.caloriesBurnt = 0; //Resetting the calories counter
      }
      else{
        this.pedometer.isDistanceAvailable()
         .then((available: boolean) => console.log(available))
         .catch((error: any) => console.log(error));

        this.pedometerSubscription = this.pedometer.startPedometerUpdates()
        .subscribe((data: IPedometerData) => {
          this.stepsCount = data.numberOfSteps;
          this.caloriesBurnt = Math.floor(this.stepsCount / 20); // Estimated that approx 20 steps burn 1 Calorie.
        });
      }
      if(new Date().getHours() === 23 && new Date().getMinutes() === 59 && new Date().getSeconds()==0){
        this.http.pedometer(this.stepsCount).subscribe(res=>{
          if(res["Status"]=="OK"){
            console.log('steps ok');
          }
        })
      }
  }
}
