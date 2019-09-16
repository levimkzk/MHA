import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

export interface UserInfoState {
  password: string;
  IDNumber: string;
  mobile: string;
  username: string;
  headImage: string;
  email: string;
  gender: string;
}

/**
 * 用户信息服务
 */
@Injectable()
export class UserService {

  /**
   * 构造函数
   */
  constructor(private http: HttpProvider) { }

  /**
   * 是否登录
   */
  isLogin(): boolean {
    return localStorage.getItem('isLogin') === '1';
  }

  /**
   * 保存用户信息
   */
  saveUserInfo(userInfo: UserInfoState): void {
    localStorage.setItem('IDNumber', userInfo.IDNumber);
    localStorage.setItem('password', userInfo.password);
    localStorage.setItem('mobile', userInfo.mobile);
    localStorage.setItem('username', userInfo.username);
  }

  /**
   * 取得用户信息
   */
  getUserInfo(): UserInfoState {
    let userInfo: UserInfoState = {
      IDNumber: localStorage.getItem('IDNumber'),
      password: localStorage.getItem('password'),
      mobile: localStorage.getItem('mobile'),
      username: localStorage.getItem('username'),
      headImage: this.http.apiUrlUserInfo + localStorage.getItem('headImage'),
      email: localStorage.getItem('email'),
      gender: localStorage.getItem('gender')
    }
    return userInfo;
  }
  removeUserInfo(): void {
  }
}
