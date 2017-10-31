import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AppRoutingModule } from './app-routing.module/app-routing.module';
import { PropertyComponent } from './property/property.component';
import { FilterComponent } from './filter/filter.component';
import { FavouritesComponent } from './favourites/favourites.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { TabMenuModule } from 'primeng/primeng';
import { ListboxModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { ProgressSpinnerModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';

import { HttpService } from './http.service';
import { CitiesService } from './cities.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    SearchComponent,
    PropertyComponent,
    FilterComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    SelectButtonModule,
    BrowserAnimationsModule,
    ButtonModule,
    ListboxModule,
    TabMenuModule,
    DataListModule,
    DataGridModule,
    PanelModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    GrowlModule,
    ProgressSpinnerModule,
    AutoCompleteModule,
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [HttpService, ConfirmationService, CitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
