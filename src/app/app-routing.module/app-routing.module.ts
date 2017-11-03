import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent} from '../home/home.component';
import { PropertyComponent } from '../property/property.component';
import { FavouritesComponent } from '../favourites/favourites.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }
