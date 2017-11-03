import {Component, OnDestroy, OnInit} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { ConfirmationService, Message} from 'primeng/primeng';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  providers: [ConfirmationService]
})
export class FavouritesComponent implements OnInit, OnDestroy {
  public favouriteProperties: any[] = [];
  public displayDialog: boolean;
  public selectedProperty: any;
  public message: Message[] = [];

  constructor(private localStorageService: LocalStorageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.favouriteProperties = this.localStorageService.get('favourites');
    this.makeShortTitleForProperties();
  }

  private makeShortTitleForProperties() {
    for (let index = 0; this.favouriteProperties && index < this.favouriteProperties.length; index++) {
      this.favouriteProperties[index]['short_title'] = this.makeShortTitle(this.favouriteProperties[index]['title']);
    }
  }

  private makeShortTitle(...title) {
    title.splice(38, title.length - 38, '...');
    return title.join('');
  }

  public deleteFromFavourites(property) {
    for (let index = 0; index < this.favouriteProperties.length; index++) {
      if (this.favouriteProperties[index]['lister_url'] === property['lister_url']) {
        this.favouriteProperties.splice(index, 1);
      }
    }
  }

  public selectProperty(property) {
    this.selectedProperty = property;
    this.displayDialog = true;
  }

  public onDialogHide() {
    this.selectedProperty = null;
  }

  public confirmDelete(property) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.message = [{severity: 'info', summary: 'Confirmed', detail: 'Record deleted'}];
        this.deleteFromFavourites(property);
      },
      reject: () => {
        this.message = [{severity: 'info', summary: 'Rejected', detail: 'Record left'}];
      }
    });
  }

  ngOnDestroy() {
    this.localStorageService.set('favourites', this.favouriteProperties);
  }
}
