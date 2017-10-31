import {Component, OnInit} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { ICity } from '../icity';
import { servers } from '../app-const.servers';
import { HttpService } from '../http.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  public emptyMessage = 'Properties not found';
  public totalRecords = 0;
  private servers = servers;
  public cityForSearch: ICity;
  public properties: string[];
  public currentUrl: string;
  public pagination = false;
  public loaded = false;

  private options: any = {
    action: 'search_listings',
    callback: 'JSONP_CALLBACK',
    encoding: 'json',
    page: 1,
    number_of_results: 10,
    language: 'en',
    place_name: '',
    sort: 'relevancy',
    listing_type: 'rent',
    price_min: 0,
    price_max: 999999999,
    bedroom_min: 0,
    bedroom_max: 4,
    bathroom_min: 0,
    bathroom_max: 4,
    has_photo: 1
  };

  constructor(private localStorageService: LocalStorageService,
              private httpService: HttpService) { }

  ngOnInit() {
    const cityForSearch = this.getCityFromLocalStorage();
    if (cityForSearch) {
      this.getPropertiesFromCurrentCity(cityForSearch);
    }
  }

  public loadData(event) {
    window.scrollTo(0, 0);
    const page = event.first / event.rows + 1;
    const options = this.updatePageInOptions(page);
    this.getDataFromServer(this.currentUrl, options);
  }

  private updatePageInOptions(page: number) {
    this.options.page = page;
    return this.options;
  }

  updateFilterAndRequest(filter) {
    const options = this.updateOptions(filter);
    this.getDataFromServer(this.currentUrl, options);
  }

  private updateOptions(filter) {
    this.options.listing_type = filter.listing_type;
    this.options.sort = filter.sort;

    if (filter.beds && filter.beds.length) {
      this.options.bedroom_min = filter.beds[0];
      this.options.bedroom_max = filter.beds[filter.beds.length - 1];
    } else {
      this.options.bedroom_min = 0;
      this.options.bedroom_max = 4;
    }

    if (filter.bathrooms && filter.bathrooms.length) {
      this.options.bathroom_min = filter.bathrooms[0];
      this.options.bathroom_max = filter.bathrooms[filter.bathrooms.length - 1];
    } else {
      this.options.bathroom_min = 0;
      this.options.bathroom_max = 4;
    }

    this.options.price_min = filter.price[0];
    this.options.price_max = filter.price[1];

    return this.options;
  }

  public onSendCityForSearch(city: ICity) {
    this.getPropertiesFromCurrentCity(city);
  }

  private getPropertiesFromCurrentCity(city: ICity) {
    this.loaded = false;
    const currentUrl = this.identifyUrl(city.country);
    const options = this.updateCityInOptions(city.name);
    this.getDataFromServer(currentUrl, options);
  }

  private getCityFromLocalStorage() {
    return <ICity>this.localStorageService.get('cityForSearch');
  }

  private identifyUrl(code: string) {
   const currentServer =  this.servers.filter(server => server.code.toLowerCase() === code.toLowerCase());
   this.currentUrl = currentServer[0].url;
   return currentServer[0].url;
  }

  private updateCityInOptions(name: string) {
    this.options.place_name = name;
    return this.options;
  }

  private getDataFromServer(url: string, options: any) {
    this.httpService.getData(url, options)
      .then(data => {
        this.properties = data.listings;
        this.loaded = true;
        return this.totalRecords = data.totalResult;
      })
      .then((totalRecords) => this.needPaginator(totalRecords))
    .catch ((error) => {
      this.emptyMessage = `Properties ${this.options.place_name} not found`;
      console.log(error);
    });
  }

  private needPaginator(totalRecords) {
    (totalRecords > 10)
      ? this.pagination = true
      : this.pagination = false;
  }

  public addToFavourites(property) {
    let favouritesProperty: any[] = this.localStorageService.get('favourites');
    (favouritesProperty && !this.isFavourite(favouritesProperty, property))
      ? favouritesProperty.push(property)
      : favouritesProperty = [property];

    this.localStorageService.set('favourites', favouritesProperty);
  }

  private isFavourite(favourites: any[], property: any) {
    for (let index = 0; index < favourites.length; index++) {
      if (favourites[index]['lister_url'] === property['lister_url']) {
        console.log(favourites[index]['lister_url']);
        console.log(property['lister_url']);
        return true;
      }
    }
    return false;
  }
}
