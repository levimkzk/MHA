import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { UserService, UserInfoState } from '../../providers/user/user';
import { ToastService } from '../../providers/toast/toast';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

    // 旧密码
    oldPassword: string = '';
    // 新密码
    newPassword: string = '';
    // 再次输入密码
    checkPassword: string = '';

    errorMessage:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastService,
    private http: HttpProvider,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private user: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  /**
   * 修改密码
   */
  changePassword() {
    let user: UserInfoState = this.user.getUserInfo();

    if (this.oldPassword.length === 0) {
      this.toast.show('请填写旧密码');
    } else if (this.newPassword.length === 0) {
      this.toast.show('请填写新密码');
    } else if (this.checkPassword.length === 0) {
      this.toast.show('请再次填写新密码');
    } else if (this.oldPassword !== user.password) {
      this.toast.show('旧密码错误');
    } else if (this.newPassword.length < 6) {
      this.toast.show('新密码过短');
    } else if (this.newPassword.length > 16) {
      this.toast.show('新密码过长');
    } else if (this.newPassword !== this.checkPassword) {
      this.toast.show('两次输出密码不一致');
    } else {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: '更新中...',
        dismissOnPageChange: true});
      this.http.updatePassword(this.newPassword)
      .subscribe(res=>{
        if(res["Status"]=="OK"){
      //处理登录成功的页面跳转
      //也可以存储接口返回的 token（用户是否真实 app=>安全协议）
       localStorage.set('UserId', res["UserId"]);
       localStorage.setItem('password',this.newPassword);
       loading.dismiss();
       this.dismiss();
      } else {
        loading.dismiss();
    this.toast.show(res["StatusContent"])
    }
  },error=>this.errorMessage=<any>error);
      };
    }
//关闭当前页面的方法
dismiss(){
  this.viewCtrl.dismiss();
  }
}

