import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { ICity } from '../interfaces/icity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lastCitySearches: ICity[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const lastSearches: ICity[] = this.localStorageService.get('latestSearches');
    if (lastSearches) {
      this.lastCitySearches = lastSearches.reverse();
    }
  }

  saveSelectedCity(city: ICity) {
    this.localStorageService.set('cityForSearch', city);
  }
}
