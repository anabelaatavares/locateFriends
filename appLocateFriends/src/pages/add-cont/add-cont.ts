import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { LocationsProvider } from '../../providers/locations/locations';
import { MapsPage } from '../maps/maps';

/**
 * Generated class for the AddContPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
let data = { latitude: "", longitude: "" };
@Component({
  selector: 'page-add-cont',
  templateUrl: 'add-cont.html',
})
export class AddContPage {


  longitude: any;
  latitude: any;
  @ViewChild('map') mapElement: ElementRef;

  mapLoaded: Promise<any>;
  lng: any;
  lat: any;
  resp: any;
  nome: any;
  constructor(public local: LocationsProvider, private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public geo: Geolocation, public mapa: GoogleMapsProvider) {

  }

  ionViewDidLoad() {

    this.carregarDados();
    console.log('ionViewDidLoad AddContPage');
  }

  carregarDados() {
    //GEOLOCALIZACAO
    // this.geo.getCurrentPosition().then((position) => {
    //   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let mapLoaded = this.mapa.init(this.mapElement.nativeElement);

    Promise.all([mapLoaded]).then((result) => {
      let latLng = new google.maps.LatLng(40.539168, -7.277686);

      let marker = new google.maps.Marker({
        map: this.mapa.map,
        animation: google.maps.Animation.DROP,
        draggable: true,
        position: latLng
      });

      google.maps.event.addListener(marker, "dragend", function (e) {
        data = {
          "latitude": e.latLng.lat(),
          "longitude": e.latLng.lng(),
        }
        this.lng = e.latLng.lng();
        console.log(JSON.stringify(data));
      });
    });
    // });
  }

  save() {
    let dados = {
      "Nome": this.nome,
      "latitude": data.latitude,
      "longitude": data.longitude,
    }

    this.rest.postUsers(dados).then((result) => {
      this.resp = result;
      console.log(this.resp);
      if (this.resp.serverStatus == 2) {
        this.presentAlert("Adicionada a localização do: " + dados.Nome);
      }
    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }

  presentAlert(sub: string) {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      subTitle: sub,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.nome = '';
          }
        }
      ]
    });
    alert.present();
  }

}
