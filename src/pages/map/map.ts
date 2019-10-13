import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpProvider } from '../../providers/http/http';
import { BaiduMapLoc } from 'baidumaploc';


declare var BMap;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  loPosition: any;
  laPosition: any;
  marker: any;
  point: any;
  map: any;
  myGeo: any;
  @ViewChild('map') map_container: ElementRef;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public http: HttpProvider,
    public platform: Platform,
    public baidumaploc: BaiduMapLoc) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.loadMap();
    this.upposition();
   }
   //可以加入定时器setInterval
   getCurrentPos(){
    this.baidumaploc.getCurrentPosition().then((res)=>{
        console.log(res);
        alert(JSON.stringify(res));

      }).catch((error)=>{
        console.log(error);
      })
  }
  loadMap() {
    // 实例化地图
    let map = this.map = new BMap.Map("map_container");

  // 获取用户当前位置
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition((res) => {
        // 获取用户当前位置的经纬度
        // 判断如果获取用户位置成功则进行Marker标注并以用户当前位置为中心自动移动缩放地图
        if(geolocation.getStatus() == 0) {
            let point = new BMap.Point(res.point.lng, res.point.lat);
            let marker = new BMap.Marker(point);
            map.addOverlay(marker);
            map.centerAndZoom(point, 24);
        }else {
            console.log(new Error("fail to get location."));
        }
        this.myGeo = new BMap.Geocoder();
        var geolocationControl = new BMap.GeolocationControl();
        this.map.addControl(geolocationControl);
        this.getLocation();
    })

    // 地图放大缩小控件
    let sizeMap = new BMap.Size(10, 80);    // 显示位置
    map.addControl(new BMap.NavigationControl({
        anchor: BMap.BMAP_ANCHOR_TOP_RIGHT,
        offset: sizeMap
    }))
}
getLocation() {
  this.geolocation.getCurrentPosition().then((resp) => {
    if (resp && resp.coords) {
      let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
      let convertor = new BMap.Convertor();
      let pointArr = [];
      pointArr.push(locationPoint);
      convertor.translate(pointArr, 1, 5, (data) => {
        if (data.status === 0) {
          let marker = new BMap.Marker(data.points[0]);
          this.map.panTo(data.points[0]);
          marker.setPosition(data.points[0]);
          this.map.addOverlay(marker);
        }
      })
      this.map.centerAndZoom(locationPoint, 13);
      console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
    }
  }).catch(e => {
    console.log('Error happened when get current position.');
  });
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
