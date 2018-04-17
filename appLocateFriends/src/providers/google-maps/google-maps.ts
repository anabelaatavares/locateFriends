import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectivityProvider } from '../connectivity/connectivity';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';


/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google;

@Injectable()
export class GoogleMapsProvider {

  latLh: any;
  mapInitialised: boolean;
  mapElement: any;
  map: any;
  markers: any = [];

  constructor(public connectivityService: ConnectivityProvider, public geo: Geolocation, public platform: Platform) {
    console.log('Hello GoogleMapsProvider Provider');
  }

  init(mapElement: any) {
    this.platform.ready().then(() => {
      this.mapElement = mapElement;
      this.initMap();
    });
  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {
      //GEOLOCALIZACAO
      // this.geo.getCurrentPosition().then((position) => {
      // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let latLng = new google.maps.LatLng(40.5391435, -7.2777507);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement, mapOptions);

      resolve(true);

      // });

    });

  }

  addMarkerInfo(lat: number, lng: number): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);
  }

  addMarker(info: string, lat: number, lng: number): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);

    let content = "<p>" + info + "</p>"

    this.addInfoWindow(marker, content);
  }


  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
}