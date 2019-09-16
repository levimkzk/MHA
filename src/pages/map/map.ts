import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpProvider } from '../../providers/http/http';


declare var AMap;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  loPosition: any;
  laPosition: any;
  clickEventListener: any;
  marker: any;
  point: any;

  @ViewChild('map_container') map_container: ElementRef;
    map: any;//地图对象

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public http: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.createMap();
    this.getposition();
   }
    createMap() {
      this.map = new AMap.Map(this.map_container.nativeElement, {
      resizeEnable: true,
    });
    }


    getposition(){
     this.map.plugin('AMap.Geolocation',  () =>  {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
     // this.http.position(this.loPosition, this.laPosition).subscribe(res=>{
     //   if(res["Status"]=="OK"){
     //   console.log('position ok');
      //  }})
    }


}
