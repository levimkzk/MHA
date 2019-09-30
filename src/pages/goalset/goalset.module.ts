import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalsetPage } from './goalset';

@NgModule({
  declarations: [
    GoalsetPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalsetPage),
  ],
})
export class GoalsetPageModule {}
