import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { Pedometer } from '@ionic-native/pedometer';
import { Subscription } from 'rxjs/Subscription';
import { HttpProvider } from '../../providers/http/http';

import { SettingsProvider } from '../../providers/settings/settings';


@IonicPage()
@Component({
  selector: 'page-pedometer',
  templateUrl: 'pedometer.html',
})
export class PedometerPage {

  btnText: String = "START";
  steps: number = 0;
  goal: number;
  percentage: number;
  currentTime: Number;
  timeElapsed: any;
  //间隔
  interval: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public http: HttpProvider,
      private ref: ChangeDetectorRef,
      public platform: Platform,
     public pedometer: Pedometer,
      public modalCtrl: ModalController,
       public settings: SettingsProvider) {
        this.interval = setInterval(() => {
          this.timeElapsed = new Date().getTime()// -（+this.currentTime）// Removing timezone hours
          }, 1000)
          if(new Date().getHours() === 0 && new Date().getMinutes() === 0 && new Date().getSeconds() === 0) {
            this.steps = 0; // Resetting the steps counter
          }
          else{
            this.pedometer.startPedometerUpdates()
            .subscribe((data) => {
                this.steps = data.numberOfSteps;
                this.setPercentage();
                this.ref.detectChanges();
              });
            }
     if(new Date().getHours() === 23 && new Date().getMinutes() === 59 && new Date().getSeconds()==0){
        this.http.pedometer(this.steps).subscribe(res=>{
          if(res["Status"]=="OK"){
            console.log('steps ok');
          }
        })
      }
              this.goal = this.settings.getGoal();
              this.setPercentage();
       }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PedometerPage');
  }
  setPercentage() {
    this.percentage = (this.steps / this.goal) * 100;
  }




}
