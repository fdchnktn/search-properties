import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {ICity} from './icity';

@Injectable()
export class CitiesService {

  constructor(private http: Http) { }

  getCities () {
    return this.http.get('assets/cities.json')
      .map(cities => cities.json());
  }


}
