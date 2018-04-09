import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { LocationsProvider } from '../../providers/locations/locations';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public maps: GoogleMapsProvider, public platform: Platform, public locations: LocationsProvider) {
  }

  ionViewDidLoad() {

    let mapLoaded = this.maps.init(this.mapElement.nativeElement);
    let locationsLoaded = this.locations.load();

    Promise.all([
      mapLoaded,
      locationsLoaded
    ]).then((result) => {

      let locations = result[1];

      for (let location of locations) {
        this.maps.addMarker(location.Nome, location.latitude, location.longitude);
      }

    });

  }

}
