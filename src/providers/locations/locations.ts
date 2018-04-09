import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the LocationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationsProvider {

  data: any;
  api: string = 'http://84.91.32.243:3000/api/Contactos';

  constructor(public http: Http, public geo: Geolocation) {

  }

  load() {

    if(this.data){
			return Promise.resolve(this.data);
		} 

    return new Promise(resolve => {

      this.http.get(this.api).map(res => res.json()).subscribe(data => {

        this.geo.getCurrentPosition().then((position) => {

          let usersLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          this.data = this.applyHaversine(data, usersLocation);

          this.data.sort((locationA, locationB) => {
            return locationA.distance - locationB.distance;
          });
          resolve(this.data);
        });
      });
    });

  }

  applyHaversine(locations, usersLocation) {
    locations.map((location) => {

      let placeLocation = {
        lat: location.latitude,
        lng: location.longitude
      };

      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'km'
      ).toFixed(2);
    });

    return locations;
  }

  getDistanceBetweenPoints(start, end, units) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius[units || 'km'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;
  }

  toRad(x) {
    return x * Math.PI / 180;
  }

}
