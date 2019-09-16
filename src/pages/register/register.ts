import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { VerifyService } from '../../providers/verify/verify';
import { HttpProvider } from '../../providers/http/http';
import { ToastService } from '../../providers/toast/toast';
import { UserService, UserInfoState } from '../../providers/user/user';
import { PrivacyPage } from './privacy/privacy';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  IDNumber: string = '';
  mobile: string = '';
  verificationCode: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  private wait: number = 60;
  public countdown: number = this.wait;
  public timeValue = "获取验证码";
  public isReGetCode: boolean = false; // 是否是重新获取验证码
  public disabled: boolean = false; // 是否设置禁用
  errorMessage:any;
  private timer;
  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private verify: VerifyService,
    private toast: ToastService,
    public viewCtrl: ViewController,
    private http: HttpProvider,
    public loadingCtrl: LoadingController,
    private userService: UserService) {

  }

  /**
   * 获取验证码
   */
  getVerificationCode() {
    this.isReGetCode = true;
    this.disabled = true;

    if (this.countdown == 0) {
      this.countdown = this.wait;
      if (!this.isReGetCode) {
        this.timeValue = "获取验证码";
      } else {
        this.timeValue = "重新获取";
      }
      this.disabled = false;

      if (this.timer){
        clearTimeout(this.timer);
      }
      return;
    } else {
      this.timeValue = "重新发送 (" + this.countdown + ")";
      this.countdown--;
    }
    //过1秒后执行倒计时函数
    this.timer = setTimeout(()=>this.getVerificationCode(),1000);
  }

  /**
   * 注册
   */
  register() {
    if (this.checkForm()) {
      /** let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: '注册中...',
        dismissOnPageChange: true});
        this.http.register(this.IDNumber, this.mobile, this.username, this.password)
    .subscribe(res=>{
      if(res["Status"]=="OK"){
        //处理登录成功的页面跳转
        //你也可以存储接口返回的 token（用户是否真实 app=>安全协议）
        loading.dismiss();
        this.toast.show("注册成功");
        //this.dismiss();
        localStorage.setItem('isLogin','1');
        this.navCtrl.setRoot(HomePage);

      }else{
        loading.dismiss();
        this.toast.show(res["StatusContent"])
       }
     },error=>this.errorMessage=<any>error);
    */
   if(this.IDNumber === '123123123123' && this.mobile === '17393196219' && this.verificationCode === '111111'
   && this.username === 'test' && this.password === '123456' && this.confirmPassword === '123456'){
    localStorage.setItem('mobile',this.mobile);
    localStorage.setItem('username',this.username);
    localStorage.setItem('password',this.password);
    localStorage.setItem('isLogin','1');
    console.log("注册成功");
    this.toast.show("注册成功");
    this.navCtrl.setRoot(HomePage);
   }
  }
  }
  //关闭当前页面的方法
  //dismiss(){
  //this.viewCtrl.dismiss()
  //}
  /**
   * 隐私协议
   */
  privacy() {
    this.navCtrl.push(PrivacyPage);
  }

  /**
   * 检查用户输入
   */
  checkForm(): boolean {
    if (this.IDNumber.length !== 12){
      this.toast.show('请输入正确的校园卡号');
      return false;
    } else if (!this.verify.isMobilePhoneNumber(this.mobile)) {
      this.toast.show('请输入正确的手机号');
      return false;
    } else if (this.verificationCode.length === 0) {
      this.toast.show('请输入短信验证码');
      return false;
    } else if (this.username.length === 0) {
      this.toast.show('请输入用户名');
      return false;
    } else if (this.username.length > 16) {
      this.toast.show('用户名过长');
      return false;
    }else if (this.password.length === 0) {
      this.toast.show('请输入密码');
      return false;
    } else if (this.confirmPassword !== this.password) {
      this.toast.show('两次输入密码不一致');
      return false;
    } else if (this.password.length < 6) {
      this.toast.show('密码过短');
      return false;
    } else if (this.password.length > 16) {
      this.toast.show('密码过长');
      return false;
    } else {
      return true;
    }
  }

  tologin(){
    this.navCtrl.push(LoginPage);
  }
}
