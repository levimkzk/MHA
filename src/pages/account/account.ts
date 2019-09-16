import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController, } from 'ionic-angular';
import { VerifyService } from '../../providers/verify/verify';
import { HttpProvider } from '../../providers/http/http';
import { UserService, UserInfoState } from '../../providers/user/user';
import { ToastService } from '../../providers/toast/toast';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  // 用户数据
  user: UserInfoState = this.userService.getUserInfo();

  // 用户名
  username: string = '';
  // 手机号
  mobile: string = '';
  // 电子邮箱
  //private myEmail: string = '';
  // 性别
  gender: string = '';

  newLeave: any;
  errorMessage:any;

  /**
   * 构造函数
   */
  constructor(
    public navCtrl: NavController,
    private toast: ToastService,
    private verify: VerifyService,
    private http: HttpProvider,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    private userService: UserService) {
    this.newLeave=new Date(new Date().getTime()+8*60*60*1000).toISOString();

  }

  /**
   * 页面加载完成
   */
  ionViewDidLoad() {
    this.username = this.user.username;
    this.mobile = this.user.mobile;
    //this.myEmail = this.user.email;
    this.gender = this.user.gender

  }

  /**
   * 修改用户信息
   */
  changeInfo() {

    if (this.username.length === 0) {
      this.toast.show('请输入昵称');
    } else if (!this.verify.isMobilePhoneNumber(this.mobile)) {
      this.toast.show('请输入正确的手机号');
    } else if (this.gender.length === 0) {
      this.toast.show('请选择性别');
    } else if (this.username.length > 16) {
      this.toast.show('用户名过长');
    } else {
     /** let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: '更新中...',
        dismissOnPageChange: true});
      this.http.userinfo(this.newLeave, this.username, this.mobile, this.gender)
      .subscribe(res=>{
        if(res["Status"]=="OK"){
      //处理登录成功的页面跳转
      //也可以存储接口返回的 token（用户是否真实 app=>安全协议）
       localStorage.set('UserId', res["UserId"]);
       localStorage.setItem('newLeave',this.newLeave);
       localStorage.setItem('username',this.username);
       localStorage.setItem('mobile',this.mobile);
       localStorage.setItem('gender',this.gender);
       loading.dismiss();
       this.dismiss();
      } else {
        loading.dismiss();
    this.toast.show(res["StatusContent"])
    }
  },error=>this.errorMessage=<any>error);
      */
     localStorage.setItem('newLeave',this.newLeave);
     localStorage.setItem('username',this.username);
     localStorage.setItem('mobile',this.mobile);
     localStorage.setItem('gender',this.gender);};
    }
  //关闭当前页面的方法
  dismiss(){
    this.viewCtrl.dismiss()
   }
}
