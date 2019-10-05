import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
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
    mapObj: any;//地图对象

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public http: HttpProvider,
    public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.createMap();
    this.upposition();
   }
    createMap() {
    let that = this;
    this.mapObj = new AMap.Map(this.map_container.nativeElement, {
      resizeEnable: true,
      pitch:75, // 地图俯仰角度，有效范围 0 度- 83 度
      rotateEnable: true,
      showBuildingBlock: true,
      viewMode:'3D' // 地图模式
    });
    this.mapObj.getCenter();
    this.mapObj.plugin('AMap.Geolocation',  ()=> {
      let geolocation = new AMap.Geolocation({
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
      this.mapObj.addControl(geolocation);
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, 'complete', that.onComplete.bind(that));//返回定位信息
      AMap.event.addListener(geolocation, 'error', (data)=>{ console.log('定位失败' + data);});      //返回定位出错信息
    });
  }  //解析定位结果
  onComplete(data) {
     console.log(data);
     console.log(data.position.toString());
     console.log(data.formattedAddress);
     let str=['定位成功'];
     this.loPosition = data.position.getLng();
     this.laPosition = data.position.getLat();
    str.push('经度：' + data.position.getLng());
    str.push('纬度：' + data.position.getLat());
    // this.http.position(this.loPosition, this.laPosition).subscribe(res=>{
     //   if(res["Status"]=="OK"){
     //   console.log('position ok');
      //  }})
    if(data.accuracy){
      str.push('精度：' + data.accuracy + ' 米');
    }//如为IP精确定位结果则没有精度信息
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
  }



    upposition(){
      /**this.geolocation.getCurrentPosition().then((resp) => {
        this.loPosition = resp.coords.latitude;
        this.laPosition = resp.coords.longitude;
        console.log(this.loPosition, this.laPosition);
       }).catch((error) => {
         console.log('Error getting location', error);
       });
       let watch = this.geolocation.watchPosition();
       watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
        this.loPosition = data.coords.latitude;
        this.laPosition = data.coords.longitude;
        console.log(this.loPosition, this.laPosition);
});**/


    }
}
