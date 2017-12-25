import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HappyService {

  public hasHappy: boolean = false;
  constructor(private http: Http) { }

  getHappy() {
    return this.http.get('/assets/json/happy.json')
      .map(resp => {
        this.hasHappy = true;
        return resp.json()
      });
  }
}
