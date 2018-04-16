import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MapsPage } from '../maps/maps';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the AddContPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-cont',
  templateUrl: 'add-cont.html',
})
export class AddContPage {

  lng: any;
  lat: any;
  resp: any;
  nome: any;
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public geo: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContPage');
  }

  save() {
    this.geo.getCurrentPosition().then((position) => {

      let usersLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log(usersLocation);

      let data = {
        "Nome": this.nome,
        "latitude": usersLocation.lat,
        "longitude": usersLocation.lng,
      }

      this.rest.postUsers(data).then((result) => {
        this.resp = result;
        console.log(this.resp);
        if (this.resp.serverStatus == 2) {
          this.presentAlert("Adicionada a localização do: " + data.Nome);
        }
      }, (err) => {
        console.log(err);
      });
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
