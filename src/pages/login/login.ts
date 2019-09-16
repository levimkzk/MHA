import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, LoadingController, NavParams, Platform } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { ToastService } from '../../providers/toast/toast';
//import { UserService, UserInfoState } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { ForgetPage } from '../forget/forget';
import { RegisterPage } from './../register/register';

import { BackButtonService } from '../../providers/backButton/backButton';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  mobile:any;
  password:any;
  errorMessage:any;

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private toast: ToastService,
    private http: HttpProvider,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    private backButtonService: BackButtonService,
    private platform: Platform,) {
      this.platform.ready().then(() => {
        this.backButtonService.registerBackButtonAction(null);
    });

  }

  /**
   * 登录
   * logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
      this.toast.show("请输入账号");
    } else if (password.value.length == 0) {
      this.toast.show("请输入密码");
    } else {
   * let params: URLSearchParams = new URLSearchParams();
      params.append('userLogonName', username.value);
      params.append('userPassword', password.value);
      let user = {
        account: username.value,
        password: password.value,
      };
      const me = this;
      me.http.login('', user, function(res, msg){
        if (res.code === '0') {
          me.navCtrl.setRoot(HomePage);
          localStorage.setItem('isLogin','1');
        } else {
          me.toast.show(res.msg);
        }
      }, function(msg){
        me.toast.show(msg);
      })
    }
   */
  login(){
    /** let loading = this.loadingCtrl.create({
    spinner: 'bubbles',
    content: '登录中...',
    dismissOnPageChange: true});
    this.http.login(this.mobile,this.password)
        .subscribe(res=>{
          if(res["Status"]=="OK"){
        //处理登录成功的页面跳转
        //也可以存储接口返回的 token（用户是否真实 app=>安全协议）
         localStorage.set('UserId', res["UserId"]);
         localStorage.setItem('mobile',this.mobile);
         localStorage.setItem('password',this.password);
         localStorage.setItem('isLogin','1');
         loading.dismiss();
         this.dismiss();
        } else {
          loading.dismiss();
      this.toast.show(res["StatusContent"])
      }
    },error=>this.errorMessage=<any>error);
   */ if (this.mobile =='17393196219' && this.password == '123456'){
      localStorage.setItem('mobile',this.mobile);
      localStorage.setItem('password',this.password);
      localStorage.setItem('isLogin','1');
        this.toast.show('登录成功');
        this.navCtrl.setRoot(HomePage);
    }
  }
  forgetPassword(){
    this.navCtrl.push(ForgetPage);
  }

  //关闭当前页面的方法
  dismiss(){
   this.viewCtrl.dismiss()
  }
  //注册
  toregister(){
      this.navCtrl.push(RegisterPage);
  }

}
