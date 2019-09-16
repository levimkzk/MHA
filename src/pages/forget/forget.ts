import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastService } from '../../providers/toast/toast';

/**
 * Generated class for the ForgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
  mobile: string;
  getpassword: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toast: ToastService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPage');
  }
  find(){
    if(this.mobile === localStorage.getItem('mobile')){
      this.getpassword = localStorage.getItem('password');
      this.toast.show('您的密码是：'+ this.getpassword);
  } else {
    this.toast.show('请输入正确的手机号');
  }
 }
}
