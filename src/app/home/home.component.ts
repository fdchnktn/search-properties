import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { ICity } from '../icity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lastCitySearches: ICity[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.lastCitySearches = this.localStorageService.get('latestSearches');
    this.lastCitySearches.reverse();
  }

  saveSelectedCity(city: ICity) {
    this.localStorageService.set('cityForSearch', city);
  }
}
