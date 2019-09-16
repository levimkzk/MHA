import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs, Platform } from 'ionic-angular';

import { PedometerPage } from '../pedometer/pedometer';
import { SleepPage } from '../sleep/sleep';
import { VoicePage } from '../voice/voice';

import { BackButtonService } from '../../providers/backButton/backButton';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = PedometerPage;
  tab2Root = SleepPage;
  tab3Root = VoicePage;

  constructor(public navCtrl: NavController,
    public platform: Platform,
    public backButton: BackButtonService,
    private backgroundMode: BackgroundMode,
    ) {
     this.backgroundMode.enable();
     this.platform.ready().then(() => {
      this.backButton.registerBackButtonAction(this.tabRef);
    });
  }

}
