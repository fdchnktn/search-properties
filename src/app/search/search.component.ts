import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ICity } from '../icity';
import { countries } from '../app-const.countries';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { CitiesService } from '../cities.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public countries = countries;
  public selectedCity: ICity;
  public suggestionCities: ICity[];
  private citiesOfCurrentCountry: ICity[];
  public currentCountry = new FormControl();

  constructor(private citiesService: CitiesService,
              private localStorageService: LocalStorageService) {
  }

  @Output() onSendCityForSearch = new EventEmitter<any>();
  sendCityForSearch(city) {
    this.onSendCityForSearch.emit(city);
  }

  ngOnInit() {
    let allCities: ICity[] = [];
    const defaultCountry = this.setDefaultCountry();
    this.currentCountry.setValue(defaultCountry);

    this.citiesService.getCities()
      .subscribe( cities => {
        allCities = cities;
        this.citiesOfCurrentCountry = this.getCitiesOfCurrentCountry(allCities, defaultCountry);
      });

    this.currentCountry
      .valueChanges
      .subscribe(countryCode => {
        this.citiesOfCurrentCountry = this.getCitiesOfCurrentCountry(allCities, countryCode);
      });
  }

  private setDefaultCountry() {
    const lastSearch = <ICity>this.localStorageService.get('cityForSearch');
    return lastSearch
      ? lastSearch.country
      : 'GB';
  }

  public filterCities(event) {
    const query = event.query;
    this.suggestionCities = this.getSuggestionCities(this.citiesOfCurrentCountry, query);
  }

  private getCitiesOfCurrentCountry(cities: ICity[], countryCode: string) {
    return cities.filter( city => city.country === countryCode);
  }

  private getSuggestionCities(cities: ICity[], cityForSearch: string) {
    return (cityForSearch)
      ? cities.filter(city =>
        city.name.toLowerCase().search(cityForSearch.toLowerCase()) === 0).splice(0, 5)
      : [];
  }

  public saveSearchCity(city: ICity) {
    const searches: ICity[] =  this.localStorageService.get('latestSearches');
    let latestSearches: ICity[] = [];

    if (searches) {
      latestSearches = searches;
    }

    if (!this.searchBefore(latestSearches, city)) {
      latestSearches.push(city);
    }

    if (latestSearches.length >= 6) {
      latestSearches.shift();
    }

    this.localStorageService.set('latestSearches', latestSearches);
    this.localStorageService.set('cityForSearch', city);
  }


  private searchBefore(latestSearches: ICity[], city: ICity) {
    for (let index = 0; latestSearches && index < latestSearches.length; index++) {
      if (this.citiesEqual(latestSearches[index], city)) {
        return true;
      }
    }
    return false;
  }

  private citiesEqual(firstCity: ICity, secondCity: ICity) {
    return firstCity.name === secondCity.name && firstCity.country === firstCity.country;
  }

}
