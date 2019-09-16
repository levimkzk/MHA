import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YouradvicePage } from './youradvice';

@NgModule({
  declarations: [
    YouradvicePage,
  ],
  imports: [
    IonicPageModule.forChild(YouradvicePage),
  ],
})
export class YouradvicePageModule {}
