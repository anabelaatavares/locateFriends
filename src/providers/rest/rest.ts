
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  api: string = 'http://84.91.32.243:3000';
  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  async getUsers() {
    return await new Promise(resolve => {
      this.http.get(this.api + '/api/Contactos').subscribe(data => {
        resolve(data);
      });
    });
  }

  async postUsers(data) {
    return await new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.api + '/api/Contactos', JSON.stringify(data), options).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

}
