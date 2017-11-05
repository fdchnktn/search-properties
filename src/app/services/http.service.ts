import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private jsonp: Jsonp) { }


  getData(url: string, options: any) {
    return this.jsonp.request(url, { search: options })
      .toPromise()
      .then(resp => resp.json())
      .then(resp => {
        return {listings: resp['response']['listings'], totalResult: resp['response']['total_results']};
      });
  }
}
