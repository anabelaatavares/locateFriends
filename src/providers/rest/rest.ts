import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  api: string = 'http://84.91.32.243:3000/';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  async getUsers(uuid) {
    return await new Promise(resolve => {
      this.http.get(this.api + '/api/Contactos').subscribe(data => {
        resolve(data);
      });
    });
  }
  
}
