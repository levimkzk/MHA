
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/**
 * HTTP 请求拦截器
 */
@Injectable()
export class HttpProvider {


  constructor(public http: HttpClient) {

  }
  private apiUrlRegister = '';
  private apiUrlLogin = '';
  apiUrlUserInfo = '';
  private apiUrlUpdatePassword = '';
  private apiUrlPedometer = '';
  private apiUrlSleepTime = '';
  private apiUrlPosition = '';

  login(mobile,password):Observable<string[]>{
    return this.getUrlReturn(this.apiUrlLogin+"&mobile="+mobile+"&password="+password)

 }
 //   /**
 //  * 注册请求
 //  *
 //  * @param {any} mobile
 //  * @param {any} nickname
 //  * @param {any} password
 //  * @returns {Observable<string[]>}
 //  * @memberof RestProvider
 //  */
 register(IDNumber, mobile, username, password): Observable<string[]> {
   return this.getUrlReturn(this.apiUrlRegister + "&IDNumber=" + IDNumber + "&mobile=" + mobile + "&username=" + username + "&password=" + password)
 }

 userinfo(newLeave, username, mobile, gender): Observable<string[]> {
  return this.getUrlReturn(this.apiUrlUserInfo + "&birthday=" + newLeave + "&username=" + username + "&gender=" + gender + "&mobile=" + mobile)
 }

 updatePassword(newPassword): Observable<string[]> {
  return this.getUrlReturn(this.apiUrlUpdatePassword + "&newPassword=" + newPassword)
 }
 pedometer(steps): Observable<string[]> {
  return this.getUrlReturn(this.apiUrlPedometer + "&steps=" + steps)
}

 sleeptime(x, y, z): Observable<string[]> {
  return this.getUrlReturn(this.apiUrlSleepTime + "&accelerationX=" + x + "&accelerationY=" + y + "&accelerationZ=" + z)
 }
 position(longtitude, latitude): Observable<string[]> {
  return this.getUrlReturn(this.apiUrlPosition + "&longtitude=" + longtitude + "&latitude=" + latitude)
 }


 private getUrlReturn(url:string):Observable<string[]>{
   return this.http.get(url)
                   .map(this.extractDate)
                   .catch(this.handleError);

 }

 //处理接口返回的数据,处理成json格式
 private extractDate(res:Response){
   let body =res.json();
   return JSON.parse(body)|| {};
 }

 //处理请求中的错误，考虑了各种情况的错误处理并在console.log中显示error
 private handleError(error:Response | any){
     let errMsg:string;
     if(error instanceof Response){
       const body =error.json()||'';
       const err = body.error || JSON.stringify(body);
       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

     }else{
       errMsg = error.message?error.message:error.toString()
     }

     console.error(errMsg);
     return Observable.throw(errMsg);
 }

}
