import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectivityProvider } from '../connectivity/connectivity';
import { Geolocation } from '@ionic-native/geolocation';


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

  constructor(public connectivityService: ConnectivityProvider, public geo: Geolocation) {

  }

  init(mapElement: any): Promise<any> {

    this.mapElement = mapElement;

    return this.initMap();

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      this.geo.getCurrentPosition().then((position) => {

        // UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //let latLng = new google.maps.LatLng(40.713744, -74.009056);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);

        resolve(true);

      });

    });

  }

  addMarker(info: string, lat: number, lng: number): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.markers.push(marker);

    console.log(marker);
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